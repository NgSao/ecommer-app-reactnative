import { useState, useEffect, useRef } from "react"
import { useNavigation, useRoute } from "@react-navigation/native"
import { Alert } from "react-native"
import { useAuth } from "@contexts/AuthContext"
import * as ImagePicker from "expo-image-picker"
import { chatApi } from "@service/apiChat"

const useChat = () => {
    const navigation = useNavigation()
    const route = useRoute()
    const { user, updateUser } = useAuth() // Thêm updateUser từ AuthContext để cập nhật thông tin người dùng
    const flatListRef = useRef(null)

    const [loading, setLoading] = useState(true)
    const [sending, setSending] = useState(false)
    const [conversation, setConversation] = useState(null)
    const [messages, setMessages] = useState([])
    const [messageText, setMessageText] = useState("")
    const [selectedImage, setSelectedImage] = useState(null)
    const [conversationId, setConversationId] = useState(null) // Lưu id của cuộc trò chuyện

    useEffect(() => {
        fetchConversation()
        navigation.setOptions({ title: "Hỗ trợ trực tuyến" })
        const intervalId = setInterval(fetchConversation, 10000)
        return () => clearInterval(intervalId)
    }, [])

    const fetchConversation = async (retryCount = 3) => {
        try {
            setLoading(true)
            const response = await chatApi.getConversationByUserId(user.id)
            if (response.success) {
                setConversation(response.data)
                setMessages(response.data.messages)
                setConversationId(response.data.id) // Lưu id của cuộc trò chuyện
                if (response.data.unreadCount > 0) {
                    await chatApi.markConversationAsRead(response.data.id, user.id)
                }
            } else {
                // Nếu không tìm thấy cuộc trò chuyện, tạo mới
                const createResponse = await createNewConversation(retryCount)
                if (createResponse.success) {
                    setConversation(createResponse.data)
                    setMessages(createResponse.data.messages)
                    setConversationId(createResponse.data.id) // Lưu id của cuộc trò chuyện mới
                    // Cập nhật thông tin người dùng nếu cần (giả sử API trả về thông tin user mới)
                    if (createResponse.data.user) {
                        updateUser({ ...user, ...createResponse.data.user })
                    }
                } else {
                    throw new Error("Không thể tạo cuộc trò chuyện mới")
                }
            }
        } catch (error) {
            console.error("Error fetching conversation:", error)
            if (retryCount > 0) {
                console.log(`Retrying... (${retryCount} attempts left)`)
                setTimeout(() => fetchConversation(retryCount - 1), 2000) // Thử lại sau 2 giây
            } else {
                Alert.alert(
                    "Lỗi",
                    "Đã xảy ra lỗi khi tải cuộc trò chuyện. Bạn có muốn thử lại?",
                    [
                        { text: "Hủy", style: "cancel", onPress: () => navigation.goBack() },
                        { text: "Thử lại", onPress: () => fetchConversation(3) },
                    ]
                )
            }
        } finally {
            setLoading(false)
        }
    }

    const createNewConversation = async (retryCount = 3) => {
        try {
            const createResponse = await chatApi.createConversation(user.id, user.name, user.avatar)
            if (createResponse.success) {
                return createResponse
            } else {
                throw new Error("API failed to create conversation")
            }
        } catch (error) {
            if (retryCount > 0) {
                console.log(`Retrying create conversation... (${retryCount} attempts left)`)
                await new Promise((resolve) => setTimeout(resolve, 2000)) // Đợi 2 giây trước khi thử lại
                return createNewConversation(retryCount - 1)
            } else {
                throw error
            }
        }
    }

    const handleSendMessage = async () => {
        if ((!messageText.trim() && !selectedImage) || sending) return
        try {
            setSending(true)
            const newMessage = {
                senderId: user.id,
                receiverId: "admin",
                content: messageText.trim(),
                timestamp: new Date().toISOString(),
                read: false,
                image: selectedImage,
            }
            const response = await chatApi.sendMessage(conversationId, newMessage) // Sử dụng conversationId đã lưu
            if (response.success) {
                setMessages([...messages, response.data])
                setMessageText("")
                setSelectedImage(null)
                if (flatListRef.current) {
                    flatListRef.current.scrollToEnd({ animated: true })
                }
            } else {
                Alert.alert("Lỗi", "Không thể gửi tin nhắn")
            }
        } catch (error) {
            console.error("Error sending message:", error)
            Alert.alert("Lỗi", "Đã xảy ra lỗi khi gửi tin nhắn")
        } finally {
            setSending(false)
        }
    }

    const pickImage = async () => {
        try {
            const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync()
            if (permissionResult.granted === false) {
                Alert.alert("Cần quyền truy cập", "Bạn cần cấp quyền truy cập thư viện ảnh để chọn ảnh.")
                return
            }
            const result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                allowsEditing: true,
                aspect: [4, 3],
                quality: 0.8,
            })
            if (!result.canceled) {
                setSelectedImage(result.assets[0].uri)
            }
        } catch (error) {
            console.error("Error picking image:", error)
            Alert.alert("Lỗi", "Không thể chọn ảnh. Vui lòng thử lại sau.")
        }
    }

    const formatTime = (timestamp) => {
        const date = new Date(timestamp)
        const hours = date.getHours().toString().padStart(2, "0")
        const minutes = date.getMinutes().toString().padStart(2, "0")
        return `${hours}:${minutes}`
    }

    return {
        navigation,
        flatListRef,
        loading,
        messages,
        messageText,
        setMessageText,
        selectedImage,
        setSelectedImage,
        sending,
        handleSendMessage,
        pickImage,
        formatTime,
        conversationId, // Trả về conversationId để sử dụng nếu cần
    }
}

export default useChat