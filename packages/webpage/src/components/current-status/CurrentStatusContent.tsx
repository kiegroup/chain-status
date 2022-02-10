import { NodeCollapseOutlined } from "@ant-design/icons";
import { Button, Card, Layout, List, Menu, Tag, Tooltip } from "antd";
import React, { useEffect, useState } from "react";
import ProjectContainer from "../../components/project/ProjectContainer";
import { IData } from "../../model/data.model";
import { IProject } from "../../model/project.model";
import PullRequestCheckTag from "../pullrequests/PullRequestCheckTag";
import PullRequestStatistics from "../pullrequests/PullRequestStatistics";
import Filter from "../shared/Filter";

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
            <List
              dataSource={filteredData}
              loadMore={
                <Button
                  disabled={props.data?.data?.length === visibleData.length}
                  onClick={loadMore}
                >
                  Load More
                </Button>
              }
              renderItem={project => (
                <List.Item
                  id={project.key}
                  style={{ marginTop: 0, marginBottom: 12, padding: 0 }}
                >
                  <Card
                    title={
                      <>
                        <PullRequestCheckTag
                          title="Number of pull requests"
                          value={project.pullRequests.length}
                          color="default"
                          icon={<NodeCollapseOutlined />}
                          showZero={true}
                        />
                        {project.key}
                      </>
                    }
                    key={project.key}
                    extra={[
                      <Tooltip title="Affected Branches">
                        {Array.from(
                          new Set(project.pullRequests.map(e => e.base?.ref))
                        )
                          .filter(e => e)
                          .sort((a, b) =>
                            a && b ? (a < b ? -1 : a > b ? 1 : 0) : 0
                          )
                          .map(e => (
                            <Tag>{e}</Tag>
                          ))}
                      </Tooltip>,
                      <PullRequestStatistics
                        pullRequests={project.pullRequests}
                      />
                    ]}
                    style={{
                      width: "100%",
                      marginTop: 0,
                      paddingTop: 0,
                      marginBottom: 12
                    }}
                  >
                    <ProjectContainer project={project} />
                  </Card>
                </List.Item>
              )}
            />
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
    // <Layout>
    //   <Content>
    //     <Collapse
    //       defaultActiveKey={
    //         props.data.data.length ? props.data.data[0].key : ""
    //       }
    //     >
    //       {props.data.data
    //         ? props.data.data.map(project => (
    //             <Panel
    //               header={
    //                 <>
    //                   <PullRequestCheckTag
    //                     title="Number of pull requests"
    //                     value={project.pullRequests.length}
    //                     color="default"
    //                     icon={<NodeCollapseOutlined />}
    //                     showZero={true}
    //                   />
    //                   {project.key}
    //                 </>
    //               }
    //               key={project.key}
    //               extra={[
    //                 <Tooltip title="Affected Branches">
    //                   {Array.from(
    //                     new Set(project.pullRequests.map(e => e.base?.ref))
    //                   )
    //                     .filter(e => e)
    //                     .sort((a, b) =>
    //                       a && b ? (a < b ? -1 : a > b ? 1 : 0) : 0
    //                     )
    //                     .map(e => (
    //                       <Tag>{e}</Tag>
    //                     ))}
    //                 </Tooltip>,
    //                 <PullRequestStatistics
    //                   pullRequests={project.pullRequests}
    //                 />
    //               ]}
    //             >
    //               <ProjectContainer project={project} />
    //             </Panel>
    //           ))
    //         : null}
    //     </Collapse>
    //     <Sider>{props.data.data.map(project => project.name)}</Sider>
    //   </Content>
    // </Layout>
  );
};

export default CurrentStatusContent;
