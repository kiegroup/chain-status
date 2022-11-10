export interface IFileDiff {
  sha?: string;
  filename?: string;
  blob_url?: string;
  contents_url?: string
  changes?: number;
}

export const defaultValue: Readonly<IFileDiff> = {
  
};
