#!/usr/bin/env node
const core = require("@actions/core");
const { main } = require("./main");

const start = () => {
  const args = {
    definitionFile: core.getInput("definition-file"),
    debug: core.getInput("logger-level") === "debug"
  };
  main(args);
};

if (require.main === module) {
  start();
}

module.exports = { start };
