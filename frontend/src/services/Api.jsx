import axios from "axios";

const apiInstance = axios.create({
    baseURL:"https://chat-application-0kcn.onrender.com/api",
    withCredentials:true
});


// Response interceptor
apiInstance.interceptors.response.use(

    (response) => {
        return response;
    },


    async(error) => {

        const originalRequest = error.config;


        if(
            error.response?.status === 401 &&
            !originalRequest._retry
        ){

            originalRequest._retry = true;

            try{

                // refresh token se new access token
                await apiInstance.get("/auth/getAccessToken");


                // failed request dobara bhej do
                return apiInstance(originalRequest);


            }catch(err){

                // refresh token bhi expire ho gaya
                window.location.href = "/";

            }

        }


        return Promise.reject(error);

    }

);


export default apiInstance;