export interface IBuild {
  id?: number;
  building?: boolean;
  duration?: number;
  estimatedDuration?: number;
  result?: string;
  url?: string;
  date?: number;
}

export const defaultValue: Readonly<IBuild> = {};
