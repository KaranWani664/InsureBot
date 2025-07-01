import React, { useState } from 'react';
import './Header.css';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="header">
      <div className="header-top">
        <div className="container">
          <div className="contact-info">
            <span>📞 1-800-INSURANCE</span>
            <span>📧 info@insurebot.com</span>
            <span>🕒 24/7 Support</span>
          </div>
        </div>
      </div>
      
      <div className="header-main">
        <div className="container">
          <div className="header-content">
            <div className="logo">
              <h1>🛡️ InsureBot</h1>
              <span className="tagline">Protecting What Matters Most</span>
            </div>
            
            <nav className={`nav-menu ${isMenuOpen ? 'active' : ''}`}>
              <ul>
                <li><a href="#home">Home</a></li>
                <li><a href="#policies">Policies</a></li>
                <li><a href="#about">About</a></li>
                <li><a href="#claims">Claims</a></li>
                <li><a href="#contact">Contact</a></li>
              </ul>
            </nav>
            
            <div className="mobile-menu-btn" onClick={toggleMenu}>
              <span></span>
              <span></span>
              <span></span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header; 