import { Col, Row } from "antd";
import React from "react";
import { IProject } from "../../model/project.model";
import PullRequestList from "../pullrequests/PullRequestList";
import ProjectHeader from "./ProjectHeader";

interface IProjectContainer {
  project: IProject;
}
export const ProjectContainer: React.FC<IProjectContainer> = props => {
  return (
    <>
      <Row>
        <Col span={24}>
          <ProjectHeader project={props.project} />
        </Col>
      </Row>
      <Row>
        <Col span={24} style={{ padding: 24 }}>
          <PullRequestList
            pullRequests={props.project.pullRequests}
            project={props.project}
          />
        </Col>
      </Row>
    </>
  );
};

export default ProjectContainer;
