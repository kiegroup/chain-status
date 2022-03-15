import { Layout, Alert } from "antd";
import React from "react";
import { useSelector } from "react-redux";
import MenuLayout from "../components/layout/MenuLayout";
import Loading from "../components/shared/Loading";
import { IRootState } from "../service";
import { MENU_MARGIN_TOP } from "../shared/constants";

interface IEmptyScreen {}

export const EmptyScreen: React.FC<IEmptyScreen> = props => {
  const loading = useSelector((store: IRootState) => store.product.loading);
  const productData = useSelector((store: IRootState) => store.product.data);

  return (
    <MenuLayout>
      <Layout>
        <Layout.Content>
          <Layout
            style={{
              padding: "0 24px",
              marginTop: MENU_MARGIN_TOP + 10,
              marginBottom: 10
            }}
          >
            <Layout.Content>
              {loading ? (
                <Loading />
              ) : productData.jobs?.length > 0 ||
                productData.projectStatuses?.length > 0 ? (
                <></>
              ) : (
                <Alert
                  message="Error"
                  description="No product defined, nothing to load"
                  type="error"
                  showIcon
                />
              )}
            </Layout.Content>
          </Layout>
        </Layout.Content>
      </Layout>
    </MenuLayout>
  );
};

export default EmptyScreen;
