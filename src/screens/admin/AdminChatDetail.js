import { View, Text, FlatList, ActivityIndicator } from "react-native"

import styles from "../../styles/AdminChatDetailStyles"
import AdminHeader from "@components/admin/AdminHeader"
import EmptyChat from "@components/admin/chat/EmptyChat"
import MessageItem from "@components/admin/chat/MessageItem"
import ChatInput from "@components/admin/chat/ChatInput"
import { useState, useEffect, useRef } from "react"
import { Alert } from "react-native"
import { useNavigation, useRoute } from "@react-navigation/native"
import * as ImagePicker from "expo-image-picker"
import { Client } from '@stomp/stompjs';
import SockJS from "sockjs-client";
import { API_URL_WEBSOCKER, CHAT_GET_ID, CHAT_POST_ADD, CHAT_POST_PARAMS, USER_POST_UPLOAD } from 'api/apiService';
import { SafeAreaView } from 'react-native-safe-area-context';


const AdminChatDetail = () => {
    const navigation = useNavigation()
    const route = useRoute()
    const { conversationId } = route.params
    const flatListRef = useRef(null)

    const [loading, setLoading] = useState(true)
    const [sending, setSending] = useState(false)
    const [conversation, setConversation] = useState(null)
    const [messages, setMessages] = useState([])
    const [messageText, setMessageText] = useState("")
    const [selectedImage, setSelectedImage] = useState(null)


    const [client, setClient] = useState(null);

    useEffect(() => {
        fetchConversation()

        const intervalId = setInterval(fetchConversation, 5000)

        return () => clearInterval(intervalId)
    }, [conversationId])


    useEffect(() => {
        if (conversationId) {
            const socket = new SockJS(API_URL_WEBSOCKER);
            const stompClient = new Client({
                webSocketFactory: () => socket,
                reconnectDelay: 5000,
                heartbeatIncoming: 4000,
                heartbeatOutgoing: 4000,

                debug: (str) => console.log("[STOMP DEBUG]", str),
                onConnect: (frame) => {
                    console.log("✅ Connected via SockJS!");
                    stompClient.subscribe(`/topic/conversation/${conversationId}`, (message) => {
                        const newMessage = JSON.parse(message.body);
                        setMessages((prev) => {
                            if (!prev.some((msg) => msg.id === newMessage.id)) {
                                return [...prev, newMessage];
                            }
                            return prev;
                        });
                        if (flatListRef.current) {
                            flatListRef.current.scrollToEnd({ animated: true });
                        }
                        if (newMessage.receiverId === 'ADMIN' && !newMessage.read) {
                            handleMarkAsRead(newMessage);

                        }
                    });
                },
                onStompError: (frame) => {
                    console.error('STOMP Error:', frame);
                    Alert.alert('Lỗi', 'Không thể kết nối WebSocket. Vui lòng thử lại.');
                },
                onWebSocketError: (event) => {
                    console.error("❌ WebSocket Error:", event);
                },

            });

            stompClient.activate();
            setClient(stompClient);

            return () => {
                if (stompClient) {
                    stompClient.deactivate();
                }
            };
        }
    }, [conversationId]);

    const handleMarkAsRead = async (newMessage) => {
        if (newMessage.receiverId === 'ADMIN' && !newMessage.read) {
            try {
                await CHAT_POST_PARAMS(`conversations/read/${conversationId}`, { userId: "ADMIN" });
            } catch (error) {
                console.error("❌ Failed to mark message as read:", error);
            }
        }
    };

    useEffect(() => {
        fetchConversation();
        const intervalId = setInterval(fetchConversation, 5000);
        return () => clearInterval(intervalId);
    }, [conversationId]);

    const fetchConversation = async () => {
        try {
            setLoading(true)
            const response = await CHAT_GET_ID("conversations", conversationId);

            if (response.status === 200) {
                setConversation(response.data.data);
                setMessages(response.data.data.messages);

                if (response.data.data.unreadCount > 0) {
                    await CHAT_POST_PARAMS(`conversations/read/${conversationId}`, { userId: "ADMIN" });
                }
            } else {
                Alert.alert("Lỗi", "Không thể tải cuộc trò chuyện")
                navigation.goBack()
            }
        } catch (error) {
            console.error("Error fetching conversation:", error)
            Alert.alert("Lỗi", "Đã xảy ra lỗi khi tải cuộc trò chuyện")
            navigation.goBack()
        } finally {
            setLoading(false)
        }
    }

    const handleSendMessage = async () => {
        if ((!messageText.trim() && !selectedImage) || sending) return

        try {
            let uploadedImageUrl = null;
            if (selectedImage) {
                const shortText = messageText.substring(0, 10);
                const formData = new FormData();
                formData.append('file', {
                    uri: selectedImage,
                    name: `chat_${shortText}.jpg`,
                    type: 'image/jpeg',
                });

                const uploadResponse = await USER_POST_UPLOAD(
                    "public/chat/upload-image",
                    formData,
                    {
                        headers: {
                            'Content-Type': 'multipart/form-data',
                        },
                    }
                );

                if (uploadResponse.status === 200) {
                    uploadedImageUrl = uploadResponse.data.data.data;
                } else {
                    throw new Error('Failed to upload image');
                }
            }


            setSending(true)
            const newMessage = {
                senderId: "ADMIN",
                receiverId: conversation.userId,
                content: messageText.trim(),
                timestamp: null,
                read: false,
                image: uploadedImageUrl,
            }

            if (client && client.connected) {
                client.publish({
                    destination: `/app/chat/${conversationId}`,
                    body: JSON.stringify(newMessage),
                });
                // setMessages((prev) => [...prev, { ...newMessage, id: `temp_${Date.now()}` }]);
            } else {
                const response = await CHAT_POST_ADD(`conversations/messages/${conversationId}`, newMessage);
                if (response.status === 200) {
                    setMessages((prev) => {
                        const updated = prev.filter((msg) => !msg.id.startsWith('temp_'));
                        return [...updated, response.data.data];
                    });
                } else {
                    throw new Error('Không thể gửi tin nhắn');
                }
            }

            setMessageText('');
            setSelectedImage(null);
            if (flatListRef.current) {
                flatListRef.current.scrollToEnd({ animated: true });
            }
        } catch (error) {
            console.error("Error sending message:", error)
            Alert.alert("Lỗi", "Đã xảy ra lỗi khi gửi tin nhắn")
        } finally {
            setSending(false)
        }
    }

    const pickImage = async () => {
        Alert.alert(
            "Chọn hình ảnh",
            "Bạn muốn chụp ảnh mới hay chọn từ thư viện?",
            [
                {
                    text: "Chụp ảnh",
                    onPress: async () => {
                        try {
                            // Request camera permissions
                            const cameraPermission = await ImagePicker.requestCameraPermissionsAsync();
                            if (!cameraPermission.granted) {
                                Alert.alert("Lỗi", "Bạn cần cấp quyền truy cập camera để chụp ảnh.");
                                return;
                            }

                            const result = await ImagePicker.launchCameraAsync({
                                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                                allowsEditing: true,
                                quality: 0.8,
                                allowsEditing: false,
                            });

                            if (!result.canceled) {
                                setSelectedImage(result.assets[0].uri);
                            }
                        } catch (error) {
                            console.error("Error capturing photo:", error);
                            Alert.alert("Lỗi", "Không thể chụp ảnh. Vui lòng thử lại.");
                        }
                    },
                },
                {
                    text: "Chọn từ thư viện",
                    onPress: async () => {
                        try {
                            const libraryPermission = await ImagePicker.requestMediaLibraryPermissionsAsync();
                            if (!libraryPermission.granted) {
                                Alert.alert("Lỗi", "Bạn cần cấp quyền truy cập thư viện ảnh.");
                                return;
                            }

                            const result = await ImagePicker.launchImageLibraryAsync({
                                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                                allowsEditing: true,
                                quality: 0.8,
                                allowsEditing: false,
                            });

                            if (!result.canceled) {
                                setSelectedImage(result.assets[0].uri);
                            }
                        } catch (error) {
                            console.error("Error selecting image:", error);
                            Alert.alert("Lỗi", "Không thể chọn hình ảnh. Vui lòng thử lại.");
                        }
                    },
                },
                { text: "Hủy", style: "cancel" },
            ],
            { cancelable: true }
        );
    };



    if (loading && !conversation) {
        return (
            <View style={styles.container}>
                <AdminHeader title="Chi tiết cuộc trò chuyện" />
                <View style={styles.loadingContainer}>
                    <ActivityIndicator size="large" color="#e30019" />
                    <Text style={styles.loadingText}>Đang tải cuộc trò chuyện...</Text>
                </View>
            </View>
        )
    }

    return (
        <SafeAreaView style={styles.container}>
            <AdminHeader title={conversation?.userName || "Chi tiết cuộc trò chuyện"} />

            <View style={styles.chatContainer}>
                {messages.length === 0 ? (
                    <EmptyChat conversation={conversation} />
                ) : (
                    <FlatList
                        ref={flatListRef}
                        data={messages}
                        renderItem={({ item }) => (
                            <MessageItem
                                item={item}
                                conversation={conversation} />
                        )}
                        keyExtractor={(item) => item.id}
                        contentContainerStyle={styles.messagesList}
                        onLayout={() => {
                            if (flatListRef.current && messages.length > 0) {
                                flatListRef.current.scrollToEnd({ animated: false })
                            }
                        }}
                    />
                )}
            </View>

            <ChatInput
                messageText={messageText}
                setMessageText={setMessageText}
                selectedImage={selectedImage}
                setSelectedImage={setSelectedImage}
                handleSendMessage={handleSendMessage}
                pickImage={pickImage}
                sending={sending}
            />
        </SafeAreaView>
    )
}

export default AdminChatDetail