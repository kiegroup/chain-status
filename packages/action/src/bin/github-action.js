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
    baseBranchFilter: core.getInput("baseBranchFilter")
      ? core.getInput("baseBranchFilter").split(",")
      : [],
    debug: core.getInput("logger-level") === "debug",
    createdBy: "TODO"
  };
  await main(args);
};

if (require.main === module) {
  start();
}

module.exports = { start };
