import React from "react";
import { IProject } from "../../model/project.model";
import { getProjectKey } from "../../utils/pullrequest.utils";

interface IProjectLink {
  project: IProject;
}

export const ProjectLink: React.FC<IProjectLink> = props => {
  return (
    <a
      href={`#${getProjectKey(props.project)}`}
      rel="noopener noreferrer"
      onClick={e => {
        e.preventDefault();
        document
          ?.getElementById(`${getProjectKey(props.project)}`)
          ?.scrollIntoView({ behavior: "smooth" });
      }}
    >
      {props.project.name}
    </a>
  );
};

export default ProjectLink;
