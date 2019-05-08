import { axiosInstance as axios } from '../actions/rest_client';

export default async () => {
  try {
    const response = await axios.get('/shoppingcart/generateUniqueId');
    const { cart_id } = response.data;
    return cart_id;
  } catch (error) {
    // generateCartId();
  }
  return null;
};
