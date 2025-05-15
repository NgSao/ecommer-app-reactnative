import { formatDateFull } from "@utils/formatUtils"
import { View, Text, Image, StyleSheet } from "react-native"

const MessageItem = ({ item, conversation }) => {
    const isAdmin = item.senderId === "ADMIN"

    return (
        <View style={[styles.messageContainer, isAdmin ? styles.adminMessage : styles.userMessage]}>
            {!isAdmin && (
                <View style={styles.userAvatar}>
                    <Image
                        source={{
                            uri:
                                conversation?.userAvatar ||
                                `https://ui-avatars.com/api/?name=${encodeURIComponent(conversation?.userName)}&background=random`,
                        }}
                        style={styles.avatarImage}
                    />
                </View>
            )}

            <View style={[styles.messageBubble, isAdmin ? styles.adminBubble : styles.userBubble]}>
                {item.image && <Image source={{ uri: item.image }} style={styles.messageImage} />}

                {item.content.trim() !== "" && (
                    <Text style={[styles.messageText, isAdmin ? styles.adminMessageText : styles.userMessageText]}>
                        {item.content}
                    </Text>
                )}

                <Text style={[styles.messageTime, isAdmin ? styles.adminMessageTime : styles.userMessageTime]}>
                    {formatDateFull(item.timestamp)}
                </Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    messageContainer: {
        flexDirection: "row",
        marginBottom: 16,
        maxWidth: "80%",
    },
    adminMessage: {
        alignSelf: "flex-end",
    },
    userMessage: {
        alignSelf: "flex-start",
    },
    userAvatar: {
        marginRight: 8,
        alignSelf: "flex-end",
    },
    avatarImage: {
        width: 30,
        height: 30,
        borderRadius: 15,
    },
    messageBubble: {
        padding: 12,
        borderRadius: 16,
        maxWidth: "100%",
    },
    adminBubble: {
        backgroundColor: "#e30019",
        borderBottomRightRadius: 4,
    },
    userBubble: {
        backgroundColor: "#fff",
        borderBottomLeftRadius: 4,
        borderWidth: 1,
        borderColor: "#eee",
    },
    messageText: {
        fontSize: 15,
        lineHeight: 20,
    },
    adminMessageText: {
        color: "#fff",
    },
    userMessageText: {
        color: "#333",
    },
    messageImage: {
        width: 200,
        height: 150,
        borderRadius: 8,
        marginBottom: 8,
    },
    messageTime: {
        fontSize: 11,
        marginTop: 4,
        alignSelf: "flex-end",
    },
    adminMessageTime: {
        color: "rgba(255, 255, 255, 0.7)",
    },
    userMessageTime: {
        color: "#999",
    },
})

export default MessageItem