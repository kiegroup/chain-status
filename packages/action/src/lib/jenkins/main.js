const { logger } = require("../logger");
const { genericRequest } = require("./jenkins.service");
const { saveFiles } = require("../../utils/file.utils");
const assert = require("assert");

const getBuilds = async (builds, certFilePath) => {
  return await Promise.all(
    builds.map(async build => {
      logger.info(`Getting builds from ${build.url}`);
      const buildInfo = await genericRequest(build.url, certFilePath);
      return {
        id: buildInfo.number,
        building: buildInfo.building,
        result: buildInfo.result,
        duration: buildInfo.duration,
        estimatedDuration: buildInfo.estimatedDuration,
        date: buildInfo.timestamp,
        url: buildInfo.url
      };
    })
  );
};

const mapJobInfo = jobInfo => ({
  id: jobInfo.name,
  name: jobInfo.displayName,
  description: jobInfo.description,
  url: jobInfo.url,
  color: jobInfo.color,
  parent: jobInfo.parent
});

async function main(
  jenkinsUrl,
  jobUrl,
  jobFilter,
  certFilePath,
  outputFolderPath,
  metadata,
  skipZero,
  isDebug
) {
  assert(jenkinsUrl, "The jenkinsUrl is not defined");
  assert(jobUrl || jobUrl.length === 0, "The jobUrl is not defined");

  const jobs = await jobUrl.reduce(async (accP, parentJobUrl) => {
    const acc = await accP;
    logger.info(`Getting jobs for ${parentJobUrl}`);
    const parentJobInfo = await genericRequest(
      parentJobUrl,
      certFilePath,
      jenkinsUrl
    );
    if (!parentJobInfo || !parentJobInfo.jobs) {
      logger.warn(
        `The are no jobs for ${parentJobUrl}. Are you sure you defined a proper job URL?`
      );
      return acc;
    }
    logger.info(
      `${parentJobInfo.jobs.length} jobs for ${parentJobUrl} already retrieved`
    );
    return [
      ...acc,
      ...parentJobInfo.jobs.map(job => ({
        parent: mapJobInfo(parentJobInfo),
        ...job
      }))
    ];
  }, Promise.resolve([]));

  const jobInfos = await Promise.all(
    jobs
      .filter(job => !jobFilter || new RegExp(jobFilter).test(job.name))
      .map(async parentJobInfo => {
        logger.info("Getting job info for", parentJobInfo.url);
        const jobInfo = await genericRequest(parentJobInfo.url, certFilePath);
        return { parent: parentJobInfo.parent, ...jobInfo };
      })
  );
  const result = await Promise.all(
    jobInfos.map(async jobInfo => ({
      ...mapJobInfo(jobInfo),
      builds: await getBuilds(jobInfo.builds, certFilePath)
    }))
  );
  logger.debug("result", result);

  return saveFiles(
    JSON.stringify(
      {
        metadata,
        jobs: skipZero
          ? result.filter(job => job.builds && job.builds.length > 0)
          : result
      },
      null,
      isDebug ? 2 : 0
    ),
    outputFolderPath
  );
}

module.exports = { main };
