const { getBaseBranch } = require("@kie/build-chain-configuration-reader");
const { logger } = require("../lib/logger");

function filterPullRequests(
  nodeTriggeringTheJob,
  node,
  pullRequests,
  baseBranchesToFilter
) {
  logger.debug("filterPullRequests", baseBranchesToFilter);
  if (baseBranchesToFilter && baseBranchesToFilter.length) {
    const baseBranchesToFilterMapped = baseBranchesToFilter.map(baseBranch =>
      getBaseBranch(
        nodeTriggeringTheJob.project,
        nodeTriggeringTheJob.mapping,
        node.project,
        node.mapping,
        baseBranch
      )
    );

    logger.debug("baseBranchesToFilterMapped", baseBranchesToFilterMapped);
    const result = pullRequests.filter(pr =>
      baseBranchesToFilterMapped.includes(pr.base.ref)
    );
    logger.debug(
      "baseBranchesToFilterMapped",
      baseBranchesToFilterMapped,
      pullRequests.length,
      result.length
    );
    return result;
  } else {
    return [...pullRequests];
  }
}

module.exports = {
  filterPullRequests
};
