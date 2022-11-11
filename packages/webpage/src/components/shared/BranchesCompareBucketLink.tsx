import React from "react";
import { IProject } from "../../model/project.model";
import { URL } from "../../shared/constants";

interface IBranchesCompareLink {
  project: IProject;
  baseBranch: string;
  headBranch: string;
  linkName: string;
}

export const BranchesCompareLink: React.FC<IBranchesCompareLink> = props => {
  const bucketLink = `${URL.BASE_GITHUB}/${props.project.key}/compare/${props.baseBranch}...${props.headBranch}#files_bucket`
  return (
    <a 
      href={bucketLink} 
      target="_blank" 
      rel="noopener noreferrer"
    >
      {props.linkName}
    </a>
  );
};

export default BranchesCompareLink;
