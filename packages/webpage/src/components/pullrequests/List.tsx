import { List as AntdList } from "antd";
import React, { Suspense, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { IProject } from "../../model/project.model";
import { IPullRequest } from "../../model/pullrequest.model";
import { IRootState } from "../../service";
import { getProjectId } from "../../utils/id.utils";

const ListItem = React.lazy(() => import("./ListItem"));

interface IList {
  pullRequests: IPullRequest[];
  project: IProject;
}

export const List: React.FC<IList> = props => {
  const [loading, setLoading] = useState<boolean>(true);
  const sectionsShown = useSelector(
    (store: IRootState) => store.layout.sectionsShown
  );
  useEffect(() => {
    if (props.project.name) {
      if (sectionsShown.includes(getProjectId(props.project))) {
        setLoading(false);
      }
    }
  }, [props.pullRequests, sectionsShown, sectionsShown.length, props.project]);

  return (
    <Suspense fallback={<AntdList header={<h3>Pull Request List</h3>} loading />}>
      <AntdList
        header={<h3>Pull Request List</h3>}
        className="demo-loadmore-list"
        itemLayout="vertical"
        dataSource={props.pullRequests}
        // loading={loading}
        renderItem={pullRequest => (
          <ListItem
            key={pullRequest.number}
            pullRequest={pullRequest}
            project={props.project}
            loading={loading}
            hideUserAvatar={false}
          />
        )}
      />
    </Suspense>
  );
};

export default List;
