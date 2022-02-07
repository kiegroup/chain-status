//#!/usr/bin/env node
const { logger } = require("../lib/logger");

function main(args) {
  logger.level = args.debug ? "debug" : "info";
  logger.debug("args", args);

  logger.error("Not implemented yet");
}

if (require.main === module) {
  main();
}
module.exports = { main };
