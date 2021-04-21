import APIHelper from '../helpers/APIHelper';
import axios from 'axios';
import {
  LOGIN,
  LOGIN_ERROR,
  LOGIN_SUCCESS,
  SET_AUTH_HEADER,
} from '../constants/actions';
import I18n from '../i18n';
import {getHeaders} from '../helpers/AuthHelper';
import {getBaseUrl} from '../helpers/UrlHelper';

import {API_URL} from '../constants/url';
import {showToast} from '../helpers/ToastHelper';

export const doLogin = ({email, password}) => async dispatch => {
  try {
    dispatch({type: LOGIN});
    const response = await APIHelper.post('auth/sign_in', {email, password});
    const {data} = response.data;
    const {name: username, id, account_id} = data;
    // Check user has any account
    if (account_id) {
      dispatch({type: SET_AUTH_HEADER, payload: response.headers});
      dispatch({type: LOGIN_SUCCESS, payload: data});
    } else {
      showToast({message: I18n.t('ERRORS.NO_ACCOUNTS_MESSAGE')});
      dispatch({type: LOGIN_ERROR, payload: ''});
    }
  } catch (error) {
    if (error && error.status === 401) {
      showToast({message: I18n.t('ERRORS.AUTH')});
    }
    dispatch({type: LOGIN_ERROR, payload: error});
  }
};

export const setAccount = ({accountId}) => async dispatch => {
  dispatch({type: SET_ACCOUNT, payload: accountId});
};

export const updateAvailabilityStatus = ({availability}) => async dispatch => {
  dispatch({type: UPDATE_ACTIVITY_STATUS});
  try {
    const headers = await getHeaders();
    const baseUrl = await getBaseUrl();

    await axios.put(
      `${baseUrl}${API_URL}profile`,
      {
        availability,
      },
      {
        headers: headers,
      },
    );

    dispatch({
      type: UPDATE_ACTIVITY_STATUS_SUCCESS,
      payload: availability,
    });
  } catch (error) {
    dispatch({type: UPDATE_ACTIVITY_STATUS_ERROR, payload: error});
  }
};
