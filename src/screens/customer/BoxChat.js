
// import React, { useEffect, useState } from "react";
// import { View, TextInput, Button, Text, ScrollView } from "react-native";
// import { Client } from "@stomp/stompjs";
// import SockJS from "sockjs-client";
// import { SafeAreaView } from "react-native-safe-area-context";

// const ChatScreen = () => {
//     const [messages, setMessages] = useState([]);
//     const [message, setMessage] = useState("");
//     const [nickname, setNickname] = useState("");

//     const [client, setClient] = useState(null);

//     useEffect(() => {
//         // Tạo SockJS client
//         const socket = new SockJS("http://172.16.12.131:8080/api/v1/public/chat-websocket");

//         const stompClient = new Client({
//             webSocketFactory: () => socket,
//             reconnectDelay: 5000,
//             debug: (str) => console.log("[STOMP DEBUG]", str),
//             onConnect: (frame) => {
//                 console.log("✅ Connected via SockJS!");

//                 // Đăng ký lắng nghe tin nhắn từ server
//                 stompClient.subscribe("/topic/messages", (msg) => {
//                     const receivedMessage = JSON.parse(msg.body);
//                     setMessages((prev) => [...prev, receivedMessage]);
//                 });
//             },
//             onStompError: (frame) => {
//                 console.error("❌ STOMP Error:", frame);
//             },
//             onWebSocketError: (event) => {
//                 console.error("❌ WebSocket Error:", event);
//             },
//         });

//         stompClient.activate();
//         setClient(stompClient);

//         return () => {
//             stompClient.deactivate();
//         };
//     }, []);

//     const sendMessage = () => {
//         if (client && client.connected && message && nickname) {
//             const newMessage = {
//                 senderId: nickname,
//                 content: message,
//             };

//             client.publish({
//                 destination: "/app/sendMessage",
//                 body: JSON.stringify(newMessage),
//             });

//             setMessage("");
//         } else {
//             console.warn("Client not connected or missing nickname/message.");
//         }
//     };

//     return (
//         <SafeAreaView style={{ padding: 16 }}>
//             <Text style={{ fontSize: 20, fontWeight: "bold", marginBottom: 10 }}>
//                 Chat Application
//             </Text>

//             <TextInput
//                 style={{
//                     height: 40,
//                     borderColor: "gray",
//                     borderWidth: 1,
//                     marginBottom: 10,
//                     paddingHorizontal: 10,
//                 }}
//                 placeholder="Enter your nickname"
//                 value={nickname}
//                 onChangeText={setNickname}
//             />

//             <ScrollView style={{ height: 300, marginBottom: 10 }}>
//                 {messages.map((msg, index) => (
//                     <View key={index} style={{ marginBottom: 4 }}>
//                         <Text>
//                             <Text style={{ fontWeight: "bold" }}>{msg.senderId}:</Text>{" "}
//                             {msg.content}
//                         </Text>
//                     </View>
//                 ))}
//             </ScrollView>

//             <TextInput
//                 style={{
//                     height: 40,
//                     borderColor: "gray",
//                     borderWidth: 1,
//                     paddingHorizontal: 10,
//                     marginBottom: 10,
//                 }}
//                 placeholder="Type a message"
//                 value={message}
//                 onChangeText={setMessage}
//             />

//             <Button title="Send" onPress={sendMessage} />
//         </SafeAreaView>
//     );
// };

// export default ChatScreen;



// import { View, ActivityIndicator, Text } from 'react-native';
// import styles from '../../styles/ChatStyles';
// import ChatHeader from '@components/chat/ChatHeader';
// import ChatMessages from '@components/chat/ChatMessages';
// import ChatInput from '@components/chat/ChatInput';
// import { useState, useEffect, useRef } from 'react';
// import { useNavigation, useRoute } from '@react-navigation/native';
// import { Alert } from 'react-native';
// import { useAuth } from '@contexts/AuthContext';
// import * as ImagePicker from 'expo-image-picker';
// import { SafeAreaView } from 'react-native-safe-area-context';
// import { Client } from '@stomp/stompjs';
// import SockJS from "sockjs-client";
// import { apiChat } from 'api/apiChat';

// const ChatScreen = () => {
//     const navigation = useNavigation();
//     const route = useRoute();
//     const { user, token, updateUser } = useAuth();
//     const flatListRef = useRef(null);

//     const [loading, setLoading] = useState(true);
//     const [sending, setSending] = useState(false);
//     const [conversation, setConversation] = useState(null);
//     const [messages, setMessages] = useState([]);
//     const [messageText, setMessageText] = useState('');
//     const [selectedImage, setSelectedImage] = useState(null);
//     const [conversationId, setConversationId] = useState(null);

//     const [client, setClient] = useState(null);

//     useEffect(() => {
//         if (conversationId) {
//             const stompClient = new Client({
//                 brokerURL: 'ws://172.16.12.131:8080/api/v1/public/chat-websocket',
//                 connectHeaders: {
//                     Authorization: `Bearer ${token}`,
//                 },
//                 debug: (str) => console.log(str),
//                 reconnectDelay: 5000,
//                 heartbeatIncoming: 4000,
//                 heartbeatOutgoing: 4000,
//             });

