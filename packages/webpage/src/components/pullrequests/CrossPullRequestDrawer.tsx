import { Drawer, Skeleton } from "antd";
import React, { Suspense } from "react";
import { useDispatch, useSelector } from "react-redux";
import { IRootState } from "../../service";
import * as layoutService from "../../service/layout.service";
const CrossPullRequestList = React.lazy(() => import("./CrossPullRequestList"));

interface ICrossPullRequestDrawer {}

export const CrossPullRequestDrawer: React.FC<
  ICrossPullRequestDrawer
> = props => {
  const dispatch = useDispatch();
  const onClose = () => dispatch(layoutService.closeHeadBranchDrawer());
  const drawer = useSelector((store: IRootState) => store.layout.headBranchDrawer);

  return (
    <Drawer
      title={drawer.baseBranch?.label}
      placement="right"
      size="large"
      onClose={onClose}
      visible={drawer.visible}
    >
      <Suspense fallback={<Skeleton />}>
        <CrossPullRequestList
          headBranch={drawer.baseBranch}
          hideMetadata={true}
          showProject={true}
        />
      </Suspense>
    </Drawer>
  );
};

export default CrossPullRequestDrawer;
