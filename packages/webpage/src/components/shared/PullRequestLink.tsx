import React from "react";
import { IProject } from "../../model/project.model";
import { IPullRequest } from "../../model/pullrequest.model";
import { getPullRequestId } from "../../utils/id.utils";

interface IPullRequestLink {
  project: IProject;
  pullRequest: IPullRequest;
}

export const PullRequestLink: React.FC<IPullRequestLink> = props => {
  return (
    <a
      href={`#${getPullRequestId(props.pullRequest, props.project)}`}
      rel="noopener noreferrer"
      onClick={e => {
        e.preventDefault();
        document
          ?.getElementById(getPullRequestId(props.pullRequest, props.project))
          ?.scrollIntoView({ behavior: "smooth" });
      }}
    >
      {props.pullRequest.title}pepe
    </a>
  );
};

export default PullRequestLink;
