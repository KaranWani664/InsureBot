import React from 'react';
import './ModernSidebar.css';

const UserProfileSection = ({ theme }) => {
  // Placeholder user data
  const user = {
    name: 'Jane Doe',
    email: 'jane.doe@email.com',
    avatar: 'J', // Could be an image or initial
  };
  return (
    <div className="sidebar-profile" aria-label="User profile">
      <div className="sidebar-profile-avatar" aria-hidden="true">{user.avatar}</div>
      <div className="sidebar-profile-info">
        <span className="sidebar-profile-name">{user.name}</span>
        <span className="sidebar-profile-email">{user.email}</span>
      </div>
    </div>
  );
};

export default UserProfileSection; 