import { IPullRequest } from "./pullrequest.model";

export interface ICheck {
  id?: string;
  name?: string;
  html_url?: string;
  status?: string;
  conclusion?: string;
  started_at?: string;
  completed_at?: string;
  slug?: string;
  pullRequest?: IPullRequest;
}

export const defaultValue: Readonly<ICheck> = {};
