
import React, { useEffect, useState } from "react"
import {
    Box,
    Grid,
    List,
    ListItem,
    ListItemText,
    ListItemAvatar,
    Avatar,
    Typography,
    Paper,
    Divider,
    Badge,
    IconButton,
} from "@mui/material"
import {
    Notifications as NotificationsIcon,
    Delete as DeleteIcon,
    MarkEmailRead as MarkEmailReadIcon,
} from "@mui/icons-material"
import { getAllNotifications, markAsRead } from "../../services/notificationServices"
import { useSelector } from "react-redux"
import markNotification from "./MarkNotification"



export default function NotificationSection() {
    const {notifications} = useSelector((state) => state.notification);
    const [loading, setLoading] = useState(false);
    const [selectedNotification, setSelectedNotification] = useState(notifications[0])
    const user = localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : null;
    const userId = localStorage.getItem("id");
     const mark = markNotification();
    


    const handleNotificationSelect =async (e,notification) => {
        await handleMarkAsRead(notification.id,e);
        setSelectedNotification(notification);
    }

    const handleMarkAsRead = async(id, event) => {
        event.stopPropagation()
        
        
        await mark(id,userId);
        setLoading(false);
    }

    const handleDelete = (id, event) => {
        event.stopPropagation()
        const updatedNotifications = notifications.filter((item) => item.id !== id)
        // setNotifications(updatedNotifications)

        if (selectedNotification.id === id) {
            setSelectedNotification(updatedNotifications.length > 0 ? updatedNotifications[0] : null)
        }
    }


    return (
        <Paper elevation={3} sx={{ borderRadius: 2, overflow: "hidden" }}>
            <Box sx={{ p: 2, bgcolor: "black", color: "white" }}>
                <Typography variant="h5" component="h1" sx={{ display: "flex", alignItems: "center" }}>
                    <NotificationsIcon sx={{ mr: 1 }} />
                    Notification Board
                </Typography>
            </Box>

            <Grid container sx={{ height: "70vh" }}>

                <Grid item xs={12} md={4} sx={{ borderRight: "1px solid #e0e0e0" }}>
                    <List sx={{ height: "70vh", maxHeight:"100%",  overflowY: "auto", bgcolor: "background.paper" }}>
                        {notifications.length > 0 ? (
                            notifications.map((notification) => (
                                <React.Fragment key={notification.id}>
                                    <ListItem
                                        alignItems="flex-start"
                                        button
                                        onClick={(e) => handleNotificationSelect(e,notification)}
                                        selected={selectedNotification?.id === notification.id}
                                        sx={{
                                            bgcolor: notification.status === "READ" ? "inherit" : "action.hover",
                                            "&.Mui-selected": {
                                                bgcolor: "action.selected",
                                            },
                                        }}
                                    >
                                        <ListItemAvatar>
                                            <Avatar sx={{ bgcolor: notification.status === "READ" ? "grey.400" : "primary.main" }}>
                                                <NotificationsIcon />
                                            </Avatar>
                                        </ListItemAvatar>
                                        <ListItemText
                                            primary={
                                                <Typography variant="subtitle1" fontWeight={notification.status === "READ" ? "normal" : "bold"}>
                                                    {notification.title}
                                                </Typography>
                                            }
                                            secondary={
                                                <React.Fragment>
                                                    <Typography component="span" variant="body2" color="text.primary">
                                                        {notification.timestamp}
                                                    </Typography>
                                                    <Box sx={{ mt: 1, display: "flex", justifyContent: "flex-end" }}>
                                                        <IconButton size="small" onClick={(e) => handleDelete(notification.id, e)} color="error">
                                                            <DeleteIcon fontSize="small" />
                                                        </IconButton>
                                                    </Box>
                                                </React.Fragment>
                                            }
                                        />
                                    </ListItem>
                                    <Divider component="li" />
                                </React.Fragment>
                            ))
                        ) : (
                            <Box sx={{ p: 3, textAlign: "center" }}>
                                <Typography color="text.secondary">No notifications</Typography>
                            </Box>
                        )}
                    </List>
                </Grid>
                <Grid item xs={12} md={8}>
                    {selectedNotification ? (
                        <Box sx={{ p: 3, height: "100%", overflow: "auto" }}>
                            <Typography variant="h6" gutterBottom>
                                {selectedNotification.title}
                            </Typography>
                            <Typography variant="caption" color="text.secondary" display="block" gutterBottom>
                                {selectedNotification.timestamp}
                            </Typography>
                            <Divider sx={{ my: 2 }} />
                            <Typography variant="body1" paragraph>
                                {selectedNotification.content}
                            </Typography>
                        </Box>
                    ) : (
                        <Box sx={{ p: 3, display: "flex", justifyContent: "center", alignItems: "center", height: "100%" }}>
                            <Typography color="text.secondary">Select a notification to view details</Typography>
                        </Box>
                    )}
                </Grid>
            </Grid>
        </Paper>

    )
}
