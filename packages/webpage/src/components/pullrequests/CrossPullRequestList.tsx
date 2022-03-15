import { List } from "antd";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { IPullRequest } from "../../model/pullrequest.model";
import { IPullRequestInfo } from "../../model/pullrequestinfo.model";
import { IRootState } from "../../service";
const ListItem = React.lazy(() => import("./ListItem"));

interface ICrossPullRequestList {
  headBranch?: IPullRequestInfo;
  hideMetadata?: boolean;
  showProject?: boolean;
}

export const CrossPullRequestList: React.FC<ICrossPullRequestList> = props => {
  const [pullRequestList, setPullRequestList] = useState<IPullRequest[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const data = useSelector((store: IRootState) => store.pullrequestFilter.filteredData);

  useEffect(() => {
    setLoading(true);
    if (data.projects && props.headBranch) {
      setPullRequestList(
        data.projects.flatMap(project =>
          project.pullRequests
            .filter(
              pr => props.headBranch && pr.head.label === props.headBranch.label
            )
            .map(pr => {
              pr.project = project;
              return pr;
            })
        )
      );
      setLoading(false);
    }
  }, [data, props.headBranch]);

  return (
    <List
      className="demo-loadmore-list"
      itemLayout="vertical"
      dataSource={pullRequestList}
      loading={loading}
      renderItem={pullRequest => (
        <ListItem
          key={pullRequest.number}
          pullRequest={pullRequest}
          hideMetadata={props.hideMetadata}
          showProject={props.showProject}
          loading={false}
          hideUserAvatar={false}
        />
      )}
    />
  );
};

export default CrossPullRequestList;
