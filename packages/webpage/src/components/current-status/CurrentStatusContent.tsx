import { Layout, List, Skeleton } from "antd";
import React, { Suspense } from "react";
import { IData } from "../../model/data.model";
import { STATUS_MARGIN_RIGHT, STATUS_MARGIN_TOP } from "../../shared/constants";
import Loading from "../shared/Loading";
const CurrentStatusListItem = React.lazy(
  () => import("./CurrentStatusListItem")
);
const CurrentStatusMenu = React.lazy(() => import("./CurrentStatusMenu"));
const { Content, Sider } = Layout;

interface ICurrentStatusContent {
  data: IData;
}
export const CurrentStatusContent: React.FC<ICurrentStatusContent> = props => {
  return (
    <Layout hasSider>
      <Content style={{ marginRight: STATUS_MARGIN_RIGHT }}>
        <Suspense fallback={<Loading />}>
          <List
            dataSource={props.data.data}
            renderItem={project => <CurrentStatusListItem project={project} />}
          />
        </Suspense>
      </Content>

      <Sider
        style={{
          overflow: "auto",
          position: "fixed",
          right: 24,
          top: STATUS_MARGIN_TOP,
          bottom: 0
        }}
        theme="light"
      >
        <Suspense
          fallback={<Skeleton.Input size="small" style={{ width: 150 }} />}
        >
          <CurrentStatusMenu data={props.data} />
        </Suspense>
      </Sider>
    </Layout>
  );
};

export default CurrentStatusContent;
