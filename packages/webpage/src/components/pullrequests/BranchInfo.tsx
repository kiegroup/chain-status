import { LeftOutlined } from "@ant-design/icons";
import { Badge, Button, Tag, Tooltip } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { IPullRequest } from "../../model/pullrequest.model";
import { IRootState } from "../../service";
import * as layoutService from "../../service/layout.service";

interface IBranchInfo {
  pullRequest: IPullRequest;
}

export const BranchInfo: React.FC<
  IBranchInfo
> = props => {
  const data = useSelector((store: IRootState) => store.pullrequestFilter.filteredData);
  const dispatch = useDispatch();
  const openCrossPullRequest = () =>
    dispatch(layoutService.openHeadBranchDrawer(props.pullRequest.head));
  const [crossPRNumber, setCrossPRNumber] = useState<number>(0);

  useEffect(() => {
    if (data.projects && props.pullRequest.head) {
      const length = data.projects.flatMap(project =>
        project.pullRequests.filter(
          pr => pr.head.label === props.pullRequest.head.label
        )
      ).length;
      setCrossPRNumber(length > 1 ? length : 0);
    }
  }, [data, props.pullRequest]);

  return (
    <>
      <Tooltip title="Base branch">
        <Tag>{props.pullRequest.base?.ref}</Tag>
      </Tooltip>
      <LeftOutlined style={{ margin: 0, padding: 0, marginRight: 5 }} />
      <Tooltip title="Head branch. Click to see Cross-PR information.">
        {crossPRNumber ? (
          <Button
            type="link"
            onClick={openCrossPullRequest}
            style={{ margin: 0, padding: 0 }}
          >
            <Badge count={crossPRNumber} color="green">
              <Tag color="green">{props.pullRequest.head?.label}</Tag>
            </Badge>
          </Button>
        ) : (
          <Tag>{props.pullRequest.head?.label}</Tag>
        )}
      </Tooltip>
    </>
  );
};

export default BranchInfo;
