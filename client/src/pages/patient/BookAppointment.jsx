    import { useEffect, useState } from 'react';
    import { useNavigate } from 'react-router-dom';
    import api from '../../api/axios';
    import PatientSidebar from '../../components/layout/PatientSidebar';
    import Topbar from '../../components/layout/Topbar';
    import useAuthStore from '../../store/useAuthStore';

    export default function BookAppointment() {
    const { user } = useAuthStore();
    const navigate = useNavigate();
    const [doctors, setDoctors] = useState([]);
    const [selectedDoctor, setSelectedDoctor] = useState(null);
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({
        doctorId: '',
        scheduledAt: '',
        reason: '',
    });
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState('');
    const [fetchError, setFetchError] = useState(''); 
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        const fetchDoctors = async () => {
        try {
            const res = await api.get('/doctors');
            setDoctors(res.data.doctors || []);
        } catch (err) {
            // ✅ FIXED: No more fake _id: '1' fallback data.
            // Show an error instead — fake IDs break MongoDB validation.
            setFetchError('Could not load doctors. Please try again later.');
        } finally {
            setLoading(false);
        }
        };
        fetchDoctors();
    }, []);

    const handleSelectDoctor = (doctor) => {
        setSelectedDoctor(doctor);
        setFormData({ ...formData, doctorId: doctor._id }); // real MongoDB _id
        setStep(2);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitting(true);
        setError('');
        try {
        await api.post('/appointments', formData);
        setSuccess(true);
        setTimeout(() => navigate('/patient/appointments'), 2000);
        } catch (err) {
        setError(err.response?.data?.message || 'Failed to book appointment. Please try again.');
        } finally {
        setSubmitting(false);
        }
    };

    const statusColor = (status) => {
        if (status === 'online') return '#10B981';
        if (status === 'busy') return '#F59E0B';
        return '#EF4444';
    };

    const statusLabel = (status) => {
        if (status === 'online') return 'Available now';
        if (status === 'busy') return 'Busy';
        return 'Unavailable';
    };

    if (success) {
        return (
        <div style={{ display: 'flex', height: '100vh', fontFamily: 'DM Sans, sans-serif' }}>
            <PatientSidebar />
            <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#F8FAFC' }}>
            <div style={{ background: '#fff', borderRadius: '16px', border: '1px solid #E2E8F0', padding: '48px', textAlign: 'center', maxWidth: '400px' }}>
                <div style={{ width: '60px', height: '60px', background: '#DCFCE7', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px', fontSize: '26px' }}>✓</div>
                <div style={{ fontSize: '20px', fontWeight: '700', color: '#0F172A', marginBottom: '8px' }}>Appointment booked</div>
                <div style={{ fontSize: '14px', color: '#64748B' }}>Redirecting to your appointments...</div>
            </div>
            </div>
        </div>
        );
    }

    return (
        <div style={{ display: 'flex', height: '100vh', fontFamily: 'DM Sans, sans-serif' }}>
        <PatientSidebar />
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
            <Topbar title="Book an appointment" userName={user?.name} />
            <div style={{ flex: 1, padding: '24px 28px', overflowY: 'auto', background: '#F8FAFC' }}>

            {/* Step indicator */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '0', marginBottom: '28px', maxWidth: '500px' }}>
                {['Choose doctor', 'Date and time', 'Confirm'].map((label, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', flex: i < 2 ? 1 : 'none' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px' }}>
                    <div style={{ width: '30px', height: '30px', borderRadius: '50%', background: step > i ? '#0D9488' : step === i + 1 ? '#0D9488' : '#E2E8F0', color: step >= i + 1 ? '#fff' : '#94A3B8', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '13px', fontWeight: '600' }}>
                        {step > i + 1 ? '✓' : i + 1}
                    </div>
                    <span style={{ fontSize: '11px', fontWeight: '500', color: step >= i + 1 ? '#0D9488' : '#94A3B8', whiteSpace: 'nowrap' }}>{label}</span>
                    </div>
                    {i < 2 && <div style={{ flex: 1, height: '2px', background: step > i + 1 ? '#0D9488' : '#E2E8F0', margin: '0 8px', marginBottom: '16px' }} />}
                </div>
                ))}
            </div>

            {/* Step 1 — Choose Doctor */}
            {step === 1 && (
                <div>
                <div style={{ fontSize: '15px', fontWeight: '600', color: '#0F172A', marginBottom: '14px' }}>Select a doctor</div>
                {loading ? (
                    <div style={{ color: '#94A3B8', fontSize: '14px' }}>Loading doctors...</div>
                ) : fetchError ? (
                    
                    <div style={{ background: '#FEE2E2', border: '1px solid #FECACA', borderRadius: '8px', padding: '12px 16px', fontSize: '13px', color: '#991B1B', maxWidth: '500px' }}>
                    {fetchError}
                    </div>
                ) : doctors.length === 0 ? (
                    <div style={{ color: '#94A3B8', fontSize: '14px' }}>No doctors available at the moment.</div>
                ) : (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', maxWidth: '600px' }}>
                    {doctors.map((doctor) => (
                        <div
                        key={doctor._id}
                        onClick={() => doctor.availabilityStatus !== 'offline' && handleSelectDoctor(doctor)}
                        style={{ background: '#fff', border: '1px solid #F1F5F9', borderRadius: '14px', padding: '16px 20px', display: 'flex', alignItems: 'center', gap: '14px', cursor: doctor.availabilityStatus === 'offline' ? 'not-allowed' : 'pointer', opacity: doctor.availabilityStatus === 'offline' ? 0.5 : 1, transition: 'border-color 0.15s' }}>
                        <div style={{ width: '44px', height: '44px', borderRadius: '50%', background: '#EEF2FF', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '14px', fontWeight: '700', color: '#4F46E5', flexShrink: 0 }}>
                            {doctor.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                        </div>
                        <div style={{ flex: 1 }}>
                            <div style={{ fontSize: '14px', fontWeight: '600', color: '#0F172A' }}>{doctor.name}</div>
                            <div style={{ fontSize: '12px', color: '#94A3B8', marginTop: '2px' }}>{doctor.specialty}</div>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                            <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: statusColor(doctor.availabilityStatus) }} />
                            <span style={{ fontSize: '12px', color: '#64748B' }}>{statusLabel(doctor.availabilityStatus)}</span>
                        </div>
                        </div>
                    ))}
                    </div>
                )}
                </div>
            )}

            {/* Step 2 — Date and Time */}
            {step === 2 && (
                <div style={{ maxWidth: '500px' }}>
                <div style={{ fontSize: '15px', fontWeight: '600', color: '#0F172A', marginBottom: '4px' }}>Select date and time</div>
                <div style={{ fontSize: '13px', color: '#94A3B8', marginBottom: '20px' }}>
                    Booking with {selectedDoctor?.name} — {selectedDoctor?.specialty}
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                    <div>
                    <label style={{ fontSize: '12px', fontWeight: '500', color: '#475569', display: 'block', marginBottom: '6px' }}>Date and time</label>
                    <input
                        type="datetime-local"
                        value={formData.scheduledAt}
                        onChange={(e) => setFormData({ ...formData, scheduledAt: e.target.value })}
                        min={new Date().toISOString().slice(0, 16)}
                        style={{ width: '100%', border: '1.5px solid #E2E8F0', borderRadius: '9px', padding: '10px 12px', fontSize: '14px', outline: 'none', boxSizing: 'border-box', fontFamily: 'DM Sans, sans-serif' }}
                    />
                    </div>
                    <div style={{ display: 'flex', gap: '10px', marginTop: '8px' }}>
                    <button onClick={() => setStep(1)} style={{ flex: 1, border: '1.5px solid #E2E8F0', background: 'transparent', borderRadius: '10px', padding: '11px', fontSize: '14px', fontWeight: '500', color: '#64748B', cursor: 'pointer' }}>
                        Back
                    </button>
                    <button
                        onClick={() => formData.scheduledAt && setStep(3)}
                        disabled={!formData.scheduledAt}
                        style={{ flex: 1, background: '#0D9488', color: '#fff', border: 'none', borderRadius: '10px', padding: '11px', fontSize: '14px', fontWeight: '600', cursor: formData.scheduledAt ? 'pointer' : 'not-allowed', opacity: formData.scheduledAt ? 1 : 0.5 }}>
                        Next
                    </button>
                    </div>
                </div>
                </div>
            )}

            {/* Step 3 — Confirm */}
            {step === 3 && (
                <form onSubmit={handleSubmit} style={{ maxWidth: '500px' }}>
                <div style={{ fontSize: '15px', fontWeight: '600', color: '#0F172A', marginBottom: '20px' }}>Confirm your booking</div>
                <div style={{ background: '#F0FDF9', border: '1px solid #A7F3D0', borderRadius: '12px', padding: '16px 20px', marginBottom: '20px' }}>
                    <div style={{ fontSize: '13px', color: '#065F46', fontWeight: '600', marginBottom: '10px' }}>Appointment summary</div>
                    <div style={{ fontSize: '13px', color: '#0F172A', marginBottom: '4px' }}><strong>Doctor:</strong> {selectedDoctor?.name}</div>
                    <div style={{ fontSize: '13px', color: '#0F172A', marginBottom: '4px' }}><strong>Specialty:</strong> {selectedDoctor?.specialty}</div>
                    <div style={{ fontSize: '13px', color: '#0F172A' }}><strong>Date:</strong> {new Date(formData.scheduledAt).toLocaleString()}</div>
                </div>
                {error && (
                    <div style={{ background: '#FEE2E2', border: '1px solid #FECACA', borderRadius: '8px', padding: '10px 14px', fontSize: '13px', color: '#991B1B', marginBottom: '16px' }}>
                    {error}
                    </div>
                )}
                <div style={{ marginBottom: '16px' }}>
                    <label style={{ fontSize: '12px', fontWeight: '500', color: '#475569', display: 'block', marginBottom: '6px' }}>
                    Reason for visit
                    </label>
                    <textarea
                    value={formData.reason}
                    onChange={(e) => setFormData({ ...formData, reason: e.target.value })}
                    placeholder="Briefly describe your symptoms or reason for the appointment..."
                    required
                    rows={4}
                    style={{ width: '100%', border: '1.5px solid #E2E8F0', borderRadius: '9px', padding: '10px 12px', fontSize: '14px', outline: 'none', boxSizing: 'border-box', fontFamily: 'DM Sans, sans-serif', resize: 'vertical' }}
                    />
                </div>
                <div style={{ display: 'flex', gap: '10px' }}>
                    <button type="button" onClick={() => setStep(2)} style={{ flex: 1, border: '1.5px solid #E2E8F0', background: 'transparent', borderRadius: '10px', padding: '11px', fontSize: '14px', fontWeight: '500', color: '#64748B', cursor: 'pointer' }}>
                    Back
                    </button>
                    <button type="submit" disabled={submitting} style={{ flex: 1, background: '#0D9488', color: '#fff', border: 'none', borderRadius: '10px', padding: '11px', fontSize: '14px', fontWeight: '600', cursor: submitting ? 'not-allowed' : 'pointer', opacity: submitting ? 0.7 : 1 }}>
                    {submitting ? 'Booking...' : 'Confirm booking'}
                    </button>
                </div>
                </form>
            )}
            </div>
        </div>
        </div>
    );
    }