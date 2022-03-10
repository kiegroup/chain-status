import { NodeCollapseOutlined } from "@ant-design/icons";
import { Card, List, Tag, Tooltip, Typography } from "antd";
import React, { Suspense, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ProjectContainer from "../../components/project/ProjectContainer";
import { IProject } from "../../model/project.model";
import { STATUS_MARGIN_TOP } from "../../shared/constants";
import { alphabeticallySort } from "../../utils/common.utils";
import { getProjectId } from "../../utils/id.utils";
import PullRequestCheckTag from "../pullrequests/PullRequestCheckTag";
import PullRequestStatistics from "../pullrequests/PullRequestStatistics";
import Loading from "../shared/Loading";
import * as layoutService from "../../service/layout.service";
import { IRootState } from "../../service";

interface ICurrentStatusListItem {
  project: IProject;
}
export const CurrentStatusListItem: React.FC<
  ICurrentStatusListItem
> = props => {
  const dispatch = useDispatch();
  const showZeroPullRequests = useSelector(
    (store: IRootState) => store.filter.filter.showZeroPullRequests
  );
  const [showItem, setShowItem] = useState<boolean>(true);

  useEffect(() => {
    dispatch(layoutService.projectsLoaded());

    return () => {
      dispatch(layoutService.reset());
    };
  }, [dispatch]);

  useEffect(() => {
    if (props.project.pullRequests) {
      setShowItem(
        showZeroPullRequests || props.project.pullRequests.length > 0
      );
    }
  }, [showZeroPullRequests, props.project.pullRequests]);

  return showItem ? (
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
          <Tooltip key="affected-branches-tooltip" title="Affected Branches">
            {Array.from(
              new Set(props.project.pullRequests.map(e => e.base?.ref))
            )
              .filter(e => e)
              .sort(alphabeticallySort)
              .map(e => (
                <Tag key={e}>{e}</Tag>
              ))}
          </Tooltip>,
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
        <ProjectContainer project={props.project} />
      </Card>
    </List.Item>
  ) : null;
};

export default CurrentStatusListItem;
