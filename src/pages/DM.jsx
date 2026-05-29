import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import Navbar from "../components/Navbar";
import API from "../services/api";

export default function DM() {
  const { orgName } = useParams();
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const user = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();

  const sendMessage = () => {
    if (!newMessage.trim()) return;

    const msg = {
      senderId: user.id,
      text: newMessage,
      timestamp: new Date().toISOString(),
    };

    // This would save to API (for now just local state)
    setMessages([...messages, msg]);
    setNewMessage("");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">
      <Navbar />

      <div className="max-w-5xl mx-auto px-4 py-6">
        
        {/* CHAT CONTAINER */}
        <div className="bg-white border border-gray-100 shadow-xl rounded-3xl overflow-hidden">
          
          {/* HEADER */}
          <div className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 p-5 md:p-6 text-white relative overflow-hidden">
            
            {/* BLURS */}
            <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-white/10 rounded-full blur-2xl"></div>

            <div className="relative z-10 flex items-center justify-between gap-4">
              
              <div className="flex items-center gap-4">
                
                {/* AVATAR */}
                <div className="w-14 h-14 rounded-2xl bg-white/20 backdrop-blur-lg flex items-center justify-center text-2xl font-bold border border-white/20">
                  🏢
                </div>

                <div>
                  <h1 className="text-2xl md:text-3xl font-bold">
                    {orgName}
                  </h1>

                  <div className="flex items-center gap-2 mt-1">
                    <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>

                    <p className="text-sm text-blue-100">
                      Active Conversation
                    </p>
                  </div>
                </div>
              </div>

              {/* BACK BUTTON */}
              <button
                onClick={() => navigate(-1)}
                className="bg-white/20 hover:bg-white/30 backdrop-blur-md px-4 py-2 rounded-2xl text-sm font-medium transition-all duration-300 border border-white/20"
              >
                ← Back
              </button>
            </div>
          </div>

          {/* CHAT AREA */}
          <div className="h-[65vh] flex flex-col">
            
            {/* MESSAGES */}
            <div className="flex-1 overflow-y-auto p-4 md:p-6 bg-gradient-to-b from-slate-50 to-white space-y-4">
              
              {messages.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center px-4">
                  
                  <div className="w-24 h-24 rounded-full bg-blue-100 flex items-center justify-center text-5xl mb-6">
                    💬
                  </div>

                  <h2 className="text-2xl font-bold text-gray-800">
                    Start Your Conversation
                  </h2>

                  <p className="text-gray-500 mt-3 max-w-md leading-relaxed">
                    Connect with <span className="font-semibold">{orgName}</span> and
                    discuss collaborations, opportunities, and ideas.
                  </p>
                </div>
              ) : (
                messages.map((m, i) => (
                  <div
                    key={i}
                    className={`flex ${
                      m.senderId === user.id
                        ? "justify-end"
                        : "justify-start"
                    }`}
                  >
                    <div
                      className={`max-w-[80%] md:max-w-[65%] px-5 py-3 rounded-3xl shadow-sm transition-all duration-300 ${
                        m.senderId === user.id
                          ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-br-md"
                          : "bg-white border border-gray-200 text-gray-800 rounded-bl-md"
                      }`}
                    >
                      <p className="text-sm md:text-base break-words">
                        {m.text}
                      </p>

                      <p
                        className={`text-[11px] mt-2 ${
                          m.senderId === user.id
                            ? "text-blue-100"
                            : "text-gray-400"
                        }`}
                      >
                        {new Date(m.timestamp).toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </p>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* INPUT AREA */}
            <div className="border-t border-gray-100 bg-white p-4">
              
              <div className="flex items-center gap-3">
                
                {/* INPUT */}
                <div className="flex-1 relative">
                  <input
                    type="text"
                    value={newMessage}
                    onChange={(e) =>
                      setNewMessage(e.target.value)
                    }
                    onKeyDown={(e) =>
                      e.key === "Enter" && sendMessage()
                    }
                    className="w-full border border-gray-200 bg-gray-50 focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-100 px-5 py-4 rounded-2xl outline-none transition-all duration-300 pr-12"
                    placeholder="Type your message..."
                  />

                  <div className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 text-xl">
                    ✨
                  </div>
                </div>

                {/* SEND BUTTON */}
                <button
                  onClick={sendMessage}
                  className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:scale-105 text-white px-6 md:px-7 py-4 rounded-2xl font-semibold shadow-lg hover:shadow-2xl transition-all duration-300"
                >
                  Send
                </button>
              </div>

              {/* FOOTER TEXT */}
              <p className="text-xs text-gray-400 mt-3 text-center">
                BizBridge secure messaging • Build meaningful collaborations
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}