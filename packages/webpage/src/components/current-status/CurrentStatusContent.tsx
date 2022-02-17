import { Layout } from "antd";
import React, { Suspense } from "react";
import { STATUS_MARGIN_RIGHT, STATUS_MARGIN_TOP } from "../../shared/constants";
import Loading from "../shared/Loading";
import CurrentStatusMenu from "./CurrentStatusMenu";

const CurrentStatusList = React.lazy(() => import("./CurrentStatusList"));
interface ICurrentStatusContent {}
export const CurrentStatusContent: React.FC<ICurrentStatusContent> = props => {
  return (
    <Layout hasSider>
      <Layout.Content style={{ marginRight: STATUS_MARGIN_RIGHT }}>
        <Suspense fallback={<Loading />}>
          <CurrentStatusList />
        </Suspense>
      </Layout.Content>

      <Layout.Sider
        style={{
          overflow: "auto",
          position: "fixed",
          right: 24,
          top: STATUS_MARGIN_TOP,
          bottom: 0
        }}
        theme="light"
      >
        <CurrentStatusMenu />
      </Layout.Sider>
    </Layout>
  );
};

export default CurrentStatusContent;
