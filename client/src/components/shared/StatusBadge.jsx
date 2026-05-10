    const styles = {
    pending:   { background: '#F0FDF4', color: '#166534', border: '1px solid #BBF7D0' },
    confirmed: { background: '#FEF9C3', color: '#854D0E', border: '1px solid #FDE68A' },
    completed: { background: '#F1F5F9', color: '#475569', border: '1px solid #E2E8F0' },
    cancelled: { background: '#FEE2E2', color: '#991B1B', border: '1px solid #FECACA' },
    online:    { background: '#DCFCE7', color: '#166534', border: '1px solid #BBF7D0' },
    busy:      { background: '#FEF9C3', color: '#854D0E', border: '1px solid #FDE68A' },
    offline:   { background: '#F1F5F9', color: '#94A3B8', border: '1px solid #E2E8F0' },
    };

    export default function StatusBadge({ status }) {
    const style = styles[status] || styles.offline;
    return (
        <span style={{ ...style, padding: '3px 10px', borderRadius: '20px', fontSize: '11px', fontWeight: '600', display: 'inline-block' }}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
        </span>
    );
    }