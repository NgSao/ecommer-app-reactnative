import { formatDateFull } from "@utils/formatUtils"
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native"

const ConversationItem = ({ item, handleOpenChat }) => {
    return (
        <TouchableOpacity style={styles.conversationItem} onPress={() => handleOpenChat(item)}>
            <View style={styles.avatarContainer}>
                <Image
                    source={{
                        uri:
                            item.userAvatar ||
                            `https://ui-avatars.com/api/?name=${encodeURIComponent(item.userName)}&background=random`,
                    }}
                    style={styles.avatar}
                />
                {item.unreadCount > 0 && (
                    <View style={styles.unreadBadge}>
                        <Text style={styles.unreadBadgeText}>{item.unreadCount}</Text>
                    </View>
                )}
            </View>

            <View style={styles.conversationInfo}>
                <View style={styles.conversationHeader}>
                    <Text style={styles.userName}>{item.userName}</Text>
                    <Text style={styles.messageTime}>{formatDateFull(item.lastMessageTime)}</Text>
                </View>

                <Text style={[styles.lastMessage, item.unreadCount > 0 && styles.unreadMessage]} numberOfLines={1}>
                    {item.lastMessage || "Bắt đầu cuộc trò chuyện"}
                </Text>
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    conversationItem: {
        flexDirection: "row",
        backgroundColor: "#fff",
        borderRadius: 8,
        padding: 12,
        marginBottom: 8,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        elevation: 2,
    },
    avatarContainer: {
        position: "relative",
        marginRight: 12,
    },
    avatar: {
        width: 50,
        height: 50,
        borderRadius: 25,
    },
    unreadBadge: {
        position: "absolute",
        top: -5,
        right: -5,
        backgroundColor: "#e30019",
        width: 20,
        height: 20,
        borderRadius: 10,
        justifyContent: "center",
        alignItems: "center",
        borderWidth: 2,
        borderColor: "#fff",
    },
    unreadBadgeText: {
        color: "#fff",
        fontSize: 10,
        fontWeight: "bold",
    },
    conversationInfo: {
        flex: 1,
    },
    conversationHeader: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 4,
    },
    userName: {
        fontSize: 16,
        fontWeight: "bold",
        color: "#333",
    },
    messageTime: {
        fontSize: 12,
        color: "#999",
    },
    lastMessage: {
        fontSize: 14,
        color: "#666",
    },
    unreadMessage: {
        fontWeight: "bold",
        color: "#333",
    },
})

export default ConversationItem