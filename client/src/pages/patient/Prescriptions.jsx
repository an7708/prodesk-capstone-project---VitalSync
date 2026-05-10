    import { useEffect, useState } from 'react';
    import api from '../../api/axios';
    import PatientSidebar from '../../components/layout/PatientSidebar';
    import Topbar from '../../components/layout/Topbar';
    import useAuthStore from '../../store/useAuthStore';

    // Dummy data so page works before backend is ready
    const dummyPrescriptions = [
    { _id: '1', drugName: 'Amoxicillin', dosage: '500mg', frequency: 'Twice daily', startDate: '2025-06-12', endDate: '2025-06-19', instructions: 'Take with food. Avoid alcohol.', refills: 0, doctorId: { name: 'Dr. A. Patel' } },
    { _id: '2', drugName: 'Amlodipine', dosage: '5mg', frequency: 'Once daily', startDate: '2025-03-03', endDate: '2025-09-03', instructions: 'Take at the same time each day.', refills: 2, doctorId: { name: 'Dr. S. Rao' } },
    ];

    export default function Prescriptions() {
    const { user } = useAuthStore();
    const [prescriptions, setPrescriptions] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPrescriptions = async () => {
        try {
            const res = await api.get(`/prescriptions/patient/${user.id}`);
            setPrescriptions(res.data.prescriptions || dummyPrescriptions);
        } catch (err) {
            setPrescriptions(dummyPrescriptions);
        } finally {
            setLoading(false);
        }
        };
        fetchPrescriptions();
    }, [user.id]);

    const today = new Date();

    const isExpired = (endDate) => new Date(endDate) < today;

    const isExpiringSoon = (endDate) => {
        const end = new Date(endDate);
        const diff = (end - today) / (1000 * 60 * 60 * 24);
        return diff >= 0 && diff <= 7;
    };

    const active = prescriptions.filter((p) => !isExpired(p.endDate));
    const expired = prescriptions.filter((p) => isExpired(p.endDate));

    return (
        <div style={{ display: 'flex', height: '100vh', fontFamily: 'DM Sans, sans-serif' }}>
        <PatientSidebar />
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
            <Topbar title="Prescriptions" userName={user?.name} />
            <div style={{ flex: 1, padding: '24px 28px', overflowY: 'auto', background: '#F8FAFC' }}>

            {loading ? (
                <div style={{ color: '#94A3B8', fontSize: '14px' }}>Loading prescriptions...</div>
            ) : (
                <>
                <div style={{ fontSize: '14px', fontWeight: '600', color: '#0F172A', marginBottom: '14px' }}>
                    Active prescriptions
                </div>

                {active.length === 0 ? (
                    <div style={{ background: '#fff', border: '1px solid #F1F5F9', borderRadius: '14px', padding: '32px', textAlign: 'center', marginBottom: '28px' }}>
                    <p style={{ fontSize: '14px', color: '#94A3B8', margin: 0 }}>No active prescriptions.</p>
                    </div>
                ) : (
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '12px', marginBottom: '28px' }}>
                    {active.map((p) => (
                        <PrescriptionCard key={p._id} prescription={p} isExpiringSoon={isExpiringSoon(p.endDate)} />
                    ))}
                    </div>
                )}

                {expired.length > 0 && (
                    <>
                    <div style={{ fontSize: '14px', fontWeight: '600', color: '#0F172A', marginBottom: '14px' }}>
                        Past prescriptions
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '12px' }}>
                        {expired.map((p) => (
                        <PrescriptionCard key={p._id} prescription={p} isExpired />
                        ))}
                    </div>
                    </>
                )}
                </>
            )}
            </div>
        </div>
        </div>
    );
    }

    function PrescriptionCard({ prescription, isExpiringSoon, isExpired }) {
    const p = prescription;
    return (
        <div style={{ background: '#fff', border: `1px solid ${isExpired ? '#F1F5F9' : isExpiringSoon ? '#FDE68A' : '#F1F5F9'}`, borderRadius: '14px', padding: '18px 20px', opacity: isExpired ? 0.65 : 1 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '10px' }}>
            <div style={{ fontSize: '15px', fontWeight: '700', color: '#0F172A' }}>{p.drugName}</div>
            {isExpiringSoon && !isExpired && (
            <span style={{ background: '#FEF3C7', color: '#92400E', padding: '3px 9px', borderRadius: '20px', fontSize: '11px', fontWeight: '600' }}>
                Expiring soon
            </span>
            )}
            {isExpired && (
            <span style={{ background: '#F1F5F9', color: '#94A3B8', padding: '3px 9px', borderRadius: '20px', fontSize: '11px', fontWeight: '600' }}>
                Expired
            </span>
            )}
        </div>
        <div style={{ display: 'flex', gap: '8px', marginBottom: '10px', flexWrap: 'wrap' }}>
            <span style={{ background: '#F0FDF9', color: '#065F46', padding: '3px 10px', borderRadius: '20px', fontSize: '12px', fontWeight: '500' }}>{p.dosage}</span>
            <span style={{ background: '#EEF2FF', color: '#4F46E5', padding: '3px 10px', borderRadius: '20px', fontSize: '12px', fontWeight: '500' }}>{p.frequency}</span>
        </div>
        <div style={{ fontSize: '12px', color: '#94A3B8', marginBottom: '4px' }}>
            {new Date(p.startDate).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })} — {new Date(p.endDate).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}
        </div>
        <div style={{ fontSize: '12px', color: '#64748B', marginBottom: '8px' }}>{p.instructions}</div>
        <div style={{ fontSize: '12px', color: '#94A3B8', borderTop: '1px solid #F8FAFC', paddingTop: '8px', marginTop: '4px' }}>
            Prescribed by {p.doctorId?.name} · Refills: {p.refills}
        </div>
        </div>
    );
    }