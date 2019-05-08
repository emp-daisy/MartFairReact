import axios from './rest_client';
import {
  GET_TAXES_PENDING, GET_TAXES_PASS, GET_TAXES_FAIL,
  GET_TAX_PENDING, GET_TAX_PASS, GET_TAX_FAIL,
} from '../action_types';

export const getTaxes = () => async (dispatch) => {
  dispatch({ type: GET_TAXES_PENDING });
  try {
    const response = await axios.get('/taxs');
    const taxes = response.data;
    dispatch({
      type: GET_TAXES_PASS, taxes,
    });
  } catch (error) {
    dispatch({ type: GET_TAXES_FAIL, errorMessage: error.message });
  }
};
export const getTax = id => async (dispatch) => {
  dispatch({ type: GET_TAX_PENDING });
  try {
    const response = await axios.get(`/taxs/${id}`);
    const tax = response.data;
    dispatch({
      type: GET_TAX_PASS, tax,
    });
  } catch (error) {
    dispatch({ type: GET_TAX_FAIL, errorMessage: error.message });
  }
};
