import { toast } from 'react-semantic-toasts';
import axios from './rest_client';
import {
  GET_CUSTOMER_PENDING, GET_CUSTOMER_PASS, GET_CUSTOMER_FAIL,
  CREATE_CUSTOMER_PENDING, CREATE_CUSTOMER_PASS, CREATE_CUSTOMER_FAIL,
  LOGIN_CUSTOMER_PENDING, LOGIN_CUSTOMER_PASS, LOGIN_CUSTOMER_FAIL,
  UPDATE_CUSTOMER_DETAIL_PENDING, UPDATE_CUSTOMER_DETAIL_PASS, UPDATE_CUSTOMER_DETAIL_FAIL,
  UPDATE_CUSTOMER_ADDRESS_PENDING, UPDATE_CUSTOMER_ADDRESS_PASS, UPDATE_CUSTOMER_ADDRESS_FAIL,
  UPDATE_CUSTOMER_CARD_PENDING, UPDATE_CUSTOMER_CARD_PASS, UPDATE_CUSTOMER_CARD_FAIL,
  LOGOUT_CUSTOMER_PENDING, LOGOUT_CUSTOMER_PASS,
} from '../action_types';
import { saveUserToken, removeUserToken } from '../utils/localStore';

export const getCustomer = () => async (dispatch) => {
  dispatch({ type: GET_CUSTOMER_PENDING });
  try {
    const response = await axios.get('/customer');
    const customer = response.data;
    dispatch({
      type: GET_CUSTOMER_PASS, customer,
    });
  } catch (error) {
    dispatch({ type: GET_CUSTOMER_FAIL, errorMessage: error.message });
  }
};
export const registerCustomer = ({ name, email, password }) => async (dispatch) => {
  dispatch({ type: CREATE_CUSTOMER_PENDING });
  try {
    const response = await axios.post('/customers', {
      name, email, password,
    });
    const { customer: schema, accessToken } = response.data;
    saveUserToken(accessToken);
    dispatch({
      type: CREATE_CUSTOMER_PASS, customer: schema,
    });
  } catch (error) {
    dispatch({ type: CREATE_CUSTOMER_FAIL, errorMessage: error.message });
  }
};
export const loginCustomer = (email, password) => async (dispatch) => {
  dispatch({ type: LOGIN_CUSTOMER_PENDING });
  try {
    const response = await axios.post('/customers/login', {
      email, password,
    });
    const { customer: schema, accessToken } = response.data;
    saveUserToken(accessToken);
    dispatch({
      type: LOGIN_CUSTOMER_PASS, customer: schema,
    });
  } catch (error) {
    dispatch({ type: LOGIN_CUSTOMER_FAIL, errorMessage: error.message });
  }
};
export const loginCustomerWithFacebook = access_token => async (dispatch) => {
  dispatch({ type: LOGIN_CUSTOMER_PENDING });
  try {
    const response = await axios.get('/customers/facebook', { access_token });
    const { customer: schema, accessToken } = response.data;
    saveUserToken(accessToken);
    dispatch({
      type: LOGIN_CUSTOMER_PASS, customer: schema,
    });
  } catch (error) {
    dispatch({ type: LOGIN_CUSTOMER_FAIL, errorMessage: error.message });
  }
};
export const logOutCustomer = () => async (dispatch) => {
  dispatch({ type: LOGOUT_CUSTOMER_PENDING });
  removeUserToken();
  dispatch({ type: LOGOUT_CUSTOMER_PASS });
};
export const updateCustomerDetails = ({
  name, email, password, day_phone, eve_phone, mob_phone,
}) => async (dispatch) => {
  dispatch({ type: UPDATE_CUSTOMER_DETAIL_PENDING });
  try {
    const response = await axios.put('/customer', {
      name,
      email,
      password,
      day_phone: day_phone || undefined,
      eve_phone: eve_phone || undefined,
      mob_phone: mob_phone || undefined,
    });
    const customer = response.data;
    dispatch({
      type: UPDATE_CUSTOMER_DETAIL_PASS, customer,
    });
  } catch (error) {
    dispatch({ type: UPDATE_CUSTOMER_DETAIL_FAIL, errorMessage: error.message });
  }
};
export const updateCustomerPassword = ({ old_password, new_password }) => async (dispatch) => {
  dispatch({ type: UPDATE_CUSTOMER_DETAIL_PENDING });
  try {
    await axios.put('/customer/security', { old_password, new_password });
    setTimeout(() => {
      toast({
        title: 'Password sucessfully changed!',
        description: 'Please login with new password.',
        type: 'info',
        icon: 'lock',
        time: 2500,
      });
    }, 500);
    dispatch(logOutCustomer());
  } catch (error) {
    dispatch({ type: UPDATE_CUSTOMER_DETAIL_FAIL, errorMessage: error.message });
  }
};
export const updateCustomerAddress = ({
  address_1, address_2, city, region, postal_code, country, shipping_region_id,
}) => async (dispatch) => {
  dispatch({ type: UPDATE_CUSTOMER_ADDRESS_PENDING });
  try {
    const response = await axios.put('/customers/address/', {
      address_1,
      address_2: address_2 || undefined,
      city,
      region,
      postal_code,
      country,
      shipping_region_id,
    });
    const customer = response.data;
    dispatch({
      type: UPDATE_CUSTOMER_ADDRESS_PASS, customer,
    });
  } catch (error) {
    dispatch({ type: UPDATE_CUSTOMER_ADDRESS_FAIL, errorMessage: error.message });
  }
};
export const updateCustomerCard = credit_card => async (dispatch) => {
  dispatch({ type: UPDATE_CUSTOMER_CARD_PENDING });
  try {
    const response = await axios.put('/customers/creditCard/', { credit_card });
    const customer = response.data;
    dispatch({
      type: UPDATE_CUSTOMER_CARD_PASS, customer,
    });
  } catch (error) {
    dispatch({ type: UPDATE_CUSTOMER_CARD_FAIL, errorMessage: error.message });
  }
};
