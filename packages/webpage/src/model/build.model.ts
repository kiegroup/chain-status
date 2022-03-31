export interface IBuild {
  id?: number;
  building?: boolean;
  duration: number;
  estimatedDuration?: number;
  result?: string;
  url?: string;
  console_url?: string;
  date?: number;
}

export const defaultValue: Readonly<IBuild> = {
  duration: 0
};
