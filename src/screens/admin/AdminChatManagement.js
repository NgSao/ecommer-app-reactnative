
import { View, Text, FlatList, ActivityIndicator } from "react-native"

import styles from "../../styles/AdminChatManagementStyles"
import useAdminChatManagement from "@hooks/useAdminChatManagement"
import AdminHeader from "@components/admin/AdminHeader"
import SearchBar from "@components/admin/product/SearchBar"
import StatsHeader from "@components/admin/chat/StatsHeader"
import ConversationItem from "@components/admin/chat/ConversationItem"
import EmptyList from "@components/admin/chat/EmptyList"
import { SafeAreaView } from "react-native"

const AdminChatManagement = () => {
    const {
        loading,
        conversations,
        filteredConversations,
        searchQuery,
        setSearchQuery,
        fetchConversations,
        handleOpenChat,
        formatTime,
    } = useAdminChatManagement()

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
                            <ConversationItem item={item} handleOpenChat={handleOpenChat} formatTime={formatTime} />
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