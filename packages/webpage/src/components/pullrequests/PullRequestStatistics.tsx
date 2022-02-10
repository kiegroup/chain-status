import {
  CheckCircleOutlined,
  CloseCircleOutlined,
  MinusCircleOutlined,
  SyncOutlined
} from "@ant-design/icons";
import React from "react";
import { IPullRequest } from "../../model/pullrequest.model";
import PullRequestCheckTag from "./PullRequestCheckTag";
import { CHECKS } from "../../shared/constants";

interface IPullRequestStatistics {
  pullRequests: IPullRequest[];
}
export const PullRequestStatistics: React.FC<
  IPullRequestStatistics
> = props => (
  <>
    <PullRequestCheckTag
      title="Number of success checks"
      value={
        props.pullRequests
          .flatMap(e => e.checks)
          .filter(e => e.conclusion === CHECKS.CONCLUSION.SUCCESS).length
      }
      color="success"
      icon={<CheckCircleOutlined />}
    />
    <PullRequestCheckTag
      title="Number of failure checks"
      value={
        props.pullRequests
          .flatMap(e => e.checks)
          .filter(e => e.conclusion === CHECKS.CONCLUSION.FAILURE).length
      }
      color="error"
      icon={<CloseCircleOutlined />}
    />
    <PullRequestCheckTag
      title="Number of running checks"
      value={
        props.pullRequests
          .flatMap(e => e.checks)
          .filter(e => e.status === CHECKS.STATUS.IN_PROGRESS).length
      }
      color="processing"
      icon={<SyncOutlined spin />}
    />
    <PullRequestCheckTag
      title="Number of skipped/aborted checks"
      value={
        props.pullRequests
          .flatMap(e => e.checks)
          .filter(e =>
            [CHECKS.CONCLUSION.SKIPPED, CHECKS.CONCLUSION.CANCELLED].includes(
              e.conclusion ?? ""
            )
          ).length
      }
      color="warning"
      icon={<MinusCircleOutlined />}
    />
  </>
);

export default PullRequestStatistics;
