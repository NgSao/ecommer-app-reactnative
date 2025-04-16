import { View, Text, FlatList, ActivityIndicator, SafeAreaView } from "react-native"

import styles from "../../styles/AdminChatDetailStyles"
import useAdminChatDetail from "@hooks/useAdminChatDetail"
import AdminHeader from "@components/admin/AdminHeader"
import EmptyChat from "@components/admin/chat/EmptyChat"
import MessageItem from "@components/admin/chat/MessageItem"
import ChatInput from "@components/admin/chat/ChatInput"

const AdminChatDetail = () => {
    const {
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
    } = useAdminChatDetail()

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
                            <MessageItem item={item} conversation={conversation} formatTime={formatTime} />
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