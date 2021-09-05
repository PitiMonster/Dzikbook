import axios from 'axios';

const api = axios.create({
  baseURL: process.env.REACT_APP_SERVER_ADDR,
});

axios.interceptors.request.use((config) => {
  config.headers.authorization =
    'Bearer ' + localStorage.getItem('token') ?? null;
  return config;
});

axios.interceptors.response.use((response) => {
  return response;
});

export default api;
