import { formatPrice } from "@utils/formatUtils"
import { View, Text, TouchableOpacity, StyleSheet } from "react-native"

const CheckoutSection = ({ cartItems, calculateSubtotal, calculateDiscount, calculateTotal, appliedPromo, navigation }) => (
    <View style={styles.checkoutContainer}>
        <View style={styles.totalContainer}>
            <Text style={styles.checkoutTotalLabel}>Tổng cộng:</Text>
            <Text style={styles.checkoutTotalValue}>{formatPrice(calculateTotal())}</Text>
        </View>
        <TouchableOpacity
            style={styles.checkoutButton}
            onPress={() =>
                navigation.navigate("Checkout", {
                    cartItems,
                    subtotal: calculateSubtotal(),
                    discount: calculateDiscount(),
                    total: calculateTotal(),
                    appliedPromo,
                })
            }
        >
            <Text style={styles.checkoutButtonText}>Thanh toán</Text>
        </TouchableOpacity>
    </View>
)

const styles = StyleSheet.create({
    checkoutContainer: {
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: "#fff",
        flexDirection: "row",
        padding: 15,
        borderTopWidth: 1,
        borderTopColor: "#eee",
        alignItems: "center",
    },
    totalContainer: {
        flex: 1,
    },
    checkoutTotalLabel: {
        fontSize: 14,
        color: "#666",
    },
    checkoutTotalValue: {
        fontSize: 18,
        fontWeight: "bold",
        color: "#e30019",
    },
    checkoutButton: {
        backgroundColor: "#e30019",
        paddingVertical: 12,
        paddingHorizontal: 20,
        borderRadius: 5,
    },
    checkoutButtonText: {
        color: "#fff",
        fontWeight: "bold",
        fontSize: 16,
    },
})

export default CheckoutSection