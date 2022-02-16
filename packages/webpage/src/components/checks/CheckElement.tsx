import { List, Skeleton, Tooltip } from "antd";
import prettyMilliseconds from "pretty-ms";
import React, { Suspense, useEffect, useState } from "react";
import { ICheck } from "../../model/check.model";
import { IProject } from "../../model/project.model";
import { STATUS_MARGIN_TOP } from "../../shared/constants";
import { getProjectKey } from "../../utils/pullrequest.utils";
import CheckIconFactory from "../checks/CheckIconFactory";
import CheckSlugIconFactory from "./CheckSlugIconFactory";

interface ICheckElement {
  project?: IProject;
  check: ICheck;
  hideMetadata?: boolean;
  showProject?: boolean;
}
export const CheckElement: React.FC<ICheckElement> = props => {
  const [startedAtDiffMs, setStartedAtDiffMs] = useState<number>(0);
  const [completedAtDiffMs, setCompletedAtDiffMs] = useState<number>(0);

  useEffect(() => {
    if (props.check?.started_at) {
      setStartedAtDiffMs(
        new Date().getTime() -
          new Date(Date.parse(props.check.started_at)).getTime()
      );
    }
    if (props.check?.completed_at) {
      setCompletedAtDiffMs(
        new Date().getTime() -
          new Date(Date.parse(props.check.completed_at)).getTime()
      );
    }
  }, [props.check]);

  return props.check ? (
    <List.Item
      id={`${props.project ? getProjectKey(props.project) : "project"}_${
        props.check.id
      }`}
      style={{ scrollMarginTop: STATUS_MARGIN_TOP - 5 }}
      extra={
        !props.hideMetadata ? (
          <Suspense
            fallback={
              <Skeleton.Input
                style={{ width: 250 }}
                active={false}
                size="small"
              />
            }
          >
            <CheckIconFactory check={props.check} size={18} />
          </Suspense>
        ) : null
      }
    >
      <List.Item.Meta
        avatar={<CheckSlugIconFactory check={props.check} />}
        title={
          <a
            href={props.check.html_url}
            target="_blank"
            rel="noopener noreferrer"
            style={{ fontWeight: "bold" }}
          >
            {props.check?.pullRequest?.title}
          </a>
        }
        description={
          <>
            <a
              href={props.check.html_url}
              target="_blank"
              rel="noopener noreferrer"
              style={{ fontWeight: "bold" }}
            >
              #{props.check.id}
            </a>
            &nbsp;started&nbsp;
            <span style={{ fontWeight: "bold" }}>
              <Tooltip title={props.check.started_at}>
                {prettyMilliseconds(startedAtDiffMs)}
              </Tooltip>
            </span>
            &nbsp; ago
            {props.check.completed_at ? (
              <>
                <span>&nbsp;and completed&nbsp;</span>
                <span style={{ fontWeight: "bold" }}>
                  <Tooltip title={props.check.started_at}>
                    {prettyMilliseconds(completedAtDiffMs)}
                  </Tooltip>
                </span>
                <span>&nbsp;ago</span>
              </>
            ) : (
              <span>&nbsp;and not completed yet</span>
            )}
          </>
        }
      />
    </List.Item>
  ) : null;
};

export default CheckElement;
