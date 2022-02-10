import { Statistic } from "antd";
import React, { useEffect, useState } from "react";
import { IPullRequest } from "../../model/pullrequest.model";
import { calculateErrorIndex } from "../../utils/pullrequest.utils";

interface IStaticErrorIndex {
  pullRequests: IPullRequest[];
}
export const StaticErrorIndex: React.FC<IStaticErrorIndex> = props => {
  const [errorIndex, setErrorIndex] = useState<number>(0);
  const staticStyle = { fontSize: 20 };

  useEffect(() => {
    if (props.pullRequests?.length) {
      setErrorIndex(calculateErrorIndex(props.pullRequests));
    }
  }, [props.pullRequests]);

  return (
    <Statistic
      title="Error Index"
      value={errorIndex}
      precision={2}
      valueStyle={{
        ...staticStyle,
        color: errorIndex <= 20 ? "#3f8600" : "#cf1322"
      }}
      suffix="%"
    />
  );
};

export default StaticErrorIndex;
