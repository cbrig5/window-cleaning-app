import axios from "axios"
import { ACCESS_TOKEN } from "./constants"

const isDevelopment = import.meta.env.MODE === 'development';
const baseUrl = isDevelopment ? import.meta.env.VITE_API_BASE_URL : import.meta.env.VITE_API_BASE_URL_PROD;
const website = axios.create({
    baseURL: baseUrl,

});

website.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem(ACCESS_TOKEN);
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }   
)

export default website;
