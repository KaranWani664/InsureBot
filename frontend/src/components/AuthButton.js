import React, { useState } from 'react';
import './AuthButton.css';

const AuthButton = ({ isAuthenticated, setIsAuthenticated }) => {
  const [showModal, setShowModal] = useState(false);
  const [isRegister, setIsRegister] = useState(false);
  const [form, setForm] = useState({ username: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const validateEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const handleLogin = (e) => {
    e.preventDefault();
    setError('');
    if (!form.username || !form.password) {
      setError('Please enter both email and password.');
      return;
    }
    if (!validateEmail(form.username)) {
      setError('Please enter a valid email address.');
      return;
    }
    setLoading(true);
    setTimeout(() => {
      setIsAuthenticated(true);
      setShowModal(false);
      setError('');
      setLoading(false);
    }, 1000);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setForm({ username: '', password: '' });
  };

  return (
    <div className="auth-button-container">
      {isAuthenticated ? (
        <div className="profile-section">
          <button className="profile-btn">Profile</button>
          <button className="logout-btn" onClick={handleLogout}>Logout</button>
        </div>
      ) : (
        <button className="login-btn" onClick={() => setShowModal(true)}>
          Login/Register
        </button>
      )}
      {showModal && (
        <div className="modal-backdrop" onClick={() => setShowModal(false)}>
          <div className="modal" onClick={e => e.stopPropagation()}>
            <h2>{isRegister ? 'Register' : 'Login'}</h2>
            <form onSubmit={handleLogin} aria-label={isRegister ? 'Register form' : 'Login form'}>
              <input
                type="email"
                name="username"
                placeholder="Email"
                value={form.username}
                onChange={handleInputChange}
                autoFocus
                aria-label="Email"
                required
              />
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={form.password}
                onChange={handleInputChange}
                aria-label="Password"
                required
              />
              {error && <div className="error-msg" role="alert">{error}</div>}
              <button type="submit" disabled={loading}>{loading ? 'Please wait...' : (isRegister ? 'Register' : 'Login')}</button>
            </form>
            <div className="toggle-link">
              {isRegister ? (
                <span>Already have an account? <button onClick={() => setIsRegister(false)}>Login</button></span>
              ) : (
                <span>Don't have an account? <button onClick={() => setIsRegister(true)}>Register</button></span>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AuthButton; 