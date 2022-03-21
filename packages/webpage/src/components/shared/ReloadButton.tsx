import { ReloadOutlined } from "@ant-design/icons";
import { Badge, Button, message, Tooltip } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { IRootState } from "../../service";
import * as productService from "../../service/product.service";

interface IReloadButton {
  reloadAction: () => void;
  loading: boolean;
}
export const ReloadButton: React.FC<IReloadButton> = props => {
  const dispatch = useDispatch();
  const [newProductVersionAvailable, setNewProductVersionAvailable] =
    useState<boolean>(false);
  const selectedProduct = useSelector(
    (store: IRootState) => store.product.selectedProduct
  );
  const predata = useSelector((store: IRootState) => store.product.predata);
  const data = useSelector((store: IRootState) => store.product.data);

  useEffect(() => {
    if (predata && selectedProduct) {
      const selectedProductFromData = [
        ...data.jobs,
        ...data.projectStatuses
      ].find(project => project.id === selectedProduct.id);
      const selectedProductFromPreData = [
        ...predata.jobs,
        ...predata.projectStatuses
      ].find(project => project.id === selectedProduct.id);
      if (
        selectedProductFromPreData && selectedProductFromData &&
        selectedProductFromData.date !== selectedProductFromPreData.date
      ) {
        setNewProductVersionAvailable(true);
        message.info(
          "A new product information available, click on Reload button whenever you want."
        );
      }
    }
  }, [data, predata, selectedProduct]);

  useEffect(() => {
    if (!newProductVersionAvailable) {
      const interval = setInterval(() => {
        dispatch(productService.preloadData());
      }, 2000);
      return () => {
        clearInterval(interval);
      };
    }
  }, [dispatch, selectedProduct, data, newProductVersionAvailable]);

  const reload = () => {
    dispatch(productService.loadData());
    setNewProductVersionAvailable(false);
    props.reloadAction();
  };

  return (
    <Tooltip
      key="reload"
      title={
        newProductVersionAvailable
          ? "Reload information from service. NEW VERSION AVAILABLE."
          : "Reload information from service"
      }
    >
      <Badge dot={newProductVersionAvailable}>
        <Button
          key="reload-button"
          type="primary"
          icon={<ReloadOutlined />}
          loading={props.loading}
          onClick={reload}
        >
          Reload
        </Button>
      </Badge>
    </Tooltip>
  );
};

export default ReloadButton;
