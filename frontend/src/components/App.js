import ModernHeader from './ModernHeader.js';
import ModernSidebar from './ModernSidebar.js';
import AuthButton from './AuthButton.js';
import ChatWindow from './ChatWindow.js';
import PoliciesSection from './PoliciesSection.js';
import TermsConditions from './TermsConditions.js';
import Footer from './Footer.js';
import ScrollToTop from './ScrollToTop.js';
import ChatbotButton from './ChatbotButton.js';
import '../styles/App.css';

export function renderApp() {
  // State variables
  let isChatOpen = false;
  let isAuthenticated = false;
  let chatMode = 'chat'; // 'chat' or 'voice'
  let sidebarMobileOpen = false;

  // Create main app container
  const app = document.createElement('div');
  app.className = 'App';

  // Header
  const header = ModernHeader({
    isAuthenticated,
    onSidebarToggle: () => {
      sidebarMobileOpen = !sidebarMobileOpen;
      render();
    }
  });
  app.appendChild(header);

  // Sidebar
  const sidebar = ModernSidebar({
    isMobileOpen: sidebarMobileOpen,
    onClose: () => {
      sidebarMobileOpen = false;
      render();
    }
  });
  app.appendChild(sidebar);

  // Main content
  const main = document.createElement('main');
  main.className = 'main-content';
  main.innerHTML = `
    <section id="home" class="hero-section">
      <div class="container hero-grid">
        <div class="hero-left">
          <div class="hero-content">
            <h1>🛡️ InsureBot Quest 2025</h1>
            <p class="hero-tagline">Your friendly insurance assistant</p>
          </div>
        </div>
        <div class="hero-right">
          <div class="login-highlight-card">
            <h3>Member Login / Register</h3>
            <p class="login-desc">Access your policies, manage claims, and get personalized support.</p>
          </div>
        </div>
      </div>
    </section>
  `;
  // AuthButton
  const authBtn = AuthButton({
    isAuthenticated,
    setIsAuthenticated: (val) => {
      isAuthenticated = val;
      render();
    }
  });
  main.querySelector('.login-highlight-card').appendChild(authBtn);

  // ChatWindow
  let chatWindow = null;
  if (isChatOpen) {
    chatWindow = ChatWindow({ mode: chatMode });
    main.appendChild(chatWindow);
  }

  // PoliciesSection
  main.appendChild(PoliciesSection());
  // TermsConditions
  main.appendChild(TermsConditions());
  app.appendChild(main);

  // Footer
  app.appendChild(Footer({
    openChatbot: (mode = 'chat') => {
      isChatOpen = true;
      chatMode = mode;
      render();
    }
  }));
  // ScrollToTop
  app.appendChild(ScrollToTop());
  // ChatbotButton
  app.appendChild(ChatbotButton({
    onToggleChat: (isOpen) => {
      isChatOpen = isOpen;
      render();
    }
  }));

  // Render function for reactivity
  function render() {
    const root = document.getElementById('root');
    if (root) {
      root.innerHTML = '';
      root.appendChild(renderApp());
    }
  }

  return app;
} 