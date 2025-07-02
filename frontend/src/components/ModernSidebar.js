import React, { useState, useEffect, useRef, Suspense, lazy } from 'react';
import { useSwipeable } from 'react-swipeable';
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

const LazyProfile = lazy(() => import('./UserProfileSection'));

const ModernSidebar = ({ isMobileOpen, onClose }) => {
  const [collapsed, setCollapsed] = useState(false);
  const [favorites, setFavorites] = useState([]);
  const [activeHref, setActiveHref] = useState(window.location.hash || '#dashboard');
  const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'light');
  const sidebarRef = useRef(null);

  // Swipe gesture handlers
  const swipeHandlers = useSwipeable({
    onSwipedLeft: () => isMobileOpen && onClose(),
    delta: 40,
    trackTouch: true,
    trackMouse: false,
  });

  // Focus trap for accessibility
  useEffect(() => {
    if (!isMobileOpen) return;
    const focusable = sidebarRef.current.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
    if (focusable.length) focusable[0].focus();
    const handleTab = (e) => {
      if (e.key !== 'Tab') return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    document.addEventListener('keydown', handleTab);
    return () => document.removeEventListener('keydown', handleTab);
  }, [isMobileOpen]);

  // Theme toggle
  useEffect(() => {
    document.body.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  // Prevent background scroll when sidebar is open on mobile
  useEffect(() => {
    if (isMobileOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isMobileOpen]);

  // Pin/unpin favorite links
  const toggleFavorite = (href) => {
    setFavorites((prev) => prev.includes(href) ? prev.filter(f => f !== href) : [...prev, href]);
  };

  // Handle link click
  const handleLinkClick = (href) => {
    setActiveHref(href);
    if (isMobileOpen) onClose();
  };

  return (
    <>
      {/* Overlay for mobile */}
      <div
        className={`sidebar-overlay${isMobileOpen ? ' open' : ''}`}
        onClick={onClose}
        aria-hidden={!isMobileOpen}
        tabIndex={-1}
        style={{ display: isMobileOpen ? 'block' : 'none', backdropFilter: 'blur(4px)' }}
      />
      <aside
        {...swipeHandlers}
        ref={sidebarRef}
        className={`modern-sidebar${collapsed ? ' collapsed' : ''}${isMobileOpen ? ' mobile-open' : ''}`}
        aria-label="Sidebar navigation"
        aria-expanded={isMobileOpen || !window.matchMedia('(max-width: 900px)').matches}
        tabIndex={-1}
      >
        {/* User Profile Section (lazy loaded) */}
        <Suspense fallback={<div className="sidebar-profile-loading">Loading...</div>}>
          <LazyProfile theme={theme} />
        </Suspense>
        {/* Theme toggle */}
        <button
          className="sidebar-theme-toggle"
          aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
          onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
        >
          {theme === 'light' ? '🌙' : '☀️'}
        </button>
        <button
          className="sidebar-toggle"
          aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          title={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          onClick={() => setCollapsed(!collapsed)}
        >
          <span className={`sidebar-toggle-icon${collapsed ? ' collapsed' : ''}`}></span>
          {collapsed ? (
            <svg width="28" height="28" viewBox="0 0 28 28"><rect y="6" width="28" height="3.5" rx="1.75" fill="#1e3a8a"/><rect y="12" width="28" height="3.5" rx="1.75" fill="#1e3a8a"/><rect y="18" width="28" height="3.5" rx="1.75" fill="#1e3a8a"/></svg>
          ) : (
            <svg width="28" height="28" viewBox="0 0 28 28"><line x1="7" y1="7" x2="21" y2="21" stroke="#1e3a8a" strokeWidth="3.5" strokeLinecap="round"/><line x1="21" y1="7" x2="7" y2="21" stroke="#1e3a8a" strokeWidth="3.5" strokeLinecap="round"/></svg>
          )}
        </button>
        <nav className="sidebar-nav">
          {/* Favorites section */}
          {favorites.length > 0 && !collapsed && (
            <div className="sidebar-section sidebar-favorites">
              <h3>Favorites</h3>
              <ul>
                {favorites.map(href => {
                  const item = navSections.flatMap(s => s.items).find(i => i.href === href);
                  if (!item) return null;
                  return (
                    <li key={item.label}>
                      <a
                        href={item.href}
                        className={`sidebar-link${activeHref === item.href ? ' active' : ''}`}
                        onClick={() => handleLinkClick(item.href)}
                        tabIndex={0}
                        aria-current={activeHref === item.href ? 'page' : undefined}
                        style={{ touchAction: 'manipulation' }}
                      >
                        <span className="sidebar-icon">{item.icon}</span>
                        <span>{item.label}</span>
                        <button
                          className="sidebar-fav-btn"
                          aria-label="Unpin from favorites"
                          onClick={e => { e.stopPropagation(); e.preventDefault(); toggleFavorite(item.href); }}
                          tabIndex={0}
                        >★</button>
                      </a>
                    </li>
                  );
                })}
              </ul>
            </div>
          )}
          {navSections.map(section => (
            <div className="sidebar-section" key={section.title}>
              <h3>{!collapsed && section.title}</h3>
              <ul>
                {section.items.map(item => (
                  <li key={item.label}>
                    <a
                      href={item.href}
                      className={`sidebar-link${activeHref === item.href ? ' active' : ''}`}
                      onClick={() => handleLinkClick(item.href)}
                      tabIndex={0}
                      aria-current={activeHref === item.href ? 'page' : undefined}
                      style={{ touchAction: 'manipulation' }}
                    >
                      <span className="sidebar-icon">{item.icon}</span>
                      {!collapsed && <span>{item.label}</span>}
                      {!collapsed && (
                        <button
                          className="sidebar-fav-btn"
                          aria-label={favorites.includes(item.href) ? 'Unpin from favorites' : 'Pin to favorites'}
                          onClick={e => { e.stopPropagation(); e.preventDefault(); toggleFavorite(item.href); }}
                          tabIndex={0}
                        >{favorites.includes(item.href) ? '★' : '☆'}</button>
                      )}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </nav>
        {/* Close button for mobile */}
        <button
          className="sidebar-close-mobile"
          aria-label="Close sidebar"
          onClick={onClose}
          style={{ display: isMobileOpen ? 'block' : 'none' }}
        >
          ×
        </button>
      </aside>
    </>
  );
};

export default ModernSidebar; 