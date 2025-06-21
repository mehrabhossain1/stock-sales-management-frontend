import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:7001/api",
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
