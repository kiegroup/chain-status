import { List, Skeleton } from "antd";
import React, { Suspense } from "react";
import { ICheck } from "../../model/check.model";
import { IProject } from "../../model/project.model";
import { STATUS_MARGIN_TOP } from "../../shared/constants";
import CheckIconFactory from "../checks/CheckIconFactory";
import CheckSlugIconFactory from "./CheckSlugIconFactory";
const PrettyMiliseconds = React.lazy(
  () => import("../shared/PrettyMiliseconds")
);

interface ICheckElement {
  project?: IProject;
  check: ICheck;
  hideMetadata?: boolean;
  showProject?: boolean;
}
export const CheckElement: React.FC<ICheckElement> = props => {
  return props.check ? (
    <List.Item
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
              <Suspense fallback={<Skeleton.Input style={{ width: 100 }} />}>
                <PrettyMiliseconds date={props.check.started_at} />
              </Suspense>
            </span>
            &nbsp; ago
            {props.check.completed_at ? (
              <>
                <span>&nbsp;and completed&nbsp;</span>
                <span style={{ fontWeight: "bold" }}>
                  <Suspense
                    fallback={<Skeleton.Input style={{ width: 100 }} />}
                  >
                    <PrettyMiliseconds date={props.check.completed_at} />
                  </Suspense>
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
