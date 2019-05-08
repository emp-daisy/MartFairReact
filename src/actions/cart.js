import axios from './rest_client';
import {
  ADD_TO_CART_PENDING, ADD_TO_CART_PASS, ADD_TO_CART_FAIL,
  GET_CART_PRODUCTS_PENDING, GET_CART_PRODUCTS_PASS, GET_CART_PRODUCTS_FAIL,
  UPDATE_CART_QUANTITY_PENDING, UPDATE_CART_QUANTITY_PASS, UPDATE_CART_QUANTITY_FAIL,
  EMPTY_CART_PENDING, EMPTY_CART_PASS, EMPTY_CART_FAIL,
  REMOVE_FROM_CART_PENDING, REMOVE_FROM_CART_PASS, REMOVE_FROM_CART_FAIL,
  MOVE_TO_CART_PENDING, MOVE_TO_CART_PASS, MOVE_TO_CART_FAIL,
  TOTAL_CART_PENDING, TOTAL_CART_PASS, TOTAL_CART_FAIL,
  GET_WISHLIST_PENDING, GET_WISHLIST_PASS, GET_WISHLIST_FAIL,
  ADD_TO_GET_WISHLIST_PENDING, ADD_TO_GET_WISHLIST_PASS, ADD_TO_GET_WISHLIST_FAIL,
} from '../action_types';
import { getCartId } from '../utils/localStore';

export const getCartProducts = () => async (dispatch) => {
  dispatch({ type: GET_CART_PRODUCTS_PENDING });
  const cart_id = await getCartId();
  try {
    const response = await axios.get(`/shoppingcart/${cart_id}`);
    const cart = response.data;
    dispatch({
      type: GET_CART_PRODUCTS_PASS, cart,
    });
  } catch (error) {
    dispatch({ type: GET_CART_PRODUCTS_FAIL, errorMessage: error.message });
  }
};
export const addToCart = (product_id, attributes) => async (dispatch) => {
  dispatch({ type: ADD_TO_CART_PENDING });
  const cart_id = await getCartId();
  try {
    const response = await axios.post('/shoppingcart/add', {
      cart_id, product_id, attributes,
    });
    const cart = response.data;
    dispatch({
      type: ADD_TO_CART_PASS, cart,
    });
  } catch (error) {
    dispatch({ type: ADD_TO_CART_FAIL, errorMessage: error.message });
  }
};
export const updateProductQuantity = (item_id, quantity) => async (dispatch) => {
  dispatch({ type: UPDATE_CART_QUANTITY_PENDING });
  try {
    const response = await axios.put(`/shoppingcart/update/${item_id}`, { quantity });
    const cart = response.data;
    dispatch({
      type: UPDATE_CART_QUANTITY_PASS, cart,
    });
  } catch (error) {
    dispatch({ type: UPDATE_CART_QUANTITY_FAIL, errorMessage: error.message });
  }
};
export const removeProductFromCart = item_id => async (dispatch) => {
  dispatch({ type: REMOVE_FROM_CART_PENDING });
  try {
    await axios.delete(`/shoppingcart/removeProduct/${item_id}`);
    dispatch({
      type: REMOVE_FROM_CART_PASS, id: item_id,
    });
  } catch (error) {
    dispatch({ type: REMOVE_FROM_CART_FAIL, errorMessage: error.message });
  }
};
export const emptyCart = () => async (dispatch) => {
  dispatch({ type: EMPTY_CART_PENDING });
  const cart_id = await getCartId();
  try {
    const response = await axios.delete(`/shoppingcart/empty/${cart_id}`);
    const cart = response.data;
    dispatch({
      type: EMPTY_CART_PASS, cart,
    });
  } catch (error) {
    dispatch({ type: EMPTY_CART_FAIL, errorMessage: error.message });
  }
};
export const moveToCart = item_id => async (dispatch) => {
  dispatch({ type: MOVE_TO_CART_PENDING });
  const cart_id = await getCartId();
  try {
    await axios.get(`/shoppingcart/moveToCart/${item_id}`);
    const response = await axios.get(`/shoppingcart/${cart_id}`);
    const cart = response.data;
    dispatch({
      type: MOVE_TO_CART_PASS, cart, id: item_id,
    });
  } catch (error) {
    dispatch({ type: MOVE_TO_CART_FAIL, errorMessage: error.message });
  }
};
export const totalAmount = () => async (dispatch) => {
  dispatch({ type: TOTAL_CART_PENDING });
  const id = await getCartId();
  try {
    const response = await axios.get(`/shoppingcart/totalAmount/${id}`);
    const { total_amount: total } = response.data;
    dispatch({
      type: TOTAL_CART_PASS, total,
    });
  } catch (error) {
    dispatch({ type: TOTAL_CART_FAIL, errorMessage: error.message });
  }
};
export const addToWishlist = item_id => async (dispatch) => {
  dispatch({ type: ADD_TO_GET_WISHLIST_PENDING });
  try {
    await axios.get(`/shoppingcart/saveForLater/${item_id}`);
    dispatch({
      type: ADD_TO_GET_WISHLIST_PASS, id: item_id,
    });
  } catch (error) {
    dispatch({ type: ADD_TO_GET_WISHLIST_FAIL, errorMessage: error.message });
  }
};
export const getWishlist = () => async (dispatch) => {
  dispatch({ type: GET_WISHLIST_PENDING });
  const cart_id = await getCartId();
  try {
    const response = await axios.get(`/shoppingcart/getSaved/${cart_id}`);
    const saved = response.data;
    dispatch({
      type: GET_WISHLIST_PASS, saved,
    });
  } catch (error) {
    dispatch({ type: GET_WISHLIST_FAIL, errorMessage: error.message });
  }
};
