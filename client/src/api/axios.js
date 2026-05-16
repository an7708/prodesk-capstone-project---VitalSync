    import axios from 'axios';

    const api = axios.create({
    baseURL: process.env.REACT_APP_API_URL || 'https://prodesk-capstone-project-vitalsync.onrender.com/api'
    //timeout: 15000,
    });
    
    api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
        
        // Important: Login request pe 401 aaye toh mat logout karo
        const requestUrl = error.config?.url || '';
        if (requestUrl.includes('/login') || requestUrl.includes('/auth/login')) {
            return Promise.reject(error);
        }

        // Baaki cases mein hi logout
        console.log("401 Error - Logging out...");
        localStorage.removeItem('vitalsync_token');
        localStorage.removeItem('vitalsync_user');
        window.location.href = '/login';
        }
        return Promise.reject(error);
    }
    );
    // api.interceptors.response.use(
    // (response) => response,
    // (error) => {
    //     if (error.response?.status === 401) {
        
    //     const url = error.config?.url || '';
    //     if (url.includes('/login') || url.includes('/auth/login')) {
    //         return Promise.reject(error);
    //     }

    //     localStorage.removeItem('vitalsync_token');
    //     localStorage.removeItem('vitalsync_user');
    //     window.location.href = '/login';
    //     }
    //     return Promise.reject(error);
    // }
    // );

    // api.interceptors.request.use((config) => {
    // const token = localStorage.getItem('vitalsync_token');
    // if (token) {
    //     config.headers.Authorization = `Bearer ${token}`;
    // }
    // return config;
    // });

    // api.interceptors.response.use(
    // (response) => response,
    // (error) => {
    //     if (error.response?.status === 401) {
    //     localStorage.removeItem('vitalsync_token');
    //     localStorage.removeItem('vitalsync_user');
    //     window.location.href = '/login';
    //     }
    //     return Promise.reject(error);
    // }
    // );
//     api.interceptors.response.use(
//     (response) => response,
//     (error) => {
//         if (error.response?.status === 401) {
//         const isLoginRequest = error.config?.url?.includes('/login') || 
//                                 error.config?.url?.includes('/auth/login');

//         if (!isLoginRequest) {
//             localStorage.removeItem('vitalsync_token');
//             localStorage.removeItem('vitalsync_user');
//             window.location.href = '/login';
//         }
//         }
//         return Promise.reject(error);
//     }
// );

    export default api;