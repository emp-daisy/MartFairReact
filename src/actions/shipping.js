import axios from './rest_client';
import {
  GET_SHIPPINGS_PENDING, GET_SHIPPINGS_PASS, GET_SHIPPINGS_FAIL,
  GET_SHIPPING_PENDING, GET_SHIPPING_PASS, GET_SHIPPING_FAIL,
} from '../action_types';

export const getShippings = () => async (dispatch) => {
  dispatch({ type: GET_SHIPPINGS_PENDING });
  try {
    const response = await axios.get('/shipping/regions');
    const shippings = response.data;
    dispatch({
      type: GET_SHIPPINGS_PASS, shippings,
    });
  } catch (error) {
    dispatch({ type: GET_SHIPPINGS_FAIL, errorMessage: error.message });
  }
};
export const getShipping = id => async (dispatch) => {
  dispatch({ type: GET_SHIPPING_PENDING });
  try {
    const response = await axios.get(`/shipping/regions/${id}`);
    const shipping = response.data;
    dispatch({
      type: GET_SHIPPING_PASS, shipping,
    });
  } catch (error) {
    dispatch({ type: GET_SHIPPING_FAIL, errorMessage: error.message });
  }
};
