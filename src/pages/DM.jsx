import { useParams } from "react-router-dom";
import { useState } from "react";
import API from "../services/api";

export default function DM() {
  const { orgName } = useParams();
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const user = JSON.parse(localStorage.getItem("user"));

  const sendMessage = () => {
    if (!newMessage.trim()) return;

    const msg = {
      senderId: user.id,
      text: newMessage,
      timestamp: new Date().toISOString()
    };

    // This would save to API (for now just local state)
    setMessages([...messages, msg]);
    setNewMessage("");
  };

  return (
    <div className="p-4 max-w-xl mx-auto">
      <h1 className="text-xl font-bold mb-4">Chat with {orgName}</h1>

      {/* Chat messages */}
      <div className="border p-3 h-64 overflow-y-auto bg-gray-100 rounded">
        {messages.length === 0 && <p>No messages yet.</p>}
        {messages.map((m, i) => (
          <div key={i} className={`mb-2 ${m.senderId === user.id ? "text-right" : ""}`}>
            <p className={`inline-block px-3 py-2 rounded ${m.senderId === user.id ? "bg-blue-500 text-white" : "bg-gray-300"}`}>
              {m.text}
            </p>
          </div>
        ))}
      </div>

      {/* Input */}
      <div className="mt-3 flex">
        <input
          type="text"
          value={newMessage}
          onChange={e => setNewMessage(e.target.value)}
          className="flex-1 border px-3 py-2 rounded-l"
          placeholder="Type a message..."
        />
        <button
          onClick={sendMessage}
          className="bg-blue-500 text-white px-4 py-2 rounded-r hover:bg-blue-600"
        >
          Send
        </button>
      </div>
    </div>
  );
}
