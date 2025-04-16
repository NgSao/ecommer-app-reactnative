import AsyncStorage from "@react-native-async-storage/async-storage"

// Dữ liệu mẫu cho cuộc trò chuyện
const mockConversations = {
    conv1: {
        id: "conv1",
        userId: "user1",
        userName: "Nguyễn Văn A",
        userAvatar: "https://ui-avatars.com/api/?name=Nguyen+Van+A&background=random",
        lastMessage: "Cảm ơn shop đã tư vấn giúp em",
        lastMessageTime: "2025-03-20T10:30:00Z",
        unreadCount: 0,
        messages: [
            {
                id: "msg1",
                senderId: "admin",
                receiverId: "user1",
                content: "Chào anh/chị, Minh Tuấn Mobile có thể giúp gì cho anh/chị ạ?",
                timestamp: "2025-03-20T09:00:00Z",
                read: true,
            },
            {
                id: "msg2",
                senderId: "user1",
                receiverId: "admin",
                content: "Chào shop, em muốn hỏi về iPhone 15 Pro Max, hiện tại còn hàng màu titan tự nhiên không ạ?",
                timestamp: "2025-03-20T09:05:00Z",
                read: true,
            },
            {
                id: "msg3",
                senderId: "admin",
                receiverId: "user1",
                content: "Dạ shop còn hàng iPhone 15 Pro Max màu titan tự nhiên bản 256GB ạ. Anh/chị có nhu cầu mua không ạ?",
                timestamp: "2025-03-20T09:10:00Z",
                read: true,
            },
            {
                id: "msg4",
                senderId: "user1",
                receiverId: "admin",
                content: "Dạ em muốn mua. Giá hiện tại là bao nhiêu vậy shop?",
                timestamp: "2025-03-20T09:15:00Z",
                read: true,
            },
            {
                id: "msg5",
                senderId: "admin",
                receiverId: "user1",
                content:
                    "Dạ iPhone 15 Pro Max 256GB màu titan tự nhiên hiện đang có giá 29.990.000đ ạ. Hiện shop đang có chương trình giảm 2 triệu khi thanh toán qua VNPay và tặng kèm ốp lưng chính hãng trị giá 550.000đ.",
                timestamp: "2025-03-20T09:20:00Z",
                read: true,
            },
            {
                id: "msg6",
                senderId: "user1",
                receiverId: "admin",
                content: "Cảm ơn shop đã tư vấn giúp em",
                timestamp: "2025-03-20T10:30:00Z",
                read: true,
            },
        ],
    },
    conv2: {
        id: "conv2",
        userId: "user2",
        userName: "Trần Thị B",
        userAvatar: "https://ui-avatars.com/api/?name=Tran+Thi+B&background=random",
        lastMessage: "Dạ vâng, em sẽ mang máy đến cửa hàng",
        lastMessageTime: "2025-03-19T16:45:00Z",
        unreadCount: 2,
        messages: [
            {
                id: "msg7",
                senderId: "user2",
                receiverId: "admin",
                content:
                    "Chào shop, máy iPhone 13 của em bị lỗi camera, không thể lấy nét được. Em mua tại shop cách đây 5 tháng, còn bảo hành không ạ?",
                timestamp: "2025-03-19T15:30:00Z",
                read: true,
            },
            {
                id: "msg8",
                senderId: "admin",
                receiverId: "user2",
                content:
                    "Chào chị, iPhone 13 của chị vẫn còn trong thời gian bảo hành 12 tháng ạ. Chị có thể mang máy đến cửa hàng để nhân viên kỹ thuật kiểm tra và xử lý ạ.",
                timestamp: "2025-03-19T15:35:00Z",
                read: true,
            },
            {
                id: "msg9",
                senderId: "user2",
                receiverId: "admin",
                content: "Em cần mang theo những gì ạ?",
                timestamp: "2025-03-19T15:40:00Z",
                read: true,
            },
            {
                id: "msg10",
                senderId: "admin",
                receiverId: "user2",
                content:
                    "Chị chỉ cần mang theo máy và hóa đơn mua hàng (nếu có) ạ. Nếu không có hóa đơn, chúng tôi có thể kiểm tra bằng số IMEI của máy.",
                timestamp: "2025-03-19T15:45:00Z",
                read: true,
            },
            {
                id: "msg11",
                senderId: "user2",
                receiverId: "admin",
                content: "Dạ vâng, em sẽ mang máy đến cửa hàng",
                timestamp: "2025-03-19T16:45:00Z",
                read: false,
            },
        ],
    },
    conv3: {
        id: "conv3",
        userId: "user3",
        userName: "Lê Văn C",
        userAvatar: "https://ui-avatars.com/api/?name=Le+Van+C&background=random",
        lastMessage: "Cảm ơn shop nhiều",
        lastMessageTime: "2025-03-18T14:20:00Z",
        unreadCount: 1,
        messages: [
            {
                id: "msg12",
                senderId: "user3",
                receiverId: "admin",
                content: "Shop ơi, em đặt đơn hàng #MT12345 từ hôm qua mà sao chưa thấy giao vậy?",
                timestamp: "2025-03-18T13:00:00Z",
                read: true,
            },
            {
                id: "msg13",
                senderId: "admin",
                receiverId: "user3",
                content: "Chào anh, để em kiểm tra đơn hàng giúp anh. Anh đợi em một chút nhé.",
                timestamp: "2025-03-18T13:05:00Z",
                read: true,
            },
            {
                id: "msg14",
                senderId: "admin",
                receiverId: "user3",
                content:
                    "Dạ em đã kiểm tra, đơn hàng của anh đã được đóng gói và bàn giao cho đơn vị vận chuyển rồi ạ. Dự kiến ngày mai sẽ đến tay anh. Anh có thể theo dõi đơn hàng qua mã vận đơn: SPXVN123456789",
                timestamp: "2025-03-18T13:10:00Z",
                read: true,
            },
            {
                id: "msg15",
                senderId: "user3",
                receiverId: "admin",
                content: "Cảm ơn shop nhiều",
                timestamp: "2025-03-18T14:20:00Z",
                read: false,
            },
        ],
    },
}

