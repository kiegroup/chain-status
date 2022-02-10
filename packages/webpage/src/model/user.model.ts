export interface IUser {
  login?: string;
  avatar_url?: string;
  html_url?: string;
}

export const defaultValue: Readonly<IUser> = {};
