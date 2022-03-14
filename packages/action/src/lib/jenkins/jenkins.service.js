const axios = require("axios").default;
const https = require("https");
const fs = require("fs");
const { logger } = require("../logger");

const getAgent = certFilePath =>
  new https.Agent({
    ca: fs.readFileSync(certFilePath)
  });

const getJobs = async (baseUrl, jobUrl, certFilePath) =>
  await axios
    .get(`${jobUrl}/api/json`, {
      baseURL: baseUrl,
      httpsAgent: getAgent(certFilePath)
    })
    .then(response => response.data.jobs)
    .catch(e => {
      logger.error("Error getting jobs", jobUrl, e.response.data);
      throw e;
    });

const genericRequest = async (url, certFilePath) =>
  await axios
    .get(`${url}/api/json`, {
      httpsAgent: getAgent(certFilePath)
    })
    .then(response => response.data)
    .catch(e => {
      logger.error("Error requesting", url, e.response.data);
      throw e;
    });

module.exports = { getJobs, genericRequest };
