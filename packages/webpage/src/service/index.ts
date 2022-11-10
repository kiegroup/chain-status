import { combineReducers } from "redux";
import layout, { LayoutState } from "./layout.service";
import data, { DataState } from "./data.service";
import jobsData, { JobsDataState } from "./jobs-data.service";
import product, { ProductState } from "./product.service";
import menu, { MenuState } from "./menu.service";
import pullrequestFilter, {
  PullRequestFilterState
} from "./pullrequest-filter.service";
import jobFilter, { JobFilterState } from "./job-filter.service";
import branches, { BranchesState } from "./branches.service";

export interface IRootState {
  readonly layout: LayoutState;
  readonly data: DataState;
  readonly jobsData: JobsDataState;
  readonly product: ProductState;
  readonly menu: MenuState;
  readonly pullrequestFilter: PullRequestFilterState;
  readonly jobFilter: JobFilterState;
  readonly branches: BranchesState;
}

const rootReducer = combineReducers<IRootState>({
  layout,
  data,
  jobsData,
  product,
  menu,
  pullrequestFilter,
  jobFilter,
  branches
});

export default rootReducer;
