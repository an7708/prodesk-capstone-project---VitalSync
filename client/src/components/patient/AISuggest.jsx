import { useState } from 'react';
import api from '../../api/axios';

const urgencyColors = {
routine: { bg: '#F0FDF4', text: '#166534', border: '#BBF7D0', label: 'Routine' },
soon:    { bg: '#FEF9C3', text: '#854D0E', border: '#FDE68A', label: 'See doctor soon' },
urgent:  { bg: '#FEE2E2', text: '#991B1B', border: '#FECACA', label: 'Urgent' },
};

export default function AISuggest({ compact = false }) {
const [symptoms, setSymptoms] = useState('');
const [result, setResult] = useState(null);
const [loading, setLoading] = useState(false);
const [error, setError] = useState('');

const handleSubmit = async (e) => {
e.preventDefault();
setLoading(true);
setError('');
setResult(null);
try {
const res = await api.post('/ai/suggest', { symptoms });
setResult(res.data.suggestion);
} catch (err) {
const msg = err.response?.data?.message || '';
if (msg.includes('quota') || msg.includes('exceeded') || msg.includes('429')) {
    setError('AI service is temporarily unavailable. Please try again later.');
} else {
    setError(msg || 'AI suggestion failed. Please try again.');
}
} finally {
setLoading(false);
}
};

const urgency = result ? urgencyColors[result.urgency] || urgencyColors.routine : null;

return (
<div style={{ background: '#fff', border: compact ? 'none' : '1px solid #F1F5F9', borderRadius: '16px', padding: compact ? '0' : '22px 24px' }}>
{!compact && (
    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '6px' }}>
    <div style={{ width: '32px', height: '32px', background: '#CCFBF1', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '16px' }}>
        AI
    </div>
    <div>
        <div style={{ fontSize: '14px', fontWeight: '600', color: '#0F172A' }}>AI Doctor Suggestion</div>
        <div style={{ fontSize: '12px', color: '#94A3B8' }}>Describe your symptoms and get a specialist recommendation</div>
    </div>
    </div>
)}

<form onSubmit={handleSubmit} style={{ marginTop: compact ? '0' : '16px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
    <textarea
    value={symptoms}
    onChange={(e) => setSymptoms(e.target.value)}
    placeholder="e.g. I have chest pain and shortness of breath for two days..."
    rows={compact ? 3 : 4}
    style={{ width: '100%', border: '1.5px solid #E2E8F0', borderRadius: '9px', padding: '10px 12px', fontSize: '13px', fontFamily: 'DM Sans, sans-serif', outline: 'none', resize: 'vertical', boxSizing: 'border-box', color: '#0F172A' }}
    />
    <button
    type="submit"
    disabled={loading || symptoms.trim().length < 10}
    style={{ background: loading || symptoms.trim().length < 10 ? '#94A3B8' : '#0D9488', color: '#fff', border: 'none', borderRadius: '9px', padding: '10px 20px', fontSize: '13px', fontWeight: '600', cursor: loading || symptoms.trim().length < 10 ? 'not-allowed' : 'pointer', alignSelf: 'flex-start', fontFamily: 'DM Sans, sans-serif' }}>
    {loading ? 'Analysing symptoms...' : 'Get AI suggestion'}
    </button>
</form>

{error && (
    <div style={{ background: '#FEE2E2', border: '1px solid #FECACA', borderRadius: '8px', padding: '10px 14px', fontSize: '13px', color: '#991B1B', marginTop: '12px' }}>
    {error}
    </div>
)}

{result && (
    <div style={{ marginTop: '16px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
    <div style={{ background: '#F0FDF9', border: '1px solid #A7F3D0', borderRadius: '12px', padding: '16px 18px' }}>
        <div style={{ fontSize: '12px', color: '#065F46', fontWeight: '600', marginBottom: '4px' }}>Recommended specialist</div>
        <div style={{ fontSize: '18px', fontWeight: '700', color: '#0F172A', marginBottom: '6px' }}>{result.suggestedSpecialty}</div>
        <div style={{ fontSize: '13px', color: '#475569' }}>{result.reason}</div>
    </div>

    <div style={{ background: urgency.bg, border: `1px solid ${urgency.border}`, borderRadius: '10px', padding: '12px 16px', display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
        <div style={{ flexShrink: 0, marginTop: '1px' }}>
        <span style={{ background: urgency.text, color: '#fff', padding: '2px 8px', borderRadius: '20px', fontSize: '11px', fontWeight: '700' }}>{urgency.label}</span>
        </div>
        <div style={{ fontSize: '13px', color: urgency.text }}>{result.urgencyNote}</div>
    </div>

    <div style={{ background: '#F8FAFC', borderRadius: '8px', padding: '10px 14px', fontSize: '11px', color: '#94A3B8', fontStyle: 'italic' }}>
        {result.disclaimer}
    </div>
    </div>
)}
</div>
);
}