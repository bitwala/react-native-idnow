import axios from 'axios';
import I18n from '../i18n';

import {getHeaders, getBaseUrl} from './AuthHelper';

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
