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
  try {
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
  } catch (e) {
    logger.error(
      `Error requesting pull requests for ${project}. Page ${
        options.page
      }. Per Page: ${
        options.per_page
      }. https://api.github.com/repos/${project}/pulls?${Object.keys(options)
        .map(e => `${e}=${options[e]}`)
        .join("&")}`,
      e
    );
    throw e;
  }
};

const getChecks = async (
  project,
  ref,
  octokit,
  options = { page: 1, per_page: 100 }
) => {
  logger.info(
    `Requesting checks for ${project}. https://api.github.com/repos/${project}/check-runs/${ref}`
  );
  try {
    const result = [];
    const { status, data } = await octokit.checks.listForRef({
      ...getOwnerProject(project),
      ref,
      ...options
    });

    if (status === 200 && data.check_runs && data.check_runs.length > 0) {
      result.push(...data.check_runs);
      if (data.check_runs.length === options.per_page) {
        result.push(
          ...(await getChecks(project, ref, octokit, {
            ...options,
            page: ++options.page
          }))
        );
      }
    }
    return result;
  } catch (e) {
    logger.error(
      `Error requesting checks for ${project}. https://api.github.com/repos/${project}/check-runs/${ref}`,
      e
    );
    throw e;
  }
};

const getRefStatuses = async (
  project,
  ref,
  octokit,
  options = { page: 1, per_page: 100 }
) => {
  logger.info(
    `Requesting statuses for ${project}. https://api.github.com/repos/${project}/commits/${ref}/status`
  );
  try {
    const statuses = await octokit
      .paginate(
        "GET /repos/{owner}/{repo}/commits/{ref}/status",
        {
          ...getOwnerProject(project),
          ref,
          ...options
        },
        response => response.data.statuses
      )
      .then(statuses => statuses);
    return statuses;
  } catch (e) {
    logger.error(
      `Error requesting statuses for ${project}. https://api.github.com/repos/${project}/commits/${ref}/status`,
      e
    );
    throw e;
  }
};

const listBranches = async (
  project,
  octokit,
  options = { page: 1, per_page: 100 }
) => {
  logger.info(
    `Requesting branches for ${project}. https://api.github.com/repos/${project}/branches`
  );
  try {
    const result = [];
    const { status, data } = await octokit.repos.listBranches({
      ...getOwnerProject(project),
      ...options
    });

    if (status === 200 && data && data.length > 0) {
      result.push(...data);
      if (data.length === options.per_page) {
        result.push(
          ...(await listBranches(project, octokit, {
            ...options,
            page: ++options.page
          }))
        );
      }
    }
    return result;
  } catch (e) {
    logger.error(
      `Error requesting list of branches for ${project}. https://api.github.com/repos/${project}/branches`,
      e
    );
    throw e;
  }
};

module.exports = {
  getDefaultBranch,
  getRepository,
  getPullRequests,
  getChecks,
  getRefStatuses,
  listBranches
};
