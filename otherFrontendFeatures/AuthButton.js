import './AuthButton.css';

export default function AuthButton({ isAuthenticated, setIsAuthenticated }) {
  let showModal = false;
  let isRegister = false;
  let form = { username: '', password: '' };
  let error = '';
  let loading = false;

  const container = document.createElement('div');
  container.className = 'auth-button-container';

  function render() {
    container.innerHTML = '';
    if (isAuthenticated) {
      const profileSection = document.createElement('div');
      profileSection.className = 'profile-section';
      const profileBtn = document.createElement('button');
      profileBtn.className = 'profile-btn';
      profileBtn.textContent = 'Profile';
      const logoutBtn = document.createElement('button');
      logoutBtn.className = 'logout-btn';
      logoutBtn.textContent = 'Logout';
      logoutBtn.onclick = () => {
        setIsAuthenticated(false);
        form = { username: '', password: '' };
        render();
      };
      profileSection.appendChild(profileBtn);
      profileSection.appendChild(logoutBtn);
      container.appendChild(profileSection);
    } else {
      const loginBtn = document.createElement('button');
      loginBtn.className = 'login-btn';
      loginBtn.textContent = 'Login/Register';
      loginBtn.onclick = () => {
        showModal = true;
        render();
      };
      container.appendChild(loginBtn);
    }
    if (showModal) {
      container.appendChild(renderModal());
    }
  }

  function renderModal() {
    const backdrop = document.createElement('div');
    backdrop.className = 'modal-backdrop';
    backdrop.onclick = () => {
      showModal = false;
      render();
    };
    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.onclick = e => e.stopPropagation();
    const h2 = document.createElement('h2');
    h2.textContent = isRegister ? 'Register' : 'Login';
    modal.appendChild(h2);
    const formEl = document.createElement('form');
    formEl.onsubmit = handleLogin;
    formEl.setAttribute('aria-label', isRegister ? 'Register form' : 'Login form');
    const emailInput = document.createElement('input');
    emailInput.type = 'email';
    emailInput.name = 'username';
    emailInput.placeholder = 'Email';
    emailInput.value = form.username;
    emailInput.autofocus = true;
    emailInput.setAttribute('aria-label', 'Email');
    emailInput.required = true;
    emailInput.oninput = e => {
      form.username = e.target.value;
    };
    const passInput = document.createElement('input');
    passInput.type = 'password';
    passInput.name = 'password';
    passInput.placeholder = 'Password';
    passInput.value = form.password;
    passInput.setAttribute('aria-label', 'Password');
    passInput.required = true;
    passInput.oninput = e => {
      form.password = e.target.value;
    };
    formEl.appendChild(emailInput);
    formEl.appendChild(passInput);
    if (error) {
      const errorDiv = document.createElement('div');
      errorDiv.className = 'error-msg';
      errorDiv.setAttribute('role', 'alert');
      errorDiv.textContent = error;
      formEl.appendChild(errorDiv);
    }
    const submitBtn = document.createElement('button');
    submitBtn.type = 'submit';
    submitBtn.disabled = loading;
    submitBtn.textContent = loading ? 'Please wait...' : (isRegister ? 'Register' : 'Login');
    formEl.appendChild(submitBtn);
    modal.appendChild(formEl);
    const toggleDiv = document.createElement('div');
    toggleDiv.className = 'toggle-link';
    const toggleBtn = document.createElement('button');
    toggleBtn.type = 'button';
    toggleBtn.onclick = () => {
      isRegister = !isRegister;
      render();
    };
    toggleBtn.textContent = isRegister ? 'Login' : 'Register';
    toggleDiv.innerHTML = isRegister
      ? `Already have an account? `
      : `Don't have an account? `;
    toggleDiv.appendChild(toggleBtn);
    modal.appendChild(toggleDiv);
    backdrop.appendChild(modal);
    return backdrop;
  }

  function validateEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  function handleLogin(e) {
    e.preventDefault();
    error = '';
    if (!form.username || !form.password) {
      error = 'Please enter both email and password.';
      render();
      return;
    }
    if (!validateEmail(form.username)) {
      error = 'Please enter a valid email address.';
      render();
      return;
    }
    loading = true;
    render();
    setTimeout(() => {
      setIsAuthenticated(true);
      showModal = false;
      error = '';
      loading = false;
      render();
    }, 1000);
  }

  render();
  return container;
} 