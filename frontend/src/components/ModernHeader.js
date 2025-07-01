import React, { useState } from 'react';
import './ModernHeader.css';
import NotificationTab from './NotificationTab';

const ModernHeader = ({ isAuthenticated }) => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="modern-header">
      <div className="header-inner">
        <div className="logo-area">
          <span className="logo-icon">🛡️</span>
          <span className="logo-text">InsureBot</span>
          <span className="tagline">Your Insurance, Simplified</span>
        </div>
        <nav className={`main-nav ${menuOpen ? 'open' : ''}`} aria-label="Main navigation">
          <a href="#home">Home</a>
          <a href="#products">Products</a>
          <a href="#claims">Claims</a>
          <a href="#support" onClick={e => { e.preventDefault(); openChatbot('chat'); }}>Support</a>
          <a href="#contact" onClick={e => { e.preventDefault(); openChatbot('chat'); }}>Contact</a>
        </nav>
        <div className="header-actions">
          {isAuthenticated && <NotificationTab />}
          <button
            className="hamburger"
            aria-label="Toggle menu"
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </div>
    </header>
  );
};

export default ModernHeader; 