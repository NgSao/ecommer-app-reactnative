
import { View, Text, FlatList, ActivityIndicator } from "react-native"

import styles from "../../styles/AdminChatManagementStyles"
import AdminHeader from "@components/admin/AdminHeader"
import SearchBar from "@components/admin/product/SearchBar"
import StatsHeader from "@components/admin/chat/StatsHeader"
import ConversationItem from "@components/admin/chat/ConversationItem"
import EmptyList from "@components/admin/chat/EmptyList"
import { useState, useEffect } from "react"
import { Alert } from "react-native"
import { useNavigation } from "@react-navigation/native"
import { CHAT_GET_ALL } from 'api/apiService';
import { SafeAreaView } from "react-native-safe-area-context"


const AdminChatManagement = () => {
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
            const response = await CHAT_GET_ALL("conversations");
            if (response.status === 200) {
                setConversations(response.data.data)
                setFilteredConversations(response.data.data)
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



    return (
        <SafeAreaView style={styles.container}>
            <AdminHeader title="Quản lý tin nhắn" />

            <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />

            {loading && conversations.length === 0 ? (
                <View style={styles.loadingContainer}>
                    <ActivityIndicator size="large" color="#e30019" />
                    <Text style={styles.loadingText}>Đang tải danh sách cuộc trò chuyện...</Text>
                </View>
            ) : (
                <>
                    <StatsHeader filteredConversations={filteredConversations} fetchConversations={fetchConversations} />

                    <FlatList
                        data={filteredConversations}
                        renderItem={({ item }) => (
                            <ConversationItem item={item} handleOpenChat={handleOpenChat} />
                        )}
                        keyExtractor={(item) => item.id}
                        contentContainerStyle={styles.conversationsList}
                        refreshing={loading}
                        onRefresh={fetchConversations}
                        ListEmptyComponent={<EmptyList />}
                    />
                </>
            )}
        </SafeAreaView>
    )
}

export default AdminChatManagement