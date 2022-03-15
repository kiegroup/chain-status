import { Col, Row } from "antd";
import React from "react";
import { IProject } from "../../model/project.model";
import { List as PullRequestList } from "../pullrequests/List";
import ContainerHeader from "./ContainerHeader";

interface IContainer {
  project: IProject;
}
export const Container: React.FC<IContainer> = props => {
  return (
    <>
      <Row>
        <Col span={24}>
          <ContainerHeader project={props.project} />
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

export default Container;
