#!/usr/bin/env node
const core = require("@actions/core");
const { getProcessEnvVariable } = require("../utils/bin-utils");
const { main } = require("./main");

const start = async () => {
  const args = {
    definitionFile: core.getInput("definition-file"),
    outputFolderPath: core.getInput("output-folder-path")
      ? core.getInput("output-folder-path")
      : __dirname,
    token: getProcessEnvVariable("GITHUB_TOKEN", false),
    baseBranchFilter: core.getInput("base-branch-filter")
      ? core.getInput("base-branch-filter").split(",")
      : [],
    debug: core.getInput("logger-level") === "debug",
    title: core.getInput("title"),
    subtitle: core.getInput("subtitle"),
    createdBy: core.getInput("created-by"),
    createdUrl: core.getInput("created-url")
  };
  await main(args);
};

if (require.main === module) {
  start();
}

module.exports = { start };
