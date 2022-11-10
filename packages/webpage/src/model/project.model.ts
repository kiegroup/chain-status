import { IPullRequest } from "./pullrequest.model";
import { IBranchComparison } from "./branch-comparison.model";

export interface IProject {
  key: string;
  name?: string;
  description?: string;
  html_url?: string;
  pulls_url?: string;
  updated_at?: string;
  homepage?: string;
  language?: string;
  default_branch?: string;
  pullRequests: IPullRequest[];
  branchesComparison: {
    [key: string]: IBranchComparison;
  };
}

export const defaultValue: Readonly<IProject> = {
  key: "",
  pullRequests: [],
  branchesComparison: {}
};
