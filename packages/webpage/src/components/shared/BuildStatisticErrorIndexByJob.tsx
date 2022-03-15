import { Col, Row, Typography } from "antd";
import { TooltipPlacement } from "antd/lib/tooltip";
import React from "react";
import { IJob } from "../../model/job.model";
import BuildStatisticErrorIndex from "./BuildsStatisticErrorIndex";
import JobLink from "./JobLink";

interface IBuildStatisticErrorIndexByJob {
  jobs: IJob[];
  placement?: TooltipPlacement;
}
export const BuildStatisticErrorIndexByJob: React.FC<
  IBuildStatisticErrorIndexByJob
> = props => {
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
            <BuildStatisticErrorIndex
              builds={job.builds}
              size={12}
              placement={props.placement}
            />
          </Col>
        </Row>
      ))}
    </>
  );
};

export default BuildStatisticErrorIndexByJob;
