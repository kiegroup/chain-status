import { Col, Row } from "antd";
import { TooltipPlacement } from "antd/lib/tooltip";
import React from "react";
import { IProject } from "../../model/project.model";
import StatisticErrorIndex from "../shared/StatisticErrorIndex";
import PullRequestLink from "./PullRequestLink";

interface IStatisticErrorIndexByPullRequest {
  project: IProject;
  placement?: TooltipPlacement;
}
export const StatisticErrorIndexByPullRequest: React.FC<
  IStatisticErrorIndexByPullRequest
> = props => {
  return (
    <>
      {props.project.pullRequests.map(pullRequest => (
        <Row key={pullRequest.number} gutter={[16, 16]}>
          <Col flex="none">
            <PullRequestLink
              project={props.project}
              pullRequest={pullRequest}
            />
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
