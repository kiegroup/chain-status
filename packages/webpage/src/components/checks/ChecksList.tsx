import { List } from "antd";
import React, { Suspense, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { ICheck } from "../../model/check.model";
import { IPullRequest } from "../../model/pullrequest.model";
import { IRootState } from "../../service";
const CheckElement = React.lazy(() => import("./CheckElement"));

interface IChecksList {
  pullRequests: IPullRequest[];
  showProject?: boolean;
}

export const ChecksList: React.FC<IChecksList> = props => {
  const [checkList, setCheckList] = useState<ICheck[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const data = useSelector((store: IRootState) => store.data.data);

  useEffect(() => {
    setLoading(true);
    if (data.projects && props.pullRequests?.length) {
      setCheckList(
        props.pullRequests
          .flatMap(pr =>
            pr.checks.map(check => {
              check.pullRequest = pr;
              return check;
            })
          )
          .sort((a: ICheck, b: ICheck) =>
            a?.name && b?.name
              ? a.name.toLocaleLowerCase() < b.name.toLocaleLowerCase()
                ? -1
                : a.name.toLocaleLowerCase() > b.name.toLocaleLowerCase()
                ? 1
                : 0
              : 0
          )
      );
      setLoading(false);
    }
  }, [data, props.pullRequests]);

  return (
    <Suspense fallback={<List loading />}>
      <List
        className="demo-loadmore-list"
        itemLayout="vertical"
        dataSource={checkList}
        loading={loading}
        renderItem={check => (
          <CheckElement
            key={check.id}
            check={check}
            showProject={props.showProject}
          />
        )}
      />
    </Suspense>
  );
};

export default ChecksList;
