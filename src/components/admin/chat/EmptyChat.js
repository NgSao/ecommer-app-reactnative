import { View, Text, Image, StyleSheet } from "react-native"

const EmptyChat = ({ conversation }) => {
    return (
        <View style={styles.emptyContainer}>
            <Image
                source={{
                    uri:
                        conversation?.userAvatar ||
                        `https://ui-avatars.com/api/?name=${encodeURIComponent(conversation?.userName)}&background=random`,
                }}
                style={styles.emptyAvatar}
            />
            <Text style={styles.emptyTitle}>Cuộc trò chuyện mới</Text>
            <Text style={styles.emptyText}>Bắt đầu cuộc trò chuyện với {conversation?.userName} ngay bây giờ.</Text>
        </View>
    )
}

const styles = StyleSheet.create({
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
})

export default EmptyChat