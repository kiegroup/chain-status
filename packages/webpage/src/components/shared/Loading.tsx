import { LoadingOutlined } from "@ant-design/icons";
import { Spin } from "antd";
import React, { CSSProperties } from "react";

interface ILoading {
  style?: CSSProperties | undefined;
}
export const Loading: React.FC<
  ILoading & React.RefAttributes<HTMLDivElement>
> = props => {
  return (
    <Spin
      indicator={
        <LoadingOutlined style={{ fontSize: 24, ...props.style }} spin />
      }
    />
  );
};

export default Loading;
