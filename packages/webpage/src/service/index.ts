import { combineReducers } from "redux";
import layout, { LayoutState } from "./layout.service";
import data, { DataState } from "./data.service";
import product, { ProductState } from "./product.service";
import menu, { MenuState } from "./menu.service";
import filter, { FilterState } from "./filter.service";

export interface IRootState {
  readonly layout: LayoutState;
  readonly data: DataState;
  readonly product: ProductState;
  readonly menu: MenuState;
  readonly filter: FilterState;
}

const rootReducer = combineReducers<IRootState>({
  layout,
  data,
  product,
  menu,
  filter
});

export default rootReducer;
