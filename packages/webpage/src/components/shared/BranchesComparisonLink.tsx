import {
  LinkOutlined
} from "@ant-design/icons";
import { Button } from "antd";
import React from "react";
import { IProject } from "../../model/project.model";
import { COMPARISON_LINK_STYLE, URL } from "../../shared/constants";

interface IBranchesComparisonLink {
  project: IProject;
  baseBranch: string;
  headBranch: string;
  fontSize?: number;
}

export const BranchesComparisonLink: React.FC<IBranchesComparisonLink> = props => {
  const fontSizeStyle = props.fontSize
    ? { fontSize: props.fontSize }
    :  COMPARISON_LINK_STYLE;

  const bucketLink = `${URL.BASE_GITHUB}/${props.project.key}/compare/${props.baseBranch}...${props.headBranch}#files_bucket`
  return (
    <Button
      size="small"
      type="link"
      href={bucketLink}
      target="_blank"
      icon={<LinkOutlined />}
      style={{
        ...fontSizeStyle
      }}
    />
  );
};

export default BranchesComparisonLink;
