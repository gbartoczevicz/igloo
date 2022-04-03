import axios from 'axios';

const baseURL = "http://localhost:3333";

const api = axios.create({
    baseURL: baseURL,
    headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json',
    }
})

export default api;
