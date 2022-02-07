const { Command } = require("commander");

function getArgumentsObject() {
  const program = new Command();
  program
    .requiredOption(
      "-df, --definition-file <filePath or URL>",
      "Filesystem path or URL to the definition file."
    )
    .option("-d, --debug", "to enable debug logging mode.", undefined)
    .parse();

  return { ...program.opts() };
}

module.exports = { getArgumentsObject };
