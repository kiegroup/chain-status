import { Button, Drawer, Skeleton, Space } from "antd";
import React, { Suspense } from "react";
import { IData } from "../../model/data.model";
import { IPullRequestInfo } from "../../model/pullrequestinfo.model";
const CrossPullRequestList = React.lazy(() => import("./CrossPullRequestList"));

interface ICrossPullRequestDrawer {
  visible: boolean;
  onClose: () => void;
  data: IData;
  headBranch?: IPullRequestInfo;
}

export const CrossPullRequestDrawer: React.FC<
  ICrossPullRequestDrawer
> = props => {
  return (
    <Drawer
      title={props.headBranch?.ref}
      placement="right"
      size="large"
      onClose={props.onClose}
      visible={props.visible}
      extra={
        <Space>
          <Button onClick={props.onClose}>Close</Button>
        </Space>
      }
    >
      <Suspense fallback={<Skeleton />}>
        <CrossPullRequestList data={props.data} headBranch={props.headBranch} />
      </Suspense>
    </Drawer>
  );
};

export default CrossPullRequestDrawer;
