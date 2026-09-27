import Message from "./Message";

function ChatBox({ messages, loading }) {
  return (
    <div className="chat-box">

      {messages.length === 0 && !loading ? (
        <p>📄 Upload a PDF and ask your first question.</p>
      ) : (
        <>
          {messages.map((msg, index) => (
            <Message
              key={index}
              sender={msg.sender}
              text={msg.text}
            />
          ))}

          {loading && (
            <div className="ai-message">
              <strong>🤖 AI</strong>
              <p>Thinking...</p>
            </div>
          )}
        </>
      )}

    </div>
  );
}

export default ChatBox;