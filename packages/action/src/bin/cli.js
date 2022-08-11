#!/usr/bin/env node
const { main } = require("./main");
const { getArgumentsObject } = require("./arguments");

const start = () => {
  const args = getArgumentsObject();
  main({ ...args });
};

if (require.main === module) {
  start();
}

module.exports = { start };
