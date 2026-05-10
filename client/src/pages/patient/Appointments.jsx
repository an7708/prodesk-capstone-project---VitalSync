    import { useEffect, useState } from 'react';
    import { Link } from 'react-router-dom';
    import api from '../../api/axios';
    import PatientSidebar from '../../components/layout/PatientSidebar';
    import Topbar from '../../components/layout/Topbar';
    import StatusBadge from '../../components/shared/StatusBadge';
    import LoadingSpinner from '../../components/shared/LoadingSpinner';
    import useAuthStore from '../../store/useAuthStore';
    import { formatAppointmentDate } from '../../utils/formatDate';

    export default function Appointments() {
    const { user } = useAuthStore();
    const [appointments, setAppointments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    // Fetch all appointments when the component mounts
    useEffect(() => {
        const fetchAppointments = async () => {
        try {
            const res = await api.get('/appointments');
            setAppointments(res.data.appointments);
        } catch (err) {
            setError('Failed to load appointments.');
        } finally {
            setLoading(false);
        }
        };
        fetchAppointments();
    }, []);

    // OPTIMISTIC DELETE — the most important pattern in this milestone
    const handleCancel = async (appointmentId) => {
        // Step 1: Save the current list in case we need to restore it
        const previousAppointments = appointments;

        // Step 2: Remove from UI immediately — no waiting for the API
        // This is what makes it feel instant
        setAppointments((prev) =>
        prev.map((a) =>
            a._id === appointmentId ? { ...a, status: 'cancelled' } : a
        )
        );

        try {
        // Step 3: Make the actual API call in the background
        await api.delete(`/appointments/${appointmentId}`);
        } catch (err) {
        // Step 4: If the API call fails, restore the original list
        setAppointments(previousAppointments);
        alert('Failed to cancel appointment. Please try again.');
        }
    };

    if (loading) {
        return (
        <div style={{ display: 'flex' }}>
            <PatientSidebar />
            <div style={{ flex: 1 }}>
            <LoadingSpinner message="Loading your appointments..." />
            </div>
        </div>
        );
    }

    const upcoming = appointments.filter((a) => a.status === 'pending' || a.status === 'confirmed');
    const past = appointments.filter((a) => a.status === 'completed' || a.status === 'cancelled');

    return (
        <div style={{ display: 'flex', height: '100vh', fontFamily: 'DM Sans, sans-serif' }}>
        <PatientSidebar />
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
            <Topbar title="My appointments" userName={user?.name} />
            <div style={{ flex: 1, padding: '24px 28px', overflowY: 'auto', background: '#F8FAFC' }}>

            {error && (
                <div style={{ background: '#FEE2E2', border: '1px solid #FECACA', borderRadius: '8px', padding: '12px 16px', color: '#991B1B', fontSize: '13px', marginBottom: '20px' }}>
                {error}
                </div>
            )}

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                <h2 style={{ fontSize: '16px', fontWeight: '600', color: '#0F172A', margin: 0 }}>Upcoming</h2>
                <Link to="/patient/book" style={{ background: '#0D9488', color: '#fff', textDecoration: 'none', borderRadius: '9px', padding: '9px 18px', fontSize: '13px', fontWeight: '600' }}>
                Book new appointment
                </Link>
            </div>

            {upcoming.length === 0 ? (
                <div style={{ background: '#fff', border: '1px solid #F1F5F9', borderRadius: '14px', padding: '40px', textAlign: 'center' }}>
                <p style={{ fontSize: '14px', color: '#94A3B8', margin: 0 }}>No upcoming appointments.</p>
                <Link to="/patient/book" style={{ color: '#0D9488', fontSize: '14px', fontWeight: '500', display: 'inline-block', marginTop: '10px' }}>Book your first appointment</Link>
                </div>
            ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '28px' }}>
                {upcoming.map((appt) => (
                    <AppointmentCard
                    key={appt._id}
                    appointment={appt}
                    onCancel={handleCancel}
                    userRole={user?.role}
                    />
                ))}
                </div>
            )}

            {past.length > 0 && (
                <>
                <h2 style={{ fontSize: '16px', fontWeight: '600', color: '#0F172A', marginBottom: '12px' }}>Past appointments</h2>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    {past.map((appt) => (
                    <AppointmentCard
                        key={appt._id}
                        appointment={appt}
                        onCancel={handleCancel}
                        userRole={user?.role}
                        isPast
                    />
                    ))}
                </div>
                </>
            )}
            </div>
        </div>
        </div>
    );
    }

    // function AppointmentCard({ appointment, onCancel, userRole, isPast }) {
    // const doctor = appointment.doctorId;
    // const patient = appointment.patientId;
    // const isCancelled = appointment.status === 'cancelled';

    // return (
    //     <div style={{ background: '#fff', border: '1px solid #F1F5F9', borderRadius: '14px', padding: '18px 20px', display: 'flex', alignItems: 'flex-start', gap: '16px', opacity: isCancelled ? 0.6 : 1 }}>
    //     <div style={{ flex: 1 }}>
    //         <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '4px' }}>
    //         <span style={{ fontSize: '14px', fontWeight: '600', color: '#0F172A' }}>
    //             {userRole === 'patient' ? `Dr. ${doctor?.name}` : patient?.name}
    //         </span>
    //         <StatusBadge status={appointment.status} />
    //         </div>
    //         <div style={{ fontSize: '13px', color: '#64748B', marginBottom: '4px' }}>
    //         {formatAppointmentDate(appointment.scheduledAt)} · {appointment.duration} min
    //         </div>
    //         <div style={{ fontSize: '13px', color: '#94A3B8' }}>{appointment.reason}</div>
    //     </div>
    //     {!isPast && !isCancelled && userRole === 'patient' && (
    //         <button
    //         onClick={() => onCancel(appointment._id)}
    //         style={{ border: '1px solid #FECACA', background: '#FEF2F2', color: '#DC2626', borderRadius: '8px', padding: '7px 14px', fontSize: '12px', fontWeight: '500', cursor: 'pointer' }}>
    //         Cancel
    //         </button>
    //     )}
    //     </div>
        function AppointmentCard({ appointment, onCancel, userRole, isPast }) {
    const doctor = appointment.doctorId;
    const patient = appointment.patientId;
    const isCancelled = appointment.status === 'cancelled';

    return (
        <div style={{
        background: '#fff',
        border: '1px solid #F1F5F9',
        borderRadius: '14px',
        padding: '16px 18px',
        opacity: isCancelled ? 0.6 : 1,
        }}>
        {/* Top row — name and badge */}
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '10px', marginBottom: '6px', flexWrap: 'wrap' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
            <span style={{ fontSize: '14px', fontWeight: '600', color: '#0F172A' }}>
                {userRole === 'patient' ? `Dr. ${doctor?.name}` : patient?.name}
            </span>
            <StatusBadge status={appointment.status} />
            </div>
            {!isPast && !isCancelled && userRole === 'patient' && (
            <button
                onClick={() => onCancel(appointment._id)}
                style={{ border: '1px solid #FECACA', background: '#FEF2F2', color: '#DC2626', borderRadius: '8px', padding: '6px 12px', fontSize: '12px', fontWeight: '500', cursor: 'pointer', flexShrink: 0 }}>
                Cancel
            </button>
            )}
        </div>
        <div style={{ fontSize: '13px', color: '#64748B', marginBottom: '3px' }}>
            {formatAppointmentDate(appointment.scheduledAt)} · {appointment.duration} min
        </div>
        <div style={{ fontSize: '13px', color: '#94A3B8' }}>{appointment.reason}</div>
        </div>
        );
        }