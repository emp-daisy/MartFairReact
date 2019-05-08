import axios from '../actions/rest_client';
import { TOKEN_KEY, CART_KEY } from './constant';

export const saveUserToken = (token) => {
  localStorage.setItem(TOKEN_KEY, token.split(' ')[1]);
};

export const getUserToken = () => localStorage.getItem(TOKEN_KEY);

export const removeUserToken = () => {
  localStorage.removeItem(TOKEN_KEY);
};

export const saveCartId = (id) => {
  localStorage.setItem(CART_KEY, id);
};

export const getCartId = async () => {
  let cartId = localStorage.getItem(CART_KEY);
  if (cartId === null) {
    try {
      const response = await axios.get('/shoppingcart/generateUniqueId');
      const { cart_id } = response.data;
      saveCartId(cart_id);
      cartId = cart_id;
    } catch (error) {
      cartId = null;
    }
  }
  return cartId;
};

export const removeCartId = () => {
  localStorage.removeItem(CART_KEY);
};
