import axios from 'axios';
import getErrorMessage from '../utils/errorHandler';
import { TOKEN_KEY } from '../utils/constant';

export const axiosInstance = axios.create({
  baseURL: 'http://localhost:3000/v1/',
  headers: {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
  },
});

const axios_setup = () => {
  const instance = axiosInstance;
  // Set the token for any request
  instance.interceptors.request.use((configure) => {
    const token = localStorage.getItem(TOKEN_KEY);
    const config = configure;
    config.headers['user-key'] = token ? `Bearer ${token}` : '';
    return config;
  });
  instance.interceptors.response.use(response => response,
    (error) => {
      const customError = error;
      customError.message = getErrorMessage(error);
      Promise.reject(customError);
    });
  return instance;
};

export default axios_setup();