//             stompClient.onConnect = () => {
//                 stompClient.subscribe(`/topic/conversation/${conversationId}`, (message) => {
//                     const newMessage = JSON.parse(message.body);
//                     setMessages((prev) => {
//                         if (!prev.some((msg) => msg.id === newMessage.id)) {
//                             return [...prev, newMessage];
//                         }
//                         return prev;
//                     });
//                     if (flatListRef.current) {
//                         flatListRef.current.scrollToEnd({ animated: true });
//                     }
//                     if (newMessage.receiverId === user.id && !newMessage.read) {
//                         apiChat.markConversationAsRead(conversationId, user.id);
//                     }
//                 });
//             };

//             stompClient.onStompError = (frame) => {
//                 console.error('STOMP Error:', frame);
//                 Alert.alert('Lỗi', 'Không thể kết nối WebSocket. Vui lòng thử lại.');
//             };

//             stompClient.activate();
//             setClient(stompClient);

//             return () => {
//                 if (stompClient) {
//                     stompClient.deactivate();
//                 }
//             };
//         }
//     }, [conversationId, user.id, token]);

//     useEffect(() => {
//         fetchConversation();
//         navigation.setOptions({ title: 'Hỗ trợ trực tuyến' });
//         const intervalId = setInterval(fetchConversation, 10000);
//         return () => clearInterval(intervalId);
//     }, []);

//     const fetchConversation = async (retryCount = 3) => {
//         try {
//             setLoading(true);
//             const response = await apiChat.getConversationByUserId(user.id);
//             if (response.status === 200) {
//                 setConversation(response.data.data);
//                 setMessages(response.data.data.messages);
//                 setConversationId(response.data.data.id);
//                 if (response.data.data.unreadCount > 0) {
//                     await apiChat.markConversationAsRead(response.data.data.id, user.id);
//                 }
//             } else {
//                 const createResponse = await createNewConversation(retryCount);
//                 if (createResponse.status === 200) {
//                     setConversation(createResponse.data.data);
//                     setMessages(createResponse.data.data.messages);
//                     setConversationId(createResponse.data.data.id);
//                     if (createResponse.data.data.user) {
//                         updateUser({ ...user, ...createResponse.data.data.user });
//                     }
//                 } else {
//                     throw new Error('Không thể tạo cuộc trò chuyện mới');
//                 }
//             }
//         } catch (error) {
//             console.error('Error fetching conversation:', error);
//             if (retryCount > 0) {
//                 console.log(`Retrying... (${retryCount} attempts left)`);
//                 setTimeout(() => fetchConversation(retryCount - 1), 2000);
//             } else {
//                 Alert.alert(
//                     'Lỗi',
//                     'Đã xảy ra lỗi khi tải cuộc trò chuyện. Bạn có muốn thử lại?',
//                     [
//                         { text: 'Hủy', style: 'cancel', onPress: () => navigation.goBack() },
//                         { text: 'Thử lại', onPress: () => fetchConversation(3) },
//                     ]
//                 );
//             }
//         } finally {
//             setLoading(false);
//         }
//     };

//     const createNewConversation = async (retryCount = 3) => {
//         try {
//             const createResponse = await apiChat.createConversation(user.id, user.name, user.avatar);
//             if (createResponse.status === 200) {
//                 return createResponse;
//             } else {
//                 throw new Error('API failed to create conversation');
//             }
//         } catch (error) {
//             if (retryCount > 0) {
//                 console.log(`Retrying create conversation... (${retryCount} attempts left)`);
//                 await new Promise((resolve) => setTimeout(resolve, 2000));
//                 return createNewConversation(retryCount - 1);
//             } else {
//                 throw error;
//             }
//         }
//     };

//     const handleSendMessage = async () => {
//         if ((!messageText.trim() && !selectedImage) || sending) return;
//         try {
//             setSending(true);
//             const newMessage = {
//                 senderId: user.id,
//                 receiverId: 'admin',
//                 content: messageText.trim(),
//                 timestamp: new Date().toISOString(),
//                 read: false,
//                 image: selectedImage,
//             };

//             if (client && client.connected) {
//                 client.publish({
//                     destination: `/app/chat/${conversationId}`,
//                     body: JSON.stringify(newMessage),
//                 });
//                 setMessages((prev) => [...prev, { ...newMessage, id: `temp_${Date.now()}` }]);
//             } else {
//                 const response = await apiChat.sendMessage(conversationId, newMessage);
//                 if (response.status === 200) {
//                     setMessages((prev) => {
//                         const updated = prev.filter((msg) => !msg.id.startsWith('temp_'));
//                         return [...updated, response.data.data];
//                     });
//                 } else {
//                     throw new Error('Không thể gửi tin nhắn');
//                 }
//             }

//             setMessageText('');
//             setSelectedImage(null);
//             if (flatListRef.current) {
//                 flatListRef.current.scrollToEnd({ animated: true });
//             }
//         } catch (error) {
//             console.error('Error sending message:', error);
//             Alert.alert('Lỗi', 'Đã xảy ra lỗi khi gửi tin nhắn');
//         } finally {
//             setSending(false);
//         }
//     };

//     const pickImage = async () => {
//         try {
//             const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
//             if (permissionResult.granted === false) {
//                 Alert.alert('Cần quyền truy cập', 'Bạn cần cấp quyền truy cập thư viện ảnh để chọn ảnh.');
//                 return;
//             }
//             const result = await ImagePicker.launchImageLibraryAsync({
//                 mediaTypes: ImagePicker.MediaTypeOptions.Images,
//                 allowsEditing: true,
//                 aspect: [4, 3],
//                 quality: 0.8,
//             });
//             if (!result.canceled) {
//                 setSelectedImage(result.assets[0].uri);
//             }
//         } catch (error) {
//             console.error('Error picking image:', error);
//             Alert.alert('Lỗi', 'Không thể chọn ảnh. Vui lòng thử lại sau.');
//         }
//     };

