import { useState, useEffect, useRef } from "react"
import { Alert } from "react-native"
import { useNavigation, useRoute } from "@react-navigation/native"
import * as ImagePicker from "expo-image-picker"
import { chatApi } from '@service/apiChat';

const useAdminChatDetail = () => {
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

    useEffect(() => {
        fetchConversation()

        const intervalId = setInterval(fetchConversation, 5000)

        return () => clearInterval(intervalId)
    }, [conversationId])

    const fetchConversation = async () => {
        try {
            setLoading(true)
            const response = await chatApi.getConversationById(conversationId)

            if (response.success) {
                setConversation(response.data)
                setMessages(response.data.messages)

                if (response.data.unreadCount > 0) {
                    await chatApi.markConversationAsRead(conversationId, "admin")
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
            setSending(true)

            const newMessage = {
                senderId: "admin",
                receiverId: conversation.userId,
                content: messageText.trim(),
                timestamp: new Date().toISOString(),
                read: false,
                image: selectedImage,
            }

            const response = await chatApi.sendMessage(conversationId, newMessage)

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
        sending,
        conversation,
        messages,
        messageText,
        setMessageText,
        selectedImage,
        setSelectedImage,
        handleSendMessage,
        pickImage,
        formatTime,
    }
}

export default useAdminChatDetail