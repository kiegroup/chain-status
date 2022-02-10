import { UpOutlined } from "@ant-design/icons";
import { BackTop as AntdBackTop, Tooltip } from "antd";
import React from "react";

export interface IBackTop {}

export const BackTop = (props: IBackTop) => {
  return (
    <AntdBackTop
      style={{
        height: "40px",
        width: "40px",
        lineHeight: "30px",
        borderRadius: "20px",
        textAlign: "center",
        fontSize: "16px",
        backgroundColor: "#333333",
        color: "#ffffff"
      }}
    >
      <Tooltip placement="right" title="Back to Top">
        <div className="back-top">
          <UpOutlined />
        </div>
      </Tooltip>
    </AntdBackTop>
  );
};

export default BackTop;
