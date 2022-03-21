import {
  InfoCircleOutlined,
  LinkOutlined,
  NodeCollapseOutlined,
  PullRequestOutlined
} from "@ant-design/icons";
import {
  Button,
  Card,
  Col,
  Modal,
  PageHeader,
  Popover,
  Row,
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
import Loading from "../shared/Loading";
import PullRequestStatisticErrorIndex from "../shared/PullRequestStatisticErrorIndex";
import StatisticDate from "../shared/StatisticDate";

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

  useEffect(() => {
    if (data?.projects) {
      setLatestLoad(new Date());
      setTotalPullRequests(data.projects.flatMap(p => p.pullRequests));
    } else {
      setTotalPullRequests([]);
    }
  }, [data]);

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
    <Card style={{ margin: 24, marginTop: 10 }}>
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
        </Row>
      </PageHeader>
    </Card>
  );
};

export default Header;
