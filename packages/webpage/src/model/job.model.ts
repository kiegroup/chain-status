import { IBuild } from "./build.model";

export interface IJob {
  id?: string;
  name?: string;
  description?: string;
  url?: string;
  color?: string;
  builds: IBuild[];
  parent?: IJob;
}

export const defaultValue: Readonly<IJob> = {
  builds: []
};