//     const formatTime = (timestamp) => {
//         const date = new Date(timestamp);
//         const hours = date.getHours().toString().padStart(2, '0');
//         const minutes = date.getMinutes().toString().padStart(2, '0');
//         return `${hours}:${minutes}`;
//     };

//     if (loading) {
//         return (
//             <View style={styles.loadingContainer}>
//                 <ActivityIndicator size="large" color="#e30019" />
//                 <Text style={styles.loadingText}>Đang tải cuộc trò chuyện...</Text>
//             </View>
//         );
//     }

//     return (
//         <SafeAreaView style={styles.container}>
//             <ChatHeader navigation={navigation} />
//             <ChatMessages messages={messages} flatListRef={flatListRef} formatTime={formatTime} />
//             <ChatInput
//                 messageText={messageText}
//                 setMessageText={setMessageText}
//                 selectedImage={selectedImage}
//                 setSelectedImage={setSelectedImage}
//                 sending={sending}
//                 handleSendMessage={handleSendMessage}
//                 pickImage={pickImage}
//             />
//         </SafeAreaView>
//     );
// };

// export default ChatScreen;













///Oke
// import { View, ActivityIndicator, Text } from 'react-native';
// import styles from '../../styles/ChatStyles';
// import ChatHeader from '@components/chat/ChatHeader';
// import ChatMessages from '@components/chat/ChatMessages';
// import ChatInput from '@components/chat/ChatInput';
// import { useState, useEffect, useRef } from 'react';
// import { useNavigation, useRoute } from '@react-navigation/native';
// import { Alert } from 'react-native';
// import { useAuth } from '@contexts/AuthContext';
// import * as ImagePicker from 'expo-image-picker';
// import { SafeAreaView } from 'react-native-safe-area-context';
// import { Client } from '@stomp/stompjs';
// import SockJS from "sockjs-client";
// import { CHAT_GET_ID, CHAT_POST_ADD, CHAT_POST_PARAMS, POST_ADD } from 'api/apiService';


// const ChatScreen = () => {

//     const navigation = useNavigation();
//     const route = useRoute();
//     const { user, token, updateUser } = useAuth();
//     const flatListRef = useRef(null);

//     const [loading, setLoading] = useState(true);
//     const [sending, setSending] = useState(false);
//     const [conversation, setConversation] = useState(null);
//     const [messages, setMessages] = useState([]);
//     const [messageText, setMessageText] = useState('');
//     const [selectedImage, setSelectedImage] = useState(null);
//     const [conversationId, setConversationId] = useState(null);

//     const [client, setClient] = useState(null);

//     useEffect(() => {
//         if (conversationId) {
//             const socket = new SockJS("http://172.16.12.131:8080/api/v1/public/chat-websocket");

//             const stompClient = new Client({
//                 webSocketFactory: () => socket,
//                 reconnectDelay: 5000,
//                 heartbeatIncoming: 4000,
//                 heartbeatOutgoing: 4000,

//                 debug: (str) => console.log("[STOMP DEBUG]", str),
//                 onConnect: (frame) => {
//                     console.log("✅ Connected via SockJS!");
//                     stompClient.subscribe(`/topic/conversation/${conversationId}`, (message) => {
//                         const newMessage = JSON.parse(message.body);
//                         setMessages((prev) => {
//                             if (!prev.some((msg) => msg.id === newMessage.id)) {
//                                 return [...prev, newMessage];
//                             }
//                             return prev;
//                         });
//                         if (flatListRef.current) {
//                             flatListRef.current.scrollToEnd({ animated: true });
//                         }
//                         if (newMessage.receiverId === user.id && !newMessage.read) {
//                             apiChat.markConversationAsRead(conversationId, user.id);
//                         }
//                     });
//                 },
//                 onStompError: (frame) => {
//                     console.error('STOMP Error:', frame);
//                     Alert.alert('Lỗi', 'Không thể kết nối WebSocket. Vui lòng thử lại.');
//                 },
//                 onWebSocketError: (event) => {
//                     console.error("❌ WebSocket Error:", event);
//                 },

//             });

//             stompClient.activate();
//             setClient(stompClient);

//             return () => {
//                 if (stompClient) {
//                     stompClient.deactivate();
//                 }
//             };
//         }
//     }, [conversationId, user.id, token]);

//     useEffect(() => {
//         fetchConversation();
//         navigation.setOptions({ title: 'Hỗ trợ trực tuyến' });
//         // const intervalId = setInterval(fetchConversation, 10000);
//         // return () => clearInterval(intervalId);
//     }, []);



