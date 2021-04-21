import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';

import rootReducer from './reducer'; // the value from combineReducers

const middleware = [];

const store = createStore(rootReducer, applyMiddleware(...middleware, thunk));

export {store};
