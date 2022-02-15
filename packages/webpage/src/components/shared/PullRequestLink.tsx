import React from "react";
import { IProject } from "../../model/project.model";
import { IPullRequest } from "../../model/pullrequest.model";
import { getProjectKey } from "../../utils/pullrequest.utils";

interface IPullRequestLink {
  project: IProject;
  pullRequest: IPullRequest;
}

export const PullRequestLink: React.FC<IPullRequestLink> = props => {
  return (
    <a
      href={`#${getProjectKey(props.project)}_${props.pullRequest.number}`}
      rel="noopener noreferrer"
      onClick={e => {
        e.preventDefault();
        document
          ?.getElementById(
            `${getProjectKey(props.project)}_${props.pullRequest.number}`
          )
          ?.scrollIntoView({ behavior: "smooth" });
      }}
    >
      {props.pullRequest.title}pepe
    </a>
  );
};

export default PullRequestLink;
