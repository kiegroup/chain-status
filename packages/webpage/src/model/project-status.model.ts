export interface IProjectStatus {
  id?: string;
  name?: string;
  folder?: string;
  order: number;
  date?: number;
}

export const defaultValue: Readonly<IProjectStatus> = {
  order: 0
};
