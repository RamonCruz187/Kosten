import axios from 'axios';

const API_URL = 'http://localhost:8080/api';
// const API_URL_PROD = 'https://kostentours-api-10061c08f8f8.herokuapp.com';
const API_URL_PROD = 'https://kosten.up.railway.app';

export const login = ( body ) => {
  return axios.post(`${API_URL_PROD}/auth/login`, body );
};

export const register = ( body ) => {
  return axios.post(`${API_URL_PROD}/auth/register`, body );
};
