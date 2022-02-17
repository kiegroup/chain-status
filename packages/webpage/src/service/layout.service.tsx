import { IPullRequest } from "../model/pullrequest.model";
import {
  defaultValue as defaultValuePullRequestInfo,
  IPullRequestInfo
} from "../model/pullrequestinfo.model";

export const ACTION_TYPES = {
  OPEN_HEAD_BRANCH_DRAWER: "layout/OPEN_HEAD_BRANCH_DRAWER",
  CLOSE_HEAD_BRANCH_DRAWER: "layout/CLOSE_HEAD_BRANCH_DRAWER",
  OPEN_CHECKS_DRAWER: "layout/OPEN_CHECKS_DRAWER",
  CLOSE_CHECKS_DRAWER: "layout/CLOSE_CHECKS_DRAWER",
  PROJECTS_LOADED: "layout/PROJECTS_LOADED",
  RESET: "layout/RESET"
};

interface IBaseBranchDrawer {
  visible: boolean;
  baseBranch: IPullRequestInfo;
}
interface IPullRequestDrawer {
  visible: boolean;
  pullRequests: IPullRequest[];
}
interface IInitialState {
  headBranchDrawer: IBaseBranchDrawer;
  checksDrawer: IPullRequestDrawer;
  projectsLoaded: boolean;
}
const initialState: IInitialState = {
  headBranchDrawer: {
    visible: false,
    baseBranch: defaultValuePullRequestInfo
  },
  checksDrawer: {
    visible: false,
    pullRequests: []
  },
  projectsLoaded: false
};

export type LayoutState = Readonly<typeof initialState>;

// Reducer
const handle = (
  state: LayoutState = initialState,
  action: any
): LayoutState => {
  switch (action.type) {
    case ACTION_TYPES.OPEN_HEAD_BRANCH_DRAWER:
      return {
        ...state,
        headBranchDrawer: { visible: true, baseBranch: action.payload }
      };
    case ACTION_TYPES.CLOSE_HEAD_BRANCH_DRAWER:
      return {
        ...state,
        headBranchDrawer: { ...initialState.headBranchDrawer }
      };
    case ACTION_TYPES.OPEN_CHECKS_DRAWER:
      return {
        ...state,
        checksDrawer: { visible: true, pullRequests: action.payload }
      };
    case ACTION_TYPES.CLOSE_CHECKS_DRAWER:
      return {
        ...state,
        checksDrawer: { ...initialState.checksDrawer }
      };
    case ACTION_TYPES.PROJECTS_LOADED:
      return {
        ...state,
        projectsLoaded: true
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
export const openHeadBranchDrawer = (baseBranch: IPullRequestInfo) => ({
  type: ACTION_TYPES.OPEN_HEAD_BRANCH_DRAWER,
  payload: baseBranch
});
export const closeHeadBranchDrawer = () => ({
  type: ACTION_TYPES.CLOSE_HEAD_BRANCH_DRAWER
});
export const openChecksDrawer = (pullRequests: IPullRequest[]) => ({
  type: ACTION_TYPES.OPEN_CHECKS_DRAWER,
  payload: pullRequests
});
export const closeChecksDrawer = () => ({
  type: ACTION_TYPES.CLOSE_CHECKS_DRAWER
});
export const projectsLoaded = () => ({
  type: ACTION_TYPES.PROJECTS_LOADED
});
export const reset = () => ({
  type: ACTION_TYPES.RESET
});

export default handle;
