
import React, { createContext, useState, useEffect, useCallback } from "react";
import * as Notifications from "expo-notifications";
import { AppState } from "react-native";
import { API_URL_NOTIFICATION, NOTIFICATION_DELETE_ID, NOTIFICATION_GET_ALL, NOTIFICATION_GET_ID } from "api/apiService";
import { Client } from "@stomp/stompjs";
import SockJS from "sockjs-client";
import { useAuth } from "./AuthContext";
import Toast from "react-native-toast-message";

Notifications.setNotificationHandler({
    handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: true,
        shouldSetBadge: true,
    }),
});

export const NotificationContext = createContext();

export const NotificationProvider = ({ children }) => {
    const { userId, user, token } = useAuth();
    const [notifications, setNotifications] = useState([]);
    const [loading, setLoading] = useState(true);
    const [client, setClient] = useState(null);

    useEffect(() => {
        (async () => {
            const { status } = await Notifications.requestPermissionsAsync({
                ios: {
                    allowAlert: true,
                    allowSound: true,
                    allowBadge: true,
                },
            });
            if (status !== "granted") {
                console.log("Notification permission not granted");
            }
        })();
    }, []);

    // Handle notifications in foreground
    useEffect(() => {
        const subscription = Notifications.addNotificationReceivedListener((notification) => {
            const { title, body } = notification.request.content;
            Toast.show({
                type: "info",
                text1: title,
                text2: body,
                position: "top",
            });
        });

        return () => subscription.remove();
    }, []);

    // Send local notification and show Toast
    const sendLocalNotification = async (notification) => {
        // Show Toast
        Toast.show({
            type: "success",
            text1: notification.title,
            text2: notification.message,
            position: "top",
        });

        // Send system notification
        await Notifications.scheduleNotificationAsync({
            content: {
                title: notification.title,
                body: notification.message,
                data: { notificationId: notification.id },
                sound: "default",
            },
            trigger: null,
        });
        console.log("Đã gửi");

    };

    const fetchNotifications = useCallback(async () => {
        try {
            setLoading(true);
            const response = await NOTIFICATION_GET_ALL("my-notifications");
            const apiNotifications = response.data.data.map((notification) => ({
                id: notification.id.toString(),
                flagId: notification.flagId,
                type: notification.type.toLowerCase(),
                title: notification.title,
                message: notification.message,
                date: notification.date,
                read: notification.read,
                data: JSON.parse(notification.data),
                role: notification.role,
            }));

            setNotifications((prev) => {
                const newNotifs = apiNotifications.filter(
                    (n) => !prev.some((old) => old.id === n.id) && !n.read
                );
                newNotifs.forEach(sendLocalNotification);
                return apiNotifications;
            });

            //     setNotifications((prev) => {
            //     const newNotifs = apiNotifications.filter(
            //         (n) => !prev.some((old) => old.id === n.id) && !n.read
            //     );
            //     newNotifs.forEach(sendLocalNotification);
            //     return apiNotifications;
            // });


            setLoading(false);
        } catch (e) {
            console.error("Fetch notifications error:", e);
            setLoading(false);
        }
    }, []);

    // Initialize WebSocket
    useEffect(() => {
        if (!userId || !token) {
            // Toast.show({
            //     type: "success",
            //     text1: "Thông báo",
            //     text2: "Vui lòng đăng nhập nhập",
            //     position: "top",
            // });
            return;
        }

        const socket = new SockJS(API_URL_NOTIFICATION);
        const stompClient = new Client({
            webSocketFactory: () => socket,
            reconnectDelay: 5000,
            onConnect: () => {
                console.log("✅ WebSocket Connected for user:");
                if (user.role === "CUSTOMER" && user.id) {
                    stompClient.subscribe(`/topic/notifications/${user.id}`, (message) => {
                        handleNotification(message);
                    });
                } else {
                    stompClient.subscribe(`/topic/notifications`, (message) => {
                        handleNotification(message);
                    });
                }
            },
            onStompError: (frame) => {
                console.error("STOMP error:", frame);
            },
            onWebSocketError: (error) => {
                console.error("❌ WebSocket error:", error);
            },
        });

        stompClient.activate();
        setClient(stompClient);

        return () => {
            stompClient.deactivate();
            console.log("🔌 WebSocket Disconnected");
        };
    }, [userId, user, token]);


    const handleNotification = (message) => {
        try {
            const data = JSON.parse(message.body);
            const newNotification = {
                id: data.id.toString(),
                flagId: data.flagId,
                type: data.type.toLowerCase(),
                title: data.title,
                message: data.message,
                date: data.date,
                read: data.read,
                data: JSON.parse(data.data),
                role: data.role,
            };
            setNotifications((prev) => {
                return (!newNotification.read && !prev.some((n) => n.id === newNotification.id))
                    ? [newNotification, ...prev]
                    : prev;
            });


            sendLocalNotification(newNotification);
        } catch (e) {
            console.error("Parse WS notification error:", e);
        }
    };


    useEffect(() => {
        const handleAppStateChange = (state) => {
            if (state === "active") {
                fetchNotifications();
            }
        };
        const sub = AppState.addEventListener("change", handleAppStateChange);
        return () => sub.remove();
    }, [fetchNotifications]);


    const markAsRead = async (id) => {
        try {
            const response = await NOTIFICATION_GET_ID("read", id);
            if (response.status === 200) {
                console.log("Notification marked as read");
                setNotifications((prev) =>
                    prev.map((n) => (n.id === id ? { ...n, read: true } : n))
                );
            }
        } catch (error) {
            console.error("Lỗi khi đánh dấu đã đọc:", error);
        }
    };

    const deleteNotification = async (id) => {
        try {
            await NOTIFICATION_DELETE_ID("delete", id);
            setNotifications((prev) => prev.filter((n) => n.id !== id));

        } catch (error) {
            console.error("Lỗi khi xóa:", error);
        }
    };


    const markAllAsRead = async () => {
        try {
            await NOTIFICATION_GET_ALL("read-all");
            setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));

        } catch (error) {
            console.error("Lỗi khi đánh dấu đã đọc:", error);
        }
    };


    return (
        <NotificationContext.Provider
            value={{
                notifications,
                loading,
                fetchNotifications,
                markAsRead,
                deleteNotification,
                markAllAsRead,
            }}
        >
            {children}
        </NotificationContext.Provider>
    );
};




