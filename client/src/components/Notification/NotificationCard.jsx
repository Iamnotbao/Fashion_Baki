

import { useState, useRef, useEffect } from "react"
import "./NotificationCard.css"
import SockJS from "sockjs-client"
import { Client, Stomp } from "@stomp/stompjs"
import { ToastContainer, toast } from "react-toastify";
import markNotification from "./MarkNotification";
import fetchNotification from "./FetchNotification";
import deleteNotification from "./DeleteNotification";

export default function NotificationCard({ userId, notiLength, notifications, setLoading  }) {
  const [isOpen, setIsOpen] = useState(false)
  const notificationRef = useRef(null)
  const apiUrl = import.meta.env.VITE_API_URL;
  const websocketPath = import.meta.env.VITE_WEBSOCKET_PATH
  const url = new URL(apiUrl);
  url.pathname = websocketPath;
  const websocketUrl = url.toString();
  const stompClientRef = useRef(null);
  const mark = markNotification();
  const deleteNotify = deleteNotification();
  const fetchAnnounce = fetchNotification();




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
    mark(id, userId);
  }



  useEffect(() => {
    const socket = new SockJS(websocketUrl);
    const stompClient = Stomp.over(socket);

    stompClientRef.current = stompClient;

    stompClient.connect({}, (frame) => {
      console.log("WebSocket connected:", frame);

      stompClient.subscribe(`/user/${userId}/queue/notifications`, (message) => {
        if (message) {
          toast.success(`You have received a new message.`);
          fetchAnnounce(userId);
        }

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




  const markAllAsRead = async (id) => {
    console.log("ok");
  }

  const deleteNoti = async(id) => {
    deleteNotify(id);
    setLoading(false);
  }

  return (
    <>
      <ToastContainer position="top-right" />
      <div className="notification-container">
        <div className="avatar-container" onClick={handleAvatarClick}>
          <i class="fa-solid fa-bell"></i>
          <div className="badge">{notiLength}</div>
        </div>

        <div className={`notification-card ${isOpen ? "open" : ""}`} ref={notificationRef}>
          <div className="notification-header">
            <h3>Notifications</h3>
            <div className="header-actions">
              {notiLength > 0 && (
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
                        onClick={() => deleteNoti(notification.id)}
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
