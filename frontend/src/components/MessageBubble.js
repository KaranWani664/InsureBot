import React from 'react';

function MessageBubble({ sender, content }) {
  const isUser = sender === 'user';
  return (
    <div
      className={`message-bubble ${isUser ? 'user' : 'bot'} fade-in`}
      style={{ textAlign: isUser ? 'right' : 'left' }}
      aria-label={isUser ? 'User message' : 'Bot message'}
    >
      {content}
    </div>
  );
}

export default MessageBubble; 