import { IProduct, defaultValue } from "../model/product.model";
import { IProjectStatus } from "../model/project-status.model";
import { REQUEST, SUCCESS, FAILURE } from "./action-type.util";

export const ACTION_TYPES = {
  LOAD_DATA: "product/LOAD_DATA",
  SELECT_PRODUCT: "product/SELECT_PRODUCT",
  RESET: "product/RESET"
};

interface IInitialState {
  data: IProduct;
  loading: boolean;
  errorMessage?: boolean;
  selectedProduct?: IProjectStatus;
}
const initialState: IInitialState = {
  data: defaultValue,
  loading: false,
  errorMessage: undefined,
  selectedProduct: undefined
};

export type ProductState = Readonly<typeof initialState>;

// Reducer
const handle = (
  state: ProductState = initialState,
  action: any
): ProductState => {
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
    case ACTION_TYPES.SELECT_PRODUCT:
      return {
        ...state,
        selectedProduct: action.payload
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
export const loadData = () => ({
  type: ACTION_TYPES.LOAD_DATA,
  payload: fetch(`${process.env.PUBLIC_URL}/data/product.json`, {
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json"
    }
  }).then(response => response.json())
});

export const selectProduct = (product: IProjectStatus) => ({
  type: ACTION_TYPES.SELECT_PRODUCT,
  payload: product
});

export const reset = () => ({
  type: ACTION_TYPES.RESET
});

export default handle;
