import { View, Text, TouchableOpacity, StyleSheet } from "react-native"
import { Ionicons } from "@expo/vector-icons"

const EmptyState = ({ hasSearchQuery, onAddProduct }) => (
    <View style={styles.emptyContainer}>
        <Ionicons name="cube-outline" size={60} color="#ccc" />
        <Text style={styles.emptyText}>
            {hasSearchQuery ? "Không tìm thấy sản phẩm phù hợp" : "Chưa có sản phẩm nào trong hệ thống"}
        </Text>
        {!hasSearchQuery && (
            <TouchableOpacity style={styles.addFirstButton} onPress={onAddProduct}>
                <Text style={styles.addFirstButtonText}>Thêm sản phẩm đầu tiên</Text>
            </TouchableOpacity>
        )}
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