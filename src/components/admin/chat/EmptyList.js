import { View, Text, StyleSheet } from "react-native"
import { Ionicons } from "@expo/vector-icons"

const EmptyList = () => {
    return (
        <View style={styles.emptyContainer}>
            <Ionicons name="chatbubble-ellipses-outline" size={60} color="#ccc" />
            <Text style={styles.emptyText}>Không có cuộc trò chuyện nào</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    emptyContainer: {
        alignItems: "center",
        justifyContent: "center",
        padding: 40,
    },
    emptyText: {
        fontSize: 16,
        color: "#666",
        marginTop: 12,
    },
})

export default EmptyList