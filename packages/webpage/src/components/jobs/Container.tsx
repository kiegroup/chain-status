import { Col, Row } from "antd";
import React from "react";
import { IJob } from "../../model/job.model";
import { List as BuildList } from "../build/List";
import ContainerHeader from "./ContainerHeader";

interface IContainer {
  job: IJob;
}
export const Container: React.FC<IContainer> = props => {
  return (
    <>
      <Row>
        <Col span={24}>
          <ContainerHeader job={props.job} />
        </Col>
      </Row>
      <Row>
        <Col span={24} style={{ padding: 24 }}>
          <BuildList builds={props.job.builds} job={props.job} />
        </Col>
      </Row>
    </>
  );
};

export default Container;
