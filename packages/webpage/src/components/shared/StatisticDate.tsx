import { Statistic, Tooltip } from "antd";
import React from "react";
import { STATISTICS_STYLE } from "../../shared/constants";

interface IStatisticDate {
  date?: string;
  text: string;
  tooltipTitle?: string;
}
export const StatisticDate: React.FC<IStatisticDate> = props => {
  return props.tooltipTitle ? (
    <Tooltip title={props.tooltipTitle}>
      <Statistic
        title={props.text}
        loading={!props.date}
        valueStyle={STATISTICS_STYLE}
        value={props.date ? props.date.toLocaleString() : undefined}
      />
    </Tooltip>
  ) : (
    <Statistic
      title={props.text}
      loading={!props.date}
      valueStyle={STATISTICS_STYLE}
      value={props.date ? props.date.toLocaleString() : undefined}
    />
  );
};

export default StatisticDate;
