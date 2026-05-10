    import { useEffect, useState } from 'react';
    import api from '../../api/axios';
    import PatientSidebar from '../../components/layout/PatientSidebar';
    import Topbar from '../../components/layout/Topbar';
    import useAuthStore from '../../store/useAuthStore';

    const badgeStyles = {
    visit:        { background: '#CCFBF1', color: '#065F46' },
    diagnosis:    { background: '#FEE2E2', color: '#991B1B' },
    prescription: { background: '#D1FAE5', color: '#065F46' },
    lab_result:   { background: '#FEF3C7', color: '#92400E' },
    };

    const dotColors = {
    visit:        '#0D9488',
    diagnosis:    '#EF4444',
    prescription: '#10B981',
    lab_result:   '#F59E0B',
    };

    const filters = ['all', 'visit', 'diagnosis', 'prescription', 'lab_result'];
    const filterLabels = {
    all: 'All events',
    visit: 'Visits',
    diagnosis: 'Diagnoses',
    prescription: 'Prescriptions',
    lab_result: 'Lab results',
    };

    // Dummy data so the page works even before the backend endpoint exists
    const dummyRecords = [
    { _id: '1', type: 'visit', title: 'General consultation', description: 'Routine checkup. BP reading 128/84. Advised increased water intake and reduced sodium diet.', recordDate: '2025-06-12', doctorId: { name: 'Dr. A. Patel' } },
    { _id: '2', type: 'prescription', title: 'Amoxicillin prescribed', description: '500mg twice daily for 7 days. Take with food. Avoid alcohol. Refills: 0.', recordDate: '2025-06-12', doctorId: { name: 'Dr. A. Patel' } },
    { _id: '3', type: 'lab_result', title: 'Blood panel — all clear', description: 'CBC, lipid profile, fasting blood glucose — all values within normal range.', recordDate: '2025-05-28', doctorId: { name: 'Pathology Lab' } },
    { _id: '4', type: 'diagnosis', title: 'Mild hypertension diagnosed', description: 'Stage 1 hypertension. BP consistently above 130/80. Lifestyle changes advised.', recordDate: '2025-03-03', doctorId: { name: 'Dr. S. Rao' } },
    ];

    export default function MedicalHistory() {
    const { user } = useAuthStore();
    const [records, setRecords] = useState([]);
    const [activeFilter, setActiveFilter] = useState('all');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchHistory = async () => {
        try {
            const res = await api.get(`/records/patient/${user.id}`);
            setRecords(res.data.records || dummyRecords);
        } catch (err) {
            // Use dummy data if endpoint not ready yet
            setRecords(dummyRecords);
        } finally {
            setLoading(false);
        }
        };
        fetchHistory();
    }, [user.id]);

    const filtered = activeFilter === 'all'
        ? records
        : records.filter((r) => r.type === activeFilter);

    return (
        <div style={{ display: 'flex', height: '100vh', fontFamily: 'DM Sans, sans-serif' }}>
        <PatientSidebar />
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
            <Topbar title="Medical history" userName={user?.name} />
            <div style={{ flex: 1, padding: '24px 28px', overflowY: 'auto', background: '#F8FAFC' }}>

            {/* Filter pills */}
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '24px' }}>
                {filters.map((f) => (
                <button
                    key={f}
                    onClick={() => setActiveFilter(f)}
                    style={{ padding: '7px 16px', borderRadius: '20px', fontSize: '13px', fontWeight: '500', cursor: 'pointer', border: activeFilter === f ? 'none' : '1.5px solid #E2E8F0', background: activeFilter === f ? '#0D9488' : 'transparent', color: activeFilter === f ? '#fff' : '#64748B', fontFamily: 'DM Sans, sans-serif' }}>
                    {filterLabels[f]}
                </button>
                ))}
            </div>

            {loading ? (
                <div style={{ color: '#94A3B8', fontSize: '14px' }}>Loading your medical history...</div>
            ) : filtered.length === 0 ? (
                <div style={{ background: '#fff', border: '1px solid #F1F5F9', borderRadius: '14px', padding: '40px', textAlign: 'center' }}>
                <p style={{ fontSize: '14px', color: '#94A3B8', margin: 0 }}>No records found for this filter.</p>
                </div>
            ) : (
                <div style={{ position: 'relative', paddingLeft: '24px', maxWidth: '720px' }}>
                {/* Vertical line */}
                <div style={{ position: 'absolute', left: '7px', top: '8px', bottom: '8px', width: '2px', background: '#F1F5F9' }} />

                {filtered.map((record) => (
                    <div key={record._id} style={{ position: 'relative', marginBottom: '16px' }}>
                    {/* Dot */}
                    <div style={{ position: 'absolute', left: '-21px', top: '18px', width: '12px', height: '12px', borderRadius: '50%', background: dotColors[record.type] || '#94A3B8', border: '2.5px solid #F8FAFC', zIndex: 1 }} />

                    <div style={{ background: '#fff', border: '1px solid #F1F5F9', borderRadius: '14px', padding: '16px 20px' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '5px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
                            <span style={{ fontSize: '14px', fontWeight: '600', color: '#0F172A' }}>{record.title}</span>
                            <span style={{ ...badgeStyles[record.type], padding: '3px 10px', borderRadius: '20px', fontSize: '11px', fontWeight: '600' }}>
                            {record.type.replace('_', ' ').replace(/\b\w/g, (c) => c.toUpperCase())}
                            </span>
                        </div>
                        <span style={{ fontSize: '12px', color: '#CBD5E1', whiteSpace: 'nowrap', marginLeft: '12px' }}>
                            {new Date(record.recordDate).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}
                        </span>
                        </div>
                        <div style={{ fontSize: '12px', color: '#94A3B8', marginBottom: '6px' }}>
                        {record.doctorId?.name}
                        </div>
                        <div style={{ fontSize: '13px', color: '#475569', lineHeight: 1.55 }}>
                        {record.description}
                        </div>
                    </div>
                    </div>
                ))}
                </div>
            )}
            </div>
        </div>
        </div>
    );
    }