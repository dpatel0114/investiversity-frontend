import stockReducer from './stock';

import { combineReducers } from 'redux';

export default combineReducers({
  stock: stockReducer
});