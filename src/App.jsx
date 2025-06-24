import { useEffect, useRef, useState } from "react";
import ChatbotIcon from "./_components/ChatbotIcon";
import ChatForm from "./_components/ChatForm";
import ChatMessage from "./_components/ChatMessage";
import { companyInfo } from "./companyInfo";

function App() {
  const [chatHistory, setChatHistory] = useState([
    {
      hideInChat: true,
      role: "model",
      text: companyInfo,
    },
  ]);
  const chatBodyRef = useRef();

  const generateBotResponse = async (history) => {
    const updateHistory = (text) => {
      setChatHistory((prev) => [
        ...prev.filter((msg) => msg.text !== "Thinking..."),
        { role: "model", text },
      ]);
    };
    history = history.map(({ role, text }) => ({ role, parts: [{ text }] }));
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ contents: history }),
    };

    try {
      const response = await fetch(
        import.meta.env.VITE_API_KEY,
        requestOptions
      );
      const data = await response.json();
      if (!response.ok) throw new Error(data.error.message || "wronng");
      const apiResponseText = data.candidates[0].content.parts[0].text
        .replace(/\*\*(.*?)\*\*/g, "$1")
        .trim();
      updateHistory(apiResponseText);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    chatBodyRef.current.scrollTo({
      top: chatBodyRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [chatHistory]);

  return (
    <div className="w-full h-screen flex items-center justify-center bg-gray-100">
      <div>
        {/* header */}
        <div className="flex items-center justify-between bg-white p-4 shadow-md rounded-t-lg">
          <div className="flex items-center gap-2">
            <ChatbotIcon />
            <h2>Tuka</h2>
          </div>
          <button className="border-1 rounded-2xl p-2">down</button>
        </div>

        {/* body */}
        <div
          ref={chatBodyRef}
          className="bg-white p-4 shadow-md overflow-scroll rounded-b-lg h-120 overflow-y-auto flex flex-col gap-4"
        >
          <div className="flex items-center gap-2">
            <ChatbotIcon />
            <p className="bg-gray-200 p-2 rounded-lg">
              Snu bro, Asuuh ym baina uu
            </p>
          </div>

          {chatHistory.map((chat, index) => (
            <ChatMessage key={index} chat={chat} />
          ))}
        </div>

        {/* footer */}
        <div className="bg-white p-4 shadow-md rounded-lg mt-4">
          <ChatForm
            chatHistory={chatHistory}
            setChatHistory={setChatHistory}
            generateBotResponse={generateBotResponse}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
