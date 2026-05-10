    import { useNavigate } from 'react-router-dom';

    export default function PaymentCancel() {
    const navigate = useNavigate();
    return (
        <div style={{ minHeight: '100vh', background: '#FFF7F7', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'DM Sans, sans-serif', padding: '24px' }}>
        <div style={{ background: '#fff', borderRadius: '20px', border: '1px solid #E2E8F0', padding: '52px 48px', maxWidth: '480px', width: '100%', textAlign: 'center' }}>
            <div style={{ width: '64px', height: '64px', background: '#FEE2E2', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px', fontSize: '28px' }}>
            ✕
            </div>
            <div style={{ fontSize: '24px', fontWeight: '700', color: '#0F172A', marginBottom: '8px' }}>Payment cancelled</div>
            <div style={{ fontSize: '15px', color: '#64748B', marginBottom: '32px' }}>No charge was made. You can upgrade anytime from your dashboard.</div>
            <button onClick={() => navigate('/upgrade')}
            style={{ width: '100%', background: '#0D9488', color: '#fff', border: 'none', borderRadius: '10px', padding: '13px', fontSize: '15px', fontWeight: '600', cursor: 'pointer', marginBottom: '12px' }}>
            Try again
            </button>
            <button onClick={() => navigate('/patient/dashboard')}
            style={{ width: '100%', background: 'transparent', color: '#64748B', border: '1px solid #E2E8F0', borderRadius: '10px', padding: '13px', fontSize: '15px', cursor: 'pointer' }}>
            Back to dashboard
            </button>
        </div>
        </div>
    );
    }