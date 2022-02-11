import { LinkOutlined, NodeCollapseOutlined } from "@ant-design/icons";
import { Button, Col, PageHeader, Row, Statistic, Tag } from "antd";
import React, { Suspense } from "react";
import { IProject } from "../../model/project.model";
import { STATISTICS_STYLE } from "../../shared/constants";
import Loading from "../shared/Loading";
import StatisticDate from "../shared/StatisticDate";
import StatisticErrorIndex from "../shared/StatisticErrorIndex";
const StatisticErrorIndexByPullRequest = React.lazy(
  () => import("../shared/StatisticErrorIndexByPullRequest")
);

interface IProjectHeader {
  project: IProject;
}

export const ProjectHeader: React.FC<IProjectHeader> = props => {
  return (
    <PageHeader
      className="site-page-header"
      title={
        <Button
          type="link"
          href={props.project.html_url}
          target="_blank"
          icon={<LinkOutlined />}
          style={{ padding: 0, ...STATISTICS_STYLE, fontWeight: "bold" }}
        >
          {props.project.name ?? props.project.key}
        </Button>
      }
      subTitle={props.project.description}
      extra={[]}
    >
      <Row gutter={16}>
        <Col>
          <Statistic
            title="Number of Pull Requests"
            prefix={<NodeCollapseOutlined />}
            value={props.project.pullRequests.length}
            valueStyle={STATISTICS_STYLE}
            suffix={
              <Button
                type="link"
                href={props.project.html_url}
                target="_blank"
                icon={<LinkOutlined />}
                style={{ padding: 0 }}
              />
            }
          />
        </Col>
        <Col>
          <StatisticErrorIndex
            title="Error Index"
            pullRequests={props.project.pullRequests}
            placement="right"
            popoverContent={
              <Suspense fallback={<Loading />}>
                <StatisticErrorIndexByPullRequest
                  pullRequests={props.project.pullRequests}
                />
              </Suspense>
            }
          />
        </Col>
        <Col>
          <Statistic
            title="Language"
            valueStyle={{ ...STATISTICS_STYLE, display: "none" }}
          />
          <Tag style={{ marginTop: 5 }}>{props.project.language}</Tag>
        </Col>
        <Col>
          <Statistic
            title="Default Branch"
            valueStyle={{ ...STATISTICS_STYLE, display: "none" }}
          />
          <Tag style={{ marginTop: 5 }}>{props.project.default_branch}</Tag>
        </Col>
        <Col>
          {props.project.updated_at ? (
            <Suspense fallback={<Loading size={16} />}>
              <StatisticDate
                date={new Date(Date.parse(props.project.updated_at))}
                text="Since Last Updating"
                intervalSeconds={1}
              />
            </Suspense>
          ) : null}
        </Col>
      </Row>
    </PageHeader>
  );
};

export default ProjectHeader;
