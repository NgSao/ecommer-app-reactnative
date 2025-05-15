import { View, FlatList, Image, Text, StyleSheet } from "react-native"
import MessageItem from "./MessageItem"

const ChatMessages = ({ messages, flatListRef, currentUser }) => {
    const safeMessages = messages || [];



    return (
        <View style={styles.chatContainer}>
            {safeMessages.length === 0 ? (
                <View style={styles.emptyContainer}>
                    <Image
                        source={{ uri: "https://ui-avatars.com/api/?name=Admin&background=e30019&color=fff" }}
                        style={styles.emptyAvatar}
                    />
                    <Text style={styles.emptyTitle}>Chào mừng đến với Minh Tuấn Mobile</Text>
                    <Text style={styles.emptyText}>
                        Hãy gửi tin nhắn cho chúng tôi nếu bạn cần hỗ trợ về sản phẩm, đơn hàng hoặc bất kỳ thắc mắc nào khác.
                    </Text>
                </View>
            ) : (
                <FlatList
                    ref={flatListRef}
                    data={safeMessages}
                    renderItem={({ item }) => <MessageItem item={item} currentUser={currentUser} />}
                    keyExtractor={(item, index) => item.id || index.toString()}
                    contentContainerStyle={styles.messagesList}
                    onLayout={() => {
                        if (flatListRef.current && safeMessages.length > 0) {
                            flatListRef.current.scrollToEnd({ animated: false });
                        }
                    }}
                />
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    chatContainer: {
        flex: 1,
    },
    emptyContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: 20,
    },
    emptyAvatar: {
        width: 80,
        height: 80,
        borderRadius: 40,
        marginBottom: 20,
    },
    emptyTitle: {
        fontSize: 18,
        fontWeight: "bold",
        marginBottom: 10,
        textAlign: "center",
    },
    emptyText: {
        fontSize: 14,
        color: "#666",
        textAlign: "center",
        lineHeight: 20,
    },
    messagesList: {
        padding: 16,
        paddingBottom: 20,
    },
})

export default ChatMessages
