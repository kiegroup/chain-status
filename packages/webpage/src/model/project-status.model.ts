export interface IProjectStatus {
  id?: string;
  name?: string;
  folder?: string;
  order: number;
}

export const defaultValue: Readonly<IProjectStatus> = {
  order: 0
};
