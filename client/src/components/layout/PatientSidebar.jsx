//     import { useState } from 'react';
//     import { NavLink, useNavigate } from 'react-router-dom';
//     import useAuthStore from '../../store/useAuthStore';
//     import AvatarCircle from '../shared/AvatarCircle';

//     const links = [
//     { to: '/patient/dashboard',     label: 'Dashboard',        icon: '⊞' },
//     { to: '/patient/appointments',  label: 'My appointments',  icon: '📅' },
//     { to: '/patient/book',          label: 'Book appointment', icon: '➕' },
//     { to: '/patient/history',       label: 'Medical history',  icon: '📋' },
//     { to: '/patient/prescriptions', label: 'Prescriptions',    icon: '💊' },
//     ];

//     export default function PatientSidebar({ isOpen, onClose }) {
//     const { user, logout } = useAuthStore();
//     const navigate = useNavigate();

//     const handleLogout = () => {
//         logout();
//         navigate('/login');
//     };

//     return (
//         <>
//         {/* Overlay for mobile — clicking it closes the sidebar */}
//         <div
//             className={`sidebar-overlay ${isOpen ? 'open' : ''}`}
//             onClick={onClose}
//         />

//         <div
//             className={`sidebar ${isOpen ? 'open' : ''}`}
//             style={{
//             background: '#fff',
//             borderRight: '1px solid #F1F5F9',
//             padding: '20px 12px',
//             }}>

//             {/* Brand */}
//             <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '6px 8px 24px' }}>
//             <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
//                 <div style={{ width: '30px', height: '30px', background: '#0D9488', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
//                 <span style={{ color: '#fff', fontWeight: '700', fontSize: '13px' }}>VS</span>
//                 </div>
//                 <span style={{ fontSize: '15px', fontWeight: '700', color: '#0F172A' }}>VitalSync</span>
//             </div>
//             {/* Close button — only visible on mobile */}
//             <button
//                 onClick={onClose}
//                 style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '18px', color: '#64748B', display: 'none' }}
//                 className="mobile-close-btn">
//                 ✕
//             </button>
//             </div>

//             {/* Navigation */}
//             <nav style={{ display: 'flex', flexDirection: 'column', gap: '2px', flex: 1 }}>
//             {links.map(({ to, label, icon }) => (
//                 <NavLink
//                 key={to}
//                 to={to}
//                 onClick={onClose}
//                 style={({ isActive }) => ({
//                     display: 'flex',
//                     alignItems: 'center',
//                     gap: '10px',
//                     padding: '10px 12px',
//                     borderRadius: '9px',
//                     textDecoration: 'none',
//                     fontSize: '13px',
//                     fontWeight: '500',
//                     background: isActive ? '#F0FDF9' : 'transparent',
//                     color: isActive ? '#0D9488' : '#64748B',
//                 })}>
//                 <span style={{ fontSize: '14px' }}>{icon}</span>
//                 {label}
//                 </NavLink>
//             ))}
//             </nav>

//             {/* User section */}
//             <div style={{ borderTop: '1px solid #F1F5F9', paddingTop: '14px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
//             <NavLink
//                 to="/upgrade"
//                 onClick={onClose}
//                 style={{ display: 'block', background: '#0D9488', color: '#fff', textDecoration: 'none', borderRadius: '8px', padding: '9px 12px', fontSize: '13px', fontWeight: '600', textAlign: 'center' }}>
//                 Upgrade to Pro
//             </NavLink>
//             <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
//                 <AvatarCircle name={user?.name || ''} size={32} />
//                 <div style={{ minWidth: 0 }}>
//                 <div style={{ fontSize: '13px', fontWeight: '500', color: '#0F172A', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{user?.name}</div>
//                 <div style={{ fontSize: '11px', color: '#94A3B8' }}>Patient</div>
//                 </div>
//             </div>
//             <button
//                 onClick={handleLogout}
//                 style={{ width: '100%', border: '1px solid #E2E8F0', background: 'transparent', borderRadius: '8px', padding: '8px', fontSize: '13px', color: '#64748B', cursor: 'pointer' }}>
//                 Sign out
//             </button>
//             </div>
//         </div>

//         {/* Mobile close button style injected */}
//         <style>{`
//             @media (max-width: 1023px) {
//             .mobile-close-btn { display: flex !important; }
//             }
//         `}</style>
//         </>
//     );
// }













    import { NavLink, useNavigate } from 'react-router-dom';
    import useAuthStore from '../../store/useAuthStore';
    import AvatarCircle from '../shared/AvatarCircle';

    const links = [
    { to: '/patient/dashboard',      label: 'Dashboard' },
    { to: '/patient/appointments',   label: 'My appointments' },
    { to: '/patient/history',        label: 'Medical history' },
    { to: '/patient/prescriptions',  label: 'Prescriptions' },
];

    export default function PatientSidebar() {
    const { user, logout } = useAuthStore();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <div style={{ width: '232px', minWidth: '232px', background: '#fff', borderRight: '1px solid #F1F5F9', display: 'flex', flexDirection: 'column', padding: '20px 12px', height: '100vh' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '6px 8px 24px' }}>
            <div style={{ width: '30px', height: '30px', background: '#0D9488', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <span style={{ color: '#fff', fontWeight: '700', fontSize: '13px' }}>VS</span>
            </div>
            <span style={{ fontSize: '15px', fontWeight: '700', color: '#0F172A' }}>VitalSync</span>
        </div>
        <nav style={{ display: 'flex', flexDirection: 'column', gap: '2px', flex: 1 }}>
            {links.map(({ to, label }) => (
            <NavLink key={to} to={to} style={({ isActive }) => ({
                display: 'flex', alignItems: 'center', gap: '10px', padding: '10px 12px', borderRadius: '9px',
                textDecoration: 'none', fontSize: '13px', fontWeight: '500',
                background: isActive ? '#F0FDF9' : 'transparent',
                color: isActive ? '#0D9488' : '#64748B',
            })}>
                {label}
            </NavLink>
            ))}
        </nav>
        <div style={{ borderTop: '1px solid #F1F5F9', paddingTop: '14px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <AvatarCircle name={user?.name || ''} size={32} />
            <div>
                <div style={{ fontSize: '13px', fontWeight: '500', color: '#0F172A' }}>{user?.name}</div>
                <div style={{ fontSize: '11px', color: '#94A3B8' }}>Patient</div>
            </div>
            </div>
            <button onClick={handleLogout} style={{ width: '100%', border: '1px solid #E2E8F0', background: 'transparent', borderRadius: '8px', padding: '8px', fontSize: '13px', color: '#64748B', cursor: 'pointer' }}>
            Sign out
            </button>
        </div>
        </div>
    );
    }