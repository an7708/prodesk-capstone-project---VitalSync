    import axios from 'axios';
    import useAuthStore from '../store/useAuthStore';

    const api = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
    });

    // api.interceptors.request.use((config) => {
    // const token = localStorage.getItem('vitalsync_token');
    // if (token) {
    //     config.headers.Authorization = `Bearer ${token}`;
    // }
    // return config;
    // });
    api.interceptors.request.use((config) => {
    const token = useAuthStore.getState().token;

    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
    });

    api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
        localStorage.removeItem('vitalsync_token');
        localStorage.removeItem('vitalsync_user');
        window.location.href = '/login';
        }
        return Promise.reject(error);
    }
    );

    export default api;