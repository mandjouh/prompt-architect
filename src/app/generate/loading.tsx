export default function GenerateLoading() {
  return (
    <div style={{ minHeight: '100vh', background: '#07090C', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'monospace' }}>
      <div style={{ textAlign: 'center' }}>
        <div style={{ fontSize: 32, color: '#D4FF57', marginBottom: 16, animation: 'spin 1s linear infinite' }}>◈</div>
        <div style={{ fontSize: 12, color: '#94A3B8', letterSpacing: '0.1em' }}>CHARGEMENT DU GÉNÉRATEUR...</div>
        <style>{`@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }`}</style>
      </div>
    </div>
  )
}
