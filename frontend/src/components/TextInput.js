import React, { useState } from 'react';

function TextInput({ onSend }) {
  const [text, setText] = useState('');

  const handleSend = () => {
    if (text.trim()) {
      onSend(text);
      setText('');
    }
  };

  const handleVoiceInput = (voiceText) => {
    if (voiceText) {
      onSend(voiceText);
    }
  };

  return (
    <div className="chat-input-row">
      <input
        type="text"
        value={text}
        onChange={e => setText(e.target.value)}
        placeholder="Type your message or use the mic..."
        aria-label="Type your message"
        onKeyDown={e => { if (e.key === 'Enter') handleSend(); }}
      />
      <button onClick={handleSend} aria-label="Send message">Send</button>
    </div>
  );
}

export default TextInput; 