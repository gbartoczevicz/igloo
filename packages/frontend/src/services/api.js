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

api.interceptors.response.use(
    response => {
        return response;
    },
    error => {
        if (error.response.status === 401) {
            localStorage.clear();
            if(window.location.pathname !== '/') {
                window.location.reload();
            }
        } 
        return Promise.reject(error)
    }
)

export default api;
