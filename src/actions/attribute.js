import axios from './rest_client';
import {
  GET_ATTRIBUTES_PENDING, GET_ATTRIBUTES_PASS, GET_ATTRIBUTES_FAIL,
  GET_ATTRIBUTE_PENDING, GET_ATTRIBUTE_PASS, GET_ATTRIBUTE_FAIL,
  GET_ATTRIBUTE_VALUES_PENDING, GET_ATTRIBUTE_VALUES_PASS, GET_ATTRIBUTE_VALUES_FAIL,
  GET_ATTRIBUTE_INPRODUCT_PENDING, GET_ATTRIBUTE_INPRODUCT_PASS, GET_ATTRIBUTE_INPRODUCT_FAIL,
} from '../action_types';

export const getAttributes = () => async (dispatch) => {
  dispatch({ type: GET_ATTRIBUTES_PENDING });
  try {
    const response = await axios.get('/attributes');
    const attributes = response.data;
    dispatch({
      type: GET_ATTRIBUTES_PASS, attributes,
    });
  } catch (error) {
    dispatch({ type: GET_ATTRIBUTES_FAIL, errorMessage: error.message });
  }
};
export const getAttribute = id => async (dispatch) => {
  dispatch({ type: GET_ATTRIBUTE_PENDING });
  try {
    const response = await axios.get(`/attributes/${id}`);
    const attribute = response.data;
    dispatch({
      type: GET_ATTRIBUTE_PASS, attribute,
    });
  } catch (error) {
    dispatch({ type: GET_ATTRIBUTE_FAIL, errorMessage: error.message });
  }
};
export const getAttributesForProduct = id => async (dispatch) => {
  dispatch({ type: GET_ATTRIBUTE_INPRODUCT_PENDING });
  try {
    const response = await axios.get(`/attributes/inProduct/${id}`);
    const attribute = response.data;
    dispatch({
      type: GET_ATTRIBUTE_INPRODUCT_PASS, attribute,
    });
  } catch (error) {
    dispatch({ type: GET_ATTRIBUTE_INPRODUCT_FAIL, errorMessage: error.message });
  }
};
export const getAttributesForDepartment = id => async (dispatch) => {
  dispatch({ type: GET_ATTRIBUTE_VALUES_PENDING });
  try {
    const response = await axios.get(`/attributes/values/${id}`);
    const attribute = response.data;
    dispatch({
      type: GET_ATTRIBUTE_VALUES_PASS, attribute,
    });
  } catch (error) {
    dispatch({ type: GET_ATTRIBUTE_VALUES_FAIL, errorMessage: error.message });
  }
};
