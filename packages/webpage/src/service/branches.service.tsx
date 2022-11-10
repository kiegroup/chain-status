interface IInitialState {
  baseBranch: string | undefined;
  targetBranch: string | undefined;
  diffs: number | undefined;
};

const initialState: IInitialState = {
  baseBranch: undefined,
  targetBranch: undefined,
  diffs: undefined
};

export type BranchesState = Readonly<typeof initialState>;

export const ACTION_TYPES = {
  SET_BASE_BRANCH: "layout/SET_BASE_BRANCH",
  SET_TARGET_BRANCH: "layout/SET_TARGET_BRANCH",
  SET_DIFFS: "layout/SET_DIFFS",
  RESET: "layout/RESET"
};

const handle = (
  state: BranchesState = initialState,
  action: any
): BranchesState => {
  switch (action.type) {
    case ACTION_TYPES.SET_BASE_BRANCH:
      return {
        ...state,
        baseBranch: action.payload,
        diffs: undefined
      };
    case ACTION_TYPES.SET_TARGET_BRANCH:
      return {
        ...state,
        targetBranch: action.payload
      };
    case ACTION_TYPES.SET_DIFFS:
      return {
        ...state,
        diffs: action.payload
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
export const setBaseBranch = (baseBranch: string) => ({
  type: ACTION_TYPES.SET_BASE_BRANCH,
  payload: baseBranch
});

export const setTargetBranch = (targetBranch: string) => ({
  type: ACTION_TYPES.SET_TARGET_BRANCH,
  payload: targetBranch
});

export const setDiffs = (diffs: number) => ({
  type: ACTION_TYPES.SET_DIFFS,
  payload: diffs
});

export const reset = () => ({
  type: ACTION_TYPES.RESET
});

export default handle;
