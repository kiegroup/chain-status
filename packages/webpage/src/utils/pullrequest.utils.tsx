import { IPullRequest } from "../model/pullrequest.model";
import { CHECKS } from "../shared/constants";
export const calculateErrorIndex = (pullrequests: IPullRequest[]) => {
  const checks = pullrequests.flatMap(pr => pr.checks);
  const failureChecks = checks.filter(
    check => check.conclusion === CHECKS.CONCLUSION.FAILURE
  );
  return checks?.length ? (failureChecks.length * 100) / checks.length : 0;
};
