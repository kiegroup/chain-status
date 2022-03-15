import { List as AntdList } from "antd";
import React, { Suspense, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { IBuild } from "../../model/build.model";
import { IJob } from "../../model/job.model";
import { IRootState } from "../../service";
import { getJobId } from "../../utils/id.utils";

const ListItem = React.lazy(() => import("./ListItem"));

interface IList {
  builds: IBuild[];
  job: IJob;
}

export const List: React.FC<IList> = props => {
  const [loading, setLoading] = useState<boolean>(true);
  const sectionsShown = useSelector(
    (store: IRootState) => store.layout.sectionsShown
  );
  useEffect(() => {
    if (props.job.name && sectionsShown.includes(getJobId(props.job) ?? "")) {
      setLoading(false);
    }
  }, [props.builds, sectionsShown, sectionsShown.length, props.job]);

  return (
    <Suspense fallback={<AntdList header={<h3>Build List</h3>} loading />}>
      <AntdList
        header={<h3>Build List</h3>}
        className="demo-loadmore-list"
        itemLayout="vertical"
        dataSource={props.builds}
        loading={loading}
        renderItem={build => (
          <ListItem
            key={build.id}
            build={build}
            job={props.job}
            loading={loading}
            hideUserAvatar={false}
          />
        )}
      />
    </Suspense>
  );
};

export default List;