//     const fetchConversation = async (retryCount = 3) => {
//         try {
//             setLoading(true);
//             const id = user.id;
//             const response = await CHAT_GET_ID("conversations/user", id);
//             if (response.status === 200) {
//                 setConversation(response.data.data);
//                 setMessages(response.data.data.messages);
//                 setConversationId(response.data.data.id);
//                 if (response.data.data.unreadCount > 0) {
//                     await CHAT_POST_PARAMS(`conversations/read/${conversationId}`, { userId: user.id });
//                 }
//             } else {
//                 const createResponse = await createNewConversation(retryCount);
//                 if (createResponse.status === 200) {
//                     setConversation(createResponse.data.data);
//                     setMessages(createResponse.data.data.messages);
//                     setConversationId(createResponse.data.data.id);
//                     // if (createResponse.data.data.user) {
//                     //     updateUser({ ...user, ...createResponse.data.data.user });
//                     // }
//                 } else {
//                     throw new Error('Không thể tạo cuộc trò chuyện mới');
//                 }
//             }
//         } catch (error) {
//             console.error('Error fetching conversation:', error);
//             if (retryCount > 0) {
//                 console.log(`Retrying... (${retryCount} attempts left)`);
//                 setTimeout(() => fetchConversation(retryCount - 1), 2000);
//             } else {
//                 Alert.alert(
//                     'Lỗi',
//                     'Đã xảy ra lỗi khi tải cuộc trò chuyện. Bạn có muốn thử lại?',
//                     [
//                         { text: 'Hủy', style: 'cancel', onPress: () => navigation.goBack() },
//                         { text: 'Thử lại', onPress: () => fetchConversation(3) },
//                     ]
//                 );
//             }
//         } finally {
//             setLoading(false);
//         }
//     };

//     const createNewConversation = async (retryCount = 3) => {
//         const fromData = {
//             userId: user.id,
//             userName: user.fullName,
//             userAvatar: user.profileImageUrl
//         }
//         try {
//             const createResponse = await CHAT_POST_ADD("conversations", fromData);
//             if (createResponse.status === 200) {
//                 return createResponse;
//             } else {
//                 throw new Error('API failed to create conversation');
//             }
//         } catch (error) {
//             if (retryCount > 0) {
//                 console.log(`Retrying create conversation... (${retryCount} attempts left)`);
//                 await new Promise((resolve) => setTimeout(resolve, 2000));
//                 return createNewConversation(retryCount - 1);
//             } else {
//                 throw error;
//             }
//         }
//     };

//     const handleSendMessage = async () => {
//         if ((!messageText.trim() && !selectedImage) || sending) return;
//         try {
//             setSending(true);
//             const newMessage = {
//                 senderId: user.id,
//                 receiverId: 'ADMIN',
//                 content: messageText.trim(),
//                 timestamp: null,
//                 read: false,
//                 image: selectedImage,
//             };

//             if (client && client.connected) {
//                 client.publish({
//                     destination: `/app/chat/${conversationId}`,
//                     body: JSON.stringify(newMessage),
//                 });
//                 setMessages((prev) => [...prev, { ...newMessage, id: `temp_${Date.now()}` }]);
//             } else {
//                 const response = await CHAT_POST_ADD(`conversations/messages/${conversationId}`, newMessage);
//                 if (response.status === 200) {
//                     setMessages((prev) => {
//                         const updated = prev.filter((msg) => !msg.id.startsWith('temp_'));
//                         return [...updated, response.data.data];
//                     });
//                 } else {
//                     throw new Error('Không thể gửi tin nhắn');
//                 }
//             }

//             setMessageText('');
//             setSelectedImage(null);
//             if (flatListRef.current) {
//                 flatListRef.current.scrollToEnd({ animated: true });
//             }
//         } catch (error) {
//             console.error('Error sending message:', error);
//             Alert.alert('Lỗi', 'Đã xảy ra lỗi khi gửi tin nhắn');
//         } finally {
//             setSending(false);
//         }
//     };

//     const pickImage = async () => {
//         try {
//             const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
//             if (permissionResult.granted === false) {
//                 Alert.alert('Cần quyền truy cập', 'Bạn cần cấp quyền truy cập thư viện ảnh để chọn ảnh.');
//                 return;
//             }
//             const result = await ImagePicker.launchImageLibraryAsync({
//                 mediaTypes: ImagePicker.MediaTypeOptions.Images,
//                 allowsEditing: true,
//                 aspect: [4, 3],
//                 quality: 0.8,
//             });
//             if (!result.canceled) {
//                 setSelectedImage(result.assets[0].uri);
//             }
//         } catch (error) {
//             console.error('Error picking image:', error);
//             Alert.alert('Lỗi', 'Không thể chọn ảnh. Vui lòng thử lại sau.');
//         }
//     };

//     const formatTime = (timestamp) => {
//         const date = new Date(timestamp);
//         const hours = date.getHours().toString().padStart(2, '0');
//         const minutes = date.getMinutes().toString().padStart(2, '0');
//         return `${hours}:${minutes}`;
//     };

//     if (loading) {
//         return (
//             <View style={styles.loadingContainer}>
//                 <ActivityIndicator size="large" color="#e30019" />
//                 <Text style={styles.loadingText}>Đang tải cuộc trò chuyện...</Text>
//             </View>
//         );
//     }

//     return (
//         <SafeAreaView style={styles.container}>
//             <ChatHeader navigation={navigation} />
//             <ChatMessages messages={messages} flatListRef={flatListRef} formatTime={formatTime} />
//             <ChatInput
//                 messageText={messageText}
//                 setMessageText={setMessageText}
//                 selectedImage={selectedImage}
//                 setSelectedImage={setSelectedImage}
//                 sending={sending}
//                 handleSendMessage={handleSendMessage}
//                 pickImage={pickImage}
//             />
//         </SafeAreaView>
//     )
// }

