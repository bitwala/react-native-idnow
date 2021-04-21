import {combineReducers} from 'redux';

import auth from './auth';

const rootReducer = combineReducers({
  auth,
});

export default (state, action) => rootReducer(state, action);
