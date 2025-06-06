import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL+"/notifications";

export const getAllNotifications = async (userId) => {
    try {
        const response = await axios.get(`${API_URL}/${userId}`,{
            headers: {
                "Content-Type": "application/json",
            },withCredentials: true
        });
          
        
        if (response.status !== 200) {
            throw new Error("Network response was not ok");
        }
        const data = await response.data;
        return data;
    } catch (error) {
        console.error("Error fetching notifications:", error);
        throw error;
    }
}

export const markAsRead = async (notificationId) => {
    try {
        const response = await axios.post(`${API_URL}/mark-as-read/${notificationId}`, {}, {
            headers: {
                "Content-Type": "application/json",
            },withCredentials: true
        });
        console.log("markAsRead: ", response);  
        
        if (response.status !== 200) {
            throw new Error("Network response was not ok");
        }
        return response.data;
    } catch (error) {
        console.error("Error marking notification as read:", error);
        throw error;
    }
}