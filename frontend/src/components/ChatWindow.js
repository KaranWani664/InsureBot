import React, { useState } from 'react';
import MessageBubble from './MessageBubble';
import TextInput from './TextInput';
import { sendMessage } from '../services/chatService';

function ChatWindow() {
  const [messages, setMessages] = useState([
    { sender: 'bot', content: 'Hello! How can I help you today?' }
  ]);
  const [loading, setLoading] = useState(false);

  const handleSend = async (text) => {
    setMessages(prev => [...prev, { sender: 'user', content: text }]);
    setLoading(true);
    try {
      const response = await sendMessage(text);
      setMessages(prev => [...prev, { sender: 'bot', content: response }]);
    } catch (e) {
      setMessages(prev => [...prev, { sender: 'bot', content: 'Sorry, there was an error.' }]);
    }
    setLoading(false);
  };

  return (
    <div className="chat-window">
      <div style={{ minHeight: 200 }}>
        {messages.map((msg, idx) => (
          <MessageBubble key={idx} sender={msg.sender} content={msg.content} />
        ))}
        {loading && <MessageBubble sender="bot" content="..." />}
      </div>
      <TextInput onSend={handleSend} />
    </div>
  );
}

export default ChatWindow; 