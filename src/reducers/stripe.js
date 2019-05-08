import {
  GET_CHARGE_PENDING, GET_CHARGE_PASS, GET_CHARGE_FAIL,
} from '../action_types';

const initialState = {
  loading: false,
  error: false,
  errorMessage: '',
  stripeInfo: undefined,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_CHARGE_PENDING:
      return {
        ...state,
        loading: true,
        error: false,
        errorMessage: '',
      };
    case GET_CHARGE_PASS:
      return {
        ...state,
        loading: false,
        stripeInfo: action.stripe,
      };
    case GET_CHARGE_FAIL:
      return {
        ...state,
        loading: false,
        productInfo: undefined,
        error: true,
        errorMessage: action.errorMessage,
      };
    default:
      return state;
  }
};
