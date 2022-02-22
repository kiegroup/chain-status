import { Moment } from "moment";

export interface IFilter {
  search?: string;
  base?: string[];
  head?: string[];
  userLogins?: string[];
  requested_reviewersLogins?: string[];
  date?: Moment[];
  showZeroPullRequests?: boolean;
}

export const defaultValue: Readonly<IFilter> = {};
