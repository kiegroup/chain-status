import { Statistic, Popover, Tooltip } from "antd";
import { InfoCircleOutlined } from "@ant-design/icons";
import { RenderFunction, TooltipPlacement } from "antd/lib/tooltip";
import React, { useEffect, useState } from "react";
import { IPullRequest } from "../../model/pullrequest.model";
import { STATISTICS_STYLE } from "../../shared/constants";
import { calculateErrorIndex } from "../../utils/pullrequest.utils";

interface IStaticErrorIndex {
  title?: string;
  pullRequests: IPullRequest[];
  popoverContent?: React.ReactNode | RenderFunction;
  size?: number;
  placement?: TooltipPlacement;
}
export const StaticErrorIndex: React.FC<IStaticErrorIndex> = props => {
  const [errorIndex, setErrorIndex] = useState<number | undefined>(undefined);

  const fontSizeStyle = props.size
    ? { fontSize: props.size }
    : STATISTICS_STYLE;

  useEffect(() => {
    if (props.pullRequests?.length) {
      setErrorIndex(calculateErrorIndex(props.pullRequests));
    } else {
      setErrorIndex(undefined);
    }
  }, [props.pullRequests]);

  return props.popoverContent ? (
    <Popover content={props.popoverContent} placement={props.placement}>
      <Statistic
        prefix={
          <Tooltip title="This index is calculated by n_failures/n_checks">
            <InfoCircleOutlined style={{ fontSize: 12 }} />
          </Tooltip>
        }
        title={props.title}
        value={errorIndex}
        precision={2}
        valueStyle={{
          ...fontSizeStyle,
          color: errorIndex && errorIndex <= 20 ? "#3f8600" : "#cf1322",
          fontWeight: "bold"
        }}
        suffix="%"
      />
    </Popover>
  ) : (
    <Statistic
      title={props.title}
      value={errorIndex}
      precision={2}
      valueStyle={{
        ...fontSizeStyle,
        color: errorIndex && errorIndex <= 20 ? "#3f8600" : "#cf1322",
        fontWeight: "bold"
      }}
      suffix="%"
    />
  );
};

export default StaticErrorIndex;
