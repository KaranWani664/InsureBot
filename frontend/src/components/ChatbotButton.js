import React, { useState } from 'react';
import './ChatbotButton.css';

const ChatbotButton = ({ onToggleChat }) => {
  const [isActive, setIsActive] = useState(false);

  const handleClick = () => {
    setIsActive(!isActive);
    if (onToggleChat) {
      onToggleChat(!isActive);
    }
  };

  return (
    <div className="chatbot-button-container">
      <button
        className={`chatbot-button ${isActive ? 'active' : ''}`}
        onClick={handleClick}
        aria-label="Open chatbot"
        title="Chat with InsureBot Assistant"
      >
        {isActive ? (
          // Close icon (X)
          <svg 
            width="24" 
            height="24" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round"
          >
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        ) : (
          // Chat icon
          <svg 
            width="24" 
            height="24" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round"
          >
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
          </svg>
        )}
      </button>
      
      {/* Voice indicator */}
      <div className="voice-indicator">
        <div className="voice-dot"></div>
        <div className="voice-dot"></div>
        <div className="voice-dot"></div>
      </div>
      
      {/* Tooltip */}
      <div className="chatbot-tooltip">
        <span>Chat with InsureBot</span>
        <div className="tooltip-arrow"></div>
      </div>
    </div>
  );
};

export default ChatbotButton; 