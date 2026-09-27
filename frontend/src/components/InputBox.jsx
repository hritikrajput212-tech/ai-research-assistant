function InputBox({
  question,
  setQuestion,
  askQuestion,
  loading,
}) {
  return (
    <div className="input-box">

      <input
        type="text"
        placeholder="Ask anything about your PDF..."
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            askQuestion();
          }
        }}
      />

      <button
        onClick={askQuestion}
        disabled={loading}
      >
        {loading ? "Thinking..." : "Send"}
      </button>

    </div>
  );
}

export default InputBox;