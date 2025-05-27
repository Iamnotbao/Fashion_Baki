

import { useState, useRef, useEffect } from "react"
import "./NotificationCard.css"
import { getAllNotifications, markAsRead } from "../../services/notificationServices";
import SockJS from "sockjs-client"
import { Client, Stomp } from "@stomp/stompjs"
import { ToastContainer, toast } from "react-toastify";

export default function NotificationCard({ userId }) {
  const [isOpen, setIsOpen] = useState(false)
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(false);
  const notificationRef = useRef(null)
  const apiUrl = import.meta.env.VITE_API_URL;
  const websocketPath = import.meta.env.VITE_WEBSOCKET_PATH
  const url = new URL(apiUrl);
  url.pathname = websocketPath;
  const websocketUrl = url.toString();
  const stompClientRef = useRef(null);


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
  useEffect(() => {
    const socket = new SockJS(websocketUrl);
    const stompClient = Stomp.over(socket);

    stompClientRef.current = stompClient;

    stompClient.connect({}, (frame) => {
      console.log("WebSocket connected:", frame);

      stompClient.subscribe(`/user/${userId}/queue/notifications`, (message) => {
        
        const notification = JSON.parse(message.body);
       toast.success(`You have received a new message.`);

        setNotifications((prev) => [
          {
            id: notification.id,
            title: notification.title,
            content: notification.content,
            sendAt: notification.sentAt,
            read: notification.status === "UNREAD" ? false : true,
            status: notification.status,
          },
          ...prev,
        ]);
      });
     
    }, (error) => {
      console.error("WebSocket connection error:", error);
    });

    return () => {
      if (stompClientRef.current) {
        stompClientRef.current.disconnect(() => {
          console.log("WebSocket disconnected");
        });
      }
    };
  }, []);

  
  const fetchNotifications = async () => {

    try {
      const result = await getAllNotifications(userId);
      if (result) {
       
        setNotifications(
          result.map((n) => ({
            id: n.id,
            title: n.title,
            content: n.content,
            sendAt: n.sentAt || n.sendAt, 
            read: n.status === "UNREAD" ? false : true,
            status: n.status,
          }))
        );
        setLoading(true);
      }
    } catch (error) {
      console.error("Failed to fetch notifications:", error);
    } finally {
      setLoading(false);
    }
  };

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
    <>
    <ToastContainer position="top-right" />
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
                <div key={notification.id} className={`notification-item ${notification.status === "READ" ? "READ" : "UNREAD"}`}>
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
    </>
  )
}
