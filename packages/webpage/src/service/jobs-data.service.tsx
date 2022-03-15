import {
  IJobsData,
  defaultValue as defaultValueJobsData
} from "../model/jobs-data.model";
import { REQUEST, SUCCESS, FAILURE } from "./action-type.util";

export const ACTION_TYPES = {
  LOAD_DATA: "jobsdata/LOAD_DATA",
  RESET: "jobsdata/RESET"
};

interface IInitialState {
  data: IJobsData;
  loading: boolean;
  errorMessage?: string;
}
const initialState: IInitialState = {
  data: defaultValueJobsData,
  loading: false,
  errorMessage: undefined
};

export type JobsDataState = Readonly<typeof initialState>;

// Reducer
const handle = (state: JobsDataState = initialState, action: any): JobsDataState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.LOAD_DATA):
      return {
        ...state,
        loading: true
      };
    case FAILURE(ACTION_TYPES.LOAD_DATA):
      return {
        ...state,
        loading: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.LOAD_DATA):
      return {
        ...state,
        loading: false,
        data: action.payload
      };
    case ACTION_TYPES.RESET:
      return {
        ...initialState
      };
    default:
      return state;
  }
};

// Actions
export const loadData = (file: string) => ({
  type: ACTION_TYPES.LOAD_DATA,
  payload: fetch(`${process.env.PUBLIC_URL}/data/${file}`, {
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json"
    }
  }).then(response => response.json())
});

export const reset = () => ({
  type: ACTION_TYPES.RESET
});

export default handle;
