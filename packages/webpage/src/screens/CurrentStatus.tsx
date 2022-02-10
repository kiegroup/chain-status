import { Layout } from "antd";
import React, { useEffect, useState, Suspense } from "react";
// import CurrentStatusContent from "../components/current-status/CurrentStatusContent";
import CurrentStatusHeader from "../components/current-status/CurrentStatusHeader";
import { defaultValue as defaultValueData, IData } from "../model/data.model";
import Loading from "../components/shared/Loading";

const CurrentStatusContent = React.lazy(
  () => import("../components/current-status/CurrentStatusContent")
);
const { Header, Content } = Layout;

interface ICurrentStatus {}
export const CurrentStatus: React.FC<ICurrentStatus> = props => {
  const [data, setData] = useState<IData>(defaultValueData);
  const [activePanels, setActivePanels] = useState<string[]>([]);
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
        setLoading(false);
        setLatestLoad(new Date());
      });
  };

  useEffect(() => {
    getData();
  }, []);

  const toggleCollapse = () => {
    setActivePanels(
      activePanels.length === data.data.length ? [] : data.data.map(e => e.key)
    );
  };

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
        <CurrentStatusHeader
          data={data}
          toggleCollapse={toggleCollapse}
          loading={loading}
          reload={getData}
          latestLoad={latestLoad}
        />
      </Header>
      <Content>
        <Suspense fallback={<Loading />}>
          <CurrentStatusContent data={data} />
        </Suspense>
      </Content>
    </Layout>
  );
};

export default CurrentStatus;
