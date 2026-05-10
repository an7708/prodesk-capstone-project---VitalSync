    import { useNavigate } from 'react-router-dom';
    import useAuthStore from '../store/useAuthStore';

    export const useAuth = () => {
    const navigate = useNavigate();
    const { user, token, isAuthenticated, login, logout } = useAuthStore();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    const redirectToDashboard = () => {
        if (user?.role === 'doctor') {
        navigate('/doctor/dashboard');
        } else {
        navigate('/patient/dashboard');
        }
    };

    return { user, token, isAuthenticated, login, logout: handleLogout, redirectToDashboard };
    };