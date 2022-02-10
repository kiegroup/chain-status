export interface IPullRequestInfo {
  ref?: string;
  sha?: string;
  label?: string;
}

export const defaultValue: Readonly<IPullRequestInfo> = {};
