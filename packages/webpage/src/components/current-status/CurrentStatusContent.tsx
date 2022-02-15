import { Layout, List, Skeleton } from "antd";
import React, { Suspense } from "react";
import { useSelector } from "react-redux";
import { IRootState } from "../../service";
import { STATUS_MARGIN_RIGHT, STATUS_MARGIN_TOP } from "../../shared/constants";
import Loading from "../shared/Loading";
const CurrentStatusListItem = React.lazy(
  () => import("./CurrentStatusListItem")
);
const CurrentStatusMenu = React.lazy(() => import("./CurrentStatusMenu"));
const { Content, Sider } = Layout;

interface ICurrentStatusContent {}
export const CurrentStatusContent: React.FC<ICurrentStatusContent> = props => {
  const data = useSelector((store: IRootState) => store.data.data);

  return (
    <Layout hasSider>
      <Content style={{ marginRight: STATUS_MARGIN_RIGHT }}>
        <Suspense fallback={<Loading />}>
          <List
            dataSource={data.projects}
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
          <CurrentStatusMenu />
        </Suspense>
      </Sider>
    </Layout>
  );
};

export default CurrentStatusContent;
