import axios from "axios";
import server from "../admin/assets/constant";

const axiosInstance = axios.create({
    baseURL: server,
    withCredentials: true, 
    headers: { "Content-Type": "application/json" }
});


axiosInstance.interceptors.response.use(
    response => {
        return response;
    },
    error => {
        if (error.response && error.response.status === 401) {
            localStorage.removeItem("token"); 
            alert("Session expired. Redirecting to login.");
            window.location.href = "/login"; 
        }

        return Promise.reject(error);
    }
);

export default axiosInstance;
