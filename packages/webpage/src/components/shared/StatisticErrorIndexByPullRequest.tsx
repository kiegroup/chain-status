import { Col, Row, Typography } from "antd";
import { TooltipPlacement } from "antd/lib/tooltip";
import React from "react";
import { IPullRequest } from "../../model/pullrequest.model";
import StatisticErrorIndex from "../shared/StatisticErrorIndex";

interface IStatisticErrorIndexByPullRequest {
  pullRequests: IPullRequest[];
  placement?: TooltipPlacement;
}
export const StatisticErrorIndexByPullRequest: React.FC<
  IStatisticErrorIndexByPullRequest
> = props => {
  return (
    <>
      {props.pullRequests.map(pullRequest => (
        <Row key={pullRequest.number} gutter={[16, 16]}>
          <Col flex="none">
            <Typography.Text ellipsis={true} style={{ fontWeight: "bold" }}>
              {pullRequest.title}
            </Typography.Text>
          </Col>
          <Col flex="auto" style={{ textAlign: "end" }}>
            <StatisticErrorIndex
              pullRequests={[pullRequest]}
              size={12}
              placement={props.placement}
            />
          </Col>
        </Row>
      ))}
    </>
  );
};

export default StatisticErrorIndexByPullRequest;
