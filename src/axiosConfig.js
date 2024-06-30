// src/axiosConfig.js
import axios from 'axios';

axios.defaults.baseURL = 'http://127.0.0.1:8000'; // 确保指向正确的API基础URL
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
