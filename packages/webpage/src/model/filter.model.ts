import { IPullRequestInfo } from "./pullrequestinfo.model";
import { IUser } from "./user.model";

export interface IFilter {
  search?: string;
  base?: IPullRequestInfo;
  head?: IPullRequestInfo;
  user?: IUser;
  requested_reviewers?: IUser[];
  date?: string;
}

export const defaultValue: Readonly<IFilter> = {};
