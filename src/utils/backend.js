import axios from 'axios';
import Cookies from 'js-cookie';
const baseURL = 'https://api-word2wp.sunshine.software/api';

export const backendRequest = axios.create({
    baseURL: baseURL,
});

backendRequest.interceptors.request.use(
    async (config) => {
        const token = Cookies.get("wp_tool_cookie")
        if(token){
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    },
);

export const getDataRequest = async (path, option = {}) => {
    try {
        let response = await backendRequest.get(path, option);
        return response.data;
    } catch (e) {
        if (e.response && e.response.data) {
            return e.response.data;
        }
        throw e;
    }
};

export const postDataRequest = async (path, option = {}) => {
    try {
        let response = await backendRequest.post(path, option);
        return response.data;
    } catch (e) {
        if (e.response && e.response.data) {
            return e.response.data;
        }
        throw e;
    }
};