import { Avatar, List, Tag, Tooltip } from "antd";
import prettyMilliseconds from "pretty-ms";
import React, { useEffect, useState, Suspense } from "react";
import { IPullRequest } from "../../model/pullrequest.model";
import Loading from "../shared/Loading";
import UserComponent from "../shared/User";
import PullRequestStatistics from "./PullRequestStatistics";

interface IPullRequestElement {
  pullRequest: IPullRequest;
}

export const PullRequestElement: React.FC<IPullRequestElement> = props => {
  const [dateDifferenceMiliseconds, setDateDifferenceMiliseconds] =
    useState<number>(0);

  useEffect(() => {
    if (props.pullRequest?.created_at) {
      setDateDifferenceMiliseconds(
        new Date().getTime() -
          new Date(Date.parse(props.pullRequest.created_at)).getTime()
      );
    }
  }, [props.pullRequest]);

  return props.pullRequest ? (
    <List.Item
      actions={[
        <Suspense fallback={<Loading size={16} />}>
          <PullRequestStatistics pullRequests={[props.pullRequest]} />
        </Suspense>,
        props.pullRequest.requested_reviewers ? (
          <Avatar.Group
            maxCount={5}
            maxStyle={{ color: "#f56a00", backgroundColor: "#fde3cf" }}
          >
            {props.pullRequest.requested_reviewers.map(reviewer => (
              <UserComponent user={reviewer} />
            ))}
          </Avatar.Group>
        ) : null
      ]}
      extra={
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
      }
    >
      <List.Item.Meta
        avatar={<UserComponent user={props.pullRequest.user} size={36} />}
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
          <>
            <a
              href={props.pullRequest.html_url}
              target="_blank"
              rel="noopener noreferrer"
              style={{ fontWeight: "bold" }}
            >
              #{props.pullRequest.number}
            </a>
            &nbsp;opened&nbsp;
            <span style={{ fontWeight: "bold" }}>
              <Tooltip title={props.pullRequest.created_at}>
                {prettyMilliseconds(dateDifferenceMiliseconds)}
              </Tooltip>
            </span>
            &nbsp; ago by&nbsp;
            <a
              href={props.pullRequest.user?.html_url}
              target="_blank"
              rel="noopener noreferrer"
              style={{ fontWeight: "bold" }}
            >
              {props.pullRequest.user?.login}
            </a>
          </>
        }
      />
    </List.Item>
  ) : null;
};

export default PullRequestElement;
