import {
  GET_CHARGE_PENDING, GET_CHARGE_PASS, GET_CHARGE_FAIL,
} from '../action_types';

const initialState = {
  loading: false,
  error: false,
  errorMessage: '',
  success: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_CHARGE_PENDING:
      return {
        ...state,
        loading: true,
        success: false,
        error: false,
        errorMessage: '',
      };
    case GET_CHARGE_PASS:
      return {
        ...state,
        loading: false,
        success: true,
      };
    case GET_CHARGE_FAIL:
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
