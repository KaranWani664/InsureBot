import React, { useState, useEffect } from 'react';
import './NotificationTab.css';

const NotificationTab = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);

  // Mock notifications data - in a real app, this would come from an API
  useEffect(() => {
    const mockNotifications = [
      {
        id: 1,
        title: "New Insurance Policy Update",
        message: "Your auto insurance policy has been updated with new coverage options.",
        timestamp: "2 hours ago",
        isRead: false,
        type: "policy_update"
      },
      {
        id: 2,
        title: "Premium Payment Due",
        message: "Your monthly premium payment of $150 is due in 3 days.",
        timestamp: "1 day ago",
        isRead: false,
        type: "payment"
      },
      {
        id: 3,
        title: "Claim Status Update",
        message: "Your recent claim #12345 has been approved and processed.",
        timestamp: "3 days ago",
        isRead: true,
        type: "claim"
      },
      {
        id: 4,
        title: "New Coverage Available",
        message: "We've added cyber insurance coverage to our portfolio. Contact us to learn more.",
        timestamp: "1 week ago",
        isRead: true,
        type: "coverage"
      }
    ];
    
    setNotifications(mockNotifications);
    setUnreadCount(mockNotifications.filter(n => !n.isRead).length);
  }, []);

  const markAsRead = (notificationId) => {
    setNotifications(prev => 
      prev.map(notification => 
        notification.id === notificationId 
          ? { ...notification, isRead: true }
          : notification
      )
    );
    setUnreadCount(prev => Math.max(0, prev - 1));
  };

  const markAllAsRead = () => {
    setNotifications(prev => 
      prev.map(notification => ({ ...notification, isRead: true }))
    );
    setUnreadCount(0);
  };

  const getNotificationIcon = (type) => {
    switch (type) {
      case 'policy_update':
        return '📋';
      case 'payment':
        return '💰';
      case 'claim':
        return '📄';
      case 'coverage':
        return '🛡️';
      default:
        return '🔔';
    }
  };

  return (
    <div className="notification-container">
      <button 
        className="notification-btn"
        onClick={() => setIsOpen(!isOpen)}
      >
        🔔
        {unreadCount > 0 && (
          <span className="notification-badge">{unreadCount}</span>
        )}
      </button>
      
      {isOpen && (
        <div className="notification-dropdown">
          <div className="notification-header">
            <h3>Notifications</h3>
            {unreadCount > 0 && (
              <button 
                className="mark-all-read-btn"
                onClick={markAllAsRead}
              >
                Mark all as read
              </button>
            )}
          </div>
          
          <div className="notification-list">
            {notifications.length === 0 ? (
              <div className="no-notifications">
                No notifications
              </div>
            ) : (
              notifications.map(notification => (
                <div 
                  key={notification.id} 
                  className={`notification-item ${!notification.isRead ? 'unread' : ''}`}
                  onClick={() => markAsRead(notification.id)}
                >
                  <div className="notification-icon">
                    {getNotificationIcon(notification.type)}
                  </div>
                  <div className="notification-content">
                    <div className="notification-title">{notification.title}</div>
                    <div className="notification-message">{notification.message}</div>
                    <div className="notification-time">{notification.timestamp}</div>
                  </div>
                  {!notification.isRead && (
                    <div className="unread-indicator"></div>
                  )}
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default NotificationTab; 