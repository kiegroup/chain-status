import React from "react";
import { IProject } from "../../model/project.model";
import { getProjectId } from "../../utils/id.utils";

interface IProjectLink {
  project: IProject;
}

export const ProjectLink: React.FC<IProjectLink> = props => {
  return (
    <a
      style={{ textOverflow: "ellipsis", display: "block", overflow: "hidden", width: "20vw" }}
      href={`#${getProjectId(props.project)}`}
      rel="noopener noreferrer"
      onClick={e => {
        e.preventDefault();
        document
          ?.getElementById(getProjectId(props.project))
          ?.scrollIntoView({ behavior: "smooth" });
      }}
    >
      {props.project.name}
    </a>
  );
};

export default ProjectLink;
