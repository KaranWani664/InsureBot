import React, { useState } from 'react';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import AuthButton from './components/AuthButton';
import ChatWindow from './components/ChatWindow';
import PoliciesSection from './components/PoliciesSection';
import TermsConditions from './components/TermsConditions';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
import ChatbotButton from './components/ChatbotButton';
import './App.css';

function App() {
  const [isChatOpen, setIsChatOpen] = useState(false);

  const handleToggleChat = (isOpen) => {
    setIsChatOpen(isOpen);
  };

  return (
    <div className="App">
      <Header />
      <Sidebar />
      
      <main className="main-content">
        <section id="home" className="hero-section">
          <div className="container hero-grid">
            <div className="hero-left">
              <div className="hero-content">
                <h1>🛡️ InsureBot Quest 2025</h1>
                <p className="hero-tagline">Your friendly insurance assistant</p>
              </div>
            </div>
            <div className="hero-right">
              <div className="login-highlight-card">
                <h3>Member Login / Register</h3>
                <p className="login-desc">Access your policies, manage claims, and get personalized support.</p>
                <AuthButton />
              </div>
            </div>
          </div>
        </section>
        
        {isChatOpen && <ChatWindow />}
        <PoliciesSection />
        <TermsConditions />
      </main>
      
      <Footer />
      <ScrollToTop />
      <ChatbotButton onToggleChat={handleToggleChat} />
    </div>
  );
}

export default App; 