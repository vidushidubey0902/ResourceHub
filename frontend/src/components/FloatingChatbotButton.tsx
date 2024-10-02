import React, { useState } from "react";
import "../assets/FloatingChatbotButton.css";

const FloatingChatbotButton: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleChatbot = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <div className={`floating-chatbot ${isOpen ? "open" : ""}`}>
        <iframe
          src="https://devten-chatbot.streamlit.app/?embedded=true"
          title="Streamlit Chatbot"
          className="chatbot-iframe"
        ></iframe>
      </div>
      <button className="chatbot-button" onClick={toggleChatbot}>
        <img src="/chatbot.png" alt="Chatbot" className="chatbot-icon" />
      </button>
    </>
  );
};

export default FloatingChatbotButton;
