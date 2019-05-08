import axios from './rest_client';
import {
  GET_DEPARTMENTS_PENDING, GET_DEPARTMENTS_PASS, GET_DEPARTMENTS_FAIL,
  GET_DEPARTMENT_PENDING, GET_DEPARTMENT_PASS, GET_DEPARTMENT_FAIL,
} from '../action_types';

export const getDepartments = () => async (dispatch) => {
  dispatch({ type: GET_DEPARTMENTS_PENDING });
  try {
    const response = await axios.get('/departments');
    const departments = response.data;
    dispatch({
      type: GET_DEPARTMENTS_PASS, departments,
    });
  } catch (error) {
    dispatch({ type: GET_DEPARTMENTS_FAIL, errorMessage: error.message });
  }
};
export const getDepartment = id => async (dispatch) => {
  dispatch({ type: GET_DEPARTMENT_PENDING });
  try {
    const response = await axios.get(`/departments/${id}`);
    const department = response.data;
    dispatch({
      type: GET_DEPARTMENT_PASS, department,
    });
  } catch (error) {
    dispatch({ type: GET_DEPARTMENT_FAIL, errorMessage: error.message });
  }
};
