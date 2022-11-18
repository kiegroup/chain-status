const { Command } = require("commander");
const pkg = require("../../package.json");

function getArgumentsObject() {
  const program = new Command();
  program.name(pkg.name).description(pkg.description).version(pkg.version);
  program
    .option(
      "-df, --definition-file <filePath or URL>",
      "Filesystem path or URL to the definition file."
    )
    .option(
      "-p, --projects <project...>",
      "a list of project names including organization <owner>/<proj>"
    )
    .requiredOption("-t, --title <title>", "Project title.")
    .requiredOption("-st, --subtitle <subtitle>", "Project subtitle.")
    .option(
      "-o --outputFolderPath <folderPath>",
      "the path where the files should be stored",
      __dirname
    )
    .option("--token <token>", "the github token", process.env["GITHUB_TOKEN"])
    .option(
      "--baseBranchFilter <branch...>",
      "a list of base branches RegEx to filter pull requests from",
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
    .option("-ju, --jenkinsUrl <url>", "The jenkins URL", undefined)
    .option("-job, --jobUrl <url...>", "A list of jenkins job URLs", undefined)
    .option("-jf, --jobFilter <regex>", "The regex to filter jobs", undefined)
    .option(
      "-cert, --certFilePath <filePath>",
      "The jenkins cert file",
      undefined
    )
    .option("--order <order>", "The order on the menu", 1000)
    .option(
      "--skipZero",
      "Skip jobs or projects with zero builds or pull requests",
      1000
    )
    .option(
      "--projectFilter <project...>",
      "A list of RegEx to filter project names",
      []
    )
    .option(
      "-b, --branches <branch...>",
      "The list of branches for which you want to provide comparison",
      []
    )
    .parse();

  return { ...program.opts() };
}

module.exports = { getArgumentsObject };
