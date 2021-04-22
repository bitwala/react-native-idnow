import {LOGIN_SUCCESS, LOGIN_ERROR, UPDATE_USER} from '../constants/actions';
import {startVideoVerification} from '../helpers/IDNowHelper';

export const initialState = {
  user: {},
  headers: {},
  isLoggedIn: false,
  isResettingPassword: false,
  isUpdating: true,
  error: {},
  success: {},
};

export default async (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_SUCCESS:
      const option = {
        showVideoOverviewCheck: true,
        transactionToken: action.payload.attributes.sessionId,
        environment: 'TEST',
      };
      await startVideoVerification(option);
      return {
        ...state,
        isLoggedIn: true,
        user: action.payload,
        error: {},
        success: {},
      };
    case LOGIN_ERROR:
      return {
        ...state,
        isLoggedIn: false,
        error: action.payload,
        user: null,
        success: {},
      };

    case UPDATE_USER:
      return {
        ...state,
        user: action.payload,
      };

    default:
      return state;
  }
};
