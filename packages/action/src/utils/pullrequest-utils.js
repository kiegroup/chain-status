const { getMapping } = require("@kie/build-chain-configuration-reader");
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
      const baseMappingInfo = getMapping(
        nodeTriggeringTheJob.project,
        nodeTriggeringTheJob.mapping,
        node.project,
        node.mapping,
        baseBranch
      );
      logger.debug(`baseMappingInfo ${node.project}`, baseMappingInfo);
      if (baseMappingInfo && baseMappingInfo.targetExpression) {
        const expression = baseMappingInfo.targetExpression.replace(
          "process.env.GITHUB_BASE_REF",
          "baseBranch"
        );
        try {
          baseMappingInfo.target = eval(expression);
          logger.debug(
            `Expression ${expression} evaluated`,
            baseMappingInfo.target
          );
        } catch (e) {
          logger.error(
            `Error evaluating expression ${expression} for ${node.project}`,
            e
          );
          throw e;
        }
      }
      return baseMappingInfo ? baseMappingInfo.target : baseBranch;
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
