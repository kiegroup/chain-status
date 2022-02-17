import { IMetadata } from "./metadata.model";
import { IProject } from "./project.model";

export interface IData {
  metadata?: IMetadata;
  projects: IProject[];
}

export const defaultValue: Readonly<IData> = {
  projects: []
};
