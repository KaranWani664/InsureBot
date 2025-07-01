import React, { useState } from 'react';
import './AuthButton.css';

const AuthButton = ({ isAuthenticated, setIsAuthenticated }) => {
  const [showModal, setShowModal] = useState(false);
  const [isRegister, setIsRegister] = useState(false);
  const [form, setForm] = useState({ username: '', password: '' });
  const [error, setError] = useState('');

  const handleInputChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleLogin = (e) => {
    e.preventDefault();
    if (form.username && form.password) {
      setIsAuthenticated(true);
      setShowModal(false);
      setError('');
    } else {
      setError('Please enter username and password.');
    }
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
            <form onSubmit={handleLogin}>
              <input
                type="text"
                name="username"
                placeholder="Username"
                value={form.username}
                onChange={handleInputChange}
                autoFocus
              />
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={form.password}
                onChange={handleInputChange}
              />
              {error && <div className="error-msg">{error}</div>}
              <button type="submit">{isRegister ? 'Register' : 'Login'}</button>
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