import { View, Text, StyleSheet } from "react-native"
import { Ionicons } from "@expo/vector-icons"

const EmptyState = () => (
    <View style={styles.emptyContainer}>
        <Ionicons name="search-outline" size={60} color="#ddd" />
        <Text style={styles.emptyText}>Không tìm thấy sản phẩm nào</Text>
    </View>
)

const styles = StyleSheet.create({
    emptyContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: 20,
    },
    emptyText: {
        fontSize: 16,
        color: "#666",
        marginTop: 10,
    },
})

export default EmptyState