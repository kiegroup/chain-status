import { Moment } from "moment";

export interface IJobFilter {
  search?: string;
  parentJob?: string[];
  result?: string[];
  date?: Moment[];
  showZeroBuilds?: boolean;
}

export const defaultValue: Readonly<IJobFilter> = {};
