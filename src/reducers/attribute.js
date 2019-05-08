import {
  GET_ATTRIBUTES_PENDING, GET_ATTRIBUTES_PASS, GET_ATTRIBUTES_FAIL,
  GET_ATTRIBUTE_PENDING, GET_ATTRIBUTE_PASS, GET_ATTRIBUTE_FAIL,
  GET_ATTRIBUTE_INPRODUCT_PENDING, GET_ATTRIBUTE_INPRODUCT_PASS, GET_ATTRIBUTE_INPRODUCT_FAIL,
  GET_ATTRIBUTE_VALUES_PENDING, GET_ATTRIBUTE_VALUES_PASS, GET_ATTRIBUTE_VALUES_FAIL,
} from '../action_types';

const initialState = {
  loading: false,
  allAttributes: [],
  error: false,
  errorMessage: '',
  attributeInfo: undefined,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_ATTRIBUTES_PENDING:
      return {
        ...state,
        loading: true,
        error: false,
        errorMessage: '',
      };
    case GET_ATTRIBUTES_PASS:
      return {
        ...state,
        loading: false,
        allAttributes: action.categories,
      };
    case GET_ATTRIBUTES_FAIL:
      return {
        ...state,
        loading: false,
        productInfo: undefined,
        error: true,
        errorMessage: action.errorMessage,
      };
    case GET_ATTRIBUTE_PENDING:
      return {
        ...state,
        loading: true,
        error: false,
        errorMessage: '',
      };
    case GET_ATTRIBUTE_PASS:
      return {
        ...state,
        loading: false,
        attributeInfo: action.attribute,
      };
    case GET_ATTRIBUTE_FAIL:
      return {
        ...state,
        loading: false,
        error: true,
        errorMessage: action.errorMessage,
      };
    case GET_ATTRIBUTE_INPRODUCT_PENDING:
      return {
        ...state,
        loading: true,
        error: false,
        errorMessage: '',
      };
    case GET_ATTRIBUTE_INPRODUCT_PASS:
      return {
        ...state,
        loading: false,
        attributeInfo: action.attribute,
      };
    case GET_ATTRIBUTE_INPRODUCT_FAIL:
      return {
        ...state,
        loading: false,
        error: true,
        errorMessage: action.errorMessage,
      };
    case GET_ATTRIBUTE_VALUES_PENDING:
      return {
        ...state,
        loading: true,
        error: false,
        errorMessage: '',
      };
    case GET_ATTRIBUTE_VALUES_PASS:
      return {
        ...state,
        loading: false,
        attributeInfo: action.attribute,
      };
    case GET_ATTRIBUTE_VALUES_FAIL:
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
