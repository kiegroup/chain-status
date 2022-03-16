//#!/usr/bin/env node
const { logger } = require("../lib/logger");
const { main: executeGithub } = require("../lib/github/main");
const { main: executeJenkins } = require("../lib/jenkins/main");
const path = require("path");
const fs = require("fs");

const titleToFolder = title =>
  title.replace(/\s/g, "-").replace(/\./g, "_").toLocaleLowerCase();

const getMetadata = args => ({
  title: args.title,
  subtitle: args.subtitle,
  date: new Date(),
  createdBy: args.createdBy,
  createdUrl: args.createdUrl
});

const generateProductFile = (
  productFilePath,
  id,
  name,
  order,
  key = "projectStatuses"
) => {
  const content = fs.existsSync(productFilePath)
    ? JSON.parse(fs.readFileSync(productFilePath, "utf8"))
    : {};
  if (!content[key]) {
    content[key] = [];
  }
  const existingStatus = content[key].find(
    projectStatus => projectStatus.id === id
  );
  const projectStatusElement = existingStatus || {};
  projectStatusElement.id = id;
  projectStatusElement.name = name;
  projectStatusElement.folder = id;
  projectStatusElement.order = order;
  if (!existingStatus) {
    content[key] = [...content[key], projectStatusElement];
  }
  fs.writeFileSync(productFilePath, JSON.stringify(content, null, 2));
  logger.info(`File ${productFilePath} saved`);
};

async function main(args) {
  logger.level = args.debug ? "debug" : "info";
  logger.debug("args", args);

  const folderTitle = titleToFolder(args.title);
  const outputFolder = path.join(args.outputFolderPath, folderTitle);

  if (args.jenkinsUrl) {
    const jenkinsSavedFiles = await executeJenkins(
      args.jenkinsUrl,
      args.jobUrl,
      args.jobFilter,
      args.certFilePath,
      outputFolder,
      getMetadata(args),
      args.skipZero,
      args.debug
    );
    logger.debug("Jenkins saved files", jenkinsSavedFiles);

    generateProductFile(
      path.join(args.outputFolderPath, "product.json"),
      folderTitle,
      args.title,
      args.order,
      "jobs"
    );
  } else {
    const githubSavedFiles = await executeGithub(
      args,
      outputFolder,
      getMetadata(args),
      args.skipZero,
      args.debug
    );
    logger.debug("Github Saved Files", githubSavedFiles);

    generateProductFile(
      path.join(args.outputFolderPath, "product.json"),
      folderTitle,
      args.title,
      args.order,
      "projectStatuses"
    );
  }
}

if (require.main === module) {
  main();
}
module.exports = { main };
