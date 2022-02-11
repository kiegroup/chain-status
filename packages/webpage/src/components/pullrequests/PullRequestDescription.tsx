import { Tooltip } from "antd";
import prettyMilliseconds from "pretty-ms";
import React, { useEffect, useState } from "react";
import { IPullRequest } from "../../model/pullrequest.model";

interface IPullRequestDescription {
  pullRequest: IPullRequest;
}

export const PullRequestDescription: React.FC<
  IPullRequestDescription
> = props => {
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

  return (
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
  );
};

export default PullRequestDescription;
