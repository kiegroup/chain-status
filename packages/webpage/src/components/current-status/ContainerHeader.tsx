import { LinkOutlined, NodeCollapseOutlined, DiffOutlined, ArrowLeftOutlined } from "@ant-design/icons";
import { Button, Col, PageHeader, Row, Statistic, Tag, Divider } from "antd";
import React, { Suspense, useEffect, useState } from "react";
import { IProject } from "../../model/project.model";
import {
  APP_TIMESTAMP_FORMAT,
  CHECKS,
  STATISTICS_STYLE
} from "../../shared/constants";
import Loading from "../shared/Loading";
import StatisticDate from "../shared/StatisticDate";
import PullRequestStatisticErrorIndex from "../shared/PullRequestStatisticErrorIndex";
import moment from "moment";
import StatisticDuration from "../shared/StatisticDuration";
import { calculateAverage } from "../../utils/math.utils";
import { getDifferenceBetweenTwoDates } from "../../utils/date.utils";
import { IRootState } from "../../service";
import { useSelector } from "react-redux";
import FileDifferenceStatistic from "../shared/FilesDifferenceStatistic";

const PullRequestStatisticErrorIndexByPullRequest = React.lazy(
  () => import("../shared/PullRequestStatisticErrorIndexByPullRequest")
);

interface IContainerHeader {
  project: IProject;
}

export const ContainerHeader: React.FC<IContainerHeader> = props => {
  const baseBranch = useSelector(
    (store: IRootState) => store.branches.baseBranch
  );
  const headBranch = useSelector(
    (store: IRootState) => store.branches.targetBranch
  );
  
  const [averageChecksOK, setAverageChecksOK] = useState<number | undefined>(
    undefined
  );
  
  const [averageChecksNotOK, setAverageChecksNotOK] = useState<
    number | undefined
  >(undefined);

  const [areBranchesSelected, setAreBranchesSelected] = useState<boolean>(false);

  const [numberOfDiffFiles, setNumberOfDiffFiles] = useState<number | undefined>(undefined);

  useEffect(() => {
    if (props.project?.pullRequests?.length > 0) {
      const checks = props.project.pullRequests.flatMap(pr => pr.checks);
      const notSuccessCheckDurations = checks
        .filter(
          check =>
            check.conclusion !== CHECKS.CONCLUSION.SUCCESS &&
            check.started_at &&
            check.completed_at
        )
        .map(check =>
          getDifferenceBetweenTwoDates(check.started_at, check.completed_at)
        )
        .filter(duration => duration > 0);
      const successCheckDurations = checks
        .filter(
          check =>
            check.conclusion === CHECKS.CONCLUSION.SUCCESS &&
            check.started_at &&
            check.completed_at
        )
        .map(check =>
          getDifferenceBetweenTwoDates(check.started_at, check.completed_at)
        )
        .filter(duration => duration > 0);
      setAverageChecksNotOK(calculateAverage(notSuccessCheckDurations));
      setAverageChecksOK(calculateAverage(successCheckDurations));
    }
  }, [props.project]);

  useEffect(() => {
    if (baseBranch && headBranch) {
      setAreBranchesSelected(true)
      const diffs = props.project?.branchesComparison?.[baseBranch]?.[headBranch].length
      setNumberOfDiffFiles(diffs)
    }
  }, [props.project, baseBranch, headBranch]);

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
          <PullRequestStatisticErrorIndex
            title="Error Index"
            pullRequests={props.project.pullRequests}
            placement="right"
            popoverContent={
              props.project.pullRequests?.length ? (
                <Suspense fallback={<Loading />}>
                  <PullRequestStatisticErrorIndexByPullRequest
                    project={props.project}
                  />
                </Suspense>
              ) : null
            }
          />
        </Col>
        <Col>
          <StatisticDuration
            title="Average SUCCESS"
            placement="right"
            value={averageChecksOK}
            popoverContent={
              averageChecksOK === undefined
                ? "There are no SUCCESS checks to calculation average duration"
                : "The average duration for the success checks"
            }
            color="#70cf41"
          />
        </Col>
        <Col>
          <StatisticDuration
            title="Average NO SUCCESS"
            placement="right"
            value={averageChecksNotOK}
            popoverContent={
              averageChecksNotOK === undefined
                ? "There are no ERROR checks to calculation average duration"
                : "The average duration for the Non Success checks"
            }
            color="#ff6b6d"
          />
        </Col>
        <Col>
          <Divider type="vertical" style={{ height: "100%" }} />
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
            <Suspense fallback={<Loading style={{ fontSize: 16 }} />}>
              <StatisticDate
                date={moment(
                  new Date(Date.parse(props.project.updated_at))
                ).format(APP_TIMESTAMP_FORMAT)}
                text="Since Last Updating"
                tooltipTitle="The last time the project was updated"
              />
            </Suspense>
          ) : null}
        </Col>
        {areBranchesSelected ?
          <>
            <Col>
              <Divider type="vertical" style={{ height: "100%" }} />
            </Col>
            <Col>
              <FileDifferenceStatistic
                title="Number of Differences"
                diffs={numberOfDiffFiles} 
                project={props.project}
                baseBranch={baseBranch}
                headBranch={headBranch}
                prefix={
                  <>
                    <Row align="middle">
                      <Tag style={{ marginRight: '4px' }}>{baseBranch}</Tag>
                      <ArrowLeftOutlined style={{ marginTop: 0 }}/>
                      <Tag style={{ marginLeft: '4px' }}>{headBranch}</Tag>
                      <DiffOutlined />
                    </Row>
                  </>
                }
              />
            </Col>
          </>
          : null
        }
      </Row>
    </PageHeader>
  );
};

export default ContainerHeader;
