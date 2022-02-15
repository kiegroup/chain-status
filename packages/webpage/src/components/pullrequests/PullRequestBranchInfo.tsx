import { Button, Tag, Tooltip } from "antd";
import React from "react";
import { IPullRequest } from "../../model/pullrequest.model";
interface IPullRequestBranchInfo {
  pullRequest: IPullRequest;
}

export const PullRequestBranchInfo: React.FC<
  IPullRequestBranchInfo
> = props => {
  const openCrossPullRequest = () => {
    // TODO
  };
  return (
    <>
      <Tooltip title="Base branch">
        <Tag>{props.pullRequest.base?.ref}</Tag>
      </Tooltip>
      {"<-"}
      &nbsp;
      <Tooltip title="Head branch. Click to see Cross-PR information.">
        <Button onClick={openCrossPullRequest}>
          <Tag>{props.pullRequest.head?.label}</Tag>
        </Button>
      </Tooltip>
    </>
  );
};

export default PullRequestBranchInfo;
