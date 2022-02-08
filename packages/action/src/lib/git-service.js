const { getOwnerProject } = require("../utils/project-utils");
const { ClientError } = require("./common");
const { logger } = require("./logger");

const getDefaultBranch = async (project, octokit) => {
  const repository = await getRepository(project, octokit);
  return repository ? repository.default_branch : undefined;
};

const getRepository = async (project, octokit) => {
  logger.info(
    `Requesting project info ${project}. https://api.github.com/repos/${project}`
  );
  const { status, data } = await octokit.repos.get({
    ...getOwnerProject(project)
  });
  if (status === 200) {
    return data;
  } else {
    throw new ClientError(
      `Error requesting https://api.github.com/repos/${project}`
    );
  }
};

const getPullRequests = async (
  project,
  octokit,
  options = { state: "open", page: 1, per_page: 100 }
) => {
  logger.info(
    `Requesting pull requests for ${project}. Page ${options.page}. Per Page: ${
      options.per_page
    }. https://api.github.com/repos/${project}/pulls?${Object.keys(options)
      .map(e => `${e}=${options[e]}`)
      .join("&")}`
  );
  const result = [];
  const { status, data } = await octokit.pulls.list({
    ...getOwnerProject(project),
    ...options
  });
  if (status === 200) {
    result.push(...data);
    if (data && data.length === options.per_page) {
      result.push(
        ...(await getPullRequests(project, octokit, {
          ...options,
          page: ++options.page
        }))
      );
    }
  }
  return result;
};

const getChecks = async (project, ref, octokit) => {
  logger.info(
    `Requesting project info ${project}. https://api.github.com/repos/${project}/check-runs/${ref}`
  );
  const { status, data } = await octokit.checks.listForRef({
    ...getOwnerProject(project),
    ref
  });
  if (status === 200) {
    logger.info("getChecks", data);
    return data;
  } else {
    throw new ClientError(
      `Error requesting https://api.github.com/repos/${project}/check-runs/${ref}`
    );
  }
};

const listSuitesForRef = async (project, ref, octokit) => {
  logger.info(
    `Requesting project info ${project}. https://api.github.com/repos/${project}/check-runs/${ref}`
  );
  const { status, data } = await octokit.checks.listSuitesForRef({
    ...getOwnerProject(project),
    ref: "2829591c22b63fc97e2676b8576c59c0aa69e4d8"
  });
  if (status === 200) {
    logger.info("listSuitesForRef", data);
    return data;
  } else {
    throw new ClientError(
      `Error requesting https://api.github.com/repos/${project}/check-runs/${ref}`
    );
  }
};

module.exports = {
  getDefaultBranch,
  getRepository,
  getPullRequests,
  getChecks,
  listSuitesForRef
};
