import axios from 'axios';

const api = axios.create({
  baseURL: process.env.REACT_APP_SERVER_ADDR,
});

api.interceptors.request.use((config) => {
  console.log(localStorage.getItem('token'));
  config.headers.authorization =
    'Bearer ' + localStorage.getItem('token') ?? null;
  return config;
});

api.interceptors.response.use((response) => {
  return response;
});

export default api;
