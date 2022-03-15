import { Moment } from "moment";

export interface IPullRequestFilter {
  search?: string;
  base?: string[];
  head?: string[];
  userLogins?: string[];
  requested_reviewersLogins?: string[];
  date?: Moment[];
  showZeroPullRequests?: boolean;
}

export const defaultValue: Readonly<IPullRequestFilter> = {};
