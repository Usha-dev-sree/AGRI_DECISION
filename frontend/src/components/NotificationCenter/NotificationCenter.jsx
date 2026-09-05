import React, { useState } from 'react';
import { Bell, CloudRain, TrendingUp, AlertTriangle, Sprout, Check } from 'lucide-react';
import './NotificationCenter.css';

const INITIAL_NOTIFICATIONS = [
  {
    id: 1,
    type: 'alert',
    icon: '🌧️',
    title: 'Heavy Rainfall Warning',
    desc: 'Localized heavy rain expected in Karnal & Ludhiana over the next 48h. Postpone harvest & clear field drains.',
    time: '10 mins ago',
    unread: true
  },
  {
    id: 2,
    type: 'warning',
    icon: '📈',
    title: 'Mandi Price Spike (+14%)',
    desc: 'Tomato APMC modal price jumped to ₹3,800/quintal in Nashik market.',
    time: '1 hour ago',
    unread: true
  },
  {
    id: 3,
    type: 'info',
    icon: '🌾',
    title: 'Ideal Sowing Window',
    desc: 'Optimal soil temperature (24°C) detected for Rabi wheat sowing in Punjab region.',
    time: '3 hours ago',
    unread: true
  }
];

const NotificationCenter = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [notifications, setNotifications] = useState(INITIAL_NOTIFICATIONS);

  const unreadCount = notifications.filter(n => n.unread).length;

  const handleMarkAllRead = () => {
    setNotifications(notifications.map(n => ({ ...n, unread: false })));
  };

  return (
    <div className="notification-center">
      <button 
        className="bell-btn" 
        onClick={() => setIsOpen(!isOpen)}
        title="Notifications & Advisory Alerts"
      >
        <Bell size={20} />
        {unreadCount > 0 && <span className="badge-count">{unreadCount}</span>}
      </button>

      {isOpen && (
        <div className="notification-dropdown">
          <div className="notif-header">
            <h4>Live Advisory & Price Alerts ({notifications.length})</h4>
            {unreadCount > 0 && (
              <button className="clear-btn" onClick={handleMarkAllRead}>
                Mark all read
              </button>
            )}
          </div>

          <div className="notif-list">
            {notifications.length === 0 ? (
              <p style={{ textAlign: 'center', color: '#64748b', fontSize: '0.85rem' }}>No new notifications</p>
            ) : (
              notifications.map(item => (
                <div key={item.id} className={`notif-item ${item.type}`}>
                  <span className="notif-icon">{item.icon}</span>
                  <div className="notif-content">
                    <div className="notif-title">{item.title}</div>
                    <div className="notif-desc">{item.desc}</div>
                    <div className="notif-time">{item.time}</div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default NotificationCenter;
