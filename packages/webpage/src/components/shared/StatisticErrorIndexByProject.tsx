import { Col, Row, Typography } from "antd";
import { TooltipPlacement } from "antd/lib/tooltip";
import React from "react";
import { IProject } from "../../model/project.model";
import StatisticErrorIndex from "../shared/StatisticErrorIndex";

interface IStatisticErrorIndexByProject {
  projects: IProject[];
  placement?: TooltipPlacement;
}
export const StatisticErrorIndexByProject: React.FC<
  IStatisticErrorIndexByProject
> = props => {
  return (
    <>
      {props.projects.map(project => (
        <Row key={project.key} gutter={[16, 16]}>
          <Col flex="none">
            <Typography.Text ellipsis={true} style={{ fontWeight: "bold" }}>
              {project.name}
            </Typography.Text>
          </Col>
          <Col flex="auto" style={{ textAlign: "end" }}>
            <StatisticErrorIndex
              pullRequests={project.pullRequests}
              size={12}
              placement={props.placement}
            />
          </Col>
        </Row>
      ))}
    </>
  );
};

export default StatisticErrorIndexByProject;
