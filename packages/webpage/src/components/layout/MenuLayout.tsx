import { ToolOutlined, UnorderedListOutlined } from "@ant-design/icons";
import { Layout, Menu } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { IRootState } from "../../service";
import * as productService from "../../service/product.service";
import Loading from "../shared/Loading";

interface IMenuLayout {
  children: any;
}

interface IMenuElement {
  key: string;
  name: string;
  icon: React.ReactNode;
}
export const MenuLayout: React.FC<IMenuLayout> = props => {
  const dispatch = useDispatch();
  const [menuElements, setMenuElements] = useState<IMenuElement[]>([]);
  const [defaultSelectedKeys, setDefaultSelectedKeys] = useState<string[]>([]);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (dispatch) {
      dispatch(productService.loadData());
    }
  }, [dispatch]);

  const productData = useSelector((store: IRootState) => store.product.data);
  const loading = useSelector((store: IRootState) => store.product.loading);

  useEffect(() => {
    if (productData?.jobs?.length > 0 || productData?.projectStatuses?.length) {
      const jobElements = productData?.jobs
        ? productData.jobs.map(element => ({
            key: `/job/${element.id}`,
            name: element.name ?? "",
            icon: <UnorderedListOutlined />,
            order: element.order
          }))
        : [];
      const projectStatusElements = productData?.projectStatuses
        ? productData.projectStatuses.map(element => ({
            key: `/status/${element.id}`,
            name: element.name ?? "",
            icon: <ToolOutlined />,
            order: element.order
          }))
        : [];
      setMenuElements(
        [...jobElements, ...projectStatusElements].sort(
          (a, b) => a.order - b.order
        )
      );
    }
  }, [productData?.jobs, productData?.projectStatuses]);

  useEffect(() => {
    if (location && menuElements?.length > 0) {
      if (location.pathname === "/") {
        navigate(menuElements[0].key);
        setDefaultSelectedKeys([menuElements[0].key]);
      } else {
        setDefaultSelectedKeys([location.pathname]);
      }
    }
  }, [menuElements, location, navigate]);

  return (
    <Layout className="layout">
      <Layout.Header
        style={{
          position: "fixed",
          zIndex: 100,
          width: "100%",
          margin: 0,
          padding: 0
        }}
      >
        {loading ? (
          <Loading style={{ marginLeft: 24 }} />
        ) : defaultSelectedKeys.length > 0 ? (
          <Menu
            theme="dark"
            mode="horizontal"
            defaultSelectedKeys={defaultSelectedKeys}
            style={{ marginLeft: 24 }}
          >
            {menuElements.map(element => (
              <Menu.Item key={element.key} icon={element.icon}>
                <Link className="nav-text" to={element.key}>
                  {element.name}
                </Link>
              </Menu.Item>
            ))}
          </Menu>
        ) : null}
      </Layout.Header>
      <Layout.Content>{props.children}</Layout.Content>
    </Layout>
  );
};

export default MenuLayout;
