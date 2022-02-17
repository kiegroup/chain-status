import { EyeOutlined } from "@ant-design/icons";
import { Button, Skeleton, Tooltip } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { ICheck } from "../../model/check.model";
import { IPullRequest } from "../../model/pullrequest.model";
import * as layoutService from "../../service/layout.service";
import { CHECKS } from "../../shared/constants";
import CheckIconFactory from "../checks/CheckIconFactory";
import PullRequestCheckTag from "./PullRequestCheckTag";

interface IPullRequestStatistics {
  pullRequests: IPullRequest[];
}
export const PullRequestStatistics: React.FC<
  IPullRequestStatistics
> = props => {
  const dispatch = useDispatch();
  const openChecksDrawer = (pullRequests: IPullRequest[]) =>
    dispatch(layoutService.openChecksDrawer(pullRequests));
  const [successPullRequests, setSuccessPullRequests] = useState<
    IPullRequest[]
  >([]);
  const [failurePullRequests, setFailurePullRequests] = useState<
    IPullRequest[]
  >([]);
  const [runningPullRequests, setRunningPullRequests] = useState<
    IPullRequest[]
  >([]);
  const [skipPullRequests, setSkipPullRequests] = useState<IPullRequest[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const filterPullRequests = (
    pullRequests: IPullRequest[],
    filter: (check: ICheck) => boolean
  ): IPullRequest[] =>
    pullRequests.reduce((acc: IPullRequest[], pr: IPullRequest) => {
      const pullRequest: IPullRequest = { ...pr };
      pullRequest.checks = pr.checks.filter(filter);
      if (pullRequest.checks.length) {
        acc.push(pullRequest);
      }
      return acc;
    }, []);

  useEffect(() => {
    setLoading(true);
    if (props.pullRequests.length) {
      setSuccessPullRequests(
        filterPullRequests(
          props.pullRequests,
          check => check.conclusion === CHECKS.CONCLUSION.SUCCESS
        )
      );
      setFailurePullRequests(
        filterPullRequests(
          props.pullRequests,
          check => check.conclusion === CHECKS.CONCLUSION.FAILURE
        )
      );
      setRunningPullRequests(
        filterPullRequests(
          props.pullRequests,
          check =>
            check.status !== undefined &&
            [CHECKS.STATUS.IN_PROGRESS, CHECKS.STATUS.QUEUED].includes(
              check.status
            )
        )
      );
      setSkipPullRequests(
        filterPullRequests(
          props.pullRequests,
          check =>
            check.conclusion !== undefined &&
            [CHECKS.CONCLUSION.SKIPPED, CHECKS.CONCLUSION.CANCELLED].includes(
              check.conclusion
            )
        )
      );
    }
    setLoading(false);
  }, [props.pullRequests]);

  const CheckButton = (props: {
    pullRequests: IPullRequest[];
    titlePreffix: string;
    children: any;
  }) => (
    <Tooltip
      title={`${props.titlePreffix} Get Check Details (${
        props.pullRequests.flatMap(pr => pr.checks).length
      })`}
    >
      <Button
        type="link"
        style={{ padding: 0, margin: 0 }}
        onClick={() => openChecksDrawer(props.pullRequests)}
      >
        {props.children}
      </Button>
    </Tooltip>
  );

  return loading ? (
    <Skeleton.Input style={{ width: 150 }} />
  ) : (
    <>
      <CheckButton
        pullRequests={successPullRequests}
        titlePreffix="Number of success checks. "
      >
        <PullRequestCheckTag
          value={successPullRequests.flatMap(pr => pr.checks).length}
          color="success"
          icon={<CheckIconFactory conclusion={CHECKS.CONCLUSION.SUCCESS} />}
        />
      </CheckButton>
      <CheckButton
        pullRequests={failurePullRequests}
        titlePreffix="Number of failure checks. "
      >
        <PullRequestCheckTag
          value={failurePullRequests.flatMap(pr => pr.checks).length}
          color="error"
          icon={<CheckIconFactory conclusion={CHECKS.CONCLUSION.FAILURE} />}
        />
      </CheckButton>
      <CheckButton
        pullRequests={runningPullRequests}
        titlePreffix="Number of running/queued checks. "
      >
        <PullRequestCheckTag
          value={runningPullRequests.flatMap(pr => pr.checks).length}
          color="processing"
          icon={<CheckIconFactory status={CHECKS.STATUS.IN_PROGRESS} />}
        />
      </CheckButton>
      <CheckButton
        pullRequests={skipPullRequests}
        titlePreffix="Number of skipped/aborted checks. "
      >
        <PullRequestCheckTag
          value={skipPullRequests.flatMap(pr => pr.checks).length}
          color="warning"
          icon={<CheckIconFactory conclusion={CHECKS.CONCLUSION.CANCELLED} />}
        />
      </CheckButton>

      {props.pullRequests.flatMap(pr => pr.checks).length ? (
        <CheckButton pullRequests={props.pullRequests} titlePreffix="">
          <EyeOutlined />
        </CheckButton>
      ) : null}
    </>
  );
};

export default PullRequestStatistics;
