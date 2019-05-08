import {
  GET_CUSTOMER_PENDING, GET_CUSTOMER_PASS, GET_CUSTOMER_FAIL,
  CREATE_CUSTOMER_PENDING, CREATE_CUSTOMER_PASS, CREATE_CUSTOMER_FAIL,
  LOGIN_CUSTOMER_PENDING, LOGIN_CUSTOMER_PASS, LOGIN_CUSTOMER_FAIL,
  UPDATE_CUSTOMER_DETAIL_PENDING, UPDATE_CUSTOMER_DETAIL_PASS, UPDATE_CUSTOMER_DETAIL_FAIL,
  UPDATE_CUSTOMER_ADDRESS_PENDING, UPDATE_CUSTOMER_ADDRESS_PASS, UPDATE_CUSTOMER_ADDRESS_FAIL,
  UPDATE_CUSTOMER_CARD_PENDING, UPDATE_CUSTOMER_CARD_PASS, UPDATE_CUSTOMER_CARD_FAIL,
  LOGOUT_CUSTOMER_PENDING, LOGOUT_CUSTOMER_PASS, LOGIN_CONFIRM,
} from '../action_types';

const initialState = {
  loggedIn: false,
  loading: false,
  customerInfo: [],
  error: false,
  errorMessage: '',
  taxInfo: undefined,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_CONFIRM:
      return {
        ...state,
        loggedIn: true,
      };
    case LOGOUT_CUSTOMER_PENDING:
      return {
        ...state,
        loading: true,
      };
    case LOGOUT_CUSTOMER_PASS:
      return {
        ...state,
        loading: false,
        loggedIn: false,
      };
    case LOGIN_CUSTOMER_PENDING:
      return {
        ...state,
        loading: true,
        error: false,
        errorMessage: '',
      };
    case LOGIN_CUSTOMER_PASS:
      return {
        ...state,
        loading: false,
        customerInfo: action.customer,
        loggedIn: true,
      };
    case LOGIN_CUSTOMER_FAIL:
      return {
        ...state,
        loading: false,
        customerInfo: undefined,
        error: true,
        errorMessage: action.errorMessage,
      };
    case GET_CUSTOMER_PENDING:
      return {
        ...state,
        loading: true,
        error: false,
        errorMessage: '',
      };
    case GET_CUSTOMER_PASS:
      return {
        ...state,
        loading: false,
        customerInfo: action.customer,
        loggedIn: true,
      };
    case GET_CUSTOMER_FAIL:
      return {
        ...state,
        loading: false,
        customerInfo: undefined,
        error: true,
        errorMessage: action.errorMessage,
      };
    default:
      return state;
  }
};
