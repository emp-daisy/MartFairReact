import {
  GET_SHIPPINGS_PENDING, GET_SHIPPINGS_PASS, GET_SHIPPINGS_FAIL,
  GET_SHIPPING_PENDING, GET_SHIPPING_PASS, GET_SHIPPING_FAIL,
} from '../action_types';

const initialState = {
  loading: false,
  allShipping: [],
  error: false,
  errorMessage: '',
  shippingInfo: undefined,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_SHIPPINGS_PENDING:
      return {
        ...state,
        loading: true,
        error: false,
        errorMessage: '',
      };
    case GET_SHIPPINGS_PASS:
      return {
        ...state,
        loading: false,
        allShipping: action.shippings,
      };
    case GET_SHIPPINGS_FAIL:
      return {
        ...state,
        loading: false,
        productInfo: undefined,
        error: true,
        errorMessage: action.errorMessage,
      };
    case GET_SHIPPING_PENDING:
      return {
        ...state,
        loading: true,
        error: false,
        errorMessage: '',
      };
    case GET_SHIPPING_PASS:
      return {
        ...state,
        loading: false,
        shippingInfo: action.shipping,
      };
    case GET_SHIPPING_FAIL:
      return {
        ...state,
        loading: false,
        error: true,
        errorMessage: action.errorMessage,
      };
    default:
      return state;
  }
};
