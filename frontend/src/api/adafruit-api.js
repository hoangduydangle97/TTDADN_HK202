import Axios from 'axios';
import { makeUseAxios } from 'axios-hooks';
import { __ADAFRUIT_KEY__, __ADAFRUIT_USER__ } from '../share/environments';

const axios = Axios.create({
  baseURL: `https://io.adafruit.com/api/v2/${__ADAFRUIT_USER__}`,
});

// request interceptor to add token to request headers
axios.interceptors.request.use(
  async (config) => {
    // const token = localStorage.getItem(TOKEN_PATH);

    // if (token) {
    config.headers = {
      'X-AIO-Key': __ADAFRUIT_KEY__,
    };
    // }
    return config;
  },
  (error) => Promise.reject(error)
);

export const axiosAdafruit = axios;
export const useAxiosAdafruit = makeUseAxios({
  axios: axios,
});
