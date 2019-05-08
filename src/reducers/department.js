import {
  GET_DEPARTMENTS_PENDING, GET_DEPARTMENTS_PASS, GET_DEPARTMENTS_FAIL,
  GET_DEPARTMENT_PENDING, GET_DEPARTMENT_PASS, GET_DEPARTMENT_FAIL,
} from '../action_types';

const initialState = {
  loading: false,
  allDepartment: [],
  error: false,
  errorMessage: '',
  departmentInfo: undefined,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_DEPARTMENTS_PENDING:
      return {
        ...state,
        loading: true,
        error: false,
        errorMessage: '',
      };
    case GET_DEPARTMENTS_PASS:
      return {
        ...state,
        loading: false,
        allDepartment: action.departments,
      };
    case GET_DEPARTMENTS_FAIL:
      return {
        ...state,
        loading: false,
        productInfo: undefined,
        error: true,
        errorMessage: action.errorMessage,
      };
    case GET_DEPARTMENT_PENDING:
      return {
        ...state,
        loading: true,
        error: false,
        errorMessage: '',
      };
    case GET_DEPARTMENT_PASS:
      return {
        ...state,
        loading: false,
        departmentInfo: action.department,
      };
    case GET_DEPARTMENT_FAIL:
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