// export default ChatScreen






// ChatBotGemini.js
// import React, { useState } from 'react';
// import { View, Text, TextInput, Button, ScrollView, StyleSheet } from 'react-native';
// import axios from 'axios';
// import { SafeAreaView } from 'react-native-safe-area-context';
// import { KeyboardAvoidingView } from 'react-native';
// import { Platform } from 'react-native';
// import { GET_ALL } from 'api/apiService';

// const ChatBotGemini = () => {
//     const [messages, setMessages] = useState([]);
//     const [input, setInput] = useState('');
//     const [loading, setLoading] = useState(false);


//     const handleSend = async () => {
//         if (!input.trim()) return;

//         const newUserMessage = { role: 'user', content: input };
//         setMessages(prev => [...prev, newUserMessage]);
//         setInput('');
//         setLoading(true);

//         try {
//             const lowerInput = input.toLowerCase();
//             if (lowerInput.includes('xem sản phẩm') || lowerInput.includes('màu sắc')) {
//                 const res = await GET_ALL('products/colors');
//                 console.log("sssss", res);
//                 if (res.status === 200) {
//                     const products = res.data.data.content;
//                     console.log("sssss", products);
//                     const productList = products.map(p => `📱 ${p.name} - ${p.color} - ${p.storage} - ${p.price.toLocaleString()}₫`).join('\n\n');
//                     setMessages(prev => [...prev, { role: 'bot', content: `Danh sách sản phẩm:\n\n${productList}` }]);

//                 }

//             } else {
//                 const res = await axios.post('https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=AIzaSyCwEv75jMbsy6XkAeAivJWu0XqnpxtoALc',
//                     {
//                         contents: [{ parts: [{ text: input }] }]
//                     },
//                     {
//                         headers: { 'Content-Type': 'application/json' }
//                     }
//                 );

//                 const geminiResponse = res.data.candidates?.[0]?.content?.parts?.[0]?.text || 'Không có phản hồi.';
//                 setMessages(prev => [...prev, { role: 'bot', content: geminiResponse }]);
//             }
//         } catch (error) {
//             console.error('Lỗi:', error);
//             setMessages(prev => [...prev, { role: 'bot', content: 'Lỗi gọi API.' }]);
//         } finally {
//             setLoading(false);
//         }
//     };

//     return (
//         <KeyboardAvoidingView
//             style={{ flex: 1 }}
//             behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
//         >
//             <SafeAreaView style={styles.container}>
//                 <Text style={styles.title}>Gemini Chatbot</Text>
//                 <ScrollView style={styles.chatBox}>
//                     {messages.map((m, index) => (
//                         <Text key={index} style={m.role === 'user' ? styles.userMsg : styles.botMsg}>
//                             {m.role === 'user' ? 'Bạn: ' : 'Gemini: '}
//                             {m.content}
//                         </Text>
//                     ))}
//                 </ScrollView>
//                 <TextInput
//                     style={styles.input}
//                     value={input}
//                     onChangeText={setInput}
//                     placeholder="Nhập tin nhắn..."
//                 />
//                 <Button title={loading ? 'Đang gửi...' : 'Gửi'} onPress={handleSend} disabled={loading} />
//             </SafeAreaView>
//         </KeyboardAvoidingView>
//     );
// };

// const styles = StyleSheet.create({
//     container: { padding: 20, flex: 1, backgroundColor: '#fff' },
//     title: { fontSize: 24, fontWeight: 'bold', marginBottom: 10 },
//     chatBox: { flex: 1, marginBottom: 10 },
//     userMsg: { alignSelf: 'flex-end', backgroundColor: '#DCF8C6', padding: 10, borderRadius: 5, marginVertical: 2 },
//     botMsg: { alignSelf: 'flex-start', backgroundColor: '#F1F0F0', padding: 10, borderRadius: 5, marginVertical: 2 },
//     input: { borderWidth: 1, borderColor: '#ccc', padding: 10, borderRadius: 5, marginBottom: 10 },
// });

// export default ChatBotGemini;




// import { View, Image, Text, StyleSheet } from 'react-native';

// const MessageItem = ({ item, currentUser }) => {
//     const isBot = item.role === 'bot';
//     const isSystem = item.role === 'system';
//     const isCurrentUser = item.senderId === currentUser?.id;

//     return (
//         <View
//             style={[
//                 styles.messageContainer,
//                 isCurrentUser ? styles.currentUserMessage : styles.otherUserMessage,
//                 isBot && styles.botMessage,
//                 isSystem && styles.systemMessage,
//             ]}
//         >
//             {isBot && (
//                 <Image
//                     source={{ uri: 'https://png.pngtree.com/thumb_back/fh260/background/20230704/pngtree-rendering-of-an-android-robot-with-chatbot-concept-and-raised-hand-image_3744389.jpg' }}
//                     style={styles.avatar}
//                 />
//             )}
//             <View style={styles.messageContent}>
//                 <Text style={styles.messageText}>{item.content}</Text>
//                 {item.image && <Image source={{ uri: item.image }} style={styles.messageImage} />}
//             </View>
//         </View>
//     );
// };

