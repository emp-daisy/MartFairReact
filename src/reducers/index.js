import { combineReducers } from 'redux';
import product from './product';
import department from './department';
import customer from './customer';
import cart from './cart';
import order from './order';

const rootReducer = combineReducers({
  product,
  department,
  customer,
  cart,
  order,
});

export default rootReducer;
