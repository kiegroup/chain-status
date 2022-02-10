import { Button, Layout, List, Menu } from "antd";
import React, { Suspense, useEffect, useState } from "react";
import { IData } from "../../model/data.model";
import { IProject } from "../../model/project.model";
import Loading from "../shared/Loading";
const CurrentStatusListItem = React.lazy(
  () => import("./CurrentStatusListItem")
);
const { Content, Sider } = Layout;

interface ICurrentStatusContent {
  data: IData;
}
export const CurrentStatusContent: React.FC<ICurrentStatusContent> = props => {
  const marginTop = 180;
  const [visibleData, setVisibleData] = useState<IProject[]>([]);
  const [filteredData, setFilteredData] = useState<IProject[]>([]);

  useEffect(() => {
    if (props.data?.data) {
      const projects =
        props.data?.data?.length > 0 ? [props.data?.data[0]] : [];
      setVisibleData(projects);
      setFilteredData(projects);
    }
  }, [props.data]);

  const loadMore = () => {
    if (visibleData.length < props.data?.data?.length) {
      for (let project of props.data?.data) {
        if (!visibleData.find(p => p.key === project.key)) {
          setVisibleData([...visibleData, project]);
          filter([...visibleData, project]);
          break;
        }
      }
    }
  };

  const filter = (projects: IProject[], filterValue?: string) => {
    setFilteredData(
      filterValue
        ? projects.filter(project => project.name?.includes(filterValue ?? ""))
        : projects
    );
  };
  const onFilter = (filterElement: any) => {
    filter(props.data.data, filterElement.target.value);
  };

  return (
    <Layout
      style={{
        padding: "0 24px",
        marginTop,
        marginBottom: 24
      }}
    >
      <Content style={{ marginRight: 210 }}>
        <Layout>
          <Content>
            {/* <Card title="Filter" style={{ marginBottom: 10 }}>
              <Filter onFilter={onFilter} />
            </Card> */}
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
          top: marginTop,
          bottom: 0,
          minHeight: 1000
        }}
      >
        <Menu theme="light" mode="inline">
          {props.data.data
            .filter(e => e.name)
            .map(project => (
              <Menu.Item>{project.name}</Menu.Item>
            ))}
        </Menu>
      </Sider>
    </Layout>
  );
};

export default CurrentStatusContent;
