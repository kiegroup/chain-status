import { List } from "antd";
import React, { Suspense } from "react";
import { IPullRequest } from "../../model/pullrequest.model";
const PullRequestElement = React.lazy(() => import("./PullRequestElement"));

interface IPullRequestList {
  pullRequests: IPullRequest[];
}

export const PullRequestList: React.FC<IPullRequestList> = props => {
  return (
    <Suspense fallback={<List header={<h3>Pull Request List</h3>} loading />}>
      <List
        header={<h3>Pull Request List</h3>}
        className="demo-loadmore-list"
        itemLayout="vertical"
        dataSource={props.pullRequests}
        renderItem={pullRequest => (
          <PullRequestElement
            key={pullRequest.number}
            pullRequest={pullRequest}
          />
        )}
      />
    </Suspense>
  );
};

export default PullRequestList;
