

// import React, { useEffect, createContext, useContext, useState } from 'react';
// import * as Notifications from 'expo-notifications';
// import { Vibration } from 'react-native';
// import { NOTIFICATION_GET_ALL } from 'api/apiService'; // Giả sử đây là API của bạn
// import { Client } from '@stomp/stompjs';
// import SockJS from 'sockjs-client';
// import { useNavigation } from '@react-navigation/native';
// import Toast from 'react-native-toast-message';
// import { useAuth } from './AuthContext';
// import AsyncStorage from '@react-native-async-storage/async-storage'; // Thêm AsyncStorage

// const NotificationContext = createContext();
// export const useNotifications = () => useContext(NotificationContext);

// export const NotificationProvider = ({ children }) => {
//     const [notifications, setNotifications] = useState([]);
//     const [client, setClient] = useState(null);
//     const [loading, setLoading] = useState(true);
//     const navigation = useNavigation();
//     const { userId } = useAuth();

//     // Hàm hiển thị thông báo cục bộ
//     const showLocalNotification = async (notification) => {
//         try {
//             await Notifications.scheduleNotificationAsync({
//                 content: {
//                     title: notification.title,
//                     body: notification.message,
//                     data: notification.data || {},
//                 },
//                 trigger: null,
//             });
//             Vibration.vibrate(400);
//             console.log(`Local notification shown for: ${notification.id}`);
//         } catch (error) {
//             console.error('Error showing local notification:', error);
//         }
//     };

//     // Lưu trữ ID của thông báo đã hiển thị cục bộ
//     const markNotificationAsShown = async (notificationId) => {
//         try {
//             const shownIds = await AsyncStorage.getItem('shownNotificationIds');
//             const ids = shownIds ? JSON.parse(shownIds) : [];
//             if (!ids.includes(notificationId)) {
//                 ids.push(notificationId);
//                 await AsyncStorage.setItem('shownNotificationIds', JSON.stringify(ids));
//             }
//         } catch (error) {
//             console.error('Error saving shown notification ID:', error);
//         }
//     };

//     // Kiểm tra xem thông báo đã được hiển thị cục bộ chưa
//     const isNotificationShown = async (notificationId) => {
//         try {
//             const shownIds = await AsyncStorage.getItem('shownNotificationIds');
//             const ids = shownIds ? JSON.parse(shownIds) : [];
//             return ids.includes(notificationId);
//         } catch (error) {
//             console.error('Error checking shown notification ID:', error);
//             return false;
//         }
//     };

//     useEffect(() => {
//         if (!userId) {
//             console.log('No userId available, skipping WebSocket and notifications');
//             setLoading(false);
//             return;
//         }

//         const requestPermissions = async () => {
//             const { status } = await Notifications.requestPermissionsAsync();
//             if (status !== 'granted') {
//                 console.log('Notification permissions not granted');
//                 Toast.show({
//                     type: 'error',
//                     text1: 'Yêu cầu quyền',
//                     text2: 'Vui lòng cấp quyền thông báo trong cài đặt.',
//                 });
//             }
//         };
//         requestPermissions();

//         const fetchNotifications = async () => {
//             try {
//                 setLoading(true);
//                 const response = await NOTIFICATION_GET_ALL("my-notifications");
//                 if (response.status === 200) {
//                     const newNotifications = response.data.data.map((notif) => ({
//                         id: notif.id,
//                         title: notif.title || 'Thông báo mới',
//                         message: notif.message || 'Không có nội dung',
//                         type: notif.type?.toLowerCase() || 'default',
//                         data: typeof notif.data === 'string' ? JSON.parse(notif.data) : notif.data,
//                         read: notif.read || false,
//                         date: notif.date || new Date().toISOString(),
//                         userId: notif.userId,
//                     }));

//                     setNotifications(newNotifications);

//                     // Hiển thị thông báo cục bộ cho các thông báo chưa đọc và chưa hiển thị
//                     for (const notif of newNotifications) {
//                         if (!notif.read && !(await isNotificationShown(notif.id))) {
//                             await showLocalNotification(notif);
//                             await markNotificationAsShown(notif.id);
//                         }
//                     }
//                 }
//             } catch (err) {
//                 console.error('Failed to fetch notifications:', err);
//                 Toast.show({
//                     type: 'error',
//                     text1: 'Lỗi',
//                     text2: 'Không thể tải thông báo.',
//                 });
//             } finally {
//                 setLoading(false);
//             }
//         };
//         fetchNotifications();

