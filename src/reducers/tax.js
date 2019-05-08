import {
  GET_TAXES_PENDING, GET_TAXES_PASS, GET_TAXES_FAIL,
  GET_TAX_PENDING, GET_TAX_PASS, GET_TAX_FAIL,
} from '../action_types';

const initialState = {
  loading: false,
  allTax: [],
  error: false,
  errorMessage: '',
  taxInfo: undefined,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_TAXES_PENDING:
      return {
        ...state,
        loading: true,
        error: false,
        errorMessage: '',
      };
    case GET_TAXES_PASS:
      return {
        ...state,
        loading: false,
        allTax: action.taxes,
      };
    case GET_TAXES_FAIL:
      return {
        ...state,
        loading: false,
        productInfo: undefined,
        error: true,
        errorMessage: action.errorMessage,
      };
    case GET_TAX_PENDING:
      return {
        ...state,
        loading: true,
        error: false,
        errorMessage: '',
      };
    case GET_TAX_PASS:
      return {
        ...state,
        loading: false,
        taxInfo: action.tax,
      };
    case GET_TAX_FAIL:
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
