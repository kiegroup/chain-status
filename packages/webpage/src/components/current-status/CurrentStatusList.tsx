import { List, Skeleton } from "antd";
import React from "react";
import { useSelector } from "react-redux";
import { IRootState } from "../../service";

const CurrentStatusListItem = React.lazy(
  () => import("./CurrentStatusListItem")
);
interface ICurrentStatusList {}

export const CurrentStatusList: React.FC<ICurrentStatusList> = props => {
  const data = useSelector((store: IRootState) => store.data.data);
  const loading = useSelector((store: IRootState) => store.data.loading);

  return loading ? (
    <Skeleton />
  ) : (
    <List
      dataSource={data.projects}
      renderItem={project => <CurrentStatusListItem project={project} />}
    />
  );
};

export default CurrentStatusList;
