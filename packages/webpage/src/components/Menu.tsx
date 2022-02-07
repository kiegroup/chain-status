import { BarChartOutlined, InfoCircleOutlined } from "@ant-design/icons";
import { Menu } from "antd";
import React, { useState } from "react";
import { Link } from "react-router-dom";

function MenuComponent() {
  const [state, setState] = useState({ current: "status" });
  const handleClick = (e: any) => setState({ current: e.key });

  return (
    <Menu
      onClick={handleClick}
      selectedKeys={[state.current]}
      mode="horizontal"
    >
      <Menu.Item key="status" icon={<InfoCircleOutlined />}>
        <Link to="/" className="nav-text">
          Current Status
        </Link>
      </Menu.Item>
      <Menu.Item key="history" icon={<BarChartOutlined />}>
        <Link to="/history" className="nav-text">
          History
        </Link>
      </Menu.Item>
    </Menu>
  );
}

export default MenuComponent;
