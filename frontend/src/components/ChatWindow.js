import React, { useState, useEffect } from 'react';
import MessageBubble from './MessageBubble';
import TextInput from './TextInput';
import { sendMessage } from '../services/chatService';

function ChatWindow() {
  const [messages, setMessages] = useState([
    { sender: 'bot', content: 'Hello! How can I help you today?' }
  ]);
  const [loading, setLoading] = useState(false);
  const [mode, setMode] = useState('chat'); // 'chat' or 'voice'
  const [listening, setListening] = useState(false);

  // Speak bot replies in voice mode
  useEffect(() => {
    if (mode === 'voice' && messages.length > 0) {
      const lastMsg = messages[messages.length - 1];
      if (lastMsg.sender === 'bot') {
        const utter = new window.SpeechSynthesisUtterance(lastMsg.content);
        window.speechSynthesis.speak(utter);
      }
    }
    // eslint-disable-next-line
  }, [messages, mode]);

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

  // Voice input handler for voice mode
  const handleVoiceInput = () => {
    if (!('webkitSpeechRecognition' in window)) {
      alert('Speech recognition not supported in this browser.');
      return;
    }
    setListening(true);
    const recognition = new window.webkitSpeechRecognition();
    recognition.lang = 'en-US';
    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      handleSend(transcript);
      setListening(false);
    };
    recognition.onerror = () => setListening(false);
    recognition.onend = () => setListening(false);
    recognition.start();
  };

  return (
    <div className="chat-window">
      {/* Toggle Button */}
      <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 16 }}>
        <button
          onClick={() => setMode('chat')}
          style={{
            flex: 1,
            padding: '10px 0',
            background: mode === 'chat' ? '#1e3a8a' : '#f0f0f0',
            color: mode === 'chat' ? '#fff' : '#333',
            border: '1px solid #1e3a8a',
            borderRadius: '12px 0 0 12px',
            fontWeight: 'bold',
            cursor: 'pointer',
            outline: 'none',
            transition: 'background 0.2s',
          }}
        >
          Chat
        </button>
        <button
          onClick={() => setMode('voice')}
          style={{
            flex: 1,
            padding: '10px 0',
            background: mode === 'voice' ? '#1e3a8a' : '#f0f0f0',
            color: mode === 'voice' ? '#fff' : '#333',
            border: '1px solid #1e3a8a',
            borderLeft: 'none',
            borderRadius: '0 12px 12px 0',
            fontWeight: 'bold',
            cursor: 'pointer',
            outline: 'none',
            transition: 'background 0.2s',
          }}
        >
          Voice
        </button>
      </div>

      {/* Chat/Voice Interface */}
      <div style={{ minHeight: 200 }}>
        {messages.map((msg, idx) => (
          <MessageBubble key={idx} sender={msg.sender} content={msg.content} />
        ))}
        {loading && <MessageBubble sender="bot" content="..." />}
      </div>
      {mode === 'chat' ? (
        <TextInput onSend={handleSend} />
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: 24 }}>
          <button
            onClick={handleVoiceInput}
            style={{
              width: 64,
              height: 64,
              borderRadius: '50%',
              background: listening ? '#3b82f6' : '#1e3a8a',
              color: '#fff',
              fontSize: 32,
              border: 'none',
              boxShadow: listening ? '0 0 0 4px #3b82f655' : 'none',
              cursor: 'pointer',
              marginBottom: 8,
              transition: 'background 0.2s, box-shadow 0.2s',
            }}
            aria-label="Start voice input"
            disabled={listening}
          >
            🎤
          </button>
          <span style={{ color: '#888', fontSize: 14 }}>
            {listening ? 'Listening...' : 'Tap mic and speak your question'}
          </span>
        </div>
      )}
    </div>
  );
}

export default ChatWindow; 