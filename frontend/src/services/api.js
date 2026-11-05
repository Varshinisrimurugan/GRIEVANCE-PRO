import axios from "axios";

const api = axios.create({

    baseURL: "http://localhost:8081",

    headers: {

        "Content-Type": "application/json"

    }

});

// ==========================================
// Add JWT Token Automatically
// ==========================================

api.interceptors.request.use(

    (config) => {

        const token = localStorage.getItem("token");

        if (token) {

            config.headers.Authorization = `Bearer ${token}`;

        }

        return config;

    },

    (error) => {

        return Promise.reject(error);

    }

);

// ==========================================
// Response Interceptor
// ==========================================

api.interceptors.response.use(

    (response) => {

        return response;

    },

    (error) => {

        if (error.response) {

            console.log("API Error :", error.response.status);

            if (error.response.status === 401) {

                console.log("Unauthorized");

            }

            if (error.response.status === 403) {

                console.log("Access Denied");

            }

            if (error.response.status === 404) {

                console.log("API Not Found");

            }

            if (error.response.status === 500) {

                console.log("Internal Server Error");

            }

        }

        return Promise.reject(error);

    }

);

export default api;