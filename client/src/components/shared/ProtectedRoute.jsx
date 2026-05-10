    import { Navigate } from 'react-router-dom';
    import useAuthStore from '../../store/useAuthStore';

    export default function ProtectedRoute({ children, allowedRole }) {
    const { isAuthenticated, user } = useAuthStore();

    if (!isAuthenticated) {
        return <Navigate to="/login" replace />;
    }

    if (allowedRole && user?.role !== allowedRole) {
        return <Navigate to={`/${user?.role}/dashboard`} replace />;
    }

    return children;
    }
    
    
    
    // import { Navigate } from 'react-router-dom';
        // import useAuthStore from '../../store/useAuthStore';
        // import { useEffect, useState } from 'react';

        // export default function ProtectedRoute({ children, allowedRole }) {
        // const { isAuthenticated, user, _hasHydrated } = useAuthStore();

        // // Zustand persist rehydrates on the next tick after mount.
        // // We block rendering until that tick completes.
        // const [isHydrated, setIsHydrated] = useState(false);

        // useEffect(() => {
        //     const timer = setTimeout(() => setIsHydrated(true), 0);
        //     return () => clearTimeout(timer);
        // }, []);

        //     if (!_hasHydrated) {
        //     return <div>Loading...</div>;
        // }

        // if (!isAuthenticated) {
        //     return <Navigate to="/login" replace />;
        // }

        // if (allowedRole && user?.role?.toLowerCase() !== allowedRole.toLowerCase())
        // return <Navigate to={
        //     user?.role === 'doctor'
        //         ? '/doctor/dashboard'
        //         : '/patient/dashboard'
        //     } replace />;
        // }

        // return children;