import { View, Text, TouchableOpacity, StyleSheet } from "react-native"
import { Ionicons } from "@expo/vector-icons"

const EmptyState = ({ onShopNow }) => (
    <View style={styles.emptyContainer}>
        <Ionicons name="heart-outline" size={60} color="#ddd" />
        <Text style={styles.emptyText}>Danh sách yêu thích trống</Text>
        <TouchableOpacity style={styles.shopNowButton} onPress={onShopNow}>
            <Text style={styles.shopNowText}>Mua sắm ngay</Text>
        </TouchableOpacity>
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
        marginBottom: 20,
    },
    shopNowButton: {
        backgroundColor: "#e30019",
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
    },
    shopNowText: {
        color: "#fff",
        fontWeight: "bold",
    },
})

export default EmptyState