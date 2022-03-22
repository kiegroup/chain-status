import { Layout, Skeleton, Alert } from "antd";
import React, { Suspense, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Content from "../components/current-status/Content";
import MenuLayout from "../components/layout/MenuLayout";
import * as dataService from "../service/data.service";
import * as productService from "../service/product.service";
import * as layoutService from "../service/layout.service";
import {
  GENERAL_MARGIN,
  MENU_MARGIN_TOP,
  STATUS_MARGIN_RIGHT,
  STATUS_MARGIN_TOP
} from "../shared/constants";
import { useParams } from "react-router-dom";
import { IRootState } from "../service";
const Header = React.lazy(() => import("../components/current-status/Header"));
const CrossPullRequestDrawer = React.lazy(
  () => import("../components/pullrequests/CrossPullRequestDrawer")
);
const ChecksDrawer = React.lazy(
  () => import("../components/checks/ChecksDrawer")
);
const FilterComponent = React.lazy(
  () => import("../components/current-status/Filter")
);
interface ICurrentStatus {}

export const CurrentStatus: React.FC<ICurrentStatus> = props => {
  const dispatch = useDispatch();
  let { id } = useParams();
  const selectedProduct = useSelector(
    (store: IRootState) => store.product.selectedProduct
  );
  const projectStatuses = useSelector(
    (store: IRootState) => store.product.data.projectStatuses
  );
  const errorMessageData = useSelector(
    (store: IRootState) => store.data.errorMessage
  );
  const [errorMessage, setErrorMessage] = useState<string | undefined>(
    undefined
  );

  useEffect(() => {
    if (id && projectStatuses) {
      const projectStatus = projectStatuses.find(e => e.id === id);
      if (projectStatus) {
        dispatch(productService.selectProduct(projectStatus));
      } else {
        setErrorMessage(`${id} does not exist as a project`);
      }
    }
  }, [dispatch, id, projectStatuses]);

  useEffect(() => {
    if (selectedProduct) {
      dispatch(dataService.loadData(`${selectedProduct?.folder}/latest.json`));
      dispatch(layoutService.reset());
    }
    return () => {
      dispatch(dataService.reset());
    };
  }, [dispatch, selectedProduct]);

  useEffect(() => {
    if (errorMessageData) {
      setErrorMessage(
        `Error loading product file. Are you sure ${selectedProduct?.folder}/latest.json file is present on github pages branch?`
      );
    }
  }, [errorMessageData]);

  return (
    <MenuLayout>
      <Layout>
        <Layout.Header
          style={{
            position: "fixed",
            zIndex: 100,
            width: "100%",
            margin: 0,
            padding: 0,
            backgroundColor: "#f0f2f5",
            top: MENU_MARGIN_TOP
          }}
        >
          {errorMessage ? (
            <Alert
              message="Error"
              description={errorMessage}
              type="error"
              showIcon
            />
          ) : (
            <Suspense fallback={<Skeleton />}>
              <Header />
            </Suspense>
          )}
        </Layout.Header>
        <Layout.Content>
          {!errorMessage ? (
            <Layout
              style={{
                padding: "0 24px",
                marginTop: STATUS_MARGIN_TOP,
                marginBottom: 10
              }}
            >
              <Layout.Header
                style={{
                  margin: 0,
                  padding: 0,
                  marginRight: STATUS_MARGIN_RIGHT,
                  marginBottom: GENERAL_MARGIN / 2,
                  backgroundColor: "#f0f2f5",
                  height: "auto"
                }}
              >
                <Suspense fallback={<Skeleton />}>
                  <FilterComponent />
                </Suspense>
              </Layout.Header>
              <Layout.Content>
                <Content />
                <Suspense fallback={<></>}>
                  <CrossPullRequestDrawer />
                </Suspense>
                <Suspense fallback={<></>}>
                  <ChecksDrawer />
                </Suspense>
              </Layout.Content>
            </Layout>
          ) : null}
        </Layout.Content>
      </Layout>
    </MenuLayout>
  );
};

export default CurrentStatus;
