import { IFileDiff } from "./file-diff.model";

export interface IBranchComparison {
  [key: string]: IFileDiff[]
}

export const defaultValue: Readonly<IBranchComparison> = {
  
};
