import {
  List
} from "antd";
import React from "react";
import { IPullRequest } from "../../model/pullrequest.model";
import PullRequestElement from "./PullRequestElement";

interface IPullRequestList {
  pullRequests: IPullRequest[];
}

export const PullRequestList: React.FC<IPullRequestList> = props => {
  return (
    <List
      header={<div>Pull Request List</div>}
      className="demo-loadmore-list"
      loading={props.pullRequests?.length === 0}
      itemLayout="vertical"
      dataSource={props.pullRequests}
      renderItem={pullRequest => (
        <PullRequestElement
          key={pullRequest.number}
          pullRequest={pullRequest}
        />
      )}
    />
  );
};

export default PullRequestList;
