//     import { useEffect, useState } from 'react';
//     import { useNavigate } from 'react-router-dom';
//     import api from '../../api/axios';
//     import useAuthStore from '../../store/useAuthStore';
//     import PatientSidebar from '../../components/layout/PatientSidebar';
//     import Topbar from '../../components/layout/Topbar';
//     import StatCard from '../../components/shared/StatCard';
//     import LoadingSpinner from '../../components/shared/LoadingSpinner';
//     import AISuggest from '../../components/patient/AISuggest';

//     export default function PatientDashboard() {
//     const { user } = useAuthStore();
//     const navigate = useNavigate();
//     const [sidebarOpen, setSidebarOpen] = useState(false);
//     const [stats, setStats] = useState(null);
//     const [doctors, setDoctors] = useState([]);
//     const [loading, setLoading] = useState(true);

//     useEffect(() => {
//         const fetchDashboardData = async () => {
//         try {
//             const doctorsRes = await api.get('/doctors');
//             setDoctors(doctorsRes.data.doctors || []);
//             setStats({ upcomingAppointments: 0, activePrescriptions: 0, lastVisit: 'No visits yet' });
//         } catch (err) {
//             setDoctors([
//             { _id: '1', name: 'Dr. A. Patel', specialty: 'General Physician', availabilityStatus: 'online' },
//             { _id: '2', name: 'Dr. S. Rao', specialty: 'Cardiologist', availabilityStatus: 'busy' },
//             { _id: '3', name: 'Dr. M. Khan', specialty: 'Neurologist', availabilityStatus: 'offline' },
//             ]);
//             setStats({ upcomingAppointments: 0, activePrescriptions: 0, lastVisit: 'No visits yet' });
//         } finally {
//             setLoading(false);
//         }
//         };
//         fetchDashboardData();
//     }, []);

//     const statusColor = (s) => s === 'online' ? '#10B981' : s === 'busy' ? '#F59E0B' : '#EF4444';
//     const statusLabel = (s) => s === 'online' ? 'Available now' : s === 'busy' ? 'Busy' : 'Unavailable';

//     if (loading) return (
//         <div className="app-shell">
//         <PatientSidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
//         <div className="main-content"><LoadingSpinner message="Loading dashboard..." /></div>
//         </div>
//     );

//     return (
//         <div className="app-shell">
//         <PatientSidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
//         <div className="main-content">
//             <Topbar title="Dashboard" userName={user?.name} onMenuClick={() => setSidebarOpen(true)} />
//             <div className="page-content">

//             {/* Stat cards */}
//             <div className="stats-grid">
//                 <StatCard label="Upcoming appointments" value={stats?.upcomingAppointments ?? 0} note="View schedule" />
//                 <StatCard label="Active prescriptions" value={stats?.activePrescriptions ?? 0} note="Check expiry" noteColor="#D97706" />
//                 <StatCard label="Last visit" value={stats?.lastVisit ?? 'No visits yet'} note="" noteColor="#94A3B8" />
//             </div>

//             {/* Available doctors */}
//             <div>
//                 <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
//                 <span style={{ fontSize: '14px', fontWeight: '600', color: '#0F172A' }}>Available doctors</span>
//                 </div>
//                 <div className="doctors-grid">
//                 {doctors.slice(0, 3).map((doctor) => (
//                     <div key={doctor._id} style={{ background: '#fff', border: '1px solid #F1F5F9', borderRadius: '14px', padding: '16px' }}>
//                     <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
//                         <div style={{ width: '38px', height: '38px', minWidth: '38px', borderRadius: '50%', background: '#EEF2FF', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px', fontWeight: '700', color: '#4F46E5' }}>
//                         {doctor.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
//                         </div>
//                         <div style={{ minWidth: 0 }}>
//                         <div style={{ fontSize: '13px', fontWeight: '600', color: '#0F172A', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{doctor.name}</div>
//                         <div style={{ fontSize: '12px', color: '#94A3B8' }}>{doctor.specialty}</div>
//                         </div>
//                     </div>
//                     <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '10px' }}>
//                         <div style={{ width: '7px', height: '7px', borderRadius: '50%', background: statusColor(doctor.availabilityStatus), flexShrink: 0 }} />
//                         <span style={{ fontSize: '12px', color: '#64748B' }}>{statusLabel(doctor.availabilityStatus)}</span>
//                     </div>
//                     <button
//                         onClick={() => navigate('/patient/book')}
//                         disabled={doctor.availabilityStatus === 'offline'}
//                         style={{ width: '100%', border: '1.5px solid #0D9488', background: 'transparent', color: doctor.availabilityStatus === 'offline' ? '#CBD5E1' : '#0D9488', borderColor: doctor.availabilityStatus === 'offline' ? '#E2E8F0' : '#0D9488', borderRadius: '8px', padding: '8px', fontSize: '13px', fontWeight: '500', cursor: doctor.availabilityStatus === 'offline' ? 'not-allowed' : 'pointer' }}>
//                         {doctor.availabilityStatus === 'offline' ? 'Unavailable' : 'Book appointment'}
//                     </button>
//                     </div>
//                 ))}
//                 </div>
//             </div>

