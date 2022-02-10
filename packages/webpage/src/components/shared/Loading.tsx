import { LoadingOutlined } from "@ant-design/icons";
import { Spin } from "antd";
import React from "react";

interface ILoading {
  size?: number;
}
export const Loading: React.FC<ILoading> = props => {
  return (
    <Spin
      indicator={
        <LoadingOutlined style={{ fontSize: props.size ?? 24 }} spin />
      }
    />
  );
};

export default Loading;
