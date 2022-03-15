import { IProjectStatus } from "./project-status.model";

export interface IProduct {
  jobs: IProjectStatus[];
  projectStatuses: IProjectStatus[];
}

export const defaultValue: Readonly<IProduct> = {
  jobs: [],
  projectStatuses: []
};
