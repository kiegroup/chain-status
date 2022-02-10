import { Button, Layout, List, Menu } from "antd";
import React, { Suspense, useState } from "react";
import { useNavigate } from "react-router-dom";
import { IData } from "../../model/data.model";
import { IProject } from "../../model/project.model";
import { STATUS_MARGIN_TOP } from "../../shared/constants";
import Loading from "../shared/Loading";
const CurrentStatusListItem = React.lazy(
  () => import("./CurrentStatusListItem")
);
const { Content, Sider } = Layout;

interface ICurrentStatusContent {
  data: IData;
}
export const CurrentStatusContent: React.FC<ICurrentStatusContent> = props => {
  const [visibleData, setVisibleData] = useState<IProject[]>([]);

  const loadMore = () => {
    if (visibleData.length < props.data?.data?.length) {
      for (let project of props.data?.data) {
        if (!visibleData.find(p => p.key === project.key)) {
          setVisibleData([...visibleData, project]);
          break;
        }
      }
    }
  };

  return (
    <Layout
      style={{
        padding: "0 24px",
        marginTop: STATUS_MARGIN_TOP,
        marginBottom: 24
      }}
    >
      <Content style={{ marginRight: 210 }}>
        <Layout>
          <Content>
            <Suspense fallback={<Loading />}>
              <List
                dataSource={props.data.data}
                loadMore={
                  <Button
                    disabled={props.data?.data?.length === visibleData.length}
                    onClick={loadMore}
                  >
                    Load More
                  </Button>
                }
                renderItem={project => (
                  <CurrentStatusListItem project={project} />
                )}
              />
            </Suspense>
          </Content>
        </Layout>
      </Content>

      <Sider
        style={{
          overflow: "auto",
          height: "100vh",
          position: "fixed",
          right: 24,
          top: STATUS_MARGIN_TOP,
          bottom: 0,
          minHeight: 1000
        }}
      >
        <Menu theme="light" mode="inline">
          {props.data.data
            .filter(e => e.name)
            .map(project => (
              <Menu.Item>
                <a
                  href={`#${project.key.replace("/", "_")}`}
                  rel="noopener noreferrer"
                >
                  {project.name}
                </a>
              </Menu.Item>
            ))}
        </Menu>
      </Sider>
    </Layout>
  );
};

export default CurrentStatusContent;
