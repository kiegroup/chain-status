import { List, Skeleton, Tag } from "antd";
import React, { Suspense } from "react";
import { IProject } from "../../model/project.model";
import { IPullRequest } from "../../model/pullrequest.model";
import { STATUS_MARGIN_TOP } from "../../shared/constants";
import { getPullRequestId } from "../../utils/id.utils";
const PullRequestStatistics = React.lazy(
  () => import("./PullRequestStatistics")
);
const UserComponent = React.lazy(() => import("../shared/User"));
const BranchInfo = React.lazy(
  () => import("./BranchInfo")
);
const Description = React.lazy(
  () => import("./Description")
);

interface IListItem {
  project?: IProject;
  pullRequest: IPullRequest;
  hideUserAvatar?: boolean;
  hideMetadata?: boolean;
  showProject?: boolean;
  loading: boolean;
}

export const ListItem: React.FC<IListItem> = props => {
  return props.pullRequest ? (
    <List.Item
      id={getPullRequestId(props.pullRequest, props.project)}
      style={{ scrollMarginTop: STATUS_MARGIN_TOP - 5 }}
      actions={
        props.loading
          ? [
              <Skeleton.Input
                style={{ width: 100 }}
                active={false}
                size="small"
              />
            ]
          : !props.hideMetadata
          ? [
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
                      <UserComponent
                        user={reviewer}
                        hideAvatar={props.hideUserAvatar}
                      />
                    </Suspense>
                  ))
                : null
            ]
          : []
      }
      extra={
        props.loading ? (
          <Skeleton.Input style={{ width: 250 }} active={false} size="small" />
        ) : !props.hideMetadata ? (
          <Suspense
            fallback={
              <Skeleton.Input
                style={{ width: 250 }}
                active={false}
                size="small"
              />
            }
          >
            <BranchInfo pullRequest={props.pullRequest} />
          </Suspense>
        ) : null
      }
    >
      <List.Item.Meta
        avatar={
          props.loading ? (
            <Skeleton.Avatar size="large" active={false} />
          ) : (
            <Suspense
              fallback={<Skeleton.Avatar size="large" active={false} />}
            >
              <UserComponent
                user={props.pullRequest.user}
                size={36}
                hideAvatar={props.hideUserAvatar}
              />
            </Suspense>
          )
        }
        title={
          <>
            <a
              href={props.pullRequest.html_url}
              rel="noopener noreferrer"
              target="_blank"
              style={{ fontWeight: "bold" }}
            >
              {props.pullRequest.title}
            </a>
            {props.pullRequest.project && props.showProject ? (
              <Tag style={{ marginLeft: 5 }}>
                {props.pullRequest.project.name}
              </Tag>
            ) : null}
          </>
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
            <Description pullRequest={props.pullRequest} />
          </Suspense>
        }
      />
    </List.Item>
  ) : null;
};

export default ListItem;
