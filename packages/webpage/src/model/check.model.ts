export interface ICheck {
  html_url?: string;
  status?: string;
  conclusion?: string;
  started_at?: string;
  completed_at?: string;
  slug?: string;
}

export const defaultValue: Readonly<ICheck> = {};
