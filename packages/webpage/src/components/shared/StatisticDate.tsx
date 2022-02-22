import { Statistic } from "antd";
import React from "react";
import { STATISTICS_STYLE } from "../../shared/constants";

interface IStatisticDate {
  date: Date;
  text: string;
}
export const StatisticDate: React.FC<IStatisticDate> = props => {
  return (
    <>
      <Statistic
        title={props.text}
        loading={!props.date}
        valueStyle={STATISTICS_STYLE}
        value={props.date.toLocaleString()}
      />
    </>
  );
};

export default StatisticDate;
