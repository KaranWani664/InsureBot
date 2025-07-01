import React, { useState } from 'react';
import './ModernSidebar.css';

const navSections = [
  {
    title: 'Quick Actions',
    items: [
      { icon: '📊', label: 'Dashboard', href: '#dashboard' },
      { icon: '📋', label: 'My Policies', href: '#policies' },
      { icon: '💰', label: 'Payments', href: '#payments' },
      { icon: '📄', label: 'Claims', href: '#claims' },
    ],
  },
  {
    title: 'Products',
    items: [
      { icon: '🚗', label: 'Auto', href: '#auto' },
      { icon: '🏠', label: 'Home', href: '#home' },
      { icon: '❤️', label: 'Life', href: '#life' },
      { icon: '🏥', label: 'Health', href: '#health' },
      { icon: '💼', label: 'Business', href: '#business' },
    ],
  },
  {
    title: 'Support',
    items: [
      { icon: '❓', label: 'Help Center', href: '#help' },
      { icon: '📞', label: 'Contact', href: '#contact' },
      { icon: '💬', label: 'Live Chat', href: '#chat' },
    ],
  },
];

const ModernSidebar = () => {
  const [collapsed, setCollapsed] = useState(false);
  return (
    <aside className={`modern-sidebar${collapsed ? ' collapsed' : ''}`}> 
      <button
        className="sidebar-toggle"
        aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        title={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        onClick={() => setCollapsed(!collapsed)}
      >
        {collapsed ? (
          <svg width="28" height="28" viewBox="0 0 28 28"><rect y="6" width="28" height="3.5" rx="1.75" fill="#1e3a8a"/><rect y="12" width="28" height="3.5" rx="1.75" fill="#1e3a8a"/><rect y="18" width="28" height="3.5" rx="1.75" fill="#1e3a8a"/></svg>
        ) : (
          <svg width="28" height="28" viewBox="0 0 28 28"><line x1="7" y1="7" x2="21" y2="21" stroke="#1e3a8a" strokeWidth="3.5" strokeLinecap="round"/><line x1="21" y1="7" x2="7" y2="21" stroke="#1e3a8a" strokeWidth="3.5" strokeLinecap="round"/></svg>
        )}
      </button>
      <nav className="sidebar-nav" aria-label="Sidebar navigation">
        {navSections.map(section => (
          <div className="sidebar-section" key={section.title}>
            <h3>{!collapsed && section.title}</h3>
            <ul>
              {section.items.map(item => (
                <li key={item.label}>
                  <a href={item.href} className="sidebar-link">
                    <span className="sidebar-icon">{item.icon}</span>
                    {!collapsed && <span>{item.label}</span>}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </nav>
    </aside>
  );
};

export default ModernSidebar; 