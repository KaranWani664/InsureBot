import React, { useState } from 'react';
import './Sidebar.css';

const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <div className={`sidebar ${isCollapsed ? 'collapsed' : ''}`}>
      <button
        className="sidebar-toggle"
        onClick={toggleSidebar}
        title={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        aria-label={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        style={{ zIndex: 110 }}
      >
        {isCollapsed ? (
          // Hamburger icon
          <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect y="4" width="22" height="2.5" rx="1.25" fill="#1e3a8a" />
            <rect y="9.25" width="22" height="2.5" rx="1.25" fill="#1e3a8a" />
            <rect y="14.5" width="22" height="2.5" rx="1.25" fill="#1e3a8a" />
          </svg>
        ) : (
          // Close (X) icon
          <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
            <line x1="5" y1="5" x2="17" y2="17" stroke="#1e3a8a" strokeWidth="2.5" strokeLinecap="round" />
            <line x1="17" y1="5" x2="5" y2="17" stroke="#1e3a8a" strokeWidth="2.5" strokeLinecap="round" />
          </svg>
        )}
      </button>
      
      <div className="sidebar-content">
        <div className="sidebar-section">
          <h3>Quick Actions</h3>
          <ul className="sidebar-menu">
            <li>
              <a href="#dashboard" className="sidebar-link">
                <span>📊</span>
                <span>Dashboard</span>
              </a>
            </li>
            <li>
              <a href="#policies" className="sidebar-link">
                <span>📋</span>
                <span>My Policies</span>
              </a>
            </li>
            <li>
              <a href="#claims" className="sidebar-link">
                <span>📄</span>
                <span>File Claim</span>
              </a>
            </li>
            <li>
              <a href="#payments" className="sidebar-link">
                <span>💰</span>
                <span>Make Payment</span>
              </a>
            </li>
            <li>
              <a href="#documents" className="sidebar-link">
                <span>📁</span>
                <span>Documents</span>
              </a>
            </li>
          </ul>
        </div>

        <div className="sidebar-section">
          <h3>Insurance Products</h3>
          <ul className="sidebar-menu">
            <li>
              <a href="#auto" className="sidebar-link">
                <span>🚗</span>
                <span>Auto Insurance</span>
              </a>
            </li>
            <li>
              <a href="#home" className="sidebar-link">
                <span>🏠</span>
                <span>Home Insurance</span>
              </a>
            </li>
            <li>
              <a href="#life" className="sidebar-link">
                <span>❤️</span>
                <span>Life Insurance</span>
              </a>
            </li>
            <li>
              <a href="#health" className="sidebar-link">
                <span>🏥</span>
                <span>Health Insurance</span>
              </a>
            </li>
            <li>
              <a href="#business" className="sidebar-link">
                <span>💼</span>
                <span>Business Insurance</span>
              </a>
            </li>
          </ul>
        </div>

        <div className="sidebar-section">
          <h3>Support</h3>
          <ul className="sidebar-menu">
            <li>
              <a href="#help" className="sidebar-link">
                <span>❓</span>
                <span>Help Center</span>
              </a>
            </li>
            <li>
              <a href="#contact" className="sidebar-link">
                <span>📞</span>
                <span>Contact Us</span>
              </a>
            </li>
            <li>
              <a href="#chat" className="sidebar-link">
                <span>💬</span>
                <span>Live Chat</span>
              </a>
            </li>
          </ul>
        </div>

        <div className="sidebar-widget">
          <h4>Emergency Contact</h4>
          <div className="emergency-contact">
            <p>🚨 24/7 Emergency</p>
            <p className="phone">1-800-INSURANCE</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar; 