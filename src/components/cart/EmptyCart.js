import { View, Text, TouchableOpacity, StyleSheet } from "react-native"
import { Ionicons } from "@expo/vector-icons"

const EmptyCart = () => (
    <View style={styles.emptyCartContainer}>
        <Ionicons name="cart-outline" size={80} color="#ddd" />
        <Text style={styles.emptyCartText}>Giỏ hàng của bạn đang trống</Text>
        <TouchableOpacity style={styles.continueShoppingButton}>
            <Text style={styles.continueShoppingText}>Tiếp tục mua sắm</Text>
        </TouchableOpacity>
    </View>
)

const styles = StyleSheet.create({
    emptyCartContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: 20,
    },
    emptyCartText: {
        fontSize: 18,
        color: "#666",
        marginTop: 20,
        marginBottom: 30,
    },
    continueShoppingButton: {
        backgroundColor: "#e30019",
        paddingVertical: 12,
        paddingHorizontal: 20,
        borderRadius: 5,
    },
    continueShoppingText: {
        color: "#fff",
        fontWeight: "bold",
        fontSize: 16,
    },
})

export default EmptyCart