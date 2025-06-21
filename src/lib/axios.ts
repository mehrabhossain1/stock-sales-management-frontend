import axios from "axios";

const api = axios.create({
    baseURL: "https://stock-sales-management-backend.onrender.com/api",
});

api.interceptors.request.use(
    (config) => {
        const user = JSON.parse(localStorage.getItem("user") || "null");
        if (user?.token) {
            config.headers.Authorization = `Bearer ${user.token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

export { api };
