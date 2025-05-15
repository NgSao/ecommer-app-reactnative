import { View, ActivityIndicator, Text, KeyboardAvoidingView, TouchableOpacity, Platform } from 'react-native';
import styles from '../../styles/ChatStyles';
import ChatHeader from '@components/chat/ChatHeader';
import ChatMessages from '@components/chat/ChatMessages';
import ChatInput from '@components/chat/ChatInput';
import { useState, useEffect, useRef } from 'react';
import { useNavigation } from '@react-navigation/native';
import { Alert } from 'react-native';
import { useAuth } from '@contexts/AuthContext';
import * as ImagePicker from 'expo-image-picker';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Client } from '@stomp/stompjs';
import SockJS from 'sockjs-client';
import { API_URL_WEBSOCKER, CHAT_GET_ID, CHAT_POST_ADD, CHAT_POST_PARAMS, GET_ALL, GET_TOKEN, GET_TOKEN_ID, USER_POST_UPLOAD } from 'api/apiService';
import axios from 'axios';
import * as Speech from 'expo-speech';
import { Audio } from 'expo-av';

const ChatScreen = () => {
    const navigation = useNavigation();
    const flatListRef = useRef(null);

    const [loading, setLoading] = useState(true);
    const [sending, setSending] = useState(false);
    const [conversation, setConversation] = useState(null);
    const [messages, setMessages] = useState([]);
    const [messageText, setMessageText] = useState('');
    const [selectedImage, setSelectedImage] = useState(null);
    const [selectedAudio, setSelectedAudio] = useState(null);
    const [conversationId, setConversationId] = useState(null);
    const [client, setClient] = useState(null);
    const [isChatbotEnabled, setIsChatbotEnabled] = useState(true);
    const [isRecordingAudio, setIsRecordingAudio] = useState(false);
    const [isTextToSpeechEnabled, setIsTextToSpeechEnabled] = useState(false);
    const { currentUser, token } = useAuth();

    useEffect(() => {
        if (!currentUser) {
            Alert.alert('Lỗi', 'Vui lòng đăng nhập để sử dụng chức năng chat.');
            navigation.navigate('Login'); // Điều hướng đến màn hình đăng nhập
            return;
        }
        fetchConversation();
        navigation.setOptions({ title: 'Hỗ trợ trực tuyến' });

        Audio.requestPermissionsAsync().then(({ granted }) => {
            if (!granted) {
                Alert.alert('Lỗi', 'Bạn cần cấp quyền truy cập microphone để ghi âm.');
            }
        });

        return () => {
            Speech.stop();
            if (isRecordingAudio && selectedAudio) {
                selectedAudio.stopAndUnloadAsync().catch((e) => console.error('Error unloading audio:', e));
            }
            Audio.setAudioModeAsync({ allowsRecordingIOS: false });
        };
    }, [currentUser, navigation]);

    useEffect(() => {
        if (!conversationId || !currentUser) return;
        {
            const socket = new SockJS(API_URL_WEBSOCKER);
            const stompClient = new Client({
                webSocketFactory: () => socket,
                reconnectDelay: 5000,
                heartbeatIncoming: 4000,
                heartbeatOutgoing: 4000,
                debug: (str) => console.log('[STOMP DEBUG]', str),
                onConnect: (frame) => {
                    console.log('✅ Connected via SockJS!');
                    stompClient.subscribe(`/topic/conversation/${conversationId}`, (message) => {
                        const newMessage = JSON.parse(message.body);
                        if (newMessage.receiverId === currentUser.id) {
                            setMessages((prev) => {
                                if (!prev.some((msg) => msg.id === newMessage.id)) {
                                    console.log('📥 Tin nhắn nhận từ server:', newMessage);
                                    return [...prev, newMessage];
                                }
                                return prev;
                            });
                        }
                        console.log('📤 Tin nhắn đã gửi:', newMessage);
                        console.log('📥 Tin nhắn nhận từ server:', newMessage);
                        if (flatListRef.current) {
                            flatListRef.current.scrollToEnd({ animated: true });
                        }
                        if (newMessage.receiverId === currentUser?.id && !newMessage.read) {
                            handleMarkAsRead(newMessage);
                        }
                    });
                },
                onStompError: (frame) => {
                    console.error('STOMP Error:', frame);
                    Alert.alert('Lỗi', 'Không thể kết nối WebSocket. Vui lòng thử lại.');
                },
                onWebSocketError: (event) => {
                    console.error('❌ WebSocket Error:', event);
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
    }, [conversationId, currentUser]);

    // Speak bot messages when added
    useEffect(() => {
        if (isTextToSpeechEnabled) {
            const lastMessage = messages[messages.length - 1];
            if (lastMessage && lastMessage.role === 'bot' && lastMessage.content) {
                Speech.stop(); // Stop previous speech to avoid overlap
                Speech.speak(lastMessage.content, {
                    language: 'vi-VN',
                    pitch: 1.0,
                    rate: 1.0,
                    onError: (error) => console.error('Speech error:', error),
                });
            }
        }
    }, [messages, isTextToSpeechEnabled]);

    const handleMarkAsRead = async (newMessage) => {
        if (newMessage.receiverId === currentUser?.id && !newMessage.read) {
            try {
                await CHAT_POST_PARAMS(`conversations/read/${conversationId}`, { userId: currentUser?.id });
            } catch (error) {
                console.error('❌ Failed to mark message as read:', error);
            }
        }
    };

    const fetchConversation = async (retryCount = 3) => {
        try {
            setLoading(true);
            const userId = currentUser?.id;
            const response = await CHAT_GET_ID('conversations/user', userId);
            if (response.status === 200) {
                setConversation(response.data?.data);
                setMessages(response.data?.data?.messages || []);
                setConversationId(response.data?.data?.id);
                if (response.data.data.unreadCount > 0) {
                    await CHAT_POST_PARAMS(`conversations/read/${conversationId}`, { userId: currentUser?.id });
                }
            } else {
                const createResponse = await createNewConversation(retryCount);
                if (createResponse.status === 200) {
                    setConversation(createResponse.data?.data);
                    setMessages(createResponse.data?.data?.messages);
                    setConversationId(createResponse.data?.data?.id);
                } else {
                    throw new Error('Không thể tạo cuộc trò chuyện mới');
                }
            }
        } catch (error) {
            console.error('Error fetching conversation:', error);
        } finally {
            setLoading(false);
        }
    };

    const createNewConversation = async (retryCount = 3) => {
        const formData = {
            userId: currentUser?.id,
            userName: currentUser?.fullName,
            userAvatar: currentUser?.profileImageUrl,
        };
        try {
            const createResponse = await CHAT_POST_ADD('conversations', formData);
            if (createResponse.status === 200) {
                return createResponse;
            } else {
                throw new Error('API failed to create conversation');
            }
        } catch (error) {
            if (retryCount > 0) {
                console.log(`Retrying create conversation... (${retryCount} attempts left)`);
                await new Promise((resolve) => setTimeout(resolve, 2000));
                return createNewConversation(retryCount - 1);
            } else {
                throw error;
            }
        }
    };

    const containsKeyword = (input, keywords) => {
        return keywords.some((keyword) => input.includes(keyword));
    };

    const handleChatbotResponse = async (messageText) => {
        const lowerInput = messageText.toLowerCase();
        let responseContent = '';
        let productList = null;

        const getStatusText = (status) => {
            switch (status) {
                case "PENDING":
                    return "Đang xử lý";
                case "CONFIRMED":
                    return "Đã xác nhận";
                case "SHIPPED":
                    return "Đã giao hàng";
                case "DELIVERED":
                    return "Đã giao thành công";
                case "CANCELLED":
                    return "Đã hủy";
                default:
                    return "Không xác định";
            }
        };

        try {
            const res = await GET_ALL('products/colors');
            if (res.status !== 200) {
                throw new Error('Không thể lấy danh sách sản phẩm.');
            }

            const products = res.data.data.content;
            const greetingKeywords = ['chào', 'hi', 'hello', 'xin chào', 'chào bạn'];
            const productKeywords = ['bán gì', 'sản phẩm', 'mua gì', 'xem sản phẩm', 'có hàng gì', 'cửa hàng'];
            const cheapestKeywords = ['rẻ nhất', 'giá thấp nhất', 'giá rẻ', 'giảm giá'];
            const iphoneKeywords = ['iphone', 'mua iphone', 'iphone giá bao nhiêu'];
            const colorKeywords = ['màu sắc', 'màu', 'có màu gì'];
            const storeKeywords = [
                'cửa hàng', 'minh tuấn', 'minh tuấn mobile', 'giới thiệu', 'liên hệ',
                'về chúng tôi', 'địa chỉ', 'hotline', 'email', 'website', 'mạng xã hội',
                'tầm nhìn', 'sứ mệnh', 'giá trị'
            ];
            const infoKeywords = ['rl', 'retrieve info', 'thông tin cá nhân', 'hồ sơ', 'profile', 'tôi là ai'];
            const orderKeywords = ['order', 'đơn hàng', 'lịch sử đơn hàng', 'my orders'];
            const orderDetailKeywords = ['chi tiết đơn hàng', 'order detail', 'xem chi tiết'];

            if (containsKeyword(lowerInput, greetingKeywords)) {
                responseContent = '👋 **Chào bạn!** Tôi là bot chat của **Minh Tuấn Mobile**, chuỗi bán lẻ điện thoại, máy tính bảng, laptop và phụ kiện uy tín tại Việt Nam. Hỏi tôi về sản phẩm, giá cả, hoặc thông tin cửa hàng nhé! 😊';
            } else if (containsKeyword(lowerInput, productKeywords)) {
                productList = products.slice(0, 3).map((p) => ({
                    id: p.colorId,
                    name: p.name,
                    imageUrl: p.image || 'https://via.placeholder.com/200',
                    color: p.color,
                    storage: p.storage,
                    price: p.price === 0 ? p.originalPrice : p.price,
                    discount: p.discount === 100 ? null : p.discount,
                    stock: p.stock,
                }));
                responseContent = 'Cửa hàng chúng tôi bán các sản phẩm sau:\n\nBạn muốn xem thêm chi tiết sản phẩm nào?';
            } else if (containsKeyword(lowerInput, cheapestKeywords)) {
                const validProducts = products.filter((p) => p.price > 0).sort((a, b) => a.price - b.price);
                if (validProducts.length === 0) {
                    responseContent = 'Hiện tại không có sản phẩm nào đang giảm giá.';
                } else {
                    productList = validProducts.slice(0, 5).map((p) => ({
                        id: p.colorId,
                        name: p.name,
                        imageUrl: p.image || 'https://via.placeholder.com/200',
                        color: p.color,
                        storage: p.storage,
                        price: p.price,
                        discount: p.discount === 100 ? null : p.discount,
                        stock: p.stock,
                    }));
                    responseContent = 'Danh sách sản phẩm giá thấp nhất:';
                }
            } else if (containsKeyword(lowerInput, iphoneKeywords)) {
                const iphones = products.filter((p) => p.name.toLowerCase().includes('iphone'));
                if (iphones.length === 0) {
                    responseContent = 'Hiện tại không có iPhone nào trong danh sách.';
                } else {
                    productList = iphones.map((p) => ({
                        id: p.colorId,
                        name: p.name,
                        imageUrl: p.image || 'https://via.placeholder.com/200',
                        color: p.color,
                        storage: p.storage,
                        price: p.price === 0 ? p.originalPrice : p.price,
                        discount: p.discount === 100 ? null : p.discount,
                        stock: p.stock,
                    }));
                    responseContent = 'Danh sách iPhone hiện có:';
                }
            } else if (containsKeyword(lowerInput, colorKeywords)) {
                const colorList = products.map((p) => `📱 ${p.name} - **Màu**: ${p.color}`).join('\n\n');
                responseContent = `Danh sách sản phẩm và màu sắc:\n\n${colorList}`;
            } else if (containsKeyword(lowerInput, storeKeywords)) {
                let storeResponse = ' **Về Minh Tuấn Mobile**\n\n';
                if (lowerInput.includes('giới thiệu') || lowerInput.includes('minh tuấn') || lowerInput.includes('về chúng tôi')) {
                    storeResponse += 'Minh Tuấn Mobile được thành lập vào năm 2010, là chuỗi cửa hàng bán lẻ điện thoại, máy tính bảng, laptop và phụ kiện uy tín tại Việt Nam. Với hơn 50 cửa hàng trên toàn quốc, chúng tôi mang đến sản phẩm chính hãng, giá cả cạnh tranh và dịch vụ tận tâm.\n\n**Slogan**: Uy tín tạo nên thương hiệu.';
                } else if (lowerInput.includes('liên hệ') || lowerInput.includes('địa chỉ') || lowerInput.includes('hotline') || lowerInput.includes('email') || lowerInput.includes('website')) {
                    storeResponse += 'Thông tin liên hệ:\n- **Địa chỉ**: 123 Đường Lê Lợi, Phường Bến Nghé, Quận 1, TP. Hồ Chí Minh\n- **Hotline**: 1800.1234 (Miễn phí)\n- **Email**: info@minhtuanmobile.com\n- **Website**: www.minhtuanmobile.com';
                } else if (lowerInput.includes('mạng xã hội')) {
                    storeResponse += 'Kết nối với chúng tôi trên mạng xã hội:\n- **Facebook**: https://facebook.com\n- **YouTube**: https://youtube.com\n- **Instagram**: https://instagram.com\n- **TikTok**: https://tiktok.com';
                } else if (lowerInput.includes('tầm nhìn') || lowerInput.includes('sứ mệnh')) {
                    storeResponse += '- **Tầm nhìn**: Trở thành nhà bán lẻ công nghệ hàng đầu Việt Nam, mang đến trải nghiệm mua sắm tuyệt vời.\n- **Sứ mệnh**: Cung cấp sản phẩm chính hãng với giá tốt nhất, dịch vụ chuyên nghiệp và hậu mãi chu đáo.';
                } else if (lowerInput.includes('giá trị')) {
                    storeResponse += 'Giá trị cốt lõi:\n- **Uy tín**: Đặt chất lượng và niềm tin lên hàng đầu.\n- **Chất lượng**: Cam kết sản phẩm chính hãng.\n- **Tận tâm**: Phục vụ khách hàng với sự chu đáo.\n- **Phát triển**: Không ngừng cải tiến để đáp ứng nhu cầu.';
                } else {
                    storeResponse += 'Minh Tuấn Mobile là chuỗi bán lẻ uy tín với hơn 50 cửa hàng trên toàn quốc. Hãy hỏi thêm về sản phẩm, liên hệ, hoặc giá trị của chúng tôi!';
                }
                responseContent = storeResponse;
            } else if (containsKeyword(lowerInput, infoKeywords)) {
                if (!token) {
                    responseContent = 'Vui lòng đăng nhập để xem thông tin cá nhân. Bạn có thể đăng nhập qua màn hình đăng nhập.';
                } else {
                    try {
                        const apiResponse = await GET_TOKEN("customer", token);
                        if (apiResponse.status === 200) {
                            const customerData = apiResponse.data.data;
                            responseContent = `**Thông tin cá nhân**:\n\n` +
                                `- **Họ tên**: ${customerData.fullName}\n` +
                                `- **Email**: ${customerData.email}\n` +
                                `- **Số điện thoại**: ${customerData.phone}\n` +
                                `- **Ảnh hồ sơ**: ${customerData.profileImageUrl}\n` +
                                `- **Vai trò**: ${customerData.role}\n` +
                                `- **Trạng thái**: ${customerData.status}\n` +
                                `- **Giới tính**: ${customerData.gender}\n` +
                                `- **Ngày sinh**: ${new Date(customerData.birthday).toLocaleDateString('vi-VN')}\n` +
                                `- **Lần đăng nhập cuối**: ${new Date(customerData.lastLoginDate).toLocaleString('vi-VN')}\n` +
                                `- **Ngày tạo**: ${new Date(customerData.createdAt).toLocaleString('vi-VN')}\n\n` +
                                `**Địa chỉ**:\n` +
                                customerData.addresses.map((addr, index) =>
                                    `- **Địa chỉ ${index + 1}**: ${addr.addressDetail}, ${addr.district}, ${addr.city}\n  **Tên người nhận**: ${addr.fullName}\n  **Số điện thoại**: ${addr.phone}\n  **Trạng thái**: ${addr.active ? 'Đang sử dụng' : 'Không sử dụng'}\n`
                                ).join('\n');
                        } else {
                            responseContent = 'Không thể lấy thông tin cá nhân. Vui lòng thử lại sau.';
                        }
                    } catch (error) {
                        console.error('Error fetching customer info:', error);
                        responseContent = 'Đã xảy ra lỗi khi lấy thông tin cá nhân. Vui lòng kiểm tra lại đăng nhập hoặc thử lại sau.';
                    }
                }
            } else if (containsKeyword(lowerInput, orderKeywords)) {
                if (!token) {
                    responseContent = 'Vui lòng đăng nhập để xem lịch sử đơn hàng. Bạn có thể đăng nhập qua màn hình đăng nhập.';
                } else {
                    try {
                        const response = await GET_TOKEN("user/my-orders", token);
                        if (response.status === 200) {
                            const orders = response.data.data;
                            if (orders.length === 0) {
                                responseContent = 'Bạn chưa có đơn hàng nào.';
                            } else {
                                responseContent = '**Lịch sử đơn hàng**:\n\n';
                                orders.forEach((order, index) => {
                                    responseContent += `- **Đơn hàng ${index + 1}** (Mã: ${order.orderCode})\n` +
                                        `  **Trạng thái**: ${getStatusText(order.orderStatus)}\n` +
                                        `  **Tổng tiền**: ${order.total.toLocaleString('vi-VN')} VND\n` +
                                        `  **Ngày đặt**: ${new Date(order.createdAt).toLocaleString('vi-VN')}\n` +
                                        `  **Sản phẩm**: ${order.items.map(item => `${item.name} (${item.quantity} x ${item.price.toLocaleString('vi-VN')} VND)`).join(', ')}\n\n`;
                                });
                                responseContent += 'Để xem chi tiết đơn hàng, hãy cung cấp mã đơn hàng (ví dụ: "chi tiết đơn hàng MT.8862D6").';
                            }
                        } else {
                            responseContent = 'Không thể lấy lịch sử đơn hàng. Vui lòng thử lại sau.';
                        }
                    } catch (error) {
                        console.error('Error fetching orders:', error);
                        responseContent = 'Đã xảy ra lỗi khi lấy lịch sử đơn hàng. Vui lòng thử lại sau.';
                    }
                }
            } else if (containsKeyword(lowerInput, orderDetailKeywords)) {
                if (!token) {
                    responseContent = 'Vui lòng đăng nhập để xem chi tiết đơn hàng. Bạn có thể đăng nhập qua màn hình đăng nhập.';
                } else {
                    const orderCodeMatch = lowerInput.match(/mt\.[a-z0-9]+/i);
                    const orderCode = orderCodeMatch ? orderCodeMatch[0].toUpperCase() : null;
                    if (!orderCode) {
                        responseContent = 'Vui lòng cung cấp mã đơn hàng để xem chi tiết (ví dụ: "chi tiết đơn hàng MT.8862D6").';
                    } else {
                        try {
                            const ordersResponse = await GET_TOKEN("user/my-orders", token);
                            if (ordersResponse.status !== 200) {
                                responseContent = 'Không thể tìm đơn hàng. Vui lòng thử lại sau.';
                                throw new Error('Failed to fetch orders');
                            }

                            const orders = ordersResponse.data.data;
                            const targetOrder = orders.find(order => order.orderCode === orderCode);

                            if (!targetOrder) {
                                responseContent = `Không tìm thấy đơn hàng với mã ${orderCode}. Vui lòng kiểm tra lại mã đơn hàng.`;
                            } else {
                                const orderResponse = await GET_TOKEN_ID("user/orders", targetOrder.id, token);
                                if (orderResponse.status === 200) {
                                    const order = orderResponse.data.data;
                                    responseContent = `**Chi tiết đơn hàng ${order.orderCode}**:\n\n` +
                                        `**Trạng thái**: ${getStatusText(order.orderStatus)}\n` +
                                        `**Ngày đặt**: ${new Date(order.createdAt).toLocaleString('vi-VN')}\n` +
                                        `**Ngày cập nhật**: ${new Date(order.updatedAt).toLocaleString('vi-VN')}\n\n` +
                                        `**Sản phẩm**:\n` +
                                        order.items.map((item, index) =>
                                            `- ${item.name} (${item.color || ''} ${item.storage || ''})\n` +
                                            `  Số lượng: ${item.quantity}\n` +
                                            `  Giá: ${item.price.toLocaleString('vi-VN')} VND\n` +
                                            `  Hình ảnh: ${item.imageUrl}\n`
                                        ).join('\n') + '\n' +
                                        `**Thông tin giao hàng**:\n` +
                                        `- Tên người nhận: ${order.shipping.fullName}\n` +
                                        `- Số điện thoại: ${order.shipping.phone}\n` +
                                        `- Địa chỉ: ${order.shipping.addressDetail}\n` +
                                        `- Phương thức: ${order.shipping.method}\n` +
                                        `- Phí vận chuyển: ${order.shipping.fee.toLocaleString('vi-VN')} VND\n\n` +
                                        `**Thông tin thanh toán**:\n` +
                                        `- Phương thức: ${order.payment.method}\n` +
                                        `- Trạng thái: ${order.payment.status}\n\n` +
                                        `**Tóm tắt đơn hàng**:\n` +
                                        `- Giảm giá: ${order.discount.toLocaleString('vi-VN')} VND\n` +
                                        `- Tổng tiền: ${order.total.toLocaleString('vi-VN')} VND\n` +
                                        `- Ghi chú: ${order.note || 'Không có'}\n`;
                                } else {
                                    responseContent = `Không thể lấy chi tiết đơn hàng ${orderCode}. Vui lòng thử lại sau.`;
                                }
                            }
                        } catch (error) {
                            console.error('Error fetching order details:', error);
                            responseContent = 'Đã xảy ra lỗi khi lấy chi tiết đơn hàng. Vui lòng thử lại sau.';
                        }
                    }
                }
            } else {
                const res = await axios.post(
                    'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=AIzaSyCwEv75jMbsy6XkAeAivJWu0XqnpxtoALc',
                    { contents: [{ parts: [{ text: messageText }] }] },
                    { headers: { 'Content-Type': 'application/json' } }
                );
                responseContent = res.data.candidates?.[0]?.content?.parts?.[0]?.text || 'Không có phản hồi.';
            }
        } catch (error) {
            console.error('Chatbot error:', error);
            responseContent = 'Đã có lỗi xảy ra. Vui lòng thử lại sau.';
        }

        setMessages((prev) => [
            ...prev,
            {
                role: 'bot',
                content: responseContent,
                products: productList,
                id: `bot_${Date.now()}`,
            },
        ]);
    };

    // Audio recording with expo-av
    const startAudioRecording = async () => {
        try {
            // Kiểm tra nếu đang ghi âm
            if (isRecordingAudio || selectedAudio) {
                console.log('Đang ghi âm hoặc có bản ghi âm chưa được giải phóng.');
                return;
            }

            const { granted } = await Audio.requestPermissionsAsync();
            if (!granted) {
                Alert.alert('Lỗi', 'Bạn cần cấp quyền truy cập microphone để ghi âm.');
                return;
            }

            await Audio.setAudioModeAsync({
                allowsRecordingIOS: true,
                playsInSilentModeIOS: true,
            });

            const { recording } = await Audio.Recording.createAsync(
                Audio.RECORDING_OPTIONS_PRESET_HIGH_QUALITY
            );
            setIsRecordingAudio(true);
            setSelectedAudio(recording); // Lưu đối tượng ghi âm
        } catch (e) {
            console.error('Error starting audio recording:', e);
            Alert.alert('Lỗi', 'Không thể bắt đầu ghi âm. Vui lòng thử lại.');
        }
    };

    const stopAudioRecording = async () => {
        try {
            if (selectedAudio && isRecordingAudio) {
                await selectedAudio.stopAndUnloadAsync();
                const uri = selectedAudio.getURI();
                setSelectedAudio(uri); // Lưu URI của bản ghi
                setIsRecordingAudio(false);
            } else {
                console.log('Không có bản ghi âm nào để dừng.');
            }
        } catch (e) {
            console.error('Error stopping audio recording:', e);
            Alert.alert('Lỗi', 'Không thể dừng ghi âm. Vui lòng thử lại.');
        } finally {
            // Đảm bảo trạng thái được đặt lại
            setIsRecordingAudio(false);
        }
    };
    const handleSendMessage = async () => {
        if (!currentUser || !conversationId) {
            Alert.alert('Thông báo', 'Không thể gửi tin nhắn vì thông tin người dùng hoặc cuộc trò chuyện không hợp lệ.');
            return;
        }
        if ((!messageText.trim() && !selectedImage && !selectedAudio) || sending) return;
        if (selectedAudio) {
            console.log("asssss", selectedAudio);
            return;
        }

        try {
            setSending(true);
            let uploadedImageUrl = null;
            let uploadedAudioUrl = null;

            if (selectedImage) {
                const shortText = messageText.substring(0, 10);
                const formData = new FormData();
                formData.append('file', {
                    uri: selectedImage,
                    name: `chat_${shortText}.jpg`,
                    type: 'image/jpeg',
                });

                const uploadResponse = await USER_POST_UPLOAD('public/chat/upload-image', formData, {
                    headers: { 'Content-Type': 'multipart/form-data' },
                });

                if (uploadResponse.status === 200) {
                    uploadedImageUrl = uploadResponse.data.data.data;
                } else {
                    throw new Error('Failed to upload image');
                }
            }

            if (selectedAudio && typeof selectedAudio === 'string') {
                const formData = new FormData();
                formData.append('file', {
                    uri: selectedAudio,
                    name: `chat_audio_${Date.now()}.m4a`,
                    type: 'audio/m4a',
                });

                const uploadResponse = await USER_POST_UPLOAD('public/chat/upload-audio', formData, {
                    headers: { 'Content-Type': 'multipart/form-data' },
                });

                if (uploadResponse.status === 200) {
                    uploadedAudioUrl = uploadResponse.data.data.data;
                } else {
                    throw new Error('Không thể tải lên âm thanh');
                }
            }
            const newUserMessage = {
                senderId: currentUser?.id,
                receiverId: isChatbotEnabled ? 'BOT' : 'ADMIN',
                content: messageText.trim(),
                timestamp: new Date().toISOString(),
                read: false,
                image: uploadedImageUrl,
                audio: uploadedAudioUrl,
                id: `temp_${Date.now()}`,
            };

            setMessages((prev) => [...prev, newUserMessage]);
            setMessageText('');
            setSelectedImage(null);
            setSelectedAudio(null);

            if (flatListRef.current) {
                flatListRef.current.scrollToEnd({ animated: true });
            }

            if (isChatbotEnabled) {
                await handleChatbotResponse(messageText);
            } else {
                if (client && client.connected) {
                    client.publish({
                        destination: `/app/chat/${conversationId}`,
                        body: JSON.stringify({
                            senderId: currentUser?.id,
                            receiverId: 'ADMIN',
                            content: messageText.trim(),
                            timestamp: null,
                            read: false,
                            image: uploadedImageUrl,
                            audio: uploadedAudioUrl,
                        }),
                    });
                } else {
                    const response = await CHAT_POST_ADD(`conversations/messages/${conversationId}`, {
                        senderId: currentUser?.id,
                        receiverId: 'ADMIN',
                        content: messageText.trim(),
                        timestamp: null,
                        read: false,
                        image: uploadedImageUrl,
                        audio: uploadedAudioUrl,
                    });
                    if (response.status === 200) {
                        setMessages((prev) => {
                            const updated = prev.filter((msg) => !msg.id.startsWith('temp_'));
                            return [...updated, response.data.data];
                        });
                    } else {
                        throw new Error('Không thể gửi tin nhắn');
                    }
                }
            }
        } catch (error) {
            console.error('Error sending message:', error);
            Alert.alert('Lỗi', 'Đã xảy ra lỗi khi gửi tin nhắn');
        } finally {
            setSending(false);
            setIsRecordingAudio(false); // Đặt lại trạng thái ghi âm nếu có lỗi
        }
    };

    const toggleChatMode = () => {
        setIsChatbotEnabled(!isChatbotEnabled);
        setMessages((prev) => [
            ...prev,
            {
                role: 'system',
                content: isChatbotEnabled ? 'Đã chuyển sang hỗ trợ nhân viên.' : 'Đã chuyển sang chế độ chatbot.',
                id: `system_${Date.now()}`,
            },
        ]);
    };

    const toggleTextToSpeech = () => {
        setIsTextToSpeechEnabled(!isTextToSpeechEnabled);
        if (isTextToSpeechEnabled) {
            Speech.stop();
        }
        setMessages((prev) => [
            ...prev,
            {
                role: 'system',
                content: isTextToSpeechEnabled ? 'Đã tắt đọc tin nhắn.' : 'Đã bật đọc tin nhắn.',
                id: `system_${Date.now()}`,
            },
        ]);
    };

    const pickImage = async () => {
        Alert.alert(
            'Chọn hình ảnh',
            'Bạn muốn chụp ảnh mới hay chọn từ thư viện?',
            [
                {
                    text: 'Chụp ảnh',
                    onPress: async () => {
                        try {
                            const cameraPermission = await ImagePicker.requestCameraPermissionsAsync();
                            if (!cameraPermission.granted) {
                                Alert.alert('Lỗi', 'Bạn cần cấp quyền truy cập camera để chụp ảnh.');
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
                            console.error('Error capturing photo:', error);
                            Alert.alert('Lỗi', 'Không thể chụp ảnh. Vui lòng thử lại.');
                        }
                    },
                },
                {
                    text: 'Chọn từ thư viện',
                    onPress: async () => {
                        try {
                            const libraryPermission = await ImagePicker.requestMediaLibraryPermissionsAsync();
                            if (!libraryPermission.granted) {
                                Alert.alert('Lỗi', 'Bạn cần cấp quyền truy cập thư viện ảnh.');
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
                            console.error('Error selecting image:', error);
                            Alert.alert('Lỗi', 'Không thể chọn hình ảnh. Vui lòng thử lại.');
                        }
                    },
                },
                { text: 'Hủy', style: 'cancel' },
            ],
            { cancelable: true }
        );
    };

    if (loading) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#e30019" />
                <Text style={styles.loadingText}>Đang tải cuộc trò chuyện...</Text>
            </View>
        );
    }

    return (
        <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
            <SafeAreaView style={styles.container}>
                <ChatHeader navigation={navigation} />
                <ChatMessages messages={messages} flatListRef={flatListRef} currentUser={currentUser} />
                <ChatInput
                    messageText={messageText}
                    setMessageText={setMessageText}
                    selectedImage={selectedImage}
                    setSelectedImage={setSelectedImage}
                    selectedAudio={selectedAudio}
                    setSelectedAudio={setSelectedAudio}
                    sending={sending}
                    handleSendMessage={handleSendMessage}
                    pickImage={pickImage}
                    startAudioRecording={startAudioRecording}
                    stopAudioRecording={stopAudioRecording}
                    isRecordingAudio={isRecordingAudio}
                    toggleChatMode={toggleChatMode}
                    toggleTextToSpeech={toggleTextToSpeech}
                    isChatbotEnabled={isChatbotEnabled}
                    isTextToSpeechEnabled={isTextToSpeechEnabled}
                />
            </SafeAreaView>
        </KeyboardAvoidingView>
    );
};

export default ChatScreen;