// Khởi tạo dữ liệu chat
const initChatData = async () => {
    try {
        const existingData = await AsyncStorage.getItem("chat_conversations")
        if (!existingData) {
            await AsyncStorage.setItem("chat_conversations", JSON.stringify(mockConversations))
        }
    } catch (error) {
        console.error("Error initializing chat data:", error)
    }
}

// Khởi tạo dữ liệu khi app khởi động
initChatData()

// API cho chức năng chat
export const chatApi = {
    // Lấy tất cả cuộc trò chuyện
    getAllConversations: async () => {
        try {
            const conversationsData = await AsyncStorage.getItem("chat_conversations")
            if (!conversationsData) {
                return { success: false, error: "Không tìm thấy dữ liệu cuộc trò chuyện" }
            }

            const conversations = JSON.parse(conversationsData)

            // Chuyển đổi từ object sang array
            const conversationsArray = Object.values(conversations)

            // Sắp xếp theo thời gian tin nhắn cuối cùng (mới nhất lên đầu)
            conversationsArray.sort((a, b) => {
                return new Date(b.lastMessageTime).getTime() - new Date(a.lastMessageTime).getTime()
            })

            return {
                success: true,
                data: conversationsArray,
            }
        } catch (error) {
            console.error("Error fetching conversations:", error)
            return { success: false, error: "Lỗi khi lấy dữ liệu cuộc trò chuyện" }
        }
    },

    // Lấy cuộc trò chuyện theo ID
    getConversationById: async (conversationId) => {
        try {
            const conversationsData = await AsyncStorage.getItem("chat_conversations")
            if (!conversationsData) {
                return { success: false, error: "Không tìm thấy dữ liệu cuộc trò chuyện" }
            }

            const conversations = JSON.parse(conversationsData)

            if (!conversations[conversationId]) {
                return { success: false, error: "Không tìm thấy cuộc trò chuyện" }
            }

            return {
                success: true,
                data: conversations[conversationId],
            }
        } catch (error) {
            console.error("Error fetching conversation:", error)
            return { success: false, error: "Lỗi khi lấy dữ liệu cuộc trò chuyện" }
        }
    },

    // Lấy cuộc trò chuyện theo ID người dùng
    getConversationByUserId: async (userId) => {
        try {
            const conversationsData = await AsyncStorage.getItem("chat_conversations")
            if (!conversationsData) {
                return { success: false, error: "Không tìm thấy dữ liệu cuộc trò chuyện" }
            }

            const conversations = JSON.parse(conversationsData)

            // Tìm cuộc trò chuyện theo userId
            const conversation = Object.values(conversations).find((conv) => conv.userId === userId)

            if (!conversation) {
                // Nếu không tìm thấy, tạo cuộc trò chuyện mới
                const newConversation = {
                    id: `conv_${Date.now()}`,
                    userId: userId,
                    userName: "Khách hàng mới", // Sẽ cập nhật sau
                    lastMessage: "",
                    lastMessageTime: new Date().toISOString(),
                    unreadCount: 0,
                    messages: [],
                }

                // Lưu cuộc trò chuyện mới
                conversations[newConversation.id] = newConversation
                await AsyncStorage.setItem("chat_conversations", JSON.stringify(conversations))

                return {
                    success: true,
                    data: newConversation,
                }
            }

            return {
                success: true,
                data: conversation,
            }
        } catch (error) {
            console.error("Error fetching conversation by user:", error)
            return { success: false, error: "Lỗi khi lấy dữ liệu cuộc trò chuyện" }
        }
    },

    // Gửi tin nhắn mới
    sendMessage: async (conversationId, message) => {
        try {
            const conversationsData = await AsyncStorage.getItem("chat_conversations")
            if (!conversationsData) {
                return { success: false, error: "Không tìm thấy dữ liệu cuộc trò chuyện" }
            }

            const conversations = JSON.parse(conversationsData)

            if (!conversations[conversationId]) {
                return { success: false, error: "Không tìm thấy cuộc trò chuyện" }
            }

            // Tạo ID cho tin nhắn mới
            const newMessageId = `msg_${Date.now()}`

            // Tạo tin nhắn mới
            const newMessage = {
                id: newMessageId,
                ...message,
            }

            // Thêm tin nhắn vào cuộc trò chuyện
            conversations[conversationId].messages.push(newMessage)

            // Cập nhật thông tin cuộc trò chuyện
            conversations[conversationId].lastMessage = message.content
            conversations[conversationId].lastMessageTime = message.timestamp

            // Cập nhật số tin nhắn chưa đọc
            if (message.senderId === "admin") {
                // Nếu admin gửi, tăng số tin nhắn chưa đọc của người dùng
                conversations[conversationId].unreadCount += 1
            } else {
                // Nếu người dùng gửi, đánh dấu là đã đọc (vì admin đang xem)
                conversations[conversationId].unreadCount = 0
            }

            // Lưu dữ liệu đã cập nhật
            await AsyncStorage.setItem("chat_conversations", JSON.stringify(conversations))

            return {
                success: true,
                data: newMessage,
            }
        } catch (error) {
            console.error("Error sending message:", error)
            return { success: false, error: "Lỗi khi gửi tin nhắn" }
        }
    },

    // Đánh dấu tin nhắn đã đọc
    markConversationAsRead: async (conversationId, userId) => {
        try {
            const conversationsData = await AsyncStorage.getItem("chat_conversations")
            if (!conversationsData) {
                return { success: false, error: "Không tìm thấy dữ liệu cuộc trò chuyện" }
            }

            const conversations = JSON.parse(conversationsData)

            if (!conversations[conversationId]) {
                return { success: false, error: "Không tìm thấy cuộc trò chuyện" }
            }

            // Đánh dấu tất cả tin nhắn là đã đọc
            conversations[conversationId].messages.forEach((msg) => {
                if (msg.receiverId === userId) {
                    msg.read = true
                }
            })

            // Đặt lại số tin nhắn chưa đọc
            conversations[conversationId].unreadCount = 0

            // Lưu dữ liệu đã cập nhật
            await AsyncStorage.setItem("chat_conversations", JSON.stringify(conversations))

            return { success: true }
        } catch (error) {
            console.error("Error marking conversation as read:", error)
            return { success: false, error: "Lỗi khi đánh dấu tin nhắn đã đọc" }
        }
    },

    // Tạo cuộc trò chuyện mới
    createConversation: async (userId, userName, userAvatar) => {
        try {
            const conversationsData = await AsyncStorage.getItem("chat_conversations")
            if (!conversationsData) {
                return { success: false, error: "Không tìm thấy dữ liệu cuộc trò chuyện" }
            }

            const conversations = JSON.parse(conversationsData)

            // Kiểm tra xem người dùng đã có cuộc trò chuyện chưa
            const existingConversation = Object.values(conversations).find((conv) => conv.userId === userId)

            if (existingConversation) {
                return {
                    success: true,
                    data: existingConversation,
                    message: "Cuộc trò chuyện đã tồn tại",
                }
            }

            // Tạo cuộc trò chuyện mới
            const newConversationId = `conv_${Date.now()}`
            const newConversation = {
                id: newConversationId,
                userId,
                userName,
                userAvatar,
                lastMessage: "",
                lastMessageTime: new Date().toISOString(),
                unreadCount: 0,
                messages: [],
            }

            // Thêm cuộc trò chuyện mới
            conversations[newConversationId] = newConversation

            // Lưu dữ liệu đã cập nhật
            await AsyncStorage.setItem("chat_conversations", JSON.stringify(conversations))

            return {
                success: true,
                data: newConversation,
            }
        } catch (error) {
            console.error("Error creating conversation:", error)
            return { success: false, error: "Lỗi khi tạo cuộc trò chuyện mới" }
        }
    },

    // Lấy tổng số tin nhắn chưa đọc
    getTotalUnreadMessages: async (userId) => {
        try {
            const conversationsData = await AsyncStorage.getItem("chat_conversations")
            if (!conversationsData) {
                return { success: false, error: "Không tìm thấy dữ liệu cuộc trò chuyện" }
            }

            const conversations = JSON.parse(conversationsData)

            // Tính tổng số tin nhắn chưa đọc
            let totalUnread = 0

            if (userId === "admin") {
                // Nếu là admin, đếm tất cả tin nhắn chưa đọc từ người dùng
                Object.values(conversations).forEach((conv) => {
                    conv.messages.forEach((msg) => {
                        if (msg.receiverId === "admin" && !msg.read) {
                            totalUnread++
                        }
                    })
                })
            } else {
                // Nếu là người dùng, đếm tin nhắn chưa đọc từ admin
                Object.values(conversations).forEach((conv) => {
                    if (conv.userId === userId) {
                        conv.messages.forEach((msg) => {
                            if (msg.receiverId === userId && !msg.read) {
                                totalUnread++
                            }
                        })
                    }
                })
            }

            return {
                success: true,
                data: totalUnread,
            }
        } catch (error) {
            console.error("Error getting unread messages count:", error)
            return { success: false, error: "Lỗi khi lấy số tin nhắn chưa đọc" }
        }
    },
}

