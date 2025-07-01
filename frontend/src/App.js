import React from 'react';
import ModernHeader from './components/ModernHeader';
import ModernSidebar from './components/ModernSidebar';
import AuthButton from './components/AuthButton';
import ChatWindow from './components/ChatWindow';
import PoliciesSection from './components/PoliciesSection';
import TermsConditions from './components/TermsConditions';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
import ChatbotButton from './components/ChatbotButton';
import './App.css';

function App() {
  const [isChatOpen, setIsChatOpen] = React.useState(false);
  const [isAuthenticated, setIsAuthenticated] = React.useState(false);

  const handleToggleChat = (isOpen) => {
    setIsChatOpen(isOpen);
  };

  return (
    <div className="App">
      <ModernHeader isAuthenticated={isAuthenticated} />
      <ModernSidebar />
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
                <AuthButton isAuthenticated={isAuthenticated} setIsAuthenticated={setIsAuthenticated} />
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