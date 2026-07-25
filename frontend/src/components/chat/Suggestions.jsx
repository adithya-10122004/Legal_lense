const suggestions = [
  "🐶 I accidentally hit a dog while riding my bike.",
  "🚓 How can I file an FIR in India?",
  "📱 How do I report a cyber crime?",
  "🏠 Property dispute with my neighbour.",
  "💰 What are my consumer rights?",
  "👮 Can police arrest me without notice?",
];

export default function Suggestions({ setQuestion }) {
  return (
    <div className="suggestions">
      <h2>💡 Suggested prompts</h2>

      <div className="suggestion-grid">
        {suggestions.map((item, index) => (
          <div
            key={index}
            className="suggestion-card"
            onClick={() => setQuestion(item)}
          >
            {item}
          </div>
        ))}
      </div>
    </div>
  );
}