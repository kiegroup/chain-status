import { Layout } from "antd";
import React, { Suspense } from "react";
import { STATUS_MARGIN_RIGHT, STATUS_MARGIN_TOP } from "../../shared/constants";
import Loading from "../shared/Loading";
import Menu from "./Menu";

const List = React.lazy(() => import("./List"));
interface IContent {
}
export const Content: React.FC<IContent> = props => {
  return (
    <Layout hasSider>
      <Layout.Content style={{ marginRight: STATUS_MARGIN_RIGHT }}>
        <Suspense fallback={<Loading />}>
          <List />
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
        <Menu />
      </Layout.Sider>
    </Layout>
  );
};

export default Content;
