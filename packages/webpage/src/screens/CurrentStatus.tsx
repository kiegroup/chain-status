import { Layout, Skeleton } from "antd";
import React, { Suspense, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CrossPullRequestDrawer from "../components/pullrequests/CrossPullRequestDrawer";
import Loading from "../components/shared/Loading";
import { IRootState } from "../service";
import * as dataService from "../service/data.service";
import { STATUS_MARGIN_TOP } from "../shared/constants";

const CurrentStatusHeader = React.lazy(
  () => import("../components/current-status/CurrentStatusHeader")
);
const CurrentStatusContent = React.lazy(
  () => import("../components/current-status/CurrentStatusContent")
);
const { Header, Content } = Layout;

interface ICurrentStatus {}
export const CurrentStatus: React.FC<ICurrentStatus> = props => {
  // const [filteredData, setFilteredData] = useState<IData>(defaultValueData);
  const [latestLoad, setLatestLoad] = useState<Date>(new Date());
  const dispatch = useDispatch();
  const data = useSelector((store: IRootState) => store.data.data);
  const loading = useSelector((store: IRootState) => store.data.loading);

  const getData = () => {
    dispatch(dataService.loadData());
  };

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    if (data?.projects) {
      setLatestLoad(new Date());
    }
  }, [data]);

  return (
    <Layout>
      <Header
        style={{
          position: "fixed",
          zIndex: 100,
          width: "100%",
          margin: 0,
          padding: 0,
          backgroundColor: "#f0f2f5"
        }}
      >
        <Suspense fallback={<Skeleton />}>
          <CurrentStatusHeader
            loading={loading}
            reload={getData}
            latestLoad={latestLoad}
          />
        </Suspense>
      </Header>
      <Content>
        <Layout
          style={{
            padding: "0 24px",
            marginTop: STATUS_MARGIN_TOP,
            marginBottom: 24
          }}
        >
          {/* <Header
            style={{
              margin: 0,
              padding: 0,
              marginRight: STATUS_MARGIN_RIGHT,
              marginBottom: GENERAL_MARGIN,
              backgroundColor: "#f0f2f5",
              height: "auto"
            }}
          >
            <Card style={{ margin: 0, padding: 0 }}>
              <Collapse
                defaultActiveKey={["1"]}
                ghost
                style={{ margin: 0, padding: 0 }}
              >
                <Collapse.Panel
                  header={<Typography.Title level={5}>Filter</Typography.Title>}
                  key="1"
                  style={{ margin: 0, padding: 0 }}
                >
                  <Suspense fallback={<Skeleton />}>
                    <Filter onFilter={onFilter} />
                  </Suspense>
                </Collapse.Panel>
              </Collapse>
            </Card>
          </Header> */}
          <Content>
            <Suspense fallback={<Loading />}>
              <CurrentStatusContent />
            </Suspense>

            <CrossPullRequestDrawer />
          </Content>
        </Layout>
      </Content>
    </Layout>
  );
};

export default CurrentStatus;
