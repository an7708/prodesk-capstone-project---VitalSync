    // import AvatarCircle from '../shared/AvatarCircle';

    // export default function Topbar({ title, userName, onMenuClick }) {
    // return (
    //     <div
    //     className="topbar"
    //     style={{
    //         background: '#fff',
    //         borderBottom: '1px solid #F1F5F9',
    //     }}>

    //     <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
    //         {/* Hamburger — only shows on tablet/mobile via CSS */}
    //         <button
    //         className="hamburger-btn"
    //         onClick={onMenuClick}
    //         aria-label="Open menu">
    //         <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
    //             <path d="M3 5h14M3 10h14M3 15h14" stroke="#64748B" strokeWidth="1.8" strokeLinecap="round"/>
    //         </svg>
    //         </button>
    //         <span style={{ fontSize: '16px', fontWeight: '600', color: '#0F172A' }}>{title}</span>
    //     </div>

    //     <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
    //         <AvatarCircle name={userName || ''} size={32} />
    //     </div>
    //     </div>
    // );
    // }



import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AvatarCircle from '../shared/AvatarCircle';
import useAuthStore from '../../store/useAuthStore';

export default function Topbar({ title, userName }) {
const [open, setOpen] = useState(false);
const navigate = useNavigate();
const { logout } = useAuthStore();
const dropdownRef = useRef(null);

useEffect(() => {
    const handleClickOutside = (e) => {
    if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpen(false);
    }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
}, []);

const handleLogout = () => {
    logout();
    navigate('/login');
};

const menuItems = [
    { label: 'Edit Profile',      action: () => navigate('/patient/profile') },
    { label: 'My Appointments',   action: () => navigate('/patient/appointments') },
    { label: 'Settings',          action: () => navigate('/patient/settings') },
    { label: 'Sign out',          action: handleLogout, danger: true },
];

return (
    <div style={{ background: '#fff', borderBottom: '1px solid #F1F5F9', padding: '0 24px', height: '56px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexShrink: 0, position: 'relative', zIndex: 100 }}>
    <span style={{ fontSize: '16px', fontWeight: '600', color: '#0F172A' }}>{title}</span>

    <div style={{ position: 'relative' }} ref={dropdownRef}>
        {/* Avatar button */}
        <div
        onClick={() => setOpen(!open)}
        style={{ cursor: 'pointer', borderRadius: '50%', transition: 'opacity 0.15s' }}
        onMouseEnter={e => e.currentTarget.style.opacity = '0.8'}
        onMouseLeave={e => e.currentTarget.style.opacity = '1'}
        >
        <AvatarCircle name={userName || ''} size={32} />
        </div>

        {/* Dropdown */}
        {open && (
        <div style={{
            position: 'absolute',
            top: '44px',
            right: '0',
            width: '200px',
            background: '#fff',
            borderRadius: '12px',
            border: '1px solid #E2E8F0',
            boxShadow: '0 8px 24px rgba(0,0,0,0.10)',
            overflow: 'hidden',
            zIndex: 999,
        }}>
            {/* User info header */}
            <div style={{ padding: '12px 16px', borderBottom: '1px solid #F1F5F9', background: '#F8FAFC' }}>
            <div style={{ fontSize: '13px', fontWeight: '600', color: '#0F172A' }}>{userName}</div>
            <div style={{ fontSize: '11px', color: '#94A3B8', marginTop: '2px' }}>Patient</div>
            </div>

            {/* Menu items */}
            {menuItems.map((item, i) => (
            <div
                key={i}
                onClick={() => { item.action(); setOpen(false); }}
                style={{
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                padding: '10px 16px',
                fontSize: '13px',
                fontWeight: '500',
                color: item.danger ? '#EF4444' : '#374151',
                cursor: 'pointer',
                borderTop: item.danger ? '1px solid #F1F5F9' : 'none',
                transition: 'background 0.15s',
                }}
                onMouseEnter={e => e.currentTarget.style.background = item.danger ? '#FEF2F2' : '#F8FAFC'}
                onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
            >
                {item.label}
            </div>
            ))}
        </div>
        )}
    </div>
    </div>
);
}