//             {/* AI Suggest */}
//             <div className="ai-suggest-wrap">
//                 <AISuggest />
//             </div>

//             </div>
//         </div>
//         </div>
//     );
// }





















import { useEffect, useState } from 'react';
    import api from '../../api/axios';
    import useAuthStore from '../../store/useAuthStore';
    import PatientSidebar from '../../components/layout/PatientSidebar';
    import Topbar from '../../components/layout/Topbar';
    import StatCard from '../../components/shared/StatCard';
    import LoadingSpinner from '../../components/shared/LoadingSpinner';
    import { useNavigate } from 'react-router-dom';
    import AISuggest from '../../components/patient/AISuggest';

    export default function PatientDashboard() {
    const { user } = useAuthStore();
    const [stats, setStats] = useState(null);
    const [doctors, setDoctors] = useState([]);
    const [loading, setLoading] = useState(true);
    const [aiOpen, setAiOpen] = useState(false); // ✅ controls floating chat panel
    const navigate = useNavigate();

    useEffect(() => {
    const fetchDashboardData = async () => {
        try {
        const [statsRes, doctorsRes] = await Promise.all([
            api.get(`/patients/${user.id}/stats`).catch(() => ({ data: null })),
            api.get('/doctors?limit=3').catch(() => ({ data: { doctors: [] } })),
        ]);
        setStats(statsRes.data);
        setDoctors(doctorsRes.data?.doctors || []);
        } catch (err) {
        console.error('Dashboard fetch error:', err);
        } finally {
        setLoading(false);
        }
    };
    fetchDashboardData();
    }, [user.id]);

    if (loading) return (
    <div style={{ display: 'flex' }}>
        <PatientSidebar />
        <div style={{ flex: 1 }}><LoadingSpinner message="Loading your dashboard..." /></div>
    </div>
    );

    return (
    <div style={{ display: 'flex', height: '100vh', fontFamily: 'DM Sans, sans-serif' }}>
        <PatientSidebar />
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
        <Topbar title="Dashboard" userName={user?.name} />

        <div style={{ flex: 1, padding: '24px 28px', overflowY: 'auto', background: '#F8FAFC', display: 'flex', flexDirection: 'column', gap: '24px' }}>

            {/* Stats row */}
            <div style={{ display: 'flex', gap: '14px' }}>
            <StatCard label="Upcoming appointments" value={stats?.upcomingAppointments ?? 0} note="View schedule" />
            <StatCard label="Active prescriptions" value={stats?.activePrescriptions ?? 0} note="Check expiry" noteColor="#D97706" />
            <StatCard label="Last visit" value={stats?.lastVisit ?? 'No visits yet'} note={stats?.lastDoctor ?? ''} noteColor="#94A3B8" />
            </div>

            {/* Available doctors */}
            <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                <span style={{ fontSize: '14px', fontWeight: '600', color: '#0F172A' }}>Available doctors</span>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px' }}>
                {doctors.map((doctor) => (
                <div key={doctor._id} style={{ background: '#fff', border: '1px solid #F1F5F9', borderRadius: '14px', padding: '16px' }}>
                    <div style={{ fontSize: '14px', fontWeight: '600', color: '#0F172A' }}>{doctor.name}</div>
                    <div style={{ fontSize: '12px', color: '#94A3B8', marginTop: '2px' }}>{doctor.specialty}</div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', margin: '10px 0' }}>
                    <div style={{ width: '7px', height: '7px', borderRadius: '50%', background: doctor.availabilityStatus === 'online' ? '#10B981' : doctor.availabilityStatus === 'busy' ? '#F59E0B' : '#EF4444' }} />
                    <span style={{ fontSize: '12px', color: '#64748B' }}>
                        {doctor.availabilityStatus === 'online' ? 'Available now' : doctor.availabilityStatus === 'busy' ? 'Busy' : 'Unavailable'}
                    </span>
                    </div>
                    <button
                    onClick={() => navigate('/patient/book')}
                    style={{ width: '100%', border: '1.5px solid #0D9488', background: 'transparent', color: '#0D9488', borderRadius: '8px', padding: '8px', fontSize: '13px', fontWeight: '500', cursor: 'pointer' }}>
                    Book appointment
                    </button>
                </div>
                ))}
            </div>
            </div>

            {/* ✅ FIXED: Upgrade to Pro button — properly styled, inside the scrollable area */}
            <div
            onClick={() => navigate('/upgrade')}
            style={{
                background: 'linear-gradient(135deg, #0D9488 0%, #0F766E 100%)',
                borderRadius: '14px',
                padding: '18px 24px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                cursor: 'pointer',
                boxShadow: '0 4px 14px rgba(13,148,136,0.25)',
            }}>
            <div>
                <div style={{ fontSize: '15px', fontWeight: '700', color: '#fff' }}>Upgrade to Pro</div>
                <div style={{ fontSize: '13px', color: 'rgba(255,255,255,0.75)', marginTop: '2px' }}>
                Unlock unlimited bookings, priority support & more
                </div>
            </div>
            <div style={{ background: 'rgba(255,255,255,0.2)', borderRadius: '8px', padding: '8px 16px', fontSize: '13px', fontWeight: '600', color: '#fff' }}>
                See plans →
            </div>
            </div>

        </div>
        </div>

        {/* ✅ FLOATING AI CHAT BUBBLE */}
        {/* Chat toggle button */}
        <button
        onClick={() => setAiOpen(!aiOpen)}
        title="AI Doctor Suggestion"
        style={{
            position: 'fixed',
            bottom: '28px',
            right: '28px',
            width: '52px',
            height: '52px',
            borderRadius: '50%',
            background: 'linear-gradient(135deg, #0D9488, #0F766E)',
            border: 'none',
            cursor: 'pointer',
            boxShadow: '0 4px 18px rgba(13,148,136,0.4)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000,
            fontSize: '22px',
            transition: 'transform 0.2s',
        }}
        onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.1)'}
        onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
        >
        {aiOpen ? '✕' : '🩺'}
        </button>

        {/* Floating AI panel */}
        {aiOpen && (
        <div style={{
            position: 'fixed',
            bottom: '92px',
            right: '28px',
            width: '360px',
            background: '#fff',
            borderRadius: '18px',
            boxShadow: '0 8px 40px rgba(0,0,0,0.15)',
            border: '1px solid #E2E8F0',
            zIndex: 999,
            overflow: 'hidden',
        }}>
            {/* Panel header */}
            <div style={{
            background: 'linear-gradient(135deg, #0D9488, #0F766E)',
            padding: '14px 18px',
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            }}>
            <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: 'rgba(255,255,255,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '16px' }}>🩺</div>
            <div>
                <div style={{ fontSize: '14px', fontWeight: '600', color: '#fff' }}>AI Doctor Suggestion</div>
                <div style={{ fontSize: '11px', color: 'rgba(255,255,255,0.75)' }}>Describe symptoms, get a specialist recommendation</div>
            </div>
            </div>

            {/* AISuggest component rendered inside panel */}
            <div style={{ padding: '16px' }}>
            <AISuggest compact />
            </div>
        </div>
        )}
    </div>
    );
    }
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
//     // import { useEffect, useState } from 'react';
//     // import api from '../../api/axios';
//     // import useAuthStore from '../../store/useAuthStore';
//     // import PatientSidebar from '../../components/layout/PatientSidebar';
//     // import Topbar from '../../components/layout/Topbar';
//     // import StatCard from '../../components/shared/StatCard';
//     // import LoadingSpinner from '../../components/shared/LoadingSpinner';
//     // import { useNavigate } from 'react-router-dom';
//     // import AISuggest from '../../components/patient/AISuggest';

