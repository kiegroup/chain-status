const { logger } = require("../logger");
const { getJobs, genericRequest } = require("./jenkins.service");
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
        date: buildInfo.timestamp
      };
    })
  );
};

async function main(
  jenkinsUrl,
  jobUrl,
  jobFilter,
  certFilePath,
  outputFolderPath,
  metadata,
  isDebug
) {
  assert(jenkinsUrl, "The jenkinsUrl is not defined");
  assert(jobUrl || jobUrl.length === 0, "The jobUrl is not defined");

  const jobs = await jobUrl.reduce(async (accP, curr) => {
    const acc = await accP;
    logger.info(`Getting jobs for ${curr}`);
    const currJobs = await getJobs(jenkinsUrl, curr, certFilePath);
    if (!currJobs) {
      logger.warn(
        `The are no jobs for ${curr}. Are you sure you defined a proper job URL?`
      );
      return acc;
    }
    logger.info(`${curr.length} Jobs for ${curr} already retrieved`);
    return [...acc, ...currJobs];
  }, Promise.resolve([]));

  const jobInfos = await Promise.all(
    jobs
      .filter(job => !jobFilter || new RegExp(jobFilter).test(job.name))
      .map(async job => {
        logger.info("Getting job info for", job.url);
        return await genericRequest(job.url, certFilePath);
      })
  );
  const result = await Promise.all(
    jobInfos.map(async jobInfo => ({
      id: jobInfo.name,
      name: jobInfo.displayName,
      description: jobInfo.description,
      url: jobInfo.url,
      color: jobInfo.color,
      builds: await getBuilds(jobInfo.builds, certFilePath)
    }))
  );
  logger.debug("result", result);

  return saveFiles(
    JSON.stringify(
      {
        metadata,
        jobs: result.filter(job => job.builds && job.builds.length > 0)
      },
      null,
      isDebug ? 2 : 0
    ),
    outputFolderPath
  );
}

module.exports = { main };
