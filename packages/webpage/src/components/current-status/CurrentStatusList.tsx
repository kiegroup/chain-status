import { List, Skeleton } from "antd";
import React, { Suspense } from "react";
import { useSelector } from "react-redux";
import { IRootState } from "../../service";
import Loading from "../shared/Loading";
const CurrentStatusListItem = React.lazy(
  () => import("./CurrentStatusListItem")
);
interface ICurrentStatusList {}

export const CurrentStatusList: React.FC<ICurrentStatusList> = props => {
  const data = useSelector((store: IRootState) => store.filter.filteredData);
  const loading = useSelector((store: IRootState) => store.data.loading);

  return loading ? (
    <Skeleton />
  ) : (
    <Suspense fallback={<Loading />}>
      <List
        style={{ minHeight: 700 }}
        dataSource={data.projects}
        renderItem={project => <CurrentStatusListItem project={project} />}
      />
    </Suspense>
  );
};

export default CurrentStatusList;
