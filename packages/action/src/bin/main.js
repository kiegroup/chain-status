//#!/usr/bin/env node
const { logger } = require("../lib/logger");
const {
  getOrderedListForTree
} = require("@kie/build-chain-configuration-reader");
const { createOctokitInstance } = require("../utils/bin-utils");
const { getPullRequests } = require("../lib/git-service");
const { ClientError } = require("../lib/common");
const { formatDate } = require("../utils/date-util");
const fs = require("fs");
const path = require("path");

const mapUser = user => ({
  login: user.login,
  avatar_url: user.avatar_url
});

// await getChecks("kiegroup/droolsjbpm-build-bootstrap", "", octokit);
const mapChecks = async (node, pullRequest) => {
  logger.debug("mapChecks", node.project, pullRequest.id);
  return [];
};

const mapPullRequest = (node, pullRequest) => ({
  title: pullRequest.title,
  url: pullRequest.url,
  html_url: pullRequest.html_url,
  state: pullRequest.state,
  labels: pullRequest.labels.reduce((acc, curr) => [...acc, curr.name], []),
  draft: pullRequest.draft,
  requested_reviewers: pullRequest.requested_reviewers.map(mapUser),
  created_at: pullRequest.created_at,
  updated_at: pullRequest.updated_at,
  closed_at: pullRequest.closed_at,
  merged_at: pullRequest.merged_at,
  user: mapUser(pullRequest.user),
  checks: mapChecks(node, pullRequest)
});

const mapPullRequestInfo = (node, pullRequests) => {
  const baseRepo =
    pullRequests && pullRequests.length ? pullRequests[0].base.repo : {};
  return {
    key: node.project,
    name: baseRepo.name,
    description: baseRepo.description,
    html_url: baseRepo.html_url,
    updated_at: baseRepo.updated_at,
    homepage: baseRepo.homepage,
    language: baseRepo.language,
    default_branch: baseRepo.default_branch,
    pullRequests: pullRequests.map(e => mapPullRequest(node, e))
  };
};

const saveFiles = (data, outputFolderPath, extesion = "json") => {
  logger.info(`Writting files to ${outputFolderPath}`);
  if (!fs.lstatSync(outputFolderPath).isDirectory()) {
    throw new ClientError(`${outputFolderPath} is not a directory.`);
  }

  const todayFilePath = path.join(
    outputFolderPath,
    `${formatDate(new Date())}.${extesion}`
  );
  logger.info(`Writting file to ${todayFilePath}`);
  fs.writeFileSync(todayFilePath, data);

  const latestFilePath = path.join(outputFolderPath, `latest.${extesion}`);
  logger.info(`Writting file to ${latestFilePath}`);
  fs.writeFileSync(latestFilePath, data);
};

async function main(args) {
  logger.level = args.debug ? "debug" : "info";
  logger.debug("args", args);
  const octokit = createOctokitInstance(args.token);

  logger.info(`Getting projects from definition file ${args.definitionFile}`);
  const orderedList = await getOrderedListForTree(args.definitionFile, {
    token: args.token
  });
  if (!orderedList || !orderedList.length) {
    throw new ClientError("No projects on the definition file");
  }

  const pullRequestInformation = await Promise.all(
    orderedList.map(async node => {
      try {
        return mapPullRequestInfo(
          node,
          await getPullRequests(node.project, octokit)
        );
      } catch (err) {
        throw { project: node.project, message: err };
      }
    })
  )
    .then(result => result.reduce((acc, curr) => [...acc, curr], []))
    .catch(err => {
      logger.error(`[${err.project}] Error checking it out. ${err.message}`);
      throw err.message;
    });

  saveFiles(
    JSON.stringify(pullRequestInformation, null, args.debug ? 2 : 0),
    args.outputFolderPath
  );
}

if (require.main === module) {
  main();
}
module.exports = { main };
