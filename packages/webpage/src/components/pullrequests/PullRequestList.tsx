import { List } from "antd";
import React, { Suspense } from "react";
import { IProject } from "../../model/project.model";
import { IPullRequest } from "../../model/pullrequest.model";
const PullRequestElement = React.lazy(() => import("./PullRequestElement"));

interface IPullRequestList {
  pullRequests: IPullRequest[];
  project: IProject;
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
            project={props.project}
          />
        )}
      />
    </Suspense>
  );
};

export default PullRequestList;
