import { IUser } from "./user.model";
import { ICheck } from "./check.model";
import {
  IPullRequestInfo,
  defaultValue as IPullRequestInfoDefault
} from "./pullrequestinfo.model";
import { IProject } from "./project.model";
export interface IPullRequest {
  number?: number;
  title?: string;
  url?: string;
  html_url?: string;
  labels?: string[];
  draft?: boolean;
  requested_reviewers?: IUser[];
  created_at?: string;
  updated_at?: string;
  closed_at?: string;
  merged_at?: string;
  base: IPullRequestInfo;
  head: IPullRequestInfo;
  user?: IUser;
  checks: ICheck[];
  project?: IProject;
}

export const defaultValue: Readonly<IPullRequest> = {
  checks: [],
  base: IPullRequestInfoDefault,
  head: IPullRequestInfoDefault
};
