import axios from 'axios';
import store from '../store';

// configure base url
const instance = axios.create({
  baseURL: '/api/v1',
});

// intercept requests and add authorization token
instance.interceptors.request.use((config) => {
  const { token } = store.getState().auth;
  if (token) {
    config.headers.token = token;
  } else {
    config.headers.token = localStorage.getItem('token');
  }
  return config;
});

// intercept response and reload page
// if request error is caused by an expired token
instance.interceptors.response.use(
  res => res,
  (err) => {
    const { response: { status, data } } = err;
    if (status === 403 &&
      data.message === 'expired user authorization token'
    ) {
      window.location.reload();
    }

    return Promise.reject(err);
  }
);

export default instance;
