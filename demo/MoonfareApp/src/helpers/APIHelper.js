import axios from 'axios';

import {API_URL} from '../constants/url';
import I18n from '../i18n';

import {getHeaders} from './AuthHelper';

import {store} from '../store';
import {getBaseUrl} from './UrlHelper';

const parseErrorCode = error => {
  if (error.response) {
    if (error.response.status === 401) {
      //dispatch logout
    } else if (error.response.status === 404) {
      const {message} = error.response.data;
      console.log(message);
    }
  } else {
    console.log({message: I18n.t('ERRORS.COMMON_ERROR')});
  }

  return Promise.reject(error.response);
};

const API = axios.create();

// Request parsing interceptor
API.interceptors.request.use(
  async config => {
    const headers = await getHeaders();
    config.baseURL = await getBaseUrl();
    if (headers) {
      config.headers = headers;
      const {accountId} = headers;
      if (accountId) {
        config.url = `${API_URL}accounts/${accountId}/${config.url}`;
      }
    }
    return config;
  },
  error => Promise.reject(error),
);

// Response parsing interceptor
API.interceptors.response.use(
  response => response,
  error => parseErrorCode(error),
);

export default API;
