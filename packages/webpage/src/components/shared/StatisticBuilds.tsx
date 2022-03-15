import { RocketOutlined } from "@ant-design/icons";
import { Col, Row, Statistic, Typography } from "antd";
import { TooltipPlacement } from "antd/lib/tooltip";
import React from "react";
import { IJob } from "../../model/job.model";
import { STATISTICS_STYLE } from "../../shared/constants";
import JobLink from "./JobLink";

interface IStaticJobs {
  jobs: IJob[];
  size?: number;
  placement?: TooltipPlacement;
}
export const StaticJobs: React.FC<IStaticJobs> = props => {
  const fontSizeStyle = props.size
    ? { fontSize: props.size }
    : STATISTICS_STYLE;

  return (
    <>
      {props.jobs.map(job => (
        <Row key={job.id} gutter={[16, 16]}>
          <Col flex="none">
            <Typography.Text ellipsis={true} style={{ fontWeight: "bold" }}>
              <JobLink job={job} />
            </Typography.Text>
          </Col>
          <Col flex="auto" style={{ textAlign: "end" }}>
            <Statistic
              prefix={<RocketOutlined />}
              value={job.builds.length}
              valueStyle={fontSizeStyle}
            />
          </Col>
        </Row>
      ))}
    </>
  );
};

export default StaticJobs;