//     // export default function PatientDashboard() {
//     // const { user } = useAuthStore();
//     // const [stats, setStats] = useState(null);
//     // const [doctors, setDoctors] = useState([]);
//     // //const [activity, setActivity] = useState([]);
//     // const [_activity, _setActivity] = useState([]);
//     // const [loading, setLoading] = useState(true);
//     // const navigate = useNavigate();
//     // useEffect(() => {
//     //     const fetchDashboardData = async () => {
//     //         try {
//     //         const [statsRes, doctorsRes] = await Promise.all([
//     //             api.get(`/patients/${user.id}/stats`).catch(() => ({ data: null })),
//     //             api.get('/doctors?limit=3').catch(() => ({ data: { doctors: [] } })),
//     //         ]);
//     //         setStats(statsRes.data);
//     //         setDoctors(doctorsRes.data?.doctors || []);
//     //         } catch (err) {
//     //         console.error('Dashboard fetch error:', err);
//     //         } finally {
//     //         setLoading(false);
//     //         }
//     //     };
//     //     fetchDashboardData();
//     //     }, [user.id]);

//     // if (loading) return <div style={{ display: 'flex' }}><PatientSidebar /><div style={{ flex: 1 }}><LoadingSpinner message="Loading your dashboard..." /></div></div>;

