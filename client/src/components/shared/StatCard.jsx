    export default function StatCard({ label, value, note, noteColor = '#0D9488' }) {
    return (
        <div style={{ background: '#F8FAFC', borderRadius: '12px', padding: '16px 18px', flex: 1 }}>
        <div style={{ fontSize: '12px', color: '#94A3B8', fontWeight: '500', marginBottom: '8px' }}>{label}</div>
        <div style={{ fontSize: '26px', fontWeight: '600', color: '#0F172A', lineHeight: 1 }}>{value}</div>
        {note && <div style={{ fontSize: '12px', color: noteColor, marginTop: '5px' }}>{note}</div>}
        </div>
    );
    }