import axios from "axios"

const isDevelopment = import.meta.env.MODE === 'development';
const baseUrl = isDevelopment ? import.meta.env.VITE_API_BASE_URL : import.meta.env.VITE_API_BASE_URL_PROD;
const publicWebsite = axios.create({
    baseURL: baseUrl,
    headers: {
        "content-Type": "application/json",
        accept: "application/json",
    }
});

export default publicWebsite;
