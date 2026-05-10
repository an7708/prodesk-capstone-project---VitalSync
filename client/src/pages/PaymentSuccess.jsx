    import { useEffect, useState } from 'react';
    import { useSearchParams, useNavigate } from 'react-router-dom';
    import api from '../api/axios';

    export default function PaymentSuccess() {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const [verified, setVerified] = useState(false);
    const [details, setDetails] = useState(null);
    const sessionId = searchParams.get('session_id');

    useEffect(() => {
        if (!sessionId) return;
        const verify = async () => {
        try {
            const res = await api.get(`/payments/verify/${sessionId}`);
            if (res.data.paid) {
            setVerified(true);
            setDetails(res.data);
            }
        } catch (err) {
            console.error('Verification failed:', err);
        }
        };
        verify();
    }, [sessionId]);

    return (
        <div style={{ minHeight: '100vh', background: '#F0FDF9', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'DM Sans, sans-serif', padding: '24px' }}>
        <div style={{ background: '#fff', borderRadius: '20px', border: '1px solid #E2E8F0', padding: '52px 48px', maxWidth: '480px', width: '100%', textAlign: 'center' }}>
            <div style={{ width: '64px', height: '64px', background: '#DCFCE7', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px', fontSize: '28px' }}>
            ✓
            </div>
            <div style={{ fontSize: '24px', fontWeight: '700', color: '#0F172A', marginBottom: '8px' }}>
            Payment successful
            </div>
            <div style={{ fontSize: '15px', color: '#64748B', marginBottom: '32px', lineHeight: 1.6 }}>
            {verified
                ? `Welcome to VitalSync Pro. Your ${details?.plan?.replace('_', ' ')} plan is now active.`
                : 'Your payment is being processed. Your Pro features will be active shortly.'}
            </div>
            {details && (
            <div style={{ background: '#F8FAFC', borderRadius: '10px', padding: '16px', marginBottom: '28px', textAlign: 'left' }}>
                <div style={{ fontSize: '12px', color: '#94A3B8', marginBottom: '4px' }}>Amount paid</div>
                <div style={{ fontSize: '20px', fontWeight: '700', color: '#0D9488' }}>${(details.amount / 100).toFixed(2)}</div>
            </div>
            )}
            <button onClick={() => navigate('/patient/dashboard')}
            style={{ width: '100%', background: '#0D9488', color: '#fff', border: 'none', borderRadius: '10px', padding: '13px', fontSize: '15px', fontWeight: '600', cursor: 'pointer' }}>
            Go to dashboard
            </button>
        </div>
        </div>
    );
    }