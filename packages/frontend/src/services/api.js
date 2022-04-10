import axios from 'axios';

const baseURL = "http://localhost:3333";

const api = axios.create({
    baseURL: baseURL,
    headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json',
    }
})

api.interceptors.request.use(
    config => {
        config.headers['Authorization'] = `Bearer ${localStorage.getItem('@userToken')}`;

        return config;
    },
    error => {
        return Promise.reject(error)
    },
)

export default api;
