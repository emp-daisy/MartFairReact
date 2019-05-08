import axios from './rest_client';
import {
  CREATE_ORDER_PENDING, CREATE_ORDER_PASS, CREATE_ORDER_FAIL,
  GET_ORDER_PENDING, GET_ORDER_PASS, GET_ORDER_FAIL,
  GET_ORDER_DETAIL_PENDING, GET_ORDER_DETAIL_PASS, GET_ORDER_DETAIL_FAIL,
  GET_ORDER_INCUSTOMER_PENDING, GET_ORDER_INCUSTOMER_PASS, GET_ORDER_INCUSTOMER_FAIL,
} from '../action_types';

export const createOrders = ({ cart_id, shipping_id, tax_id }) => async (dispatch) => {
  dispatch({ type: CREATE_ORDER_PENDING });
  try {
    const response = await axios.post('/orders', { cart_id, shipping_id, tax_id });
    const order = response.data;
    dispatch({
      type: CREATE_ORDER_PASS, order,
    });
  } catch (error) {
    dispatch({ type: CREATE_ORDER_FAIL, errorMessage: error.message });
  }
};
export const getOrder = id => async (dispatch) => {
  dispatch({ type: GET_ORDER_PENDING });
  try {
    const response = await axios.get(`/orders/${id}`);
    const order = response.data;
    dispatch({
      type: GET_ORDER_PASS, order,
    });
  } catch (error) {
    dispatch({ type: GET_ORDER_FAIL, errorMessage: error.message });
  }
};
export const getCustomerOrders = () => async (dispatch) => {
  dispatch({ type: GET_ORDER_INCUSTOMER_PENDING });
  try {
    const response = await axios.get('/orders/inCustomer');
    const orders = response.data;
    dispatch({
      type: GET_ORDER_INCUSTOMER_PASS, orders,
    });
  } catch (error) {
    dispatch({ type: GET_ORDER_INCUSTOMER_FAIL, errorMessage: error.message });
  }
};
export const getOrderDetails = id => async (dispatch) => {
  dispatch({ type: GET_ORDER_DETAIL_PENDING });
  try {
    const response = await axios.get(`/orders/shortDetail/${id}`);
    const order = response.data;
    dispatch({
      type: GET_ORDER_DETAIL_PASS, order,
    });
  } catch (error) {
    dispatch({ type: GET_ORDER_DETAIL_FAIL, errorMessage: error.message });
  }
};
