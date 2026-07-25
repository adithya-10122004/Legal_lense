export default function Navbar() {
  return (
    <div className="navbar">
      <div className="brand-block">
        <div className="brand-icon">⚖</div>
        <div>
          <h2>Legal Lense AI</h2>
          <p>Trusted legal research for everyday questions</p>
        </div>
      </div>

      <div className="navbar-actions">
        <div className="status-chip">🟢 AI Online</div>
        <div className="mini-chip">BNS • IPC • FIR</div>
      </div>
    </div>
  );
}