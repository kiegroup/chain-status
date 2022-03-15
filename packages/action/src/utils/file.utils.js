const { logger } = require("../lib/logger");
const { ClientError } = require("../lib/common");
const { formatDate } = require("./date-util");
const fs = require("fs");
const path = require("path");

const saveFiles = (data, outputFolderPath, extesion = "json") => {
  logger.info(`Writting files to ${outputFolderPath}`);
  if (!fs.existsSync(outputFolderPath)) {
    logger.info(
      `Directory '${outputFolderPath}' does not exist. Creating it...`
    );
    fs.mkdirSync(outputFolderPath, { recursive: true });
    logger.info(`Directory '${outputFolderPath}' created`);
  }
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
  return { latest: latestFilePath, today: todayFilePath };
};

module.exports = { saveFiles };
