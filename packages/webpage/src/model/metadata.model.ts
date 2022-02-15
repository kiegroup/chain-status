export interface IMetadata {
  title?: string;
  subtitle?: string;
  date?: string;
  createdBy?: string;
  createdUrl?: string;
}

export const defaultValue: Readonly<IMetadata> = {};
