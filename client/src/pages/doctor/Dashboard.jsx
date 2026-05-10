    import useAuthStore from '../../store/useAuthStore';

    export default function DoctorDashboard() {
    const { user } = useAuthStore();
    return (
        <div style={{ padding: '40px', fontFamily: 'sans-serif' }}>
        <h2>Doctor Dashboard</h2>
        <p>Welcome, {user?.name}</p>
        </div>
    );
    }