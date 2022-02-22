import { IData, defaultValue } from "../model/data.model";
import { IFilter } from "../model/filter.model";

export const ACTION_TYPES = {
  FILTER: "filter/FILTER",
  RESET: "filter/RESET",
  SET_DATA: "filter/SET_DATA"
};

export interface IInitialState {
  filteredData: IData;
  filter: IFilter;
}

const initialState: IInitialState = {
  filter: { showZeroPullRequests: true },
  filteredData: defaultValue
};

export type FilterState = Readonly<typeof initialState>;

// Reducer
const handle = (
  state: FilterState = initialState,
  action: any
): FilterState => {
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
export const filter = (filter: IFilter) => ({
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
