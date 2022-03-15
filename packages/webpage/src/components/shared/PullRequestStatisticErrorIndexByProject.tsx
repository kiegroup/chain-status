import { Col, Row, Typography } from "antd";
import { TooltipPlacement } from "antd/lib/tooltip";
import React from "react";
import { IProject } from "../../model/project.model";
import PullRequestStatisticErrorIndex from "../shared/PullRequestStatisticErrorIndex";
import ProjectLink from "./ProjectLink";

interface IPullRequestStatisticErrorIndexByProject {
  projects: IProject[];
  placement?: TooltipPlacement;
}
export const PullRequestStatisticErrorIndexByProject: React.FC<
  IPullRequestStatisticErrorIndexByProject
> = props => {
  return (
    <>
      {props.projects.map(project => (
        <Row key={project.key} gutter={[16, 16]}>
          <Col flex="none">
            <Typography.Text ellipsis={true} style={{ fontWeight: "bold" }}>
              <ProjectLink project={project} />
            </Typography.Text>
          </Col>
          <Col flex="auto" style={{ textAlign: "end" }}>
            <PullRequestStatisticErrorIndex
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

export default PullRequestStatisticErrorIndexByProject;
