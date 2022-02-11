const { Command } = require("commander");

function getArgumentsObject() {
  const program = new Command();
  program
    .requiredOption(
      "-df, --definition-file <filePath or URL>",
      "Filesystem path or URL to the definition file."
    )
    .option(
      "-o --outputFolderPath <folderPath>",
      "the path where the files should be stored",
      __dirname
    )
    .option("--token <token>", "the github token", process.env["GITHUB_TOKEN"])
    .option(
      "--baseBranchFilter <branch...>",
      "a list of base branches to filter pull requests from",
      []
    )
    .option("-d, --debug", "to enable debug logging mode.", undefined)
    .option(
      "-cb, --created-by <user>",
      "The user or system who generates the report",
      "local execution"
    )
    .option(
      "-cu, --created-url <url>",
      "The job's URL where the repor is generated",
      undefined
    )
    .parse();

  return { ...program.opts() };
}

module.exports = { getArgumentsObject };
