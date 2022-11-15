import {
  InfoCircleOutlined,
  LinkOutlined,
  NodeCollapseOutlined,
  PullRequestOutlined,
  DiffOutlined,
  ArrowLeftOutlined,
  RetweetOutlined
} from "@ant-design/icons";
import {
  Button,
  Card,
  Col,
  Divider,
  Modal,
  PageHeader,
  Popover,
  Row,
  Select,
  Skeleton,
  Statistic,
  Tooltip,
  Typography
} from "antd";
import moment from "moment";
import React, { Suspense, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { IPullRequest } from "../../model/pullrequest.model";
import { IRootState } from "../../service";
import * as dataService from "../../service/data.service";
import { APP_TIMESTAMP_FORMAT, STATISTICS_STYLE } from "../../shared/constants";
import BranchesDiffsByProject from "../branches/BranchesDiffsByProject";
import Loading from "../shared/Loading";
import PullRequestStatisticErrorIndex from "../shared/PullRequestStatisticErrorIndex";
import StatisticDate from "../shared/StatisticDate";
import * as branchesService from "../../service/branches.service";
import { getCrossProjectBranchesDiffs } from "../../utils/branches.utils";

const ReloadButton = React.lazy(() => import("../shared/ReloadButton"));
const ProjectStatusInformation = React.lazy(
  () => import("../shared/ProjectStatusInformation")
);
const StatisticPullRequests = React.lazy(
  () => import("../shared/StatisticPullRequests")
);
const PullRequestStatisticErrorIndexByProject = React.lazy(
  () => import("../shared/PullRequestStatisticErrorIndexByProject")
);

interface IHeader {}
export const Header: React.FC<IHeader> = props => {
  const dispatch = useDispatch();
  const data = useSelector(
    (store: IRootState) => store.pullrequestFilter.filteredData
  );
  const loading = useSelector((store: IRootState) => store.data.loading);
  const [latestLoad, setLatestLoad] = useState<Date>(new Date());
  const [totalPullRequests, setTotalPullRequests] = useState<IPullRequest[]>(
    []
  );

  const selectedProduct = useSelector(
    (store: IRootState) => store.product.selectedProduct
  );

  const loadData = () => {
    if (selectedProduct?.folder) {
      dispatch(dataService.loadData(`${selectedProduct?.folder}/latest.json`));
    }
  };

  // branches comparison
  const [totalBranches, setTotalBranches] = useState<string[]>([]);
  const [totalHeadBranches, setTotalHeadBranches] = useState<string[]>([]);
  const [totalDiffs, setTotalDiffs] = useState<number>(0)

  const baseBranch = useSelector(
    (store: IRootState) => store.branches.baseBranch
  );
  const headBranch = useSelector(
    (store: IRootState) => store.branches.targetBranch
  );
  

  const handleBaseBranchChange = (value: string) => {
    const filteredBranches = totalBranches.filter(b => b !== value);
    dispatch(branchesService.setBaseBranch(value));
    setTotalHeadBranches(filteredBranches);
    handleHeadBranchChange(filteredBranches[0]);
  }

  const handleHeadBranchChange = (value: string) => {
    dispatch(branchesService.setTargetBranch(value));
  }

  const handleSwapBranchesChange = () => {
    if (baseBranch && headBranch) {
      handleBaseBranchChange(headBranch);
      handleHeadBranchChange(baseBranch);
    }
  }

  useEffect(() => {
    if (data?.projects) {
      setLatestLoad(new Date());
      setTotalPullRequests(data.projects.flatMap(p => p.pullRequests));
      setTotalBranches(Array.from(new Set(data.projects.flatMap(p => Object.keys(p.branchesComparison ?? {} )))));
    } else {
      setTotalPullRequests([]);
      setTotalBranches([]);
    }
  }, [data]);

  useEffect(() => {
    if (baseBranch && headBranch) {
      setTotalDiffs(getCrossProjectBranchesDiffs(data?.projects, baseBranch, headBranch))
    }
  }, [data.projects, baseBranch, headBranch])

  const infoModal = () =>
    Modal.info({
      content: (
        <Suspense fallback={<Skeleton />}>
          <ProjectStatusInformation />
        </Suspense>
      ),
      onOk() {},
      width: 1000,
      centered: true
    });
  return (
    <Card style={{ margin: 24, marginTop: 10, marginBottom: 100 }}>
      <PageHeader
        title={
          data.metadata?.title ? (
            <Typography.Title level={2}>
              {data.metadata?.title}
            </Typography.Title>
          ) : (
            <Skeleton.Input style={{ width: 200, height: 55.5 }} />
          )
        }
        subTitle={
          data.metadata?.subtitle ?? <Skeleton.Input style={{ width: 400 }} />
        }
        style={{ padding: 0 }}
        extra={[
          <Suspense fallback={<Skeleton.Input style={{ width: 100 }} />}>
            <ReloadButton reloadAction={loadData} loading={loading} />
          </Suspense>,
          <Tooltip key="info" title="Show project status information">
            <Button
              key="info"
              type="text"
              shape="circle"
              icon={<InfoCircleOutlined />}
              onClick={infoModal}
            />
          </Tooltip>
        ]}
      >
        <Row gutter={16}>
          <Col>
            <Statistic
              title="Generated By"
              value={data.metadata?.createdBy}
              valueStyle={STATISTICS_STYLE}
              suffix={
                data.metadata?.createdUrl ? (
                  <Tooltip title="Visit job generating the report">
                    <Button
                      type="link"
                      href={data.metadata?.createdUrl}
                      target="_blank"
                      icon={<LinkOutlined />}
                      style={{
                        padding: 0,
                        ...STATISTICS_STYLE,
                        fontWeight: "bold"
                      }}
                    />
                  </Tooltip>
                ) : null
              }
            />
          </Col>
          <Col>
            <Popover
              content={
                <Suspense fallback={<Loading />}>
                  <StatisticPullRequests projects={data.projects} size={12} />
                </Suspense>
              }
              placement="bottom"
            >
              <Statistic
                title="Number of Projects"
                prefix={<NodeCollapseOutlined />}
                value={data.projects.length}
                valueStyle={{ ...STATISTICS_STYLE, fontWeight: "bold" }}
              />
            </Popover>
          </Col>
          <Col>
            <Popover
              content={
                <Suspense fallback={<Loading />}>
                  <StatisticPullRequests projects={data.projects} size={12} />
                </Suspense>
              }
              placement="bottom"
            >
              <Statistic
                title="Number of Pull Requests"
                prefix={<PullRequestOutlined />}
                value={totalPullRequests.length}
                valueStyle={STATISTICS_STYLE}
              />
            </Popover>
          </Col>
          <Col>
            <PullRequestStatisticErrorIndex
              title="Error Index"
              pullRequests={totalPullRequests}
              placement="bottom"
              popoverContent={
                <Suspense fallback={<Loading />}>
                  <PullRequestStatisticErrorIndexByProject
                    projects={data.projects}
                  />
                </Suspense>
              }
            />
          </Col>
          <Col>
            <Suspense fallback={<Loading style={{ fontSize: 16 }} />}>
              <StatisticDate
                date={
                  data.metadata?.date
                    ? moment(new Date(Date.parse(data.metadata?.date))).format(
                        APP_TIMESTAMP_FORMAT
                      )
                    : undefined
                }
                text="Creation Date"
              />
            </Suspense>
          </Col>
          <Col>
            <Suspense fallback={<Loading style={{ fontSize: 16 }} />}>
              <StatisticDate
                date={moment(latestLoad).format(APP_TIMESTAMP_FORMAT)}
                text="Latest Load"
              />
            </Suspense>
          </Col>
          { totalBranches ? // enable branches comparison only if there is some data fetched
          <>
            <Col>
              <Divider type="vertical" style={{ height: "100%" }} />
            </Col>
            <Col style={{ paddingBottom: '5px' }}>
              <div className="ant-statistic-title">Branches Comparison</div>
              <Row gutter={16} align="middle" justify="center">
                <Col>  
                  <Button
                    size="small"
                    type="default"
                    onClick={handleSwapBranchesChange}
                    disabled={!baseBranch || !headBranch}
                    icon={<RetweetOutlined />}
                    style={{
                      ...STATISTICS_STYLE
                    }}
                  />
                </Col>
                <Col>
                  <Select
                    className="ant-statistic-content"
                    style={{ width: 120, ...STATISTICS_STYLE }}
                    defaultValue={baseBranch}
                    value={baseBranch}
                    onChange={handleBaseBranchChange}
                    options={totalBranches.map(b => ({label: b, value: b}))}
                  />
                </Col>
                <Col>
                  <ArrowLeftOutlined />
                </Col>
                <Col>
                  <Select
                    className="ant-statistic-content"
                    style={{ width: 120, ...STATISTICS_STYLE}}
                    value={headBranch}
                    onChange={handleHeadBranchChange}
                    options={totalHeadBranches.map(branch => ({label: branch, value: branch}))}
                  />
                </Col>
                <Row className="ant-statistic-content" style={{ marginLeft: '8px', ...STATISTICS_STYLE }}>
                  <Col style={{ marginRight: '8px'}}>
                    <DiffOutlined />
                  </Col>
                  <Col>
                    <Popover
                      content={
                        <Suspense fallback={<Loading />}>
                          <BranchesDiffsByProject projects={data.projects} size={12} />
                        </Suspense>
                      }
                      placement="bottom"
                    >
                      {totalDiffs ?? "-"}
                    </Popover>
                  </Col>
                </Row>
              </Row>
            </Col>
          </>
          : null
          }
        </Row>
      </PageHeader>
    </Card>
  );
};

export default Header;
