import { View, Text, TouchableOpacity, StyleSheet } from "react-native"
import { Ionicons } from "@expo/vector-icons"

const EmptyState = ({ searchQuery, onAdd }) => {
    return (
        <View style={styles.emptyContainer}>
            <Ionicons name="grid-outline" size={60} color="#ccc" />
            <Text style={styles.emptyText}>
                {searchQuery.length > 0
                    ? "Không tìm thấy thương hiệu phù hợp"
                    : "Chưa có thương hiệu nào trong hệ thống"}
            </Text>
            {searchQuery.length === 0 && (
                <TouchableOpacity style={styles.addFirstButton} onPress={onAdd}>
                    <Text style={styles.addFirstButtonText}>Thêm thương hiệu đầu tiên</Text>
                </TouchableOpacity>
            )}
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
    emptyText: {
        fontSize: 16,
        color: "#666",
        textAlign: "center",
        marginTop: 10,
        marginBottom: 20,
    },
    addFirstButton: {
        backgroundColor: "#e30019",
        paddingHorizontal: 20,
        paddingVertical: 12,
        borderRadius: 8,
    },
    addFirstButtonText: {
        color: "#fff",
        fontWeight: "bold",
        fontSize: 16,
    },
})

export default EmptyState