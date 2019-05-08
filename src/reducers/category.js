import {
  GET_CATEGORIES_PENDING, GET_CATEGORIES_PASS, GET_CATEGORIES_FAIL,
  GET_CATEGORY_PENDING, GET_CATEGORY_PASS, GET_CATEGORY_FAIL,
  GET_CATEGORY_INPRODUCT_PENDING, GET_CATEGORY_INPRODUCT_PASS, GET_CATEGORY_INPRODUCT_FAIL,
  GET_CATEGORY_INDEPARTMENT_PENDING, GET_CATEGORY_INDEPARTMENT_PASS, GET_CATEGORY_INDEPARTMENT_FAIL,
} from '../action_types';

const initialState = {
  loading: false,
  allCategory: [],
  error: false,
  errorMessage: '',
  categoryInfo: undefined,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_CATEGORIES_PENDING:
      return {
        ...state,
        loading: true,
        error: false,
        errorMessage: '',
      };
    case GET_CATEGORIES_PASS:
      return {
        ...state,
        loading: false,
        allCategory: action.categories,
      };
    case GET_CATEGORIES_FAIL:
      return {
        ...state,
        loading: false,
        productInfo: undefined,
        error: true,
        errorMessage: action.errorMessage,
      };
    case GET_CATEGORY_PENDING:
      return {
        ...state,
        loading: true,
        error: false,
        errorMessage: '',
      };
    case GET_CATEGORY_PASS:
      return {
        ...state,
        loading: false,
        categoryInfo: action.category,
      };
    case GET_CATEGORY_FAIL:
      return {
        ...state,
        loading: false,
        error: true,
        errorMessage: action.errorMessage,
      };
    case GET_CATEGORY_INPRODUCT_PENDING:
      return {
        ...state,
        loading: true,
        error: false,
        errorMessage: '',
      };
    case GET_CATEGORY_INPRODUCT_PASS:
      return {
        ...state,
        loading: false,
        categoryInfo: action.category,
      };
    case GET_CATEGORY_INPRODUCT_FAIL:
      return {
        ...state,
        loading: false,
        error: true,
        errorMessage: action.errorMessage,
      };
    case GET_CATEGORY_INDEPARTMENT_PENDING:
      return {
        ...state,
        loading: true,
        error: false,
        errorMessage: '',
      };
    case GET_CATEGORY_INDEPARTMENT_PASS:
      return {
        ...state,
        loading: false,
        categoryInfo: action.category,
      };
    case GET_CATEGORY_INDEPARTMENT_FAIL:
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
