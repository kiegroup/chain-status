import { Tag, Tooltip } from "antd";
import React from "react";

interface IPullRequestCheckTag {
  title: string;
  value: number;
  color: string;
  icon?: React.ReactNode;
  showZero?: boolean;
}
export const PullRequestCheckTag: React.FC<IPullRequestCheckTag> = props =>
  props.showZero || props.value > 0 ? (
    <Tooltip placement="top" title={props.title}>
      <Tag color={props.color} icon={props.icon}>
        {props.value}
      </Tag>
    </Tooltip>
  ) : null;

export default PullRequestCheckTag;
