import { InfoCircleOutlined } from "@ant-design/icons";
import { Popover, Statistic, Tooltip } from "antd";
import { RenderFunction, TooltipPlacement } from "antd/lib/tooltip";
import React, { useEffect, useState } from "react";
import { IBuild } from "../../model/build.model";
import { COLOURS, STATISTICS_STYLE } from "../../shared/constants";
import { calculateErrorIndex } from "../../utils/job.utils";

interface IBuildStatisticErrorIndex {
  title?: string;
  builds: IBuild[];
  popoverContent?: React.ReactNode | RenderFunction;
  size?: number;
  placement?: TooltipPlacement;
}
export const BuildStatisticErrorIndex: React.FC<
  IBuildStatisticErrorIndex
> = props => {
  const [errorIndex, setErrorIndex] = useState<number | undefined>(undefined);
  const [color, setColor] = useState<string>(COLOURS.GREEN);
  const fontSizeStyle = props.size
    ? { fontSize: props.size }
    : STATISTICS_STYLE;

  useEffect(() => {
    if (props.builds?.length) {
      const value = calculateErrorIndex(props.builds);
      setErrorIndex(value);
      setColor(value <= 20 ? COLOURS.GREEN : COLOURS.RED);
    } else {
      setErrorIndex(undefined);
      setColor(COLOURS.GREEN);
    }
  }, [props.builds]);

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
          color,
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
        color,
        fontWeight: "bold"
      }}
      suffix="%"
    />
  );
};

export default BuildStatisticErrorIndex;
