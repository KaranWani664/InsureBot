import React from 'react';

function VoiceInputButton({ onVoiceInput }) {
  const handleVoiceInput = () => {
    if (!('webkitSpeechRecognition' in window)) {
      alert('Speech recognition not supported in this browser.');
      return;
    }
    const recognition = new window.webkitSpeechRecognition();
    recognition.lang = 'en-US';
    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      if (onVoiceInput) onVoiceInput(transcript);
    };
    recognition.start();
  };
  return (
    <button onClick={handleVoiceInput} style={{ marginLeft: 8 }} title="Voice Input">
      🎤
    </button>
  );
}

export default VoiceInputButton; 