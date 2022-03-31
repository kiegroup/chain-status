import { ClockCircleOutlined } from "@ant-design/icons";
import { Popover, Statistic } from "antd";
import { TooltipPlacement } from "antd/lib/tooltip";
import prettyMilliseconds from "pretty-ms";
import React, { useEffect, useState } from "react";
import { STATISTICS_STYLE } from "../../shared/constants";

interface IStaticDuration {
  title: string;
  popoverContent: string;
  size?: number;
  value?: number;
  placement?: TooltipPlacement;
  color?: string;
}
export const StaticDuration: React.FC<IStaticDuration> = props => {
  const [durationMs, setDurationMs] = useState<string | undefined>(undefined);

  useEffect(() => {
    if (props.value) {
      setDurationMs(prettyMilliseconds(props.value));
    }
  }, [props.value]);

  const fontSizeStyle = props.size
    ? { fontSize: props.size }
    : STATISTICS_STYLE;

  return (
    <Popover content={props.popoverContent} placement={props.placement}>
      <Statistic
        title={props.title}
        prefix={
          props.value === undefined ? null : (
            <ClockCircleOutlined
              style={{
                color: props.color ? props.color : "black"
              }}
            />
          )
        }
        value={props.value === undefined ? "No info" : durationMs}
        valueStyle={fontSizeStyle}
      />
    </Popover>
  );
};

export default StaticDuration;
