import Icon, { GithubOutlined, QuestionOutlined } from "@ant-design/icons";
import { Tooltip, Avatar } from "antd";
import React from "react";
import { ICheck } from "../../model/check.model";
import { CHECKS } from "../../shared/constants";

interface ICheckSlugIconFactory {
  check?: ICheck;
  slug?: string;
  size?: number;
}

export const CheckSlugIconFactory: React.FC<ICheckSlugIconFactory> = props => {
  const slugToSwitch = props.check?.slug ?? props.slug ?? "";
  const defaultSize = 24;
  switch (slugToSwitch) {
    case CHECKS.SLUGS.GITHUB:
      return (
        <Tooltip title="Github Actions">
          <GithubOutlined style={{ fontSize: props.size ?? defaultSize }} />
        </Tooltip>
      );
    case CHECKS.SLUGS.SONAR:
      return (
        <Tooltip title="Sonar Cloud">
          <Icon
            component={() => (
              <img
                alt="sonar cloud icon"
                src={`${process.env.PUBLIC_URL}/resources/icon/sonarcloud.svg`}
                width={props.size ?? defaultSize}
              />
            )}
          />
        </Tooltip>
      );
    case CHECKS.SLUGS.JENKINS:
      return (
        <Tooltip title="Jenkins">
          <Icon
            component={() => (
              <img
                alt="jenkins icon"
                src={`${process.env.PUBLIC_URL}/resources/icon/jenkins.svg`}
                width={props.size ?? defaultSize}
              />
            )}
          />
        </Tooltip>
      );
    default:
      return props.check?.avatar_url ? (
        <Avatar
          size={props.size ?? defaultSize}
          src={props.check?.avatar_url}
        />
      ) : (
        <Tooltip title={props.check?.slug}>
          <QuestionOutlined style={{ fontSize: props.size ?? defaultSize }} />
        </Tooltip>
      );
  }
};

export default CheckSlugIconFactory;
