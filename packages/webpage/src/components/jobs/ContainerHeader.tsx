import { CloudSyncOutlined, LinkOutlined } from "@ant-design/icons";
import { Button, Col, PageHeader, Row, Statistic, Tooltip } from "antd";
import React from "react";
import { IJob } from "../../model/job.model";
import { STATISTICS_STYLE } from "../../shared/constants";
import BuildStatisticErrorIndex from "../shared/BuildsStatisticErrorIndex";

interface IContainerHeader {
  job: IJob;
}

export const ContainerHeader: React.FC<IContainerHeader> = props => {
  return (
    <PageHeader
      className="site-page-header"
      title={
        <Button
          type="link"
          href={props.job.url}
          target="_blank"
          icon={<LinkOutlined />}
          style={{
            padding: 0,
            ...STATISTICS_STYLE,
            fontWeight: "bold",
            width: 500,
            textAlign: "left"
          }}
        >
          {props.job.name ?? props.job.id}
        </Button>
      }
      subTitle={
        <Tooltip title={props.job.description}>{props.job.description}</Tooltip>
      }
      extra={[]}
    >
      <Row gutter={16}>
        <Col>
          <Statistic
            title="Number of Builds"
            prefix={<CloudSyncOutlined />}
            value={props.job.builds.length}
            valueStyle={STATISTICS_STYLE}
            suffix={
              <Button
                type="link"
                href={props.job.url}
                target="_blank"
                icon={<LinkOutlined />}
                style={{ padding: 0 }}
              />
            }
          />
        </Col>
        <Col>
          <BuildStatisticErrorIndex
            title="Error Index"
            builds={props.job.builds}
            placement="right"
          />
        </Col>
      </Row>
    </PageHeader>
  );
};

export default ContainerHeader;
