import {
  defaultValue as defaultValuePullRequestInfo,
  IPullRequestInfo
} from "../model/pullrequestinfo.model";

export const ACTION_TYPES = {
  OPEN_HEAD_BRANCH_DRAWER: "layout/OPEN_HEAD_BRANCH_DRAWER",
  CLOSE_HEAD_BRANCH_DRAWER: "layout/CLOSE_HEAD_BRANCH_DRAWER"
};

interface IDrawer {
  visible: boolean;
  baseBranch: IPullRequestInfo;
}
interface IInitialState {
  headBranchDrawer: IDrawer;
  checksDrawer: IDrawer;
}
const initialState: IInitialState = {
  headBranchDrawer: {
    visible: false,
    baseBranch: defaultValuePullRequestInfo
  },
  checksDrawer: {
    visible: false,
    baseBranch: defaultValuePullRequestInfo
  }
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

export default handle;
