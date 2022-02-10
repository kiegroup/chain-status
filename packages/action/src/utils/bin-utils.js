const process = require("process");

const { ClientError } = require("../lib/common");
const { Octokit } = require("@octokit/rest");
require("dotenv").config();

/**
 * Gets an environment variable value
 * @param {String} name the environment variable name
 */
function getProcessEnvVariable(name, mandatory = true) {
  const val = process.env[name];
  if (mandatory && (!val || !val.length)) {
    throw new ClientError(`environment variable ${name} not set!`);
  }
  return val;
}

function createOctokitInstance(token) {
  return token
    ? new Octokit({
        auth: `token ${token}`,
        userAgent: "ginxo/chain-status"
      })
    : new Octokit({
        userAgent: "ginxo/chain-status"
      });
}

module.exports = {
  getProcessEnvVariable,
  createOctokitInstance
};
