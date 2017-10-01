import axios from 'axios';
import store from '../store';

// configure base url
const instance = axios.create({
  baseURL: '/api/v1',
});

// intercept requests and add authorization token
instance.interceptors.request.use((config) => {
  const token = store.getState().auth.token;
  if (token) {
    config.headers.token = token;
  }
  return config;
});

export default instance;
