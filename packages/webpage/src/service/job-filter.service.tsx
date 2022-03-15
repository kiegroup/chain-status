import { IJobFilter } from "../model/job-filter.model";
import { defaultValue, IJobsData } from "../model/jobs-data.model";

export const ACTION_TYPES = {
  FILTER: "jobfilter/FILTER",
  RESET: "jobfilter/RESET",
  SET_DATA: "jobfilter/SET_DATA"
};

export interface IInitialState {
  filteredData: IJobsData;
  filter: IJobFilter;
}

const initialState: IInitialState = {
  filter: { showZeroBuilds: true },
  filteredData: defaultValue
};

export type JobFilterState = Readonly<typeof initialState>;

// Reducer
const handle = (
  state: JobFilterState = initialState,
  action: any
): JobFilterState => {
  switch (action.type) {
    case ACTION_TYPES.FILTER:
      return {
        ...state,
        filter: {
          ...state.filter,
          ...action.payload
        }
      };
    case ACTION_TYPES.SET_DATA:
      return {
        ...state,
        filteredData: action.payload
      };
    case ACTION_TYPES.RESET:
      return {
        ...state,
        filter: initialState.filter
      };
    default:
      return state;
  }
};

// Actions
export const filter = (filter: IJobFilter) => ({
  type: ACTION_TYPES.FILTER,
  payload: filter
});
export const reset = () => ({
  type: ACTION_TYPES.RESET
});
export const setData = (data: IJobsData) => ({
  type: ACTION_TYPES.SET_DATA,
  payload: data
});

export default handle;
