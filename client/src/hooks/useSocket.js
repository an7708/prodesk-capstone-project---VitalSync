    import { useEffect, useRef } from 'react';
    import { io } from 'socket.io-client';
    import useDoctorStore from '../store/useDoctorStore';

    export const useSocket = () => {
    const socketRef = useRef(null);
    const updateDoctorStatus = useDoctorStore((s) => s.updateDoctorStatus);

    useEffect(() => {
        socketRef.current = io(process.env.REACT_APP_SOCKET_URL);

        socketRef.current.on('doctor:status', ({ doctorId, status }) => {
        updateDoctorStatus(doctorId, status);
        });

        return () => {
        socketRef.current.disconnect();
        };
    }, [updateDoctorStatus]);

    return socketRef.current;
    };