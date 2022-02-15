import { combineReducers } from "redux";
import layout, { LayoutState } from "./layout.service";
import data, { DataState } from "./data.service";

export interface IRootState {
  readonly layout: LayoutState;
  readonly data: DataState;
}

const rootReducer = combineReducers<IRootState>({
  layout,
  data
});

export default rootReducer;
