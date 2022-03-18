import { Alert, Layout, Skeleton } from "antd";
import React, { Suspense, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { FilterComponent } from "../components/jobs/Filter";
import JobViewContent from "../components/jobs/Content";
import MenuLayout from "../components/layout/MenuLayout";
import { IRootState } from "../service";
import * as jobDataService from "../service/jobs-data.service";
import * as productService from "../service/product.service";
import {
  GENERAL_MARGIN,
  MENU_MARGIN_TOP,
  STATUS_MARGIN_RIGHT,
  STATUS_MARGIN_TOP
} from "../shared/constants";
const JobViewHeader = React.lazy(() => import("../components/jobs/Header"));
interface IJobView {}

export const JobView: React.FC<IJobView> = props => {
  const dispatch = useDispatch();
  let { id } = useParams();
  const selectedProduct = useSelector(
    (store: IRootState) => store.product.selectedProduct
  );
  const jobs = useSelector((store: IRootState) => store.product.data.jobs);
  const errorMessageData = useSelector(
    (store: IRootState) => store.jobsData.errorMessage
  );
  const [errorMessage, setErrorMessage] = useState<string | undefined>(
    undefined
  );

  useEffect(() => {
    if (id && jobs) {
      const job = jobs.find(e => e.id === id);
      if (job) {
        dispatch(productService.selectProduct(job));
      } else {
        setErrorMessage(`${id} does not exist as a project`);
      }
    }
  }, [dispatch, id, jobs]);

  useEffect(() => {
    if (selectedProduct) {
      dispatch(
        jobDataService.loadData(`${selectedProduct?.folder}/latest.json`)
      );
    }
    return () => {
      dispatch(jobDataService.reset());
    };
  }, [dispatch, selectedProduct]);

  useEffect(() => {
    setErrorMessage(errorMessageData);
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
          <Suspense fallback={<Skeleton />}>
            <JobViewHeader />
          </Suspense>
        </Layout.Header>
        <Layout.Content>
          {errorMessage ? (
            <Alert
              message="Error"
              description={errorMessage}
              type="error"
              showIcon
            />
          ) : (
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
                <JobViewContent />
              </Layout.Content>
            </Layout>
          )}
        </Layout.Content>
      </Layout>
    </MenuLayout>
  );
};

export default JobView;
