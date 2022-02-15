import { List } from "antd";
import React, { useEffect, useState } from "react";
import { IData } from "../../model/data.model";
import { IPullRequest } from "../../model/pullrequest.model";
import { IPullRequestInfo } from "../../model/pullrequestinfo.model";
const PullRequestElement = React.lazy(() => import("./PullRequestElement"));

interface ICrossPullRequestList {
  data: IData;
  headBranch?: IPullRequestInfo;
}

export const CrossPullRequestList: React.FC<ICrossPullRequestList> = props => {
  const [pullRequestList, setPullRequestList] = useState<IPullRequest[]>([]);

  useEffect(() => {
    if (props.data?.data && props.headBranch) {
      setPullRequestList(
        props.data?.data.flatMap(project =>
          project.pullRequests.filter(
            pullRquest =>
              props.headBranch && pullRquest.head.ref === props.headBranch.ref
          )
        )
      );
    }
  }, [props.data, props.headBranch]);

  return (
    <List
      header={<h3>Pull Request List</h3>}
      className="demo-loadmore-list"
      itemLayout="vertical"
      dataSource={pullRequestList}
      renderItem={pullRequest => (
        <PullRequestElement
          key={pullRequest.number}
          pullRequest={pullRequest}
        />
      )}
    />
  );
};

export default CrossPullRequestList;
