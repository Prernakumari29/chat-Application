import axios from "axios";

const apiInstance = axios.create({
    baseURL: "http://localhost:3000/api",
    withCredentials: true
});

apiInstance.interceptors.response.use(
    (response) => response,

    async (error) => {

        const originalRequest = error.config;


        // login/register par refresh mat karo
        if (
            originalRequest.url.includes("/auth/login") ||
            originalRequest.url.includes("/auth/register") ||
            originalRequest.url.includes("/auth/getAccessToken")
        ) {
            return Promise.reject(error);
        }


        if (
            error.response?.status === 401 &&
            !originalRequest._retry
        ) {

            originalRequest._retry = true;

            try {

                await apiInstance.get("/auth/getAccessToken");

                return apiInstance(originalRequest);

            } catch (err) {

                console.log("Refresh token expired");

            }
        }

        return Promise.reject(error);

    })

export default apiInstance;