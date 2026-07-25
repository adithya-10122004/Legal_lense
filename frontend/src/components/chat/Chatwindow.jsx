import ReactMarkdown from "react-markdown";

const icons = {
  Summary: "📋",
  "Applicable Laws": "📚",
  "Legal Procedure": "⚖️",
  "Possible Penalties": "🚨",
  "Rights of the Citizen": "🛡️",
  Sources: "📖",
};

export default function ChatWindow({ messages, loading, activeView }) {
  if (activeView === "history") {
    return (
      <div className="chat">
        <div className="history-view">
          <h2>Conversation history</h2>
          {messages.length === 0 ? (
            <div className="history-empty">No saved conversations yet.</div>
          ) : (
            messages.map((msg, index) => (
              <div className="history-card" key={`${msg.question}-${index}`}>
                <h3>{msg.question}</h3>
                <p>{msg.answer.slice(0, 140)}{msg.answer.length > 140 ? "..." : ""}</p>
              </div>
            ))
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="chat">
      {messages.length === 0 && !loading && (
        <div className="welcome-screen">
          <div className="welcome-card">
            <div className="welcome-badge">⚖ AI Legal Research</div>
            <h1>Ask legal questions with clarity.</h1>
            <p>
              Explore Indian laws, BNS, FIR procedures, consumer rights, cybercrime,
              property issues, contracts, and more through a calm, intelligent assistant.
            </p>
            <div className="welcome-stats">
              <div className="stat-pill">BNS • IPC • FIR</div>
              <div className="stat-pill">Consumer rights</div>
              <div className="stat-pill">Property & contracts</div>
            </div>
          </div>
        </div>
      )}

      {messages.map((msg, index) => (
        <div key={index}>
          <div className="user">
            <h3>👤 You</h3>
            <p>{msg.question}</p>
          </div>

          <div className="bot">
            <h3>⚖ Legal Lense AI</h3>

            {Object.keys(msg.parsed).length > 0 ? (
              Object.entries(msg.parsed).map(([title, content]) => (
                <div className="card" key={title}>
                  <h2>
                    {icons[title]} {title}
                  </h2>
                  <ReactMarkdown>{content}</ReactMarkdown>
                </div>
              ))
            ) : (
              <ReactMarkdown>{msg.answer}</ReactMarkdown>
            )}
          </div>
        </div>
      ))}

      {loading && (
        <div className="bot">
          <h3>🤖 Legal Lense AI</h3>
          <p>Analyzing legal documents and drafting a clear response...</p>
        </div>
      )}
    </div>
  );
}