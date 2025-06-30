import React, { useState } from 'react';
import VoiceInputButton from './VoiceInputButton';

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
    <div style={{ display: 'flex', marginTop: 16 }}>
      <input
        type="text"
        value={text}
        onChange={e => setText(e.target.value)}
        style={{ flex: 1, padding: 8, borderRadius: 8, border: '1px solid #ccc' }}
        placeholder="Type your message..."
        onKeyDown={e => { if (e.key === 'Enter') handleSend(); }}
      />
      <button onClick={handleSend} style={{ marginLeft: 8 }}>Send</button>
      <VoiceInputButton onVoiceInput={handleVoiceInput} />
    </div>
  );
}

export default TextInput; 