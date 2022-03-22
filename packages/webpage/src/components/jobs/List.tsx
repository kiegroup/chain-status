import { List as AntdList, Skeleton } from "antd";
import React, { Suspense } from "react";
import { useSelector } from "react-redux";
import { IRootState } from "../../service";
import Loading from "../shared/Loading";
import { getJobId } from "../../utils/id.utils";
const ListItem = React.lazy(() => import("./ListItem"));
interface IList {}

export const List: React.FC<IList> = props => {
  const data = useSelector((store: IRootState) => store.jobFilter.filteredData);
  const loading = useSelector((store: IRootState) => store.jobsData.loading);

  return loading ? (
    <Skeleton />
  ) : (
    <Suspense fallback={<Loading />}>
      <AntdList
        style={{ minHeight: 700 }}
        dataSource={data.jobs}
        renderItem={job => <ListItem key={`list_item_${getJobId(job)}`} job={job} />}
      />
    </Suspense>
  );
};

export default List;
