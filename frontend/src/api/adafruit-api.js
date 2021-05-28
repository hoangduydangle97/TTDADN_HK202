import Axios from 'axios';
import { ADAFRUIT_KEY, ADAFRUIT_USER, TOKEN_PATH } from '../const';
import { makeUseAxios } from 'axios-hooks';

const axios = Axios.create({
  baseURL: `https://io.adafruit.com/api/v2/${ADAFRUIT_USER}`,
});

// request interceptor to add token to request headers
axios.interceptors.request.use(
  async (config) => {
    // const token = localStorage.getItem(TOKEN_PATH);

    // if (token) {
    config.headers = {
      'X-AIO-Key': ADAFRUIT_KEY,
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
