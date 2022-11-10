import { NodeCollapseOutlined } from "@ant-design/icons";
import { Card, List, Typography } from "antd";
import React, { Suspense, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { IProject } from "../../model/project.model";
import { IRootState } from "../../service";
import * as layoutService from "../../service/layout.service";
import { STATUS_MARGIN_TOP } from "../../shared/constants";
import { getProjectId } from "../../utils/id.utils";
import ProjectBranchesDiffsByBranch from "../branches/ProjectBranchesDiffsByBranch";
import PullRequestCheckTag from "../pullrequests/PullRequestCheckTag";
import PullRequestStatistics from "../pullrequests/PullRequestStatistics";
import Loading from "../shared/Loading";
import Container from "./Container";

interface IListItem {
  project: IProject;
}
export const ListItem: React.FC<IListItem> = props => {
  const dispatch = useDispatch();
  const filter = useSelector(
    (store: IRootState) => store.pullrequestFilter.filter
  );

  useEffect(() => {
    if (props.project) {
      dispatch(layoutService.pushItemLoaded(getProjectId(props.project)));
    }
    return () => {
      dispatch(layoutService.popItemLoaded(getProjectId(props.project)));
    };
  }, [dispatch, filter, props.project]);

  return (
    <List.Item
      id={getProjectId(props.project)}
      style={{
        marginTop: 0,
        marginBottom: 8,
        padding: 0,
        scrollMarginTop: STATUS_MARGIN_TOP
      }}
    >
      <Card
        title={
          <Typography.Title level={4}>
            <PullRequestCheckTag
              title="Number of pull requests"
              value={props.project.pullRequests.length}
              color="default"
              icon={<NodeCollapseOutlined />}
              showZero={true}
            />
            {props.project.key}
          </Typography.Title>
        }
        key={props.project.key}
        extra={[
          <ProjectBranchesDiffsByBranch project={props.project}/>,
          <Suspense
            key="affected-branches-statistics"
            fallback={<Loading style={{ fontSize: 16 }} />}
          >
            <PullRequestStatistics pullRequests={props.project.pullRequests} />
          </Suspense>
        ]}
        style={{
          width: "100%",
          marginTop: 0,
          paddingTop: 0,
          marginBottom: 0
        }}
      >
        <Container project={props.project} />
      </Card>
    </List.Item>
  );
};

export default ListItem;
