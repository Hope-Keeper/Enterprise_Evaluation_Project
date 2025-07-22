import axios from "axios";
import { getConfig } from "./../config";

const createAxiosConfig = () => {
    const config = getConfig(); // Load config dynamically
    const axiosConfig = {
        baseURL: config.VITE_REACT_APP_API_BASE_URL,
        timeout: 9999999999,
        headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Accept-Language": "fa-IR,fa;"
            // "Content-Type": "application/json",
            // "Access-Control-Allow-Origin": "*"
        },
        xsrfHeaderName: "X-CSRFToken",
        xsrfCookieName: "csrftoken"
    };

    const axiosInstance = axios.create(axiosConfig);

    axiosInstance.interceptors.request.use(
        function (config) {
            return config;
        },
        function (error) {
            if (error.response?.status === 401 || error.response?.status === 403) {
                localStorage.clear();
                window.location.replace(config.VITE_REACT_APP_API_BASE_URL);
            }
            return Promise.reject(error);
        }
    );

    axiosInstance.interceptors.response.use(
        function (response) {
            return response;
        },
        function (error) {
            if (error.response?.status === 401 || error.response?.status === 403) {
                localStorage.clear();
                window.location.replace(config.VITE_REACT_APP_API_BASE_URL);
            }
            return Promise.reject(error);
        }
    );
    return axiosInstance;
};
export default createAxiosConfig;
// import axios from "axios";

// const axiosConfig = {
//     baseURL: import.meta.env.VITE_REACT_APP_API_BASE_URL,
//     timeout: 9999999999,
//     headers: {
//         // Authorization: `Bearer ${localStorage.getItem("token")}`,
//         "Accept-Language": "fa-IR,fa;",
//         "Content-Type": "application/json",
//         "Access-Control-Allow-Origin": "*"
//     },
//     withCredentials: true
// };

// const axiosInstance = axios.create(axiosConfig);

// axiosInstance.interceptors.request.use(
//     function (config) {
//         return config;
//     },
//     function (error) {
//         return Promise.reject(error);
//     }
// );

// axiosInstance.interceptors.response.use(
//     function (response) {
//         return response;
//     },
//     function (error) {
//         return Promise.reject(error);
//     }
// );

// export default axiosInstance;

// import axios from "axios";
// const createAxiosConfig = () => {
//     const axiosConfig = {
//         baseURL: import.meta.env.VITE_REACT_APP_API_BASE_URL,
//         timeout: 9999999999,
//         headers: {
//             //Authorization: `Bearer ${localStorage.getItem("token")}`
//             "Accept-Language": "fa-IR,fa;"
//             // "Content-Type": "application/json",
//             // "Access-Control-Allow-Origin": "*"
//         },
//         withCridintials: true

//         //  xsrfHeaderName: "X-CSRFToken",
//         //  xsrfCookieName: "csrftoken"
//     };

//     const axiosInstance = axios.create(axiosConfig);

//     axiosInstance.interceptors.request.use(
//         function (config) {
//             return config;
//         },
//         function (error) {
//             (error);
//             if (error.response.status == 401 || error.response.status == 403) {
//                 localStorage.clear();
//                 window.location.replace(import.meta.env.VITE_REACT_APP_LOGIN_URL);
//             }
//             return Promise.reject(error);
//         }
//     );

//     axiosInstance.interceptors.response.use(
//         function (response) {
//             return response;
//         },
//         function (error) {
//             if (error.response.status == 401 || error.response.status == 403) {
//                 localStorage.clear();
//                 window.location.replace(import.meta.env.VITE_REACT_APP_LOGIN_URL);
//             }
//             return Promise.reject(error);
//         }
//     );
//     return axiosInstance;
// };
// export default createAxiosConfig;
////////////////////////////////////

// import axios, { AxiosInstance } from "axios";

// const createAxiosConfig = () => {
//     const axiosConfig = {
//         baseURL: import.meta.env.VITE_REACT_APP_API_BASE_URL,
//         timeout: 9999999999,
//         headers: {
//             Authorization: `Bearer ${localStorage.getItem("token")}`,
//             "Accept-Language": "fa-IR,fa;"
//             // "X-CSRFToken": `${localStorage.getItem("csrf-token")}`
//         },
//         xsrfHeaderName: "X-CSRFToken",
//         xsrfCookieName: "csrftoken"
//     };
//     const axiosInstance: AxiosInstance = axios.create(axiosConfig);

//     axiosInstance.interceptors.request.use(
//         function (config) {
//             return config;
//         },
//         function (error) {
//             if (error.response.status == 401 || error.response.status == 403) {
//                 localStorage.clear();
//                 window.location.replace(import.meta.env.VITE_REACT_APP_LOGIN_URL);
//             }
//             return Promise.reject(error);
//         }
//     );

//     axiosInstance.interceptors.response.use(
//         function (response) {
//             return response;
//         },
//         function (error) {
//             ("sdfsdfsdfsdf", error);

//             if (error.response.status == 401 || error.response.status == 403) {
//                 localStorage.clear();
//                 window.location.replace(import.meta.env.VITE_REACT_APP_LOGIN_URL);
//             }
//             return Promise.reject(error);
//         }
//     );

//     return axiosInstance;
// };

// export default createAxiosConfig;
