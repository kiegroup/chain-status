import {
  CheckCircleOutlined,
  CloseCircleOutlined,
  MinusCircleOutlined,
  SyncOutlined
} from "@ant-design/icons";
import React from "react";
import { ICheck } from "../../model/check.model";
import { CHECKS } from "../../shared/constants";

interface ICheckIconFactory {
  check?: ICheck;
  conclusion?: string;
  status?: string;
  size?: number;
}

export const CheckIconFactory: React.FC<ICheckIconFactory> = props => {
  const conclusionToSwitch = props.check?.conclusion ?? props.conclusion ?? "";
  const statusToSwitch = props.check?.status ?? props.status ?? "";
  switch (conclusionToSwitch) {
    case CHECKS.CONCLUSION.SUCCESS:
      return (
        <CheckCircleOutlined
          style={{ fontSize: props.size ?? 14, color: "#70cf41" }}
        />
      );
    case CHECKS.CONCLUSION.FAILURE:
      return (
        <CloseCircleOutlined
          style={{ fontSize: props.size ?? 14, color: "#ff6b6d" }}
        />
      );
    case CHECKS.CONCLUSION.CANCELLED:
    case CHECKS.CONCLUSION.SKIPPED:
      return (
        <MinusCircleOutlined
          style={{ fontSize: props.size ?? 14, color: "#faad14" }}
        />
      );
    default:
      switch (statusToSwitch) {
        case CHECKS.STATUS.IN_PROGRESS:
        case CHECKS.STATUS.QUEUED:
          return (
            <SyncOutlined
              style={{ fontSize: props.size ?? 14, color: "#42a5ff" }}
              spin
            />
          );
        default:
          return null;
      }
  }
};

export default CheckIconFactory;
