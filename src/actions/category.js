import axios from './rest_client';
import {
  GET_CATEGORIES_PENDING, GET_CATEGORIES_PASS, GET_CATEGORIES_FAIL,
  GET_CATEGORY_PENDING, GET_CATEGORY_PASS, GET_CATEGORY_FAIL,
  GET_CATEGORY_INDEPARTMENT_PENDING, GET_CATEGORY_INDEPARTMENT_PASS, GET_CATEGORY_INDEPARTMENT_FAIL,
  GET_CATEGORY_INPRODUCT_PENDING, GET_CATEGORY_INPRODUCT_PASS, GET_CATEGORY_INPRODUCT_FAIL,
} from '../action_types';

export const getCategories = () => async (dispatch) => {
  dispatch({ type: GET_CATEGORIES_PENDING });
  try {
    const response = await axios.get('/categories');
    const categories = response.data;
    dispatch({
      type: GET_CATEGORIES_PASS, categories,
    });
  } catch (error) {
    dispatch({ type: GET_CATEGORIES_FAIL, errorMessage: error.message });
  }
};
export const getCategory = id => async (dispatch) => {
  dispatch({ type: GET_CATEGORY_PENDING });
  try {
    const response = await axios.get(`/categories/${id}`);
    const category = response.data;
    dispatch({
      type: GET_CATEGORY_PASS, category,
    });
  } catch (error) {
    dispatch({ type: GET_CATEGORY_FAIL, errorMessage: error.message });
  }
};
export const getCategoriesForProduct = id => async (dispatch) => {
  dispatch({ type: GET_CATEGORY_INPRODUCT_PENDING });
  try {
    const response = await axios.get(`/categories/inProduct/${id}`);
    const category = response.data;
    dispatch({
      type: GET_CATEGORY_INPRODUCT_PASS, category,
    });
  } catch (error) {
    dispatch({ type: GET_CATEGORY_INPRODUCT_FAIL, errorMessage: error.message });
  }
};
export const getCategoriesForDepartment = id => async (dispatch) => {
  dispatch({ type: GET_CATEGORY_INDEPARTMENT_PENDING });
  try {
    const response = await axios.get(`/categories/inDepartment/${id}`);
    const category = response.data;
    dispatch({
      type: GET_CATEGORY_INDEPARTMENT_PASS, category,
    });
  } catch (error) {
    dispatch({ type: GET_CATEGORY_INDEPARTMENT_FAIL, errorMessage: error.message });
  }
};
