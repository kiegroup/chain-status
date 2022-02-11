import { Tag, Tooltip } from "antd";
import React from "react";
import { IPullRequest } from "../../model/pullrequest.model";

interface IPullRequestBranchInfo {
  pullRequest: IPullRequest;
}

export const PullRequestBranchInfo: React.FC<
  IPullRequestBranchInfo
> = props => {
  return (
    <>
      <Tooltip title="Base branch">
        <Tag>{props.pullRequest.base?.ref}</Tag>
      </Tooltip>
      {"<-"}
      &nbsp;
      <Tooltip title="Head branch">
        <Tag>{props.pullRequest.head?.label}</Tag>
      </Tooltip>
    </>
  );
};

export default PullRequestBranchInfo;
