import { IMetadata } from "./metadata.model";
import { IJob } from "./job.model";

export interface IJobsData {
  metadata?: IMetadata;
  jobs: IJob[];
}

export const defaultValue: Readonly<IJobsData> = {
  jobs: []
};
