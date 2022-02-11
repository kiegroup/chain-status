import { NodeCollapseOutlined } from "@ant-design/icons";
import { Col, Row, Statistic, Typography } from "antd";
import { TooltipPlacement } from "antd/lib/tooltip";
import React from "react";
import { IProject } from "../../model/project.model";
import { STATISTICS_STYLE } from "../../shared/constants";

interface IStaticPullRequests {
  projects: IProject[];
  size?: number;
  placement?: TooltipPlacement;
}
export const StaticPullRequests: React.FC<IStaticPullRequests> = props => {
  const fontSizeStyle = props.size
    ? { fontSize: props.size }
    : STATISTICS_STYLE;

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
            <Statistic
              prefix={<NodeCollapseOutlined />}
              value={project.pullRequests.length}
              valueStyle={fontSizeStyle}
            />
          </Col>
        </Row>
      ))}
    </>
  );
};

export default StaticPullRequests;
