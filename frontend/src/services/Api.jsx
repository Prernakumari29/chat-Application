import axios from "axios";

const apiInstance = axios.create({
    baseURL:"https://chat-application-0kcn.onrender.com/api",
    withCredentials:true
});

apiInstance.interceptors.response.use(
    (response) => response,

    async(error) => {

        const originalRequest = error.config;

        if(
            error.response?.status === 401 &&
            !originalRequest._retry &&
            !originalRequest.url.includes("/auth/getAccessToken")
        ){

            originalRequest._retry = true;

            try{

                await apiInstance.get("/auth/getAccessToken");

                return apiInstance(originalRequest);

            }catch(err){

                console.log("Refresh token expired");
                return Promise.reject(err);

            }
        }

        return Promise.reject(error);
    }
);

export default apiInstance;