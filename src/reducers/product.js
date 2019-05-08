import {
  GET_PRODUCT_PENDING, GET_PRODUCT_PASS, GET_PRODUCT_FAIL,
  GET_PRODUCT_DETAILS_PENDING, GET_PRODUCT_DETAILS_PASS, GET_PRODUCT_DETAILS_FAIL,
  GET_PRODUCT_LOCATION_PENDING, GET_PRODUCT_LOCATION_PASS, GET_PRODUCT_LOCATION_FAIL,
  GET_PRODUCTS_PENDING, GET_PRODUCTS_PASS, GET_PRODUCTS_FAIL,
  GET_PRODUCTS_INDEPARTMENT_PENDING, GET_PRODUCTS_INDEPARTMENT_PASS, GET_PRODUCTS_INDEPARTMENT_FAIL,
  GET_PRODUCTS_INCATEGORY_PENDING, GET_PRODUCTS_INCATEGORY_PASS, GET_PRODUCTS_INCATEGORY_FAIL,
  GET_PRODUCT_REVIEW_PENDING, GET_PRODUCT_REVIEW_PASS, GET_PRODUCT_REVIEW_FAIL,
  CREATE_PRODUCT_REVIEW_PENDING, CREATE_PRODUCT_REVIEW_PASS, CREATE_PRODUCT_REVIEW_FAIL,
  GET_SEARCH_PRODUCT_FAIL, GET_SEARCH_PRODUCT_PASS, GET_SEARCH_PRODUCT_PENDING,
} from '../action_types';

const initialState = {
  loading: false,
  allProducts: [],
  productCount: 0,
  error: false,
  errorMessage: '',
  currentPage: 1,
  pageLimit: 24,
  searchLoading: false,
  searchProducts: [],
  searchProductCount: 1,
  searchCurrentPage: 1,
  searchPageLimit: 1,
  productInfo: undefined,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_PRODUCTS_PENDING:
      return {
        ...state,
        loading: true,
        error: false,
        errorMessage: '',
      };
    case GET_PRODUCTS_PASS:
      return {
        ...state,
        loading: false,
        allProducts: action.products,
        productCount: action.count,
        currentPage: action.currentPage,
        pageLimit: action.pageLimit,
      };
    case GET_PRODUCTS_FAIL:
      return {
        ...state,
        loading: false,
        error: true,
        errorMessage: action.errorMessage,
      };
    case GET_PRODUCTS_INDEPARTMENT_PENDING:
      return {
        ...state,
        loading: true,
        error: false,
        errorMessage: '',
      };
    case GET_PRODUCTS_INDEPARTMENT_PASS:
      return {
        ...state,
        loading: false,
        allProducts: action.products,
        productCount: action.count,
        currentPage: action.currentPage,
        pageLimit: action.pageLimit,
      };
    case GET_PRODUCTS_INDEPARTMENT_FAIL:
      return {
        ...state,
        loading: false,
        error: true,
        errorMessage: action.errorMessage,
      };
    case GET_PRODUCTS_INCATEGORY_PENDING:
      return {
        ...state,
        loading: true,
        error: false,
        errorMessage: '',
      };
    case GET_PRODUCTS_INCATEGORY_PASS:
      return {
        ...state,
        loading: false,
        allProducts: action.products,
        productCount: action.count,
        currentPage: action.currentPage,
        pageLimit: action.pageLimit,
      };
    case GET_PRODUCTS_INCATEGORY_FAIL:
      return {
        ...state,
        loading: false,
        error: true,
        errorMessage: action.errorMessage,
      };
    case GET_PRODUCT_PENDING:
      return {
        ...state,
        loading: true,
        error: false,
        errorMessage: '',
      };
    case GET_PRODUCT_PASS:
      return {
        ...state,
        loading: false,
        productInfo: action.product,
      };
    case GET_PRODUCT_FAIL:
      return {
        ...state,
        loading: false,
        productInfo: undefined,
        error: true,
        errorMessage: action.errorMessage,
      };
    case GET_PRODUCT_DETAILS_PENDING:
      return {
        ...state,
        loading: true,
        error: false,
        errorMessage: '',
      };
    case GET_PRODUCT_DETAILS_PASS:
      return {
        ...state,
        loading: false,
        productInfo: action.product,
      };
    case GET_PRODUCT_DETAILS_FAIL:
      return {
        ...state,
        loading: false,
        productInfo: undefined,
        error: true,
        errorMessage: action.errorMessage,
      };
    case GET_PRODUCT_LOCATION_PENDING:
      return {
        ...state,
        loading: true,
        error: false,
        errorMessage: '',
      };
    case GET_PRODUCT_LOCATION_PASS:
      return {
        ...state,
        loading: false,
        productInfo: action.product,
      };
    case GET_PRODUCT_LOCATION_FAIL:
      return {
        ...state,
        loading: false,
        productInfo: undefined,
        error: true,
        errorMessage: action.errorMessage,
      };
    case GET_SEARCH_PRODUCT_PENDING:
      return {
        ...state,
        searchLoading: true,
        error: false,
        errorMessage: '',
      };
    case GET_SEARCH_PRODUCT_PASS:
      return {
        ...state,
        searchLoading: false,
        searchProducts: action.products,
        searchProductCount: action.count,
        searchCurrentPage: action.currentPage,
        searchPageLimit: action.pageLimit,
      };
    case GET_SEARCH_PRODUCT_FAIL:
      return {
        ...state,
        searchLoading: false,
        error: true,
        errorMessage: action.errorMessage,
      };
    case GET_PRODUCT_REVIEW_PENDING:
      return {
        ...state,
        loading: true,
        error: false,
        errorMessage: '',
      };
    case GET_PRODUCT_REVIEW_PASS:
      return {
        ...state,
        loading: false,
        productReviews: action.reviews,
      };
    case GET_PRODUCT_REVIEW_FAIL:
      return {
        ...state,
        loading: false,
        error: true,
        errorMessage: action.errorMessage,
      };
    case CREATE_PRODUCT_REVIEW_PENDING:
      return {
        ...state,
        loading: true,
        error: false,
        errorMessage: '',
      };
    case CREATE_PRODUCT_REVIEW_PASS:
      return {
        ...state,
        loading: false,
      };
    case CREATE_PRODUCT_REVIEW_FAIL:
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
