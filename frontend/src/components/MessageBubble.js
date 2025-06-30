import React from 'react';

function MessageBubble({ sender, content }) {
  const isUser = sender === 'user';
  return (
    <div style={{
      textAlign: isUser ? 'right' : 'left',
      margin: '0.5rem 0'
    }}>
      <span style={{
        display: 'inline-block',
        background: isUser ? '#1976d2' : '#eee',
        color: isUser ? '#fff' : '#333',
        borderRadius: 16,
        padding: '0.5rem 1rem',
        maxWidth: '70%'
      }}>
        {content}
      </span>
    </div>
  );
}

export default MessageBubble; 