import React from 'react';
import ChatWindow from './components/ChatWindow';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>InsureBot Quest 2025</h1>
        <p className="App-tagline">Your friendly insurance assistant</p>
      </header>
      <main>
        <ChatWindow />
      </main>
      <footer className="App-footer">
        <span>&copy; {new Date().getFullYear()} InsureBot. All rights reserved.</span>
      </footer>
    </div>
  );
}

export default App; 