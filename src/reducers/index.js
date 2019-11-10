import { combineReducers } from 'redux';
import product from './product';
import attribute from './attribute';
import department from './department';
import customer from './customer';
import cart from './cart';
import order from './order';
import shipping from './shipping';

const rootReducer = combineReducers({
  product,
  attribute,
  department,
  customer,
  cart,
  order,
  shipping,
});

export default rootReducer;