// const styles = StyleSheet.create({
//     messageContainer: {
//         flexDirection: 'row',
//         marginVertical: 5,
//         paddingHorizontal: 10,
//     },
//     currentUserMessage: {
//         justifyContent: 'flex-end',
//     },
//     otherUserMessage: {
//         justifyContent: 'flex-start',
//     },
//     botMessage: {
//         backgroundColor: '#e0ffe0',
//     },
//     systemMessage: {
//         justifyContent: 'center',
//         backgroundColor: '#f0f0f0',
//         padding: 10,
//         borderRadius: 5,
//     },
//     avatar: {
//         width: 40,
//         height: 40,
//         borderRadius: 20,
//         marginRight: 10,
//     },
//     messageContent: {
//         maxWidth: '70%',
//         padding: 10,
//         borderRadius: 10,
//         backgroundColor: '#fff',
//     },
//     messageText: {
//         fontSize: 15,
//     },
//     messageImage: {
//         width: 150,
//         height: 150,
//         borderRadius: 10,
//         marginTop: 5,
//     },
// });

// export default MessageItem;


// ///Final
// import { View, ActivityIndicator, Text, KeyboardAvoidingView, Platform } from 'react-native';
// import styles from '../../styles/ChatStyles';
// import ChatHeader from '@components/chat/ChatHeader';
// import ChatMessages from '@components/chat/ChatMessages';
// import ChatInput from '@components/chat/ChatInput';
// import { useState, useEffect, useRef } from 'react';
// import { useNavigation, useRoute } from '@react-navigation/native';
// import { Alert } from 'react-native';
// import { useAuth } from '@contexts/AuthContext';
// import * as ImagePicker from 'expo-image-picker';
// import { SafeAreaView } from 'react-native-safe-area-context';
// import { Client } from '@stomp/stompjs';
// import SockJS from "sockjs-client";
// import { CHAT_GET_ID, CHAT_POST_ADD, CHAT_POST_PARAMS, POST_ADD, USER_POST_UPLOAD } from 'api/apiService';

// const ChatScreen = () => {

//     const navigation = useNavigation();
//     const flatListRef = useRef(null);

//     const [loading, setLoading] = useState(true);
//     const [sending, setSending] = useState(false);
//     const [conversation, setConversation] = useState(null);
//     const [messages, setMessages] = useState([]);
//     const [messageText, setMessageText] = useState('');
//     const [selectedImage, setSelectedImage] = useState(null);
//     const [conversationId, setConversationId] = useState(null);

//     const [client, setClient] = useState(null);
//     const [isChatbotEnabled, setIsChatbotEnabled] = useState(true);
//     const { currentUser } = useAuth();


//     useEffect(() => {
//         fetchConversation()
//         navigation.setOptions({ title: 'Hỗ trợ trực tuyến' });
//     }, [])

//     useEffect(() => {
//         if (conversationId) {
//             const socket = new SockJS("http://172.16.12.131:8080/api/v1/public/chat-websocket");
//             const stompClient = new Client({
//                 webSocketFactory: () => socket,
//                 reconnectDelay: 5000,
//                 heartbeatIncoming: 4000,
//                 heartbeatOutgoing: 4000,

//                 debug: (str) => console.log("[STOMP DEBUG]", str),
//                 onConnect: (frame) => {
//                     console.log("✅ Connected via SockJS!");
//                     stompClient.subscribe(`/topic/conversation/${conversationId}`, (message) => {
//                         const newMessage = JSON.parse(message.body);
//                         setMessages((prev) => {
//                             if (!prev.some((msg) => msg.id === newMessage.id)) {
//                                 return [...prev, newMessage];
//                             }
//                             return prev;
//                         });
//                         if (flatListRef.current) {
//                             flatListRef.current.scrollToEnd({ animated: true });
//                         }
//                         if (newMessage.receiverId === currentUser?.id && !newMessage.read) {
//                             handleMarkAsRead(newMessage);

//                         }
//                     });
//                 },
//                 onStompError: (frame) => {
//                     console.error('STOMP Error:', frame);
//                     Alert.alert('Lỗi', 'Không thể kết nối WebSocket. Vui lòng thử lại.');
//                 },
//                 onWebSocketError: (event) => {
//                     console.error("❌ WebSocket Error:", event);
//                 },

//             });

//             stompClient.activate();
//             setClient(stompClient);

//             return () => {
//                 if (stompClient) {
//                     stompClient.deactivate();
//                 }
//             };
//         }
//     }, [conversationId, currentUser?.id]);



//     const handleMarkAsRead = async (newMessage) => {
//         if (newMessage.receiverId === currentUser?.id && !newMessage.read) {
//             try {
//                 await CHAT_POST_PARAMS(`conversations/read/${conversationId}`, { userId: currentUser?.id });
//             } catch (error) {
//                 console.error("❌ Failed to mark message as read:", error);
//             }
//         }
//     };


