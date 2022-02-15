import { Layout, Skeleton } from "antd";
import React, { Suspense, useEffect, useState } from "react";
import CrossPullRequestDrawer from "../components/pullrequests/CrossPullRequestDrawer";
import Loading from "../components/shared/Loading";
import { defaultValue as defaultValueData, IData } from "../model/data.model";
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
  const [data, setData] = useState<IData>(defaultValueData);
  // const [filteredData, setFilteredData] = useState<IData>(defaultValueData);
  const [loading, setLoading] = useState<boolean>(false);
  const [latestLoad, setLatestLoad] = useState<Date>(new Date());

  const getData = () => {
    setLoading(true);
    fetch("data/latest.json", {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      }
    })
      .then(response => response.json())
      .then(json => {
        setData(json);
        // setFilteredData(json);
        setLoading(false);
        setLatestLoad(new Date());
      });
  };

  useEffect(() => {
    getData();
  }, []);

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
            data={data}
            // data={filteredData}
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
                    <Filter data={data} onFilter={onFilter} />
                  </Suspense>
                </Collapse.Panel>
              </Collapse>
            </Card>
          </Header> */}
          <Content>
            <Suspense fallback={<Loading />}>
              <CurrentStatusContent
                // data={filteredData}
                data={data}
              />
            </Suspense>

            <CrossPullRequestDrawer
              visible={false}
              onClose={() => null}
              data={data}
              headBranch={undefined}
            />
          </Content>
        </Layout>
      </Content>
    </Layout>
  );
};

export default CurrentStatus;
