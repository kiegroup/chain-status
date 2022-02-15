import { List, Skeleton } from "antd";
import React, { Suspense } from "react";
import { IProject } from "../../model/project.model";
import { IPullRequest } from "../../model/pullrequest.model";
import { STATUS_MARGIN_TOP } from "../../shared/constants";
import { getProjectKey } from "../../utils/pullrequest.utils";
const PullRequestStatistics = React.lazy(
  () => import("./PullRequestStatistics")
);
const UserComponent = React.lazy(() => import("../shared/User"));
const PullRequestBranchInfo = React.lazy(
  () => import("./PullRequestBranchInfo")
);
const PullRequestDescription = React.lazy(
  () => import("./PullRequestDescription")
);

interface IPullRequestElement {
  project?: IProject;
  pullRequest: IPullRequest;
}

export const PullRequestElement: React.FC<IPullRequestElement> = props => {
  return props.pullRequest ? (
    <List.Item
      id={`${props.project ? getProjectKey(props.project) : "project"}_${
        props.pullRequest.number
      }`}
      style={{ scrollMarginTop: STATUS_MARGIN_TOP - 5 }}
      actions={[
        <Suspense
          fallback={
            <Skeleton.Input
              style={{ width: 100 }}
              active={false}
              size="small"
            />
          }
        >
          <PullRequestStatistics pullRequests={[props.pullRequest]} />
        </Suspense>,
        props.pullRequest.requested_reviewers
          ? props.pullRequest.requested_reviewers.map(reviewer => (
              <Suspense
                key={`user-${props.pullRequest.number}-${reviewer.login}`}
                fallback={<Skeleton.Avatar size="small" active={false} />}
              >
                <UserComponent user={reviewer} />
              </Suspense>
            ))
          : null
      ]}
      extra={
        <Suspense
          fallback={
            <Skeleton.Input
              style={{ width: 250 }}
              active={false}
              size="small"
            />
          }
        >
          <PullRequestBranchInfo pullRequest={props.pullRequest} />
        </Suspense>
      }
    >
      <List.Item.Meta
        avatar={
          <Suspense fallback={<Skeleton.Avatar size="large" active={false} />}>
            <UserComponent user={props.pullRequest.user} size={36} />
          </Suspense>
        }
        title={
          <a
            href={props.pullRequest.html_url}
            rel="noopener noreferrer"
            target="_blank"
            style={{ fontWeight: "bold" }}
          >
            {props.pullRequest.title}
          </a>
        }
        description={
          <Suspense
            fallback={
              <Skeleton.Input
                style={{ width: 300 }}
                active={false}
                size="small"
              />
            }
          >
            <PullRequestDescription pullRequest={props.pullRequest} />
          </Suspense>
        }
      />
    </List.Item>
  ) : null;
};

export default PullRequestElement;
