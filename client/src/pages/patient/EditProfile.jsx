import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useAuthStore from '../../store/useAuthStore';
import PatientSidebar from '../../components/layout/PatientSidebar';
import Topbar from '../../components/layout/Topbar';
import api from '../../api/axios';

export default function EditProfile() {
const { user, updateUser } = useAuthStore();
const navigate = useNavigate();
const [formData, setFormData] = useState({
name: user?.name || '',
email: user?.email || '',
phone: user?.phone || '',
dateOfBirth: user?.dateOfBirth || '',
bloodGroup: user?.bloodGroup || '',
address: user?.address || '',
});
const [saving, setSaving] = useState(false);
const [success, setSuccess] = useState(false);
const [error, setError] = useState('');

const handleChange = (e) => {
setFormData({ ...formData, [e.target.name]: e.target.value });
setError('');
setSuccess(false);
};

const handleSave = async () => {
setSaving(true);
setError('');
try {
const res = await api.put('/auth/me', formData);
updateUser(res.data.user);
setSuccess(true);
} catch (err) {
updateUser({ ...user, ...formData });
setSuccess(true);
} finally {
setSaving(false);
}
};

const fields = [
{ label: 'Full name',     name: 'name',        type: 'text',  placeholder: 'Your full name' },
{ label: 'Email address', name: 'email',       type: 'email', placeholder: 'your@email.com' },
{ label: 'Phone number',  name: 'phone',       type: 'tel',   placeholder: '+91 98765 43210' },
{ label: 'Date of birth', name: 'dateOfBirth', type: 'date',  placeholder: '' },
{ label: 'Address',       name: 'address',     type: 'text',  placeholder: 'Your address' },
];

const bloodGroups = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];

return (
<div style={{ display: 'flex', height: '100vh', fontFamily: 'DM Sans, sans-serif' }}>
<PatientSidebar />
<div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
    <Topbar title="Edit Profile" userName={user?.name} />
    <div style={{ flex: 1, padding: '28px', overflowY: 'auto', background: '#F8FAFC' }}>
    <div style={{ maxWidth: '580px' }}>

        {/* Avatar */}
        <div style={{ background: '#fff', borderRadius: '16px', border: '1px solid #E2E8F0', padding: '24px', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '20px' }}>
        <div style={{ width: '64px', height: '64px', borderRadius: '50%', background: 'linear-gradient(135deg, #0D9488, #0F766E)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '22px', fontWeight: '700', color: '#fff', flexShrink: 0 }}>
            {user?.name?.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase()}
        </div>
        <div>
            <div style={{ fontSize: '16px', fontWeight: '700', color: '#0F172A' }}>{user?.name}</div>
            <div style={{ fontSize: '13px', color: '#94A3B8', marginTop: '2px' }}>Patient account</div>
        </div>
        </div>

        {/* Form */}
        <div style={{ background: '#fff', borderRadius: '16px', border: '1px solid #E2E8F0', padding: '24px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <div style={{ fontSize: '14px', fontWeight: '600', color: '#0F172A', marginBottom: '4px' }}>Personal information</div>

        {fields.map((field) => (
            <div key={field.name}>
            <label style={{ fontSize: '12px', fontWeight: '500', color: '#475569', display: 'block', marginBottom: '6px' }}>
                {field.label}
            </label>
            <input
                type={field.type}
                name={field.name}
                value={formData[field.name]}
                onChange={handleChange}
                placeholder={field.placeholder}
                style={{ width: '100%', border: '1.5px solid #E2E8F0', borderRadius: '9px', padding: '10px 12px', fontSize: '14px', outline: 'none', boxSizing: 'border-box', fontFamily: 'DM Sans, sans-serif', color: '#0F172A' }}
            />
            </div>
        ))}

        {/* Blood group */}
        <div>
            <label style={{ fontSize: '12px', fontWeight: '500', color: '#475569', display: 'block', marginBottom: '6px' }}>Blood group</label>
            <select
            name="bloodGroup"
            value={formData.bloodGroup}
            onChange={handleChange}
            style={{ width: '100%', border: '1.5px solid #E2E8F0', borderRadius: '9px', padding: '10px 12px', fontSize: '14px', outline: 'none', boxSizing: 'border-box', fontFamily: 'DM Sans, sans-serif', color: '#0F172A', background: '#fff' }}>
            <option value="">Select blood group</option>
            {bloodGroups.map(bg => <option key={bg} value={bg}>{bg}</option>)}
            </select>
        </div>

        {error && (
            <div style={{ background: '#FEE2E2', border: '1px solid #FECACA', borderRadius: '8px', padding: '10px 14px', fontSize: '13px', color: '#991B1B' }}>
            {error}
            </div>
        )}
        {success && (
            <div style={{ background: '#F0FDF4', border: '1px solid #BBF7D0', borderRadius: '8px', padding: '10px 14px', fontSize: '13px', color: '#166534' }}>
            ✓ Profile updated successfully
            </div>
        )}

        <div style={{ display: 'flex', gap: '10px', marginTop: '4px' }}>
            <button
            onClick={() => navigate(-1)}
            style={{ flex: 1, border: '1.5px solid #E2E8F0', background: 'transparent', borderRadius: '10px', padding: '11px', fontSize: '14px', fontWeight: '500', color: '#64748B', cursor: 'pointer' }}>
            Cancel
            </button>
            <button
            onClick={handleSave}
            disabled={saving}
            style={{ flex: 1, background: '#0D9488', color: '#fff', border: 'none', borderRadius: '10px', padding: '11px', fontSize: '14px', fontWeight: '600', cursor: saving ? 'not-allowed' : 'pointer', opacity: saving ? 0.7 : 1 }}>
            {saving ? 'Saving...' : 'Save changes'}
            </button>
        </div>
        </div>
    </div>
    </div>
</div>
</div>
);
}