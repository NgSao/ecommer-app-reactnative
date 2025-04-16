import { useState, useEffect } from "react"
import { Alert } from "react-native"
import { useNavigation } from "@react-navigation/native"
import { chatApi } from '@service/apiChat';

const useAdminChatManagement = () => {
    const navigation = useNavigation()
    const [loading, setLoading] = useState(true)
    const [conversations, setConversations] = useState([])
    const [filteredConversations, setFilteredConversations] = useState([])
    const [searchQuery, setSearchQuery] = useState("")

    useEffect(() => {
        fetchConversations()

        const intervalId = setInterval(fetchConversations, 10000)

        return () => clearInterval(intervalId)
    }, [])

    useEffect(() => {
        if (searchQuery.trim() === "") {
            setFilteredConversations(conversations)
        } else {
            const query = searchQuery.toLowerCase()
            const filtered = conversations.filter((conv) => conv.userName.toLowerCase().includes(query))
            setFilteredConversations(filtered)
        }
    }, [searchQuery, conversations])

    const fetchConversations = async () => {
        try {
            setLoading(true)
            const response = await chatApi.getAllConversations()

            if (response.success) {
                setConversations(response.data)
                setFilteredConversations(response.data)
            } else {
                Alert.alert("Lỗi", "Không thể tải danh sách cuộc trò chuyện")
            }
        } catch (error) {
            console.error("Error fetching conversations:", error)
            Alert.alert("Lỗi", "Đã xảy ra lỗi khi tải danh sách cuộc trò chuyện")
        } finally {
            setLoading(false)
        }
    }

    const handleOpenChat = (conversation) => {
        navigation.navigate("AdminChatDetail", { conversationId: conversation.id })
    }

    const formatTime = (timestamp) => {
        const now = new Date()
        const messageDate = new Date(timestamp)

        if (
            messageDate.getDate() === now.getDate() &&
            messageDate.getMonth() === now.getMonth() &&
            messageDate.getFullYear() === now.getFullYear()
        ) {
            const hours = messageDate.getHours().toString().padStart(2, "0")
            const minutes = messageDate.getMinutes().toString().padStart(2, "0")
            return `${hours}:${minutes}`
        }

        const yesterday = new Date(now)
        yesterday.setDate(now.getDate() - 1)
        if (
            messageDate.getDate() === yesterday.getDate() &&
            messageDate.getMonth() === yesterday.getMonth() &&
            messageDate.getFullYear() === yesterday.getFullYear()
        ) {
            return "Hôm qua"
        }

        const dayNames = ["CN", "T2", "T3", "T4", "T5", "T6", "T7"]
        const dayDiff = Math.floor((now - messageDate) / (1000 * 60 * 60 * 24))
        if (dayDiff < 7) {
            return dayNames[messageDate.getDay()]
        }

        const day = messageDate.getDate().toString().padStart(2, "0")
        const month = (messageDate.getMonth() + 1).toString().padStart(2, "0")
        return `${day}/${month}`
    }

    return {
        loading,
        conversations,
        filteredConversations,
        searchQuery,
        setSearchQuery,
        fetchConversations,
        handleOpenChat,
        formatTime,
    }
}

export default useAdminChatManagement