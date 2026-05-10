import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/axios';

export default function Upgrade() {
const navigate = useNavigate();
const [loading, setLoading] = useState(null);
const [error, setError] = useState('');

const handleUpgrade = async (plan) => {
    setLoading(plan);
    setError('');
    try {
    const res = await api.post('/payments/create-checkout-session', { plan });
    window.location.href = res.data.url;
    } catch (err) {
    setError('Payment session could not be created. Please try again.');
    setLoading(null);
    }
};

const plans = [
    {
    id: 'pro_monthly',
    name: 'Pro Monthly',
    price: '$9.99',
    period: 'per month',
    features: [
        'Unlimited appointment bookings',
        'Priority doctor matching',
        'Full prescription history',
        'Medical history PDF export',
        'Email appointment reminders',
    ],
    },
    {
    id: 'pro_yearly',
    name: 'Pro Yearly',
    price: '$79.99',
    period: 'per year',
    badge: 'Best value — save 33%',
    features: [
        'Everything in Pro Monthly',
        'Family account up to 4 members',
        'Priority customer support',
        'Early access to new features',
        'Annual health summary report',
    ],
    },
];

return (
    <div style={{ minHeight: '100vh', background: '#F0FDF9', padding: '60px 24px', fontFamily: 'DM Sans, sans-serif' }}>
    <div style={{ maxWidth: '800px', margin: '0 auto' }}>

        <button
        onClick={() => navigate(-1)}
        style={{ background: 'none', border: 'none', color: '#64748B', cursor: 'pointer', fontSize: '14px', marginBottom: '32px', padding: 0 }}>
        ← Back
        </button>

        <div style={{ textAlign: 'center', marginBottom: '48px' }}>
        <div style={{ fontSize: '28px', fontWeight: '700', color: '#0F172A', marginBottom: '8px' }}>
            Upgrade to VitalSync Pro
        </div>
        <div style={{ fontSize: '16px', color: '#64748B' }}>
            Get unlimited access to premium healthcare features
        </div>
        </div>

        {error && (
        <div style={{ background: '#FEE2E2', border: '1px solid #FECACA', borderRadius: '10px', padding: '12px 16px', color: '#991B1B', fontSize: '14px', marginBottom: '24px', textAlign: 'center' }}>
            {error}
        </div>
        )}

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
        {plans.map((plan) => (
            <div
            key={plan.id}
            style={{ background: '#fff', borderRadius: '16px', border: plan.id === 'pro_yearly' ? '2px solid #0D9488' : '1px solid #E2E8F0', padding: '28px', display: 'flex', flexDirection: 'column', gap: '20px', position: 'relative' }}>

            {plan.badge && (
                <div style={{ position: 'absolute', top: '-12px', left: '50%', transform: 'translateX(-50%)', background: '#0D9488', color: '#fff', padding: '4px 16px', borderRadius: '20px', fontSize: '12px', fontWeight: '600', whiteSpace: 'nowrap' }}>
                {plan.badge}
                </div>
            )}

            <div>
                <div style={{ fontSize: '16px', fontWeight: '700', color: '#0F172A', marginBottom: '4px' }}>
                {plan.name}
                </div>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: '4px' }}>
                <span style={{ fontSize: '32px', fontWeight: '700', color: '#0D9488' }}>{plan.price}</span>
                <span style={{ fontSize: '14px', color: '#94A3B8' }}>{plan.period}</span>
                </div>
            </div>

            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {plan.features.map((feature, i) => (
                <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', fontSize: '14px', color: '#475569' }}>
                    <span style={{ color: '#0D9488', fontWeight: '700', flexShrink: 0 }}>✓</span>
                    {feature}
                </li>
                ))}
            </ul>

            <button
                onClick={() => handleUpgrade(plan.id)}
                disabled={loading === plan.id}
                style={{ background: plan.id === 'pro_yearly' ? '#0D9488' : 'transparent', color: plan.id === 'pro_yearly' ? '#fff' : '#0D9488', border: '2px solid #0D9488', borderRadius: '10px', padding: '13px', fontSize: '15px', fontWeight: '600', cursor: loading === plan.id ? 'not-allowed' : 'pointer', opacity: loading === plan.id ? 0.7 : 1, marginTop: 'auto' }}>
                {loading === plan.id ? 'Redirecting to Stripe...' : `Get ${plan.name}`}
            </button>
            </div>
        ))}
        </div>

        <div style={{ textAlign: 'center', marginTop: '32px', fontSize: '13px', color: '#94A3B8' }}>
        Secured by Stripe · Test mode — use card 4242 4242 4242 4242
        </div>
    </div>
    </div>
);
}    
    
    
    
    
    
    
    
    
    
    
    
    
    
    // import { useState } from 'react';
    // import api from '../api/axios';

    // export default function AISuggest({ compact = false }) {
    // const [symptoms, setSymptoms] = useState('');
    // const [result, setResult] = useState(null);
    // const [loading, setLoading] = useState(false);
    // const [error, setError] = useState('');

    // const handleSubmit = async () => {
    // if (symptoms.trim().length < 10) {
    // setError('Please describe your symptoms in at least 10 characters.');
    // return;
    // }
    // setLoading(true);
    // setError('');
    // setResult(null);
    // try {
    // const res = await api.post('/ai/suggest', { symptoms });
    // setResult(res.data.suggestion);
    // } catch (err) {
    // setError(err.response?.data?.message || 'Something went wrong. Please try again.');
    // } finally {
    // setLoading(false);
    // }
    // };

    // const urgencyColor = (urgency) => {
    // if (urgency === 'urgent') return '#EF4444';
    // if (urgency === 'soon') return '#F59E0B';
    // return '#10B981';
    // };

    // const content = (
    // <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
    // <textarea
    // value={symptoms}
    // onChange={(e) => { setSymptoms(e.target.value); setError(''); }}
    // placeholder="e.g. I have back pain for 5 days and mild fever..."
    // rows={compact ? 3 : 4}
    // style={{
    //     width: '100%',
    //     border: '1.5px solid #E2E8F0',
    //     borderRadius: '10px',
    //     padding: '10px 12px',
    //     fontSize: '13px',
    //     fontFamily: 'DM Sans, sans-serif',
    //     outline: 'none',
    //     resize: 'vertical',
    //     boxSizing: 'border-box',
    //     color: '#0F172A',
    // }}
    // />

    // {error && (
    // <div style={{ background: '#FEE2E2', border: '1px solid #FECACA', borderRadius: '8px', padding: '8px 12px', fontSize: '12px', color: '#991B1B' }}>
    //     {error}
    // </div>
    // )}

    // <button
    // onClick={handleSubmit}
    // disabled={loading}
    // style={{
    //     background: loading ? '#94A3B8' : 'linear-gradient(135deg, #0D9488, #0F766E)',
    //     color: '#fff',
    //     border: 'none',
    //     borderRadius: '10px',
    //     padding: '10px',
    //     fontSize: '13px',
    //     fontWeight: '600',
    //     cursor: loading ? 'not-allowed' : 'pointer',
    // }}>
    // {loading ? 'Thinking...' : 'Get AI suggestion'}
    // </button>

    // {result && (
    // <div style={{ background: '#F0FDF9', border: '1px solid #A7F3D0', borderRadius: '12px', padding: '14px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
    //     <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
    //     <span style={{ fontSize: '13px', fontWeight: '700', color: '#0D9488' }}>
    //         See a {result.suggestedSpecialty}
    //     </span>
    //     <span style={{
    //         fontSize: '11px',
    //         fontWeight: '600',
    //         padding: '2px 10px',
    //         borderRadius: '20px',
    //         background: urgencyColor(result.urgency) + '20',
    //         color: urgencyColor(result.urgency),
    //     }}>
    //         {result.urgency}
    //     </span>
    //     </div>
    //     <div style={{ fontSize: '12px', color: '#475569', lineHeight: '1.5' }}>{result.reason}</div>
    //     <div style={{ fontSize: '12px', color: '#64748B', fontStyle: 'italic' }}>{result.urgencyNote}</div>
    //     <div style={{ fontSize: '11px', color: '#94A3B8', borderTop: '1px solid #D1FAE5', paddingTop: '8px', marginTop: '2px' }}>
    //     {result.disclaimer}
    //     </div>
    // </div>
    // )}
    // </div>
    // );

    // if (compact) return content;

    // return (
    // <div style={{ background: '#fff', border: '1px solid #E2E8F0', borderRadius: '16px', padding: '20px', maxWidth: '560px' }}>
    // <div style={{ marginBottom: '14px' }}>
    // <div style={{ fontSize: '15px', fontWeight: '600', color: '#0F172A' }}>AI Doctor Suggestion</div>
    // <div style={{ fontSize: '13px', color: '#94A3B8', marginTop: '2px' }}>Describe your symptoms and get a specialist recommendation</div>
    // </div>
    // {content}
    // </div>
    // );
    // }    

    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    // import { useState } from 'react';
    // import { useNavigate } from 'react-router-dom';
    // import api from '../api/axios';

    // export default function Upgrade() {
    // const navigate = useNavigate();
    // const [loading, setLoading] = useState(null);
    // const [error, setError] = useState('');

    // const handleUpgrade = async (plan) => {
    //     setLoading(plan);
    //     setError('');
    //     try {
    //     const res = await api.post('/payments/create-checkout-session', { plan });
    //     window.location.href = res.data.url;
    //     } catch (err) {
    //     setError('Payment session could not be created. Please try again.');
    //     setLoading(null);
    //     }
    // };

    // const plans = [
    //     {
    //     id: 'pro_monthly',
    //     name: 'Pro Monthly',
    //     price: '$9.99',
    //     period: 'per month',
    //     features: [
    //         'Unlimited appointment bookings',
    //         'Priority doctor matching',
    //         'Full prescription history',
    //         'Medical history PDF export',
    //         'Email appointment reminders',
    //     ],
    //     },
    //     {
    //     id: 'pro_yearly',
    //     name: 'Pro Yearly',
    //     price: '$79.99',
    //     period: 'per year',
    //     badge: 'Best value — save 33%',
    //     features: [
    //         'Everything in Pro Monthly',
    //         'Family account up to 4 members',
    //         'Priority customer support',
    //         'Early access to new features',
    //         'Annual health summary report',
    //     ],
    //     },
    // ];

    // return (
    //     <div style={{ minHeight: '100vh', background: '#F0FDF9', padding: '60px 24px', fontFamily: 'DM Sans, sans-serif' }}>
    //     <div style={{ maxWidth: '800px', margin: '0 auto' }}>

    //         <button
    //         onClick={() => navigate(-1)}
    //         style={{ background: 'none', border: 'none', color: '#64748B', cursor: 'pointer', fontSize: '14px', marginBottom: '32px', padding: 0 }}>
    //         Back
    //         </button>

    //         <div style={{ textAlign: 'center', marginBottom: '48px' }}>
    //         <div style={{ fontSize: '28px', fontWeight: '700', color: '#0F172A', marginBottom: '8px' }}>
    //             Upgrade to VitalSync Pro
    //         </div>
    //         <div style={{ fontSize: '16px', color: '#64748B' }}>
    //             Get unlimited access to premium healthcare features
    //         </div>
    //         </div>

    //         {error && (
    //         <div style={{ background: '#FEE2E2', border: '1px solid #FECACA', borderRadius: '10px', padding: '12px 16px', color: '#991B1B', fontSize: '14px', marginBottom: '24px', textAlign: 'center' }}>
    //             {error}
    //         </div>
    //         )}

    //         <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
    //         {plans.map((plan) => (
    //             <div
    //             key={plan.id}
    //             style={{ background: '#fff', borderRadius: '16px', border: plan.id === 'pro_yearly' ? '2px solid #0D9488' : '1px solid #E2E8F0', padding: '28px', display: 'flex', flexDirection: 'column', gap: '20px', position: 'relative' }}>

    //             {plan.badge && (
    //                 <div style={{ position: 'absolute', top: '-12px', left: '50%', transform: 'translateX(-50%)', background: '#0D9488', color: '#fff', padding: '4px 16px', borderRadius: '20px', fontSize: '12px', fontWeight: '600', whiteSpace: 'nowrap' }}>
    //                 {plan.badge}
    //                 </div>
    //             )}

    //             <div>
    //                 <div style={{ fontSize: '16px', fontWeight: '700', color: '#0F172A', marginBottom: '4px' }}>
    //                 {plan.name}
    //                 </div>
    //                 <div style={{ display: 'flex', alignItems: 'baseline', gap: '4px' }}>
    //                 <span style={{ fontSize: '32px', fontWeight: '700', color: '#0D9488' }}>{plan.price}</span>
    //                 <span style={{ fontSize: '14px', color: '#94A3B8' }}>{plan.period}</span>
    //                 </div>
    //             </div>

    //             <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '10px' }}>
    //                 {plan.features.map((feature, i) => (
    //                 <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', fontSize: '14px', color: '#475569' }}>
    //                     <span style={{ color: '#0D9488', fontWeight: '700', flexShrink: 0 }}>✓</span>
    //                     {feature}
    //                 </li>
    //                 ))}
    //             </ul>

    //             <button
    //                 onClick={() => handleUpgrade(plan.id)}
    //                 disabled={loading === plan.id}
    //                 style={{ background: plan.id === 'pro_yearly' ? '#0D9488' : 'transparent', color: plan.id === 'pro_yearly' ? '#fff' : '#0D9488', border: '2px solid #0D9488', borderRadius: '10px', padding: '13px', fontSize: '15px', fontWeight: '600', cursor: loading === plan.id ? 'not-allowed' : 'pointer', opacity: loading === plan.id ? 0.7 : 1, marginTop: 'auto' }}>
    //                 {loading === plan.id ? 'Redirecting to Stripe...' : `Get ${plan.name}`}
    //             </button>
    //             </div>
    //         ))}
    //         </div>

    //         <div style={{ textAlign: 'center', marginTop: '32px', fontSize: '13px', color: '#94A3B8' }}>
    //         Secured by Stripe. Test mode — use card 4242 4242 4242 4242
    //         </div>
    //     </div>
    //     </div>
    // );
    // }