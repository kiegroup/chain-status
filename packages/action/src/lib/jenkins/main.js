const { logger } = require("../logger");
const { getJobs, genericRequest } = require("./jenkins.service");
const { saveFiles } = require("../../utils/file.utils");

const getBuilds = async (builds, jobUrl, jenkinsUrl, certFilePath) => {
  logger.info(`Getting builds from ${jobUrl}`);
  return await Promise.all(
    builds.map(async build => {
      const buildInfo = await genericRequest(
        jenkinsUrl,
        `${jobUrl}/${build.number}`,
        certFilePath
      );
      return {
        building: buildInfo.building,
        duration: buildInfo.duration,
        estimatedDuration: buildInfo.estimatedDuration,
        id: buildInfo.number,
        result: buildInfo.result,
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
  const jobs = await getJobs(jenkinsUrl, jobUrl, certFilePath);
  const jobInfos = await Promise.all(
    jobs
      .filter(job => !jobFilter || new RegExp(jobFilter).test(job.name))
      .map(
        async job =>
          await genericRequest(
            jenkinsUrl,
            `${jobUrl}/job/${job.name}`,
            certFilePath
          )
      )
  );
  const result = await Promise.all(
    jobInfos.map(async jobInfo => ({
      name: jobInfo.displayName,
      description: jobInfo.description,
      url: jobInfo.url,
      color: jobInfo.color,
      builds: await getBuilds(
        jobInfo.builds,
        `${jobUrl}/job/${jobInfo.name}`,
        jenkinsUrl,
        certFilePath
      )
    }))
  );
  logger.debug("result", result);

  return saveFiles(
    JSON.stringify({ metadata, jobs: result }, null, isDebug ? 2 : 0),
    outputFolderPath
  );
}

module.exports = { main };
