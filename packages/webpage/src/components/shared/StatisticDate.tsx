import { Statistic } from "antd";
import React from "react";
import { STATISTICS_STYLE } from "../../shared/constants";

interface IStatisticDate {
  date: string | undefined;
  text: string;
}
export const StatisticDate: React.FC<IStatisticDate> = props => {
  return (
    <Statistic
      title={props.text}
      loading={!props.date}
      valueStyle={STATISTICS_STYLE}
      value={props.date ? props.date.toLocaleString() : undefined}
    />
  );
};

export default StatisticDate;
