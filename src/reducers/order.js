import {
  CREATE_ORDER_PENDING, CREATE_ORDER_PASS, CREATE_ORDER_FAIL,
  GET_ORDER_PENDING, GET_ORDER_PASS, GET_ORDER_FAIL,
  GET_ORDER_DETAIL_PENDING, GET_ORDER_DETAIL_PASS, GET_ORDER_DETAIL_FAIL,
  GET_ORDER_INCUSTOMER_PENDING, GET_ORDER_INCUSTOMER_PASS, GET_ORDER_INCUSTOMER_FAIL,

} from '../action_types';

const initialState = {
  loading: false,
  customerOrdersloading: false,
  customerOrders: [],
  customerOrderInfo: undefined,
  customerOrderDetail: undefined,
  error: false,
  errorMessage: '',
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_ORDER_INCUSTOMER_PENDING:
      return {
        ...state,
        customerOrdersloading: true,
        error: false,
        errorMessage: '',
      };
    case GET_ORDER_INCUSTOMER_PASS:
      return {
        ...state,
        customerOrdersloading: false,
        customerOrders: action.orders,
      };
    case GET_ORDER_INCUSTOMER_FAIL:
      return {
        ...state,
        customerOrdersloading: false,
        error: true,
        errorMessage: action.errorMessage,
      };
    case GET_ORDER_PENDING:
      return {
        ...state,
        loading: true,
        error: false,
        errorMessage: '',
      };
    case GET_ORDER_PASS:
      return {
        ...state,
        loading: false,
        customerOrderInfo: action.order,
      };
    case GET_ORDER_FAIL:
      return {
        ...state,
        loading: false,
        error: true,
        errorMessage: action.errorMessage,
      };
    case GET_ORDER_DETAIL_PENDING:
      return {
        ...state,
        loading: true,
        error: false,
        errorMessage: '',
      };
    case GET_ORDER_DETAIL_PASS:
      return {
        ...state,
        loading: false,
        customerOrderDetail: action.order,
      };
    case GET_ORDER_DETAIL_FAIL:
      return {
        ...state,
        loading: false,
        error: true,
        errorMessage: action.errorMessage,
      };
    case CREATE_ORDER_PENDING:
      return {
        ...state,
        loading: true,
        error: false,
        errorMessage: '',
      };
    case CREATE_ORDER_PASS:
      return {
        ...state,
        loading: false,
        customerOrders: action.order,
      };
    case CREATE_ORDER_FAIL:
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
