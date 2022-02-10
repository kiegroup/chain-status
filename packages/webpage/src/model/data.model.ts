import { IMetadata } from "./metadata.model";
import { IProject } from "./project.model";

export interface IData {
  metadata?: IMetadata;
  data: IProject[];
}

export const defaultValue: Readonly<IData> = {
  data: []
};