//     const fetchConversation = async (retryCount = 3) => {
//         try {
//             setLoading(true);
//             const userId = currentUser?.id;
//             const response = await CHAT_GET_ID("conversations/user", userId);
//             if (response.status === 200) {
//                 setConversation(response.data.data);
//                 setMessages(response.data.data.messages);
//                 setConversationId(response.data.data.id);
//                 if (response.data.data.unreadCount > 0) {
//                     await CHAT_POST_PARAMS(`conversations/read/${conversationId}`, { userId: currentUser?.id });
//                 }
//             } else {
//                 const createResponse = await createNewConversation(retryCount);
//                 if (createResponse.status === 200) {
//                     setConversation(createResponse.data.data);
//                     setMessages(createResponse.data.data.messages);
//                     setConversationId(createResponse.data.data.id);
//                     // if (createResponse.data.data.user) {
//                     //     updateUser({ ...user, ...createResponse.data.data.user });
//                     // }
//                 } else {
//                     throw new Error('Không thể tạo cuộc trò chuyện mới');
//                 }
//             }
//         } catch (error) {
//             // console.error('Error fetching conversation:', error);
//             // if (retryCount > 0) {
//             //     // console.log(`Retrying... (${retryCount} attempts left)`);
//             //     setTimeout(() => fetchConversation(retryCount - 1), 2000);
//             // } else {
//             //     Alert.alert(
//             //         'Lỗi',
//             //         'Đã xảy ra lỗi khi tải cuộc trò chuyện. Bạn có muốn thử lại?',
//             //         [
//             //             { text: 'Hủy', style: 'cancel', onPress: () => navigation.goBack() },
//             //             { text: 'Thử lại', onPress: () => fetchConversation(3) },
//             //         ]
//             //     );
//             // }
//         } finally {
//             setLoading(false);
//             // Alert.alert(
//             //     'Thông báo',
//             //     'Vui lòng đăng nhập để sử dụng dịch vụ?',
//             //     [
//             //         { text: 'Hủy', style: 'cancel', onPress: () => navigation.goBack() },
//             //         { text: 'Thử lại', onPress: () => fetchConversation(3) },
//             //     ]
//             // );
//         }
//     };

//     const createNewConversation = async (retryCount = 3) => {
//         const fromData = {
//             userId: currentUser?.id,
//             userName: currentUser.fullName,
//             userAvatar: currentUser.profileImageUrl
//         }
//         try {
//             const createResponse = await CHAT_POST_ADD("conversations", fromData);
//             if (createResponse.status === 200) {
//                 return createResponse;
//             } else {
//                 throw new Error('API failed to create conversation');
//             }
//         } catch (error) {
//             if (retryCount > 0) {
//                 console.log(`Retrying create conversation... (${retryCount} attempts left)`);
//                 await new Promise((resolve) => setTimeout(resolve, 2000));
//                 return createNewConversation(retryCount - 1);
//             } else {
//                 throw error;
//             }
//         }
//     };

//     const handleSendMessage = async () => {

//         if ((!messageText.trim() && !selectedImage) || sending) return;
//         try {
//             let uploadedImageUrl = null;

//             if (selectedImage) {
//                 const shortText = messageText.substring(0, 10);
//                 const formData = new FormData();
//                 formData.append('file', {
//                     uri: selectedImage,
//                     name: `chat_${shortText}.jpg`,
//                     type: 'image/jpeg',
//                 });

//                 const uploadResponse = await USER_POST_UPLOAD(
//                     "public/chat/upload-image",
//                     formData,
//                     {
//                         headers: {
//                             'Content-Type': 'multipart/form-data',
//                         },
//                     }
//                 );

//                 if (uploadResponse.status === 200) {
//                     uploadedImageUrl = uploadResponse.data.data.data;
//                 } else {
//                     throw new Error('Failed to upload image');
//                 }
//             }

//             setSending(true);
//             const newMessage = {
//                 senderId: currentUser?.id,
//                 receiverId: 'ADMIN',
//                 content: messageText.trim(),
//                 timestamp: null,
//                 read: false,
//                 image: uploadedImageUrl,
//             };

//             if (client && client.connected) {
//                 client.publish({
//                     destination: `/app/chat/${conversationId}`,
//                     body: JSON.stringify(newMessage),
//                 });

//                 // setMessages((prev) => [...prev, { ...newMessage, id: `temp_${Date.now()}` }]);
//             }
//             else {
//                 const response = await CHAT_POST_ADD(`conversations/messages/${conversationId}`, newMessage);
//                 setMessages((prev) => {
//                     const updated = prev.filter((msg) => !msg.id.startsWith('temp_'));
//                     return [...updated, response.data.data];
//                 });
//             }
//             setMessageText('');
//             setSelectedImage(null);
//             if (flatListRef.current) {
//                 flatListRef.current.scrollToEnd({ animated: true });
//             }
//         } catch (error) {
//             console.error('Error sending message:', error);
//             Alert.alert('Lỗi', 'Đã xảy ra lỗi khi gửi tin nhắn');
//         } finally {
//             setSending(false);
//         }
//     };

//     const pickImage = async () => {
//         Alert.alert(
//             "Chọn hình ảnh",
//             "Bạn muốn chụp ảnh mới hay chọn từ thư viện?",
//             [
//                 {
//                     text: "Chụp ảnh",
//                     onPress: async () => {
//                         try {
//                             // Request camera permissions
//                             const cameraPermission = await ImagePicker.requestCameraPermissionsAsync();
//                             if (!cameraPermission.granted) {
//                                 Alert.alert("Lỗi", "Bạn cần cấp quyền truy cập camera để chụp ảnh.");
//                                 return;
//                             }

//                             const result = await ImagePicker.launchCameraAsync({
//                                 mediaTypes: ImagePicker.MediaTypeOptions.Images,
//                                 allowsEditing: true,
//                                 quality: 0.8,
//                                 allowsEditing: false,
//                             });

