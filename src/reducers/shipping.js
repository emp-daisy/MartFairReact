import {
  GET_SHIPPINGS_PENDING, GET_SHIPPINGS_PASS, GET_SHIPPINGS_FAIL,
  GET_SHIPPING_PENDING, GET_SHIPPING_PASS, GET_SHIPPING_FAIL,
  GET_SHIPPING_REGION_PENDING, GET_SHIPPING_REGION_PASS, GET_SHIPPING_REGION_FAIL,
  GET_SHIPPING_REGIONS_PENDING, GET_SHIPPING_REGIONS_PASS, GET_SHIPPING_REGIONS_FAIL,
} from '../action_types';

const initialState = {
  loading: false,
  allShipping: [],
  allShippingRegions: [],
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
        allShipping: undefined,
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
        shippingInfo: undefined,
        errorMessage: action.errorMessage,
      };
    case GET_SHIPPING_REGIONS_PENDING:
      return {
        ...state,
        loading: true,
        error: false,
        errorMessage: '',
      };
    case GET_SHIPPING_REGIONS_PASS:
      return {
        ...state,
        loading: false,
        allShippingRegions: action.shippings,
      };
    case GET_SHIPPING_REGIONS_FAIL:
      return {
        ...state,
        loading: false,
        allShippingRegiond: [],
        error: true,
        errorMessage: action.errorMessage,
      };
    case GET_SHIPPING_REGION_PENDING:
      return {
        ...state,
        loading: true,
        error: false,
        errorMessage: '',
      };
    case GET_SHIPPING_REGION_PASS:
      return {
        ...state,
        loading: false,
        shippingInfo: action.shipping,
      };
    case GET_SHIPPING_REGION_FAIL:
      return {
        ...state,
        loading: false,
        error: true,
        shippingInfo: undefined,
        errorMessage: action.errorMessage,
      };
    default:
      return state;
  }
};
