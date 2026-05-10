    const colors = [
    { bg: '#EEF2FF', text: '#4F46E5' },
    { bg: '#CCFBF1', text: '#065F46' },
    { bg: '#FEF3C7', text: '#92400E' },
    { bg: '#FCE7F3', text: '#9D174D' },
    { bg: '#EFF6FF', text: '#1D4ED8' },
    ];

    export default function AvatarCircle({ name = '', size = 36 }) {
    const initials = name.split(' ').map((n) => n[0]).join('').slice(0, 2).toUpperCase();
    const color = colors[name.charCodeAt(0) % colors.length];
    return (
        <div style={{ width: size, height: size, borderRadius: '50%', background: color.bg, color: color.text, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: size * 0.33, fontWeight: '600', flexShrink: 0 }}>
        {initials}
        </div>
    );
    }   