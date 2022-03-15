import { Skeleton } from "antd";
import React, { Suspense } from "react";
import { IPullRequest } from "../../model/pullrequest.model";
const PrettyMiliseconds = React.lazy(
  () => import("../shared/PrettyMiliseconds")
);

interface IDescription {
  pullRequest: IPullRequest;
}

export const Description: React.FC<
  IDescription
> = props => {
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
        <Suspense fallback={<Skeleton.Input style={{ width: 100 }} />}>
          <PrettyMiliseconds date={props.pullRequest.created_at} />
        </Suspense>
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

export default Description;
