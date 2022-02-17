import { combineReducers } from "redux";
import layout, { LayoutState } from "./layout.service";
import data, { DataState } from "./data.service";
import menu, { MenuState } from "./menu.service";

export interface IRootState {
  readonly layout: LayoutState;
  readonly data: DataState;
  readonly menu: MenuState;
}

const rootReducer = combineReducers<IRootState>({
  layout,
  data,
  menu
});

export default rootReducer;
