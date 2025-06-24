import ChatbotIcon from "./ChatbotIcon";

export default function ChatMessage({ chat }) {
  return (
    !chat.hideInChat && (
      <div
        className={`message ${
          chat.role === "model" ? "bot" : "user"
        }-message flex items-center `}
      >
        {chat.role === "model" && <ChatbotIcon />}
        <p
          className={`${
            chat.role === "model"
              ? "bg-gray-200 p-2 rounded-lg "
              : " flex flex-col items-end bg-purple-500 max-w-xs rounded-lg p-2 ml-30"
          }
      `}
        >
          {chat.text}
        </p>
      </div>
    )
  );
}
