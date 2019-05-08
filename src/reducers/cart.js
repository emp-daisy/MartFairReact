import {
  ADD_TO_CART_PENDING, ADD_TO_CART_PASS, ADD_TO_CART_FAIL,
  GET_CART_PRODUCTS_PENDING, GET_CART_PRODUCTS_PASS, GET_CART_PRODUCTS_FAIL,
  UPDATE_CART_QUANTITY_PENDING, UPDATE_CART_QUANTITY_PASS, UPDATE_CART_QUANTITY_FAIL,
  EMPTY_CART_PENDING, EMPTY_CART_PASS, EMPTY_CART_FAIL,
  REMOVE_FROM_CART_PENDING, REMOVE_FROM_CART_PASS, REMOVE_FROM_CART_FAIL,
  TOTAL_CART_PENDING, TOTAL_CART_PASS, TOTAL_CART_FAIL,
  MOVE_TO_CART_PENDING, MOVE_TO_CART_PASS, MOVE_TO_CART_FAIL,
  GET_WISHLIST_PENDING, GET_WISHLIST_PASS, GET_WISHLIST_FAIL,
  ADD_TO_GET_WISHLIST_PENDING, ADD_TO_GET_WISHLIST_PASS, ADD_TO_GET_WISHLIST_FAIL,
} from '../action_types';

const initialState = {
  loggedIn: false,
  loading: false,
  cartProducts: [],
  wishlistProducts: [],
  error: false,
  errorMessage: '',
  totalAmount: 0,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_CART_PRODUCTS_PENDING:
      return {
        ...state,
        loading: true,
        error: false,
        errorMessage: '',
      };
    case GET_CART_PRODUCTS_PASS:
      return {
        ...state,
        loading: false,
        cartProducts: action.cart,
      };
    case GET_CART_PRODUCTS_FAIL:
      return {
        ...state,
        loading: false,
        error: true,
        errorMessage: action.errorMessage,
      };
    case ADD_TO_CART_PENDING:
      return {
        ...state,
        loading: true,
        error: false,
        errorMessage: '',
      };
    case ADD_TO_CART_PASS:
      return {
        ...state,
        loading: false,
        cartProducts: action.cart,
      };
    case ADD_TO_CART_FAIL:
      return {
        ...state,
        loading: false,
        error: true,
        errorMessage: action.errorMessage,
      };
    case UPDATE_CART_QUANTITY_PENDING:
      return {
        ...state,
        loading: true,
        error: false,
        errorMessage: '',
      };
    case UPDATE_CART_QUANTITY_PASS:
      return {
        ...state,
        loading: false,
        cartProducts: action.cart,
      };
    case UPDATE_CART_QUANTITY_FAIL:
      return {
        ...state,
        loading: false,
        error: true,
        errorMessage: action.errorMessage,
      };
    case REMOVE_FROM_CART_PENDING:
      return {
        ...state,
        loading: true,
        error: false,
        errorMessage: '',
      };
    case REMOVE_FROM_CART_PASS:
      return {
        ...state,
        loading: false,
        cartProducts: state.cartProducts
          .filter(item => item.item_id.toString() !== action.id.toString()),
      };
    case REMOVE_FROM_CART_FAIL:
      return {
        ...state,
        loading: false,
        error: true,
        errorMessage: action.errorMessage,
      };
    case EMPTY_CART_PENDING:
      return {
        ...state,
        loading: true,
        error: false,
        errorMessage: '',
      };
    case EMPTY_CART_PASS:
      return {
        ...state,
        loading: false,
        cartProducts: [],
      };
    case EMPTY_CART_FAIL:
      return {
        ...state,
        loading: false,
        error: true,
        errorMessage: action.errorMessage,
      };
    case TOTAL_CART_PENDING:
      return {
        ...state,
        loading: true,
        error: false,
        errorMessage: '',
      };
    case TOTAL_CART_PASS:
      return {
        ...state,
        loading: false,
        totalAmount: action.total,
      };
    case TOTAL_CART_FAIL:
      return {
        ...state,
        loading: false,
        error: true,
        errorMessage: action.errorMessage,
      };
    case MOVE_TO_CART_PENDING:
      return {
        ...state,
        loading: true,
        error: false,
        errorMessage: '',
      };
    case MOVE_TO_CART_PASS: {
      return {
        ...state,
        loading: false,
        cartProducts: action.cart,
        wishlistProducts: state.wishlistProducts
          .filter(item => item.item_id.toString() !== action.id.toString()),
      };
    }
    case MOVE_TO_CART_FAIL:
      return {
        ...state,
        loading: false,
        error: true,
        errorMessage: action.errorMessage,
      };
    case GET_WISHLIST_PENDING:
      return {
        ...state,
        loading: true,
        error: false,
        errorMessage: '',
      };
    case GET_WISHLIST_PASS:
      return {
        ...state,
        loading: false,
        wishlistProducts: action.saved,
      };
    case GET_WISHLIST_FAIL:
      return {
        ...state,
        loading: false,
        error: true,
        errorMessage: action.errorMessage,
      };
    case ADD_TO_GET_WISHLIST_PENDING:
      return {
        ...state,
        loading: true,
        error: false,
        errorMessage: '',
      };
    case ADD_TO_GET_WISHLIST_PASS:
      return {
        ...state,
        loading: false,
        cartProducts: state.cartProducts
          .filter(item => item.item_id.toString() !== action.id.toString()),
      };
    case ADD_TO_GET_WISHLIST_FAIL:
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
