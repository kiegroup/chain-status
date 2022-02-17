import { Drawer, Skeleton } from "antd";
import React, { Suspense } from "react";
import { useDispatch, useSelector } from "react-redux";
import { IRootState } from "../../service";
import * as layoutService from "../../service/layout.service";
const ChecksList = React.lazy(() => import("./ChecksList"));

interface IChecksDrawer {}

export const ChecksDrawer: React.FC<IChecksDrawer> = props => {
  const dispatch = useDispatch();
  const onClose = () => dispatch(layoutService.closeChecksDrawer());
  const drawer = useSelector((store: IRootState) => store.layout.checksDrawer);

  return (
    <Drawer
      title={`Checks details (${
        drawer.pullRequests.flatMap(pr => pr.checks).length
      })`}
      placement="right"
      size="large"
      onClose={onClose}
      visible={drawer.visible}
    >
      <Suspense fallback={<Skeleton />}>
        <ChecksList pullRequests={drawer.pullRequests} showProject={true} />
      </Suspense>
    </Drawer>
  );
};

export default ChecksDrawer;
