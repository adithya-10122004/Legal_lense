export default function ChatInput({
  question,
  setQuestion,
  askAI,
  loading,
}) {
  function handleKeyDown(event) {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      askAI();
    }
  }

  return (
    <div className="input-box">
      <div className="input-shell">
        <textarea
          placeholder="Ask any legal question..."
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          onKeyDown={handleKeyDown}
        />

        <button className="ask-btn" onClick={askAI} disabled={loading}>
          {loading ? "Analyzing..." : "⚖ Ask Legal Lense"}
        </button>
      </div>
    </div>
  );
}