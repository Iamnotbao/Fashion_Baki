

import { useState, useRef, useEffect } from "react"
import "./NotificationCard.css"
import { getAllNotifications, markAsRead } from "../../services/notificationServices";

export default function NotificationCard({ userId }) {
  const [isOpen, setIsOpen] = useState(false)
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(false);
  const notificationRef = useRef(null)

  const unreadCount = notifications.filter((notification) => !notification.read).length

  const handleAvatarClick = () => {
    setIsOpen(!isOpen)
  }

  const handleClickOutside = (event) => {
    if (notificationRef.current && !notificationRef.current.contains(event.target)) {
      setIsOpen(false)
    }
  }

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  const markedRead = async (id) => {
   await markAsRead(id);
    setLoading(false);

  }

  const fetchNotifications = async () => {
    const result = await getAllNotifications(userId);
    console.log("result", result);
    if (result) {
      setNotifications(result);
      setLoading(true);
    } else {
      console.log("Error fetching notifications");
    }
  }
  useEffect(() => {
    if (!loading) {
      fetchNotifications();

    }

  }, [loading])

  const markAllAsRead = async (id) => {
    console.log("ok"); 
  }

  const deleteNotification = (id) => {
    console.log("deleteNotification", id);

  }

  return (
    <div className="notification-container">
      <div className="avatar-container" onClick={handleAvatarClick}>
        <i class="fa-solid fa-bell"></i>
        {unreadCount > 0 && <div className="badge">{unreadCount}</div>}
      </div>

      <div className={`notification-card ${isOpen ? "open" : ""}`} ref={notificationRef}>
        <div className="notification-header">
          <h3>Notifications</h3>
          <div className="header-actions">
            {unreadCount > 0 && (
              <button className="mark-read-button" onClick={markAllAsRead}>
                Mark all as read
              </button>
            )}
            <button className="close-button" onClick={() => setIsOpen(false)}>
              ✕
            </button>
          </div>
        </div>

        {notifications.length > 0 ? (
          <>
            <div className="notification-list">
              {notifications.map((notification) => (
                <div key={notification.id} className={`notification-item ${notification.status==="READ" ? "READ" : "UNREAD"}`}>
                  <div className="notification-content">
                    <h4>{notification.title}</h4>
                    <p>{notification.content}</p>
                    <span className="notification-time">{notification.sendAt}</span>
                  </div>
                  <div className="notification-actions">
                    {notification.status === "UNREAD" && (
                      <button
                        className="action-button"
                        title="Mark as read"
                        onClick={() => markedRead(notification.id)}
                      >
                        ✓
                      </button>
                    )}
                    <button
                      className="action-button delete"
                      title="Delete"
                      onClick={() => deleteNotification(notification.id)}
                    >
                      🗑️
                    </button>
                  </div>
                </div>
              ))}
            </div>
            <div className="notification-footer">
              <a href="#" className="view-all">
                View all notifications
              </a>
            </div>
          </>
        ) : (
          <div className="empty-state">
            <div className="empty-icon">📭</div>
            <p>No notifications</p>
          </div>
        )}
      </div>
    </div>
  )
}
