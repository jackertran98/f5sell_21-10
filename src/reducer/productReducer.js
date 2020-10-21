import {
  PARENT_PRODUCT,
  BEST_PRODUCT,
  NEW_PRODUCT,
  POPULAR_PRODUCT,
} from "../action/types";

const INIT_STATE = {
  parentProduct: [],
  bestProduct: [],
  popularProduct: [],
  newProduct: [],
};

export default (state = INIT_STATE, action) => {
  switch (action.type) {
    case PARENT_PRODUCT: {
      return {
        ...state,
        parentProduct: [...state.parentProduct, ...action.payload],
      };
    }
    case BEST_PRODUCT: {
      return {
        ...state,
        bestProduct: [...action.payload],
      };
    }
    case NEW_PRODUCT: {
      return {
        ...state,
        newProduct: [...action.payload],
      };
    }
    case POPULAR_PRODUCT: {
      return {
        ...state,
        popularProduct: [...action.payload],
      };
    }
    default:
      return { ...state };
  }
};