//                             if (!result.canceled) {
//                                 setSelectedImage(result.assets[0].uri);
//                             }
//                         } catch (error) {
//                             console.error("Error capturing photo:", error);
//                             Alert.alert("Lỗi", "Không thể chụp ảnh. Vui lòng thử lại.");
//                         }
//                     },
//                 },
//                 {
//                     text: "Chọn từ thư viện",
//                     onPress: async () => {
//                         try {
//                             // Request media library permissions
//                             const libraryPermission = await ImagePicker.requestMediaLibraryPermissionsAsync();
//                             if (!libraryPermission.granted) {
//                                 Alert.alert("Lỗi", "Bạn cần cấp quyền truy cập thư viện ảnh.");
//                                 return;
//                             }

//                             const result = await ImagePicker.launchImageLibraryAsync({
//                                 mediaTypes: ImagePicker.MediaTypeOptions.Images,
//                                 allowsEditing: true,
//                                 // aspect: [4, 3],
//                                 quality: 0.8,
//                                 allowsEditing: false,
//                             });

//                             if (!result.canceled) {
//                                 setSelectedImage(result.assets[0].uri);
//                             }
//                         } catch (error) {
//                             console.error("Error selecting image:", error);
//                             Alert.alert("Lỗi", "Không thể chọn hình ảnh. Vui lòng thử lại.");
//                         }
//                     },
//                 },
//                 { text: "Hủy", style: "cancel" },
//             ],
//             { cancelable: true }
//         );
//     };



//     if (loading) {
//         return (
//             <View style={styles.loadingContainer}>
//                 <ActivityIndicator size="large" color="#e30019" />
//                 <Text style={styles.loadingText}>Đang tải cuộc trò chuyện...</Text>
//             </View>
//         );
//     }

//     return (
//         <KeyboardAvoidingView
//             style={{ flex: 1 }}
//             behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
//         >
//             <SafeAreaView style={styles.container}>
//                 <ChatHeader navigation={navigation} />
//                 <ChatMessages
//                     messages={messages}
//                     flatListRef={flatListRef}
//                     currentUser={currentUser} />

//                 <ChatInput
//                     messageText={messageText}
//                     setMessageText={setMessageText}
//                     selectedImage={selectedImage}
//                     setSelectedImage={setSelectedImage}
//                     sending={sending}
//                     handleSendMessage={handleSendMessage}
//                     pickImage={pickImage}
//                 />

//             </SafeAreaView>
//         </KeyboardAvoidingView>

//     )
// }

// export default ChatScreen


//Amm thanh



// import React, { useState, useEffect } from 'react';
// import { View, Button, Platform, Alert } from 'react-native';
// import { Audio } from 'expo-av';
// import { SafeAreaView } from 'react-native-safe-area-context';

// const ChatScreen = () => {
//     const [recording, setRecording] = useState();
//     const [sound, setSound] = useState();
//     const [isRecording, setIsRecording] = useState(false);
//     const [hasPermission, setHasPermission] = useState(null);

//     useEffect(() => {
//         const getPermission = async () => {
//             const { status } = await Audio.requestPermissionsAsync();
//             setHasPermission(status === 'granted');
//         };

//         getPermission();
//     }, []);

//     const startRecording = async () => {
//         if (isRecording) {
//             Alert.alert('Đang ghi âm...', 'Bạn đang ghi âm rồi');
//             return;
//         }

//         if (hasPermission) {
//             try {
//                 // Cấu hình Audio Mode trước khi ghi âm (rất quan trọng với iOS)
//                 await Audio.setAudioModeAsync({
//                     allowsRecordingIOS: true,
//                     playsInSilentModeIOS: true,
//                     shouldDuckAndroid: true,
//                     playThroughEarpieceAndroid: false,
//                     staysActiveInBackground: false,
//                 });

//                 const { recording } = await Audio.Recording.createAsync(
//                     Audio.RecordingOptionsPresets.HIGH_QUALITY
//                 );
//                 setRecording(recording);
//                 setIsRecording(true);
//                 console.log('Started recording...');
//             } catch (error) {
//                 console.error('Error starting recording:', error);
//             }
//         } else {
//             Alert.alert('Không có quyền ghi âm', 'Vui lòng cấp quyền ghi âm.');
//         }
//     };


//     const stopRecording = async () => {
//         if (recording) {
//             try {
//                 await recording.stopAndUnloadAsync();
//                 const uri = recording.getURI();
//                 setRecording(null);
//                 setIsRecording(false);
//                 console.log('Recording stopped and saved to', uri);
//                 playRecording(uri); // Phát lại âm thanh sau khi ghi xong
//             } catch (error) {
//                 console.error('Error stopping recording:', error);
//             }
//         }
//     };

//     const playRecording = async (uri) => {
//         const { sound } = await Audio.Sound.createAsync({ uri });
//         setSound(sound);
//         await sound.setVolumeAsync(1.0); // 🔊 Bật âm lượng tối đa
//         await sound.playAsync();
//     };

//     const playSound = async () => {
//         if (sound) {
//             await sound.setVolumeAsync(1.0); // 🔊 Bật âm lượng tối đa
//             await sound.playAsync();
//         }
//     };

//     return (
//         <SafeAreaView>
//             <Button
//                 title={isRecording ? 'Dừng Ghi Âm' : 'Bắt Đầu Ghi Âm'}
//                 onPress={isRecording ? stopRecording : startRecording}
//             />
//             <Button title="Phát lại âm thanh" onPress={playSound} />
//         </SafeAreaView>
//     );
// };

// export default ChatScreen;
