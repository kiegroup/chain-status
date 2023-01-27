import React from "react";
import { IProject } from "../../model/project.model";
import { Tooltip } from "antd";
import { getProjectId } from "../../utils/id.utils";

interface IProjectLink {
  project: IProject;
}

export const ProjectLink: React.FC<IProjectLink> = props => {
  return (
    <Tooltip 
      mouseEnterDelay={ 1 }
      title={ props.project.name }>
      <a
        style={{ display: "block", width: "10vw" }}
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
    </Tooltip>
  );
};

export default ProjectLink;