//         const socket = new SockJS(`http://172.16.12.131:8080/api/v1/public/notification-websocket`);
//         const stompClient = new Client({
//             webSocketFactory: () => socket,
//             reconnectDelay: 5000,
//             heartbeatIncoming: 4000,
//             heartbeatOutgoing: 4000,
//             debug: (str) => console.log('[STOMP DEBUG NOTIFICATION]', str),
//             onConnect: () => {
//                 console.log('✅ WebSocket Connected for Notifications!');
//                 stompClient.subscribe(`/user/${userId}/queue/notifications`, async (message) => {
//                     try {
//                         const newNotification = JSON.parse(message.body);
//                         console.log('📥 New notification received via WebSocket:', newNotification);

//                         if (newNotification.action === 'delete') {
//                             setNotifications((prev) => prev.filter((n) => n.id !== newNotification.id));
//                             return;
//                         }

//                         const normalizedNotification = {
//                             id: newNotification.id,
//                             title: newNotification.title || 'Thông báo mới',
//                             message: newNotification.message || 'Không có nội dung',
//                             type: newNotification.type ? newNotification.type.toLowerCase() : 'default',
//                             data: typeof newNotification.data === 'string' ? JSON.parse(newNotification.data) : newNotification.data,
//                             read: newNotification.read || false,
//                             date: newNotification.date || new Date().toISOString(),
//                             userId: newNotification.userId,
//                         };

//                         const isDuplicate = notifications.some((n) => n.id === normalizedNotification.id);
//                         if (!isDuplicate) {
//                             setNotifications((prev) => [normalizedNotification, ...prev]);
//                             await showLocalNotification(normalizedNotification);
//                             await markNotificationAsShown(normalizedNotification.id);
//                         }
//                     } catch (error) {
//                         console.error('Error processing WebSocket notification:', error);
//                     }
//                 });
//             },
//             onStompError: (frame) => {
//                 console.error('STOMP Error:', frame);
//                 Toast.show({
//                     type: 'error',
//                     text1: 'Lỗi',
//                     text2: 'Không thể kết nối WebSocket.',
//                 });
//             },
//             onWebSocketError: (event) => {
//                 console.error('❌ WebSocket Error:', event);
//                 Toast.show({
//                     type: 'error',
//                     text1: 'Lỗi',
//                     text2: 'Lỗi kết nối WebSocket.',
//                 });
//             },
//         });

//         stompClient.activate();
//         setClient(stompClient);

//         const subscription = Notifications.addNotificationReceivedListener((notification) => {
//             const notifData = notification.request.content.data || {};
//             const newNotification = {
//                 id: notifData.id || `temp-${Date.now()}`,
//                 title: notification.request.content.title || 'Thông báo mới',
//                 message: notification.request.content.body || 'Không có nội dung',
//                 type: notifData.type ? notifData.type.toLowerCase() : 'default',
//                 data: notifData,
//                 read: false,
//                 date: new Date().toISOString(),
//                 userId: notifData.userId || userId,
//             };

//             if (newNotification.userId !== userId) {
//                 console.log('Ignoring local notification for another user:', newNotification.userId);
//                 return;
//             }

//             const isDuplicate = notifications.some((n) => n.id === newNotification.id);
//             if (!isDuplicate) {
//                 setNotifications((prev) => [newNotification, ...prev]);
//                 Vibration.vibrate(400);
//                 fetchNotifications();
//             }
//         });

//         const responseSubscription = Notifications.addNotificationResponseReceivedListener((response) => {
//             const notifData = response.notification.request.content.data || {};
//             console.log('Notification pressed:', notifData);
//             if (notifData.orderId) {
//                 navigation.navigate('OrderDetail', { orderId: notifData.orderId });
//             } else if (notifData.promotionId) {
//                 console.log('Navigate to promotion:', notifData.promotionId);
//             } else if (notifData.newsId) {
//                 console.log('Navigate to news:', notifData.newsId);
//             }
//         });

//         return () => {
//             if (stompClient) {
//                 stompClient.deactivate();
//             }
//             subscription.remove();
//             responseSubscription.remove();
//         };
//     }, [userId]);

//     return (
//         <NotificationContext.Provider value={{ notifications, setNotifications, loading }}>
//             {children}
//         </NotificationContext.Provider>
//     );
// };