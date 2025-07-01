import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-main">
        <div className="container">
          <div className="footer-content">
            <div className="footer-section">
              <h3>🛡️ InsureBot</h3>
              <p>Protecting what matters most with comprehensive insurance solutions tailored to your needs.</p>
              <div className="social-links">
                <a href="#" className="social-link">📘</a>
                <a href="#" className="social-link">🐦</a>
                <a href="#" className="social-link">📷</a>
                <a href="#" className="social-link">💼</a>
              </div>
            </div>
            
            <div className="footer-section">
              <h4>Insurance Products</h4>
              <ul>
                <li><a href="#auto">Auto Insurance</a></li>
                <li><a href="#home">Home Insurance</a></li>
                <li><a href="#life">Life Insurance</a></li>
                <li><a href="#health">Health Insurance</a></li>
                <li><a href="#business">Business Insurance</a></li>
              </ul>
            </div>
            
            <div className="footer-section">
              <h4>Quick Links</h4>
              <ul>
                <li><a href="#claims">File a Claim</a></li>
                <li><a href="#policies">View Policies</a></li>
                <li><a href="#payments">Make Payment</a></li>
                <li><a href="#support">Customer Support</a></li>
                <li><a href="#terms">Terms & Conditions</a></li>
              </ul>
            </div>
            
            <div className="footer-section contact-footer-section">
              <h4>Contact Us</h4>
              <div className="contact-footer-block">
                <p><strong>Phone:</strong> 1-800-INSURANCE</p>
                <p><strong>Email:</strong> info@insurebot.com</p>
                <p><strong>Support:</strong> 24/7 Available</p>
              </div>
              <div className="contact-item">
                <span>📍</span>
                <div>
                  <p>123 Insurance Ave</p>
                  <small>New York, NY 10001</small>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="footer-bottom">
        <div className="container">
          <div className="footer-bottom-content">
            <p>&copy; 2024 InsureBot. All rights reserved.</p>
            <div className="footer-links">
              <a href="#privacy">Privacy Policy</a>
              <a href="#terms">Terms of Service</a>
              <a href="#cookies">Cookie Policy</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 