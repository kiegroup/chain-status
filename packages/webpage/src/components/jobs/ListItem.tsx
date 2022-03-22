import { CloudSyncOutlined, StopOutlined } from "@ant-design/icons";
import { Card, List, Tooltip, Typography } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { IBuild } from "../../model/build.model";
import { IJob } from "../../model/job.model";
import { IRootState } from "../../service";
import * as layoutService from "../../service/layout.service";
import { STATUS_MARGIN_TOP } from "../../shared/constants";
import { getJobId } from "../../utils/id.utils";
import Container from "./Container";
import PullRequestCheckTag from "../pullrequests/PullRequestCheckTag";
import JobStatusIconFactory from "./JobStatusIconFactory";
import { getColor } from "../../utils/job.utils";
import { getJobName } from "../../utils/job.utils";

interface IListItem {
  job: IJob;
}
export const ListItem: React.FC<IListItem> = props => {
  const dispatch = useDispatch();
  const filter = useSelector((store: IRootState) => store.jobFilter.filter);
  const [latestBuild, setLatestBuild] = useState<IBuild | undefined>(undefined);

  useEffect(() => {
    if (props.job) {
      dispatch(layoutService.pushItemLoaded(getJobId(props.job)));
    }
    return () => {
      dispatch(layoutService.popItemLoaded(getJobId(props.job)));
    };
  }, [dispatch, filter, props.job]);

  useEffect(() => {
    if (props.job?.builds?.length > 0) {
      setLatestBuild(props.job.builds[0]);
    }
  }, [props.job]);

  return (
    <List.Item
      id={getJobId(props.job)}
      style={{
        marginTop: 0,
        marginBottom: 8,
        padding: 0,
        scrollMarginTop: STATUS_MARGIN_TOP - 1
      }}
    >
      <Card
        title={
          <Typography.Title level={4}>
            <PullRequestCheckTag
              title="Number of builds"
              value={props.job.builds.length}
              color="default"
              icon={<CloudSyncOutlined />}
              showZero={true}
            />
            {getJobName(props.job)}
          </Typography.Title>
        }
        key={props.job.id}
        extra={[
          latestBuild ? (
            <JobStatusIconFactory
              key={`job_status_icon_${getJobId(props.job)}`}
              color={getColor(props.job.color)}
              building={latestBuild.building}
              result={latestBuild.result}
              size={24}
            />
          ) : (
            <Tooltip
              key={`job_status_icon_stop_${getJobId(props.job)}`}
              placement="left"
              title="Not built"
            >
              <StopOutlined
                style={{
                  fontSize: 24,
                  color: getColor(props.job.color)
                }}
              />
            </Tooltip>
          )
        ]}
        style={{
          width: "100%",
          marginTop: 0,
          paddingTop: 0,
          marginBottom: 0
        }}
      >
        <Container job={props.job} />
      </Card>
    </List.Item>
  );
};

export default ListItem;
