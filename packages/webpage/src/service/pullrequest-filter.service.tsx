import { IData, defaultValue } from "../model/data.model";
import { IPullRequestFilter } from "../model/pullrequest-filter.model";

export const ACTION_TYPES = {
  FILTER: "pullrequestfilter/FILTER",
  RESET: "pullrequestfilter/RESET",
  SET_DATA: "pullrequestfilter/SET_DATA"
};

export interface IInitialState {
  filteredData: IData;
  filter: IPullRequestFilter;
}

const initialState: IInitialState = {
  filter: { showZeroPullRequests: true },
  filteredData: defaultValue
};

export type PullRequestFilterState = Readonly<typeof initialState>;

// Reducer
const handle = (
  state: PullRequestFilterState = initialState,
  action: any
): PullRequestFilterState => {
  console.log(action.type, action.payload)
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
export const filter = (filter: IPullRequestFilter) => ({
  type: ACTION_TYPES.FILTER,
  payload: filter
});
export const reset = () => ({
  type: ACTION_TYPES.RESET
});
export const setData = (data: IData) => ({
  type: ACTION_TYPES.SET_DATA,
  payload: data
});

export default handle;
