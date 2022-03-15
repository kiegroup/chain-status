import {
  CheckCircleOutlined,
  CloseCircleOutlined,
  QuestionCircleOutlined,
  SyncOutlined,
  MinusCircleOutlined
} from "@ant-design/icons";
import { Tooltip } from "antd";
import React from "react";
import { BUILDS } from "../../shared/constants";

interface IJobStatusIconFactory {
  result?: string;
  building?: boolean;
  color?: string;
  size?: number;
}

export const JobStatusIconFactory: React.FC<IJobStatusIconFactory> = props => {
  const resultToSwitch = props.result ?? "";
  if (props.building) {
    return (
      <Tooltip placement="left" title={`Job is actually running`}>
        <SyncOutlined
          style={{
            fontSize: props.size ?? 14,
            color: props.color ?? "#70cf41"
          }}
          spin
        />
      </Tooltip>
    );
  } else {
    switch (resultToSwitch) {
      case BUILDS.RESULTS.SUCCESS:
        return (
          <Tooltip placement="left" title="Job is success">
            <CheckCircleOutlined
              style={{
                fontSize: props.size ?? 14,
                color: "#70cf41"
              }}
            />
          </Tooltip>
        );
      case BUILDS.RESULTS.FAILURE:
        return (
          <Tooltip placement="left" title="Job is failure">
            <CloseCircleOutlined
              style={{
                fontSize: props.size ?? 14,
                color: "#ff6b6d"
              }}
            />
          </Tooltip>
        );
      case BUILDS.RESULTS.UNSTABLE:
        return (
          <Tooltip placement="left" title="Job is unstable">
            <QuestionCircleOutlined
              style={{
                fontSize: props.size ?? 14,
                color: "#faad14"
              }}
            />
          </Tooltip>
        );
      default:
        return (
          <Tooltip placement="left" title="Job is aborted">
            <MinusCircleOutlined
              style={{
                fontSize: props.size ?? 14,
                color: props.color ?? "#faad14"
              }}
            />
          </Tooltip>
        );
    }
  }
};

export default JobStatusIconFactory;
