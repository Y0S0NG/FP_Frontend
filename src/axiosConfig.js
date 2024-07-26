// src/axiosConfig.js
import axios from 'axios';

axios.defaults.baseURL = 'https://msn-family-program-71051663721a.herokuapp.com/';
axios.interceptors.request.use(
    config => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    error => Promise.reject(error)
);

export default axios;
