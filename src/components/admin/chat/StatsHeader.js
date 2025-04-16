import { View, Text, TouchableOpacity, StyleSheet } from "react-native"
import { Ionicons } from "@expo/vector-icons"

const StatsHeader = ({ filteredConversations, fetchConversations }) => {
    return (
        <View style={styles.statsContainer}>
            <Text style={styles.statsText}>{filteredConversations.length} cuộc trò chuyện</Text>
            <TouchableOpacity style={styles.refreshButton} onPress={fetchConversations}>
                <Ionicons name="refresh" size={20} color="#e30019" />
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    statsContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingHorizontal: 16,
        marginBottom: 8,
    },
    statsText: {
        fontSize: 14,
        color: "#666",
    },
    refreshButton: {
        padding: 4,
    },
})

export default StatsHeader