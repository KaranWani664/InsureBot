import React, { useState, useEffect, useRef } from 'react';
import MessageBubble from './MessageBubble';
import TextInput from './TextInput';
import { sendMessage } from '../services/chatService';
import './ChatWindow.css';

function ChatWindow() {
  const [messages, setMessages] = useState([
    { sender: 'bot', content: 'Hello! How can I help you today?' }
  ]);
  const [loading, setLoading] = useState(false);
  const [mode, setMode] = useState('chat'); // 'chat' or 'voice'
  const [listening, setListening] = useState(false);
  const chatRef = useRef(null);

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

  // Stop speech synthesis when switching to chat mode
  useEffect(() => {
    if (mode === 'chat') {
      window.speechSynthesis.cancel();
    }
  }, [mode]);

  // Stop speech synthesis if clicking outside chat window in voice mode
  useEffect(() => {
    if (mode !== 'voice') return;
    function handleClickOutside(e) {
      if (chatRef.current && !chatRef.current.contains(e.target)) {
        window.speechSynthesis.cancel();
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [mode]);

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
    <div className="chat-window" ref={chatRef}>
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
      <div className="chat-content-flex" style={{display: 'flex', flexDirection: 'column', flex: 1, minHeight: 0}}>
        <div className="chat-messages-area">
          {messages.map((msg, idx) => (
            <MessageBubble key={idx} sender={msg.sender} content={msg.content} />
          ))}
          {loading && <MessageBubble sender="bot" content="..." />}
        </div>
        {mode === 'chat' ? (
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: 24 }}>
            <div style={{
              background: '#f3f4f6',
              borderRadius: 12,
              padding: '16px 12px',
              boxShadow: '0 2px 8px rgba(30,58,138,0.07)',
              width: '100%',
              maxWidth: 320,
              display: 'flex',
              justifyContent: 'center',
            }}>
              <TextInput onSend={handleSend} />
            </div>
          </div>
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
    </div>
  );
}

export default ChatWindow; 