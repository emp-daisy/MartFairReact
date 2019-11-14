import axios from './rest_client';
import {
  GET_PRODUCTS_PENDING, GET_PRODUCTS_PASS, GET_PRODUCTS_FAIL,
  GET_PRODUCT_PENDING, GET_PRODUCT_PASS, GET_PRODUCT_FAIL,
  GET_RELATED_PRODUCT_PENDING, GET_RELATED_PRODUCT_PASS, GET_RELATED_PRODUCT_FAIL,
  GET_PRODUCT_DETAILS_PENDING, GET_PRODUCT_DETAILS_PASS, GET_PRODUCT_DETAILS_FAIL,
  GET_PRODUCT_LOCATION_PENDING, GET_PRODUCT_LOCATION_PASS, GET_PRODUCT_LOCATION_FAIL,
  GET_PRODUCTS_INDEPARTMENT_PENDING, GET_PRODUCTS_INDEPARTMENT_PASS, GET_PRODUCTS_INDEPARTMENT_FAIL,
  GET_PRODUCTS_INCATEGORY_PENDING, GET_PRODUCTS_INCATEGORY_PASS, GET_PRODUCTS_INCATEGORY_FAIL,
  GET_PRODUCT_REVIEW_PENDING, GET_PRODUCT_REVIEW_PASS, GET_PRODUCT_REVIEW_FAIL,
  CREATE_PRODUCT_REVIEW_PENDING, CREATE_PRODUCT_REVIEW_PASS, CREATE_PRODUCT_REVIEW_FAIL,
  GET_SEARCH_PRODUCT_FAIL, GET_SEARCH_PRODUCT_PASS, GET_SEARCH_PRODUCT_PENDING,
} from '../action_types';

export const getProducts = ({
  page = 1, limit = 24,
  description_length = 200,
} = {}) => async (dispatch) => {
  dispatch({ type: GET_PRODUCTS_PENDING });
  try {
    const response = await axios.get('/products', {
      params: { page, limit, description_length },
    });
    const { count, rows: products } = response.data;
    dispatch({
      type: GET_PRODUCTS_PASS, count, products, currentPage: page, pageLimit: limit,
    });
  } catch (error) {
    dispatch({ type: GET_PRODUCTS_FAIL, errorMessage: error.message });
  }
};

export const searchProducts = ({
  query_string, all_words = 'on', page = 1, limit = 5, description_length = 200,
} = {}) => async (dispatch) => {
  dispatch({ type: GET_SEARCH_PRODUCT_PENDING });
  try {
    const response = await axios.get('/products/search', {
      params: {
        page, limit, description_length, query_string, all_words,
      },
    });
    const { count, rows: products } = await response.data;
    dispatch({ type: GET_SEARCH_PRODUCT_PASS, count, products });
  } catch (error) {
    dispatch({ type: GET_SEARCH_PRODUCT_FAIL, errorMessage: error.message });
  }
};

export const getProduct = id => async (dispatch) => {
  dispatch({ type: GET_PRODUCT_PENDING });
  try {
    const response = await axios.get(`/products/${id}`);
    const product = response.data;
    dispatch({
      type: GET_PRODUCT_PASS, product,
    });
  } catch (error) {
    dispatch({ type: GET_PRODUCT_FAIL, errorMessage: error.message });
  }
};
export const getRelatedProduct = id => async (dispatch) => {
  dispatch({ type: GET_RELATED_PRODUCT_PENDING });
  try {
    const response = await axios.get(`/products/${id}/related`);
    const products = response.data;
    dispatch({
      type: GET_RELATED_PRODUCT_PASS, products,
    });
  } catch (error) {
    dispatch({ type: GET_RELATED_PRODUCT_FAIL, errorMessage: error.message });
  }
};
export const getProductByCategory = ({
  page = 1, limit = 24,
  description_length = 200,
  id,
} = {}) => async (dispatch) => {
  dispatch({ type: GET_PRODUCTS_INCATEGORY_PENDING });
  try {
    const response = await axios.get(`/products/inCategory/${id}`, {
      params: { page, limit, description_length },
    });
    const { count, rows: products } = response.data;
    dispatch({
      type: GET_PRODUCTS_INCATEGORY_PASS, count, products, currentPage: page, pageLimit: limit,
    });
  } catch (error) {
    dispatch({ type: GET_PRODUCTS_INCATEGORY_FAIL, errorMessage: error.message });
  }
};
export const getProductByDepartment = ({
  page = 1, limit = 24,
  description_length = 200,
  id,
} = {}) => async (dispatch) => {
  dispatch({ type: GET_PRODUCTS_INDEPARTMENT_PENDING });
  try {
    const response = await axios.get(`/products/inDepartment/${id}`, {
      params: { page, limit, description_length },
    });
    const { count, rows: products } = response.data;
    dispatch({
      type: GET_PRODUCTS_INDEPARTMENT_PASS, count, products, currentPage: page, pageLimit: limit,
    });
  } catch (error) {
    dispatch({ type: GET_PRODUCTS_INDEPARTMENT_FAIL, errorMessage: error.message });
  }
};
export const getProductDetails = id => async (dispatch) => {
  dispatch({ type: GET_PRODUCT_DETAILS_PENDING });
  try {
    const response = await axios.get(`/products/${id}/details`);
    const product = response.data;
    dispatch({
      type: GET_PRODUCT_DETAILS_PASS, product,
    });
  } catch (error) {
    dispatch({ type: GET_PRODUCT_DETAILS_FAIL, errorMessage: error.message });
  }
};
export const getProductLocation = id => async (dispatch) => {
  dispatch({ type: GET_PRODUCT_LOCATION_PENDING });
  try {
    const response = await axios.get(`/products/${id}/locations`);
    const product = response.data;
    dispatch({
      type: GET_PRODUCT_LOCATION_PASS, product,
    });
  } catch (error) {
    dispatch({ type: GET_PRODUCT_LOCATION_FAIL, errorMessage: error.message });
  }
};
export const getProductReview = id => async (dispatch) => {
  dispatch({ type: GET_PRODUCT_REVIEW_PENDING });
  try {
    const response = await axios.get(`/products/${id}/reviews`);
    const reviews = response.data;
    dispatch({
      type: GET_PRODUCT_REVIEW_PASS, reviews,
    });
  } catch (error) {
    dispatch({ type: GET_PRODUCT_REVIEW_FAIL, errorMessage: error.message });
  }
};
export const createProductReview = ({ id, review, rating }) => async (dispatch) => {
  dispatch({ type: CREATE_PRODUCT_REVIEW_PENDING });
  try {
    await axios.post(`/products/${id}/reviews`, {
      review, rating,
    });
    dispatch({
      type: CREATE_PRODUCT_REVIEW_PASS,
    });
  } catch (error) {
    dispatch({ type: CREATE_PRODUCT_REVIEW_FAIL, errorMessage: error.message });
  }
};
