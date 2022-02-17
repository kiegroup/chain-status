export const ACTION_TYPES = {
  SELECTED: "menu/SELECTED",
  RESET: "menu/RESET"
};

interface IInitialState {
  key: string;
}
const initialState: IInitialState = {
  key: ""
};

export type MenuState = Readonly<typeof initialState>;

// Reducer
const handle = (state: MenuState = initialState, action: any): MenuState => {
  switch (action.type) {
    case ACTION_TYPES.SELECTED:
      return {
        ...state,
        key: action.payload
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
export const onSelect = (key: string) => ({
  type: ACTION_TYPES.SELECTED,
  payload: key
});
export const reset = () => ({
  type: ACTION_TYPES.RESET
});

export default handle;