//     // return (
//     //     <div style={{ display: 'flex', height: '100vh', fontFamily: 'DM Sans, sans-serif' }}>
//     //     <PatientSidebar />
//     //     <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
//     //         <Topbar title="Dashboard" userName={user?.name} />
//     //         <div style={{ flex: 1, padding: '24px 28px', overflowY: 'auto', background: '#F8FAFC', display: 'flex', flexDirection: 'column', gap: '24px' }}>
//     //         <div style={{ display: 'flex', gap: '14px' }}>
//     //             <StatCard label="Upcoming appointments" value={stats?.upcomingAppointments ?? 0} note="View schedule" />
//     //             <StatCard label="Active prescriptions" value={stats?.activePrescriptions ?? 0} note="Check expiry" noteColor="#D97706" />
//     //             <StatCard label="Last visit" value={stats?.lastVisit ?? 'No visits yet'} note={stats?.lastDoctor ?? ''} noteColor="#94A3B8" />
//     //         </div>
//     //         <div>
//     //             <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
//     //             <span style={{ fontSize: '14px', fontWeight: '600', color: '#0F172A' }}>Available doctors</span>
//     //             </div>
//     //             <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px' }}>
//     //             {doctors.map((doctor) => (
//     //                 <div key={doctor._id} style={{ background: '#fff', border: '1px solid #F1F5F9', borderRadius: '14px', padding: '16px' }}>
//     //                 <div style={{ fontSize: '14px', fontWeight: '600', color: '#0F172A' }}>{doctor.name}</div>
//     //                 <div style={{ fontSize: '12px', color: '#94A3B8', marginTop: '2px' }}>{doctor.specialty}</div>
//     //                 <div style={{ display: 'flex', alignItems: 'center', gap: '6px', margin: '10px 0' }}>
//     //                     <div style={{ width: '7px', height: '7px', borderRadius: '50%', background: doctor.availabilityStatus === 'online' ? '#10B981' : doctor.availabilityStatus === 'busy' ? '#F59E0B' : '#EF4444' }} />
//     //                     <span style={{ fontSize: '12px', color: '#64748B' }}>{doctor.availabilityStatus === 'online' ? 'Available now' : doctor.availabilityStatus === 'busy' ? 'Busy' : 'Unavailable'}</span>
//     //                 </div>
//     //                 {/* <button style={{ width: '100%', border: '1.5px solid #0D9488', background: 'transparent', color: '#0D9488', borderRadius: '8px', padding: '8px', fontSize: '13px', fontWeight: '500', cursor: 'pointer' }}>
//     //                     Book appointment
//     //                 </button> */}
//     //                 <button
//     //                 onClick={() => navigate('/patient/book')}
//     //                 style={{ width: '100%', border: '1.5px solid #0D9488', background: 'transparent', color: '#0D9488', borderRadius: '8px', padding: '8px', fontSize: '13px', fontWeight: '500', cursor: 'pointer' }}>
//     //                 Book appointment
//     //                 </button>
//     //                 </div>
//     //             ))}
//     //             </div>
//     //         </div>
//     //         </div>
//     //         <button onClick={() => navigate('/upgrade')}>
//     //             Upgrade to Pro
//     //         </button>
//     //         <AISuggest />
//     //     </div>
//     //     </div>
//     // );
//     // }
