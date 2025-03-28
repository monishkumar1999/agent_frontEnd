import axios from "axios";
import server from "../admin/assets/constant";


const axiosInstance = axios.create({
  baseURL: server,
  withCredentials: true, // Ensures cookies (JWT) are sent
  headers: { "Content-Type": "application/json" },
});

// Interceptor to handle JWT expiry
axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response && error.response.status === 401) {
      localStorage.removeItem("token"); // Remove stored JWT
      alert("Session expired. Redirecting to login.");
      window.location.href = "/register"; // Redirect to login page
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
