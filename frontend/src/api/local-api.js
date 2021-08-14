import Axios from 'axios';
import { TOKEN_PATH } from '../const';
import { makeUseAxios } from 'axios-hooks';
import { __API_BASE_URL__ } from 'share/environments';

const axios = Axios.create({
  baseURL: __API_BASE_URL__,
});

// request interceptor to add token to request headers
axios.interceptors.request.use(
  async (config) => {
    const token = localStorage.getItem(TOKEN_PATH);

    if (token) {
      config.headers = {
        authorization: `Bearer ${token}`,
      };
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// response interceptor intercepting 401 responses, refreshing token and retrying the request
// axios.interceptors.response.use(
//   (response) => response,
//   async (error) => {
//     const config = error.config;

//     if (error.response.status === 401 && !config._retry) {
//       config._retry = true;
//       localStorage.setItem('token', await refreshAccessToken());

//       return axios(config);
//     }

//     return Promise.reject(error);
//   }
// );

export const axiosLocal = axios;
export const useAxiosLocal = makeUseAxios({
  axios: axios,
});
