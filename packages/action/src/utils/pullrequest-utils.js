const { getBaseBranch } = require("@kie/build-chain-configuration-reader");
const { logger } = require("../lib/logger");

function filterPullRequests(
  nodeTriggeringTheJob,
  node,
  pullRequests,
  baseBranchesToFilter
) {
  logger.debug(
    "filterPullRequests",
    node.project,
    node.mapping,
    baseBranchesToFilter
  );
  if (baseBranchesToFilter && baseBranchesToFilter.length) {
    const baseBranchesToFilterMapped = baseBranchesToFilter.map(baseBranch => {
      process.env.GITHUB_BASE_REF = baseBranch;
      logger.debug("MAPPING", node.mapping);
      return getBaseBranch(
        nodeTriggeringTheJob.project,
        nodeTriggeringTheJob.mapping,
        node.project,
        node.mapping,
        baseBranch
      );
    });

    const result = pullRequests.filter(pr =>
      baseBranchesToFilterMapped.includes(pr.base.ref)
    );
    logger.debug(
      "baseBranchesToFilterMapped",
      node.project,
      baseBranchesToFilterMapped,
      pullRequests.length,
      result.length,
      new Set(pullRequests.map(pr => pr.base.ref))
    );
    return result;
  } else {
    return [...pullRequests];
  }
}

module.exports = {
  filterPullRequests
};
