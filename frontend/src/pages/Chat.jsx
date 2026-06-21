import { useState } from "react";
import api from "../services/api";

export default function Chat() {
  const [message, setMessage] = useState("");
  const [answer, setAnswer] = useState("");

  const askQuestion = async () => {
    try {
      const res = await api.post("/chat", {
        message,
      });

      setAnswer(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div style={{ padding: "30px" }}>
      <h1>Career Advisor</h1>

      <input
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Ask a career question..."
        style={{ width: "400px" }}
      />

      <button onClick={askQuestion}>
        Ask
      </button>

      <div
  style={{
    marginTop: 20,
    padding: 20,
    borderRadius: 12,
    border: "1px solid #ddd",
    whiteSpace: "pre-line"
  }}
>
  {answer.response}

  <br />
  <br />

  <strong>
    {answer.source === "cache"
      ? "⚡ Retrieved from Valkey Cache"
      : "🧠 Retrieved from Breeth Memory"}
  </strong>

</div>
    </div>
  );
}