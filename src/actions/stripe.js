import axios from './rest_client';
import {
  GET_CHARGE_PENDING, GET_CHARGE_PASS, GET_CHARGE_FAIL,
} from '../action_types';

// eslint-disable-next-line import/prefer-default-export
export const createCharge = ({
  stripeToken, order_id, description, amount, currency = 'USD',
}) => async (dispatch) => {
  dispatch({ type: GET_CHARGE_PENDING });
  try {
    const response = await axios.post('/shipping/regions', {
      stripeToken, order_id, description, amount, currency,
    });
    const stripe = response.data;
    dispatch({
      type: GET_CHARGE_PASS, stripe,
    });
  } catch (error) {
    dispatch({ type: GET_CHARGE_FAIL, errorMessage: error.message });
  }
};
