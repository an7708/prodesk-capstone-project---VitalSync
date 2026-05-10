    import { useState } from 'react';
    import { useNavigate } from 'react-router-dom';
    import useAuthStore from '../../store/useAuthStore';
    import PatientSidebar from '../../components/layout/PatientSidebar';
    import Topbar from '../../components/layout/Topbar';

    export default function Settings() {
    const { user, logout } = useAuthStore();
    const navigate = useNavigate();

    const [notifications, setNotifications] = useState({
        appointmentReminders: true,
        prescriptionExpiry: true,
        promotions: false,
    });

    const [privacy, setPrivacy] = useState({
        shareDataWithDoctors: true,
        allowAnalytics: false,
    });

    const [saved, setSaved] = useState(false);

    const handleToggle = (group, key) => {
        if (group === 'notifications') {
        setNotifications(prev => ({ ...prev, [key]: !prev[key] }));
        } else {
        setPrivacy(prev => ({ ...prev, [key]: !prev[key] }));
        }
        setSaved(false);
    };

    const handleSave = () => {
        setSaved(true);
        setTimeout(() => setSaved(false), 3000);
    };

    const handleDeleteAccount = () => {
        if (window.confirm('Are you sure you want to delete your account? This cannot be undone.')) {
        logout();
        navigate('/login');
        }
    };

    const Toggle = ({ on, onToggle }) => (
        <div
        onClick={onToggle}
        style={{ width: '40px', height: '22px', borderRadius: '99px', background: on ? '#0D9488' : '#CBD5E1', cursor: 'pointer', position: 'relative', transition: 'background 0.2s', flexShrink: 0 }}>
        <div style={{ position: 'absolute', top: '3px', left: on ? '21px' : '3px', width: '16px', height: '16px', borderRadius: '50%', background: '#fff', transition: 'left 0.2s', boxShadow: '0 1px 3px rgba(0,0,0,0.2)' }} />
        </div>
    );

    const Section = ({ title, children }) => (
        <div style={{ background: '#fff', borderRadius: '16px', border: '1px solid #E2E8F0', padding: '20px 24px', marginBottom: '16px' }}>
        <div style={{ fontSize: '14px', fontWeight: '600', color: '#0F172A', marginBottom: '16px' }}>{title}</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>{children}</div>
        </div>
    );

    const ToggleRow = ({ label, description, on, onToggle }) => (
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '16px' }}>
        <div>
            <div style={{ fontSize: '13px', fontWeight: '500', color: '#0F172A' }}>{label}</div>
            {description && <div style={{ fontSize: '12px', color: '#94A3B8', marginTop: '2px' }}>{description}</div>}
        </div>
        <Toggle on={on} onToggle={onToggle} />
        </div>
    );

    return (
        <div style={{ display: 'flex', height: '100vh', fontFamily: 'DM Sans, sans-serif' }}>
        <PatientSidebar />
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
            <Topbar title="Settings" userName={user?.name} />
            <div style={{ flex: 1, padding: '28px', overflowY: 'auto', background: '#F8FAFC' }}>
            <div style={{ maxWidth: '580px' }}>

                <Section title="🔔 Notifications">
                <ToggleRow label="Appointment reminders" description="Get notified 24h before your appointment" on={notifications.appointmentReminders} onToggle={() => handleToggle('notifications', 'appointmentReminders')} />
                <ToggleRow label="Prescription expiry alerts" description="Be reminded when prescriptions are about to expire" on={notifications.prescriptionExpiry} onToggle={() => handleToggle('notifications', 'prescriptionExpiry')} />
                <ToggleRow label="Promotions & updates" description="News and feature announcements from VitalSync" on={notifications.promotions} onToggle={() => handleToggle('notifications', 'promotions')} />
                </Section>

                <Section title="🔒 Privacy">
                <ToggleRow label="Share data with doctors" description="Allow doctors to view your full medical history" on={privacy.shareDataWithDoctors} onToggle={() => handleToggle('privacy', 'shareDataWithDoctors')} />
                <ToggleRow label="Usage analytics" description="Help us improve VitalSync by sharing anonymous usage data" on={privacy.allowAnalytics} onToggle={() => handleToggle('privacy', 'allowAnalytics')} />
                </Section>

                {/* Upgrade to Pro */}
                <div
                onClick={() => navigate('/upgrade')}
                style={{ background: 'linear-gradient(135deg, #0D9488 0%, #0F766E 100%)', borderRadius: '16px', padding: '20px 24px', marginBottom: '16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', cursor: 'pointer', boxShadow: '0 4px 14px rgba(13,148,136,0.25)' }}>
                <div>
                    <div style={{ fontSize: '14px', fontWeight: '700', color: '#fff' }}>⭐ Upgrade to Pro</div>
                    <div style={{ fontSize: '12px', color: 'rgba(255,255,255,0.75)', marginTop: '3px' }}>Unlimited bookings, priority support & more</div>
                </div>
                <div style={{ background: 'rgba(255,255,255,0.2)', borderRadius: '8px', padding: '7px 14px', fontSize: '12px', fontWeight: '600', color: '#fff' }}>
                    See plans →
                </div>
                </div>

                <Section title="👤 Account">
                <div onClick={() => navigate('/patient/profile')} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', cursor: 'pointer' }}
                    onMouseEnter={e => e.currentTarget.style.opacity = '0.7'}
                    onMouseLeave={e => e.currentTarget.style.opacity = '1'}>
                    <div>
                    <div style={{ fontSize: '13px', fontWeight: '500', color: '#0F172A' }}>Edit profile</div>
                    <div style={{ fontSize: '12px', color: '#94A3B8', marginTop: '2px' }}>Update your name, email and personal info</div>
                    </div>
                    <span style={{ color: '#94A3B8', fontSize: '18px' }}>›</span>
                </div>
                <div style={{ borderTop: '1px solid #F1F5F9', paddingTop: '16px' }}>
                    <div onClick={handleDeleteAccount} style={{ fontSize: '13px', fontWeight: '500', color: '#EF4444', cursor: 'pointer' }}
                    onMouseEnter={e => e.currentTarget.style.opacity = '0.7'}
                    onMouseLeave={e => e.currentTarget.style.opacity = '1'}>
                    Delete account
                    </div>
                    <div style={{ fontSize: '12px', color: '#94A3B8', marginTop: '2px' }}>Permanently delete your VitalSync account</div>
                </div>
                </Section>

                {saved && (
                <div style={{ background: '#F0FDF4', border: '1px solid #BBF7D0', borderRadius: '10px', padding: '12px 16px', fontSize: '13px', color: '#166534', marginBottom: '16px', textAlign: 'center' }}>
                    ✓ Settings saved
                </div>
                )}
                <button onClick={handleSave} style={{ width: '100%', background: '#0D9488', color: '#fff', border: 'none', borderRadius: '10px', padding: '13px', fontSize: '14px', fontWeight: '600', cursor: 'pointer' }}>
                Save settings
                </button>

            </div>
            </div>
        </div>
        </div>
    );
    }   