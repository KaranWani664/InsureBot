import './ModernHeader.css';

export default function ModernHeader({ isAuthenticated, onSidebarToggle }) {
  const header = document.createElement('header');
  header.className = 'modern-header';

  header.innerHTML = `
    <div class="container header-container">
      <button class="sidebar-toggle-btn" aria-label="Open sidebar">
        <span class="sidebar-toggle-icon"></span>
      </button>
      <div class="header-title">
        <h2>InsureBot</h2>
      </div>
      <div class="header-actions">
        <span class="user-status">${isAuthenticated ? 'Logged in' : 'Guest'}</span>
      </div>
    </div>
  `;

  header.querySelector('.sidebar-toggle-btn').addEventListener('click', onSidebarToggle);

  return header;
} 