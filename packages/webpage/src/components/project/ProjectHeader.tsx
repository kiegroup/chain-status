import { LinkOutlined, NodeCollapseOutlined } from "@ant-design/icons";
import { Button, Col, PageHeader, Row, Statistic, Tag } from "antd";
import React, { Suspense } from "react";
import { IProject } from "../../model/project.model";
import Loading from "../shared/Loading";
import StatisticDate from "../shared/StatisticDate";
import StatisticErrorIndex from "../shared/StatisticErrorIndex";

interface IProjectHeader {
  project: IProject;
}

export const ProjectHeader: React.FC<IProjectHeader> = props => {
  const staticStyle = { fontSize: 20 };

  return (
    <PageHeader
      className="site-page-header"
      title={
        <Button
          type="link"
          href={
            props.project.html_url ?? `https://github.com/${props.project.key}`
          }
          target="_blank"
          icon={<LinkOutlined />}
          style={{ padding: 0, fontSize: 20, fontWeight: "bold" }}
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
            valueStyle={staticStyle}
            suffix={
              <Button
                type="link"
                href={`${
                  props.project.html_url ??
                  `https://github.com/${props.project.key}`
                }/pulls`}
                target="_blank"
                icon={<LinkOutlined />}
                style={{ padding: 0 }}
              />
            }
          />
        </Col>
        <Col>
          <StatisticErrorIndex pullRequests={props.project.pullRequests} />
        </Col>
        <Col>
          <Statistic
            title="Language"
            valueStyle={{ ...staticStyle, display: "none" }}
          />
          <Tag style={{ marginTop: 5 }}>{props.project.language}</Tag>
        </Col>
        <Col>
          <Statistic
            title="Default Branch"
            valueStyle={{ ...staticStyle, display: "none" }}
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
