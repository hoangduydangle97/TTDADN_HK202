import { useState } from 'react';
import { TOKEN_PATH } from '../const';


export default function useToken() {
  const getToken = () => {
    const tokenString = localStorage.getItem(TOKEN_PATH);
    const userToken = JSON.parse(tokenString);
    return userToken;
  };

  const [token, setToken] = useState(getToken());

  const saveToken = (userToken) => {
    localStorage.setItem(TOKEN_PATH, JSON.stringify(userToken));
    setToken(userToken.token);
  };

  const removeToken = () => {
    localStorage.removeItem(TOKEN_PATH)
    setToken(null)
  }

  return [token, saveToken, removeToken];
}
