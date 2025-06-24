import { useRef } from "react";

export default function ChatForm({
  chatHistory,
  setChatHistory,
  generateBotResponse,
}) {
  const inputRef = useRef();
  const handleFormSubmit = (event) => {
    event.preventDefault();
    const userMessage = inputRef.current.value.trim();
    if (!userMessage) return;
    inputRef.current.value = "";
    setChatHistory((history) => [
      ...history,
      { role: "user", text: userMessage },
    ]);

    setTimeout(() => {
      setChatHistory((history) => [
        ...history,
        { role: "model", text: "Thinking..." },
      ]);
      generateBotResponse([
        ...chatHistory,
        { role: "user", text: ` pls use this :${userMessage}` },
      ]);
    }, 600);
  };
  return (
    <form
      className="bg-white p-4 shadow-md rounded-lg mt-4 flex items-center justify-between gap-2"
      onSubmit={handleFormSubmit}
    >
      <input
        ref={inputRef}
        type="text"
        placeholder="Message..."
        required
        className="flex-1 border border-gray-300 rounded-lg p-2 focus:outline-none focus:border-blue-500"
      />
      <button className="border border-blue-500 text-blue-500 rounded-2xl p-2 hover:bg-blue-100 transition-colors">
        Send
      </button>
    </form>
  );
}
