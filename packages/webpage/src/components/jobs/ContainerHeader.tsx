import {
  CloudSyncOutlined,
  LinkOutlined
} from "@ant-design/icons";
import { Button, Col, PageHeader, Row, Statistic, Tooltip } from "antd";
import React, { useEffect, useState } from "react";
import { IJob } from "../../model/job.model";
import { BUILDS, STATISTICS_STYLE } from "../../shared/constants";
import { calculateAverage } from "../../utils/math.utils";
import BuildStatisticErrorIndex from "../shared/BuildsStatisticErrorIndex";
import StatisticDuration from "../shared/StatisticDuration";

interface IContainerHeader {
  job: IJob;
}

export const ContainerHeader: React.FC<IContainerHeader> = props => {
  const [averageBuildsOK, setAverageBuildsOK] = useState<number | undefined>(
    undefined
  );
  const [averageBuildsNotOK, setAverageBuildsNotOK] = useState<
    number | undefined
  >(undefined);

  useEffect(() => {
    if (props.job?.builds?.length > 0) {
      const notSuccessBuildDurations = props.job.builds
        .filter(
          build =>
            ![null, undefined, BUILDS.RESULTS.SUCCESS].includes(build.result)
        )
        .map(build => build.duration)
        .filter(duration => duration > 0);
      const successBuildDurations = props.job.builds
        .filter(
          build =>
            build.result && [BUILDS.RESULTS.SUCCESS].includes(build.result)
        )
        .map(build => build.duration)
        .filter(duration => duration > 0);
      setAverageBuildsNotOK(calculateAverage(notSuccessBuildDurations));
      setAverageBuildsOK(calculateAverage(successBuildDurations));
    }
  }, [props.job]);

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
        <Col>
          <StatisticDuration
            title="Average SUCCESS"
            placement="right"
            value={averageBuildsOK}
            popoverContent={
              averageBuildsOK === undefined
                ? "There are no SUCCESS builds to calculation average duration"
                : "The average duration for the success builds"
            }
            color="#70cf41"
          />
        </Col>
        <Col>
          <StatisticDuration
            title="Average NO SUCCESS"
            placement="right"
            value={averageBuildsNotOK}
            popoverContent={
              averageBuildsNotOK === undefined
                ? "There are no ERROR builds to calculation average duration"
                : "The average duration for the Non Success builds"
            }
            color="#ff6b6d"
          />
        </Col>
      </Row>
    </PageHeader>
  );
};

export default ContainerHeader;
