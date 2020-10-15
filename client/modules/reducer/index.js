import { combineReducers } from 'redux';
import loginStatus from './actions/loginStatus';

const rootReducer = combineReducers({
  loginStatus,
});

export default rootReducer;
