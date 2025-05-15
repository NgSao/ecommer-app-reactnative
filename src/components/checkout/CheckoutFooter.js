import { formatPrice } from "@utils/formatUtils"
import { View, Text, TouchableOpacity, ActivityIndicator, StyleSheet } from "react-native"

const CheckoutFooter = ({ calculateTotal, handlePlaceOrder, loading }) => (
    <View style={styles.footer}>
        <View style={styles.footerContent}>
            <View>
                <Text style={styles.footerTotalLabel}>Tổng cộng</Text>
                <Text style={styles.footerTotalValue}>{formatPrice(calculateTotal())}</Text>
            </View>
            <TouchableOpacity
                style={[styles.placeOrderButton, loading && styles.disabledButton]}
                onPress={handlePlaceOrder}
                disabled={loading}
            >
                {loading ? (
                    <ActivityIndicator size="small" color="#fff" />
                ) : (
                    <Text style={styles.placeOrderButtonText}>Đặt hàng</Text>
                )}
            </TouchableOpacity>
        </View>
    </View>
)

const styles = StyleSheet.create({
    footer: {
        backgroundColor: "#fff",
        borderTopWidth: 1,
        borderTopColor: "#eee",
        padding: 15,
    },
    footerContent: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    footerTotalLabel: {
        fontSize: 14,
        color: "#666",
    },
    footerTotalValue: {
        fontSize: 18,
        fontWeight: "bold",
        color: "#e30019",
    },
    placeOrderButton: {
        backgroundColor: "#e30019",
        paddingVertical: 12,
        paddingHorizontal: 20,
        borderRadius: 5,
        minWidth: 150,
        alignItems: "center",
    },
    disabledButton: {
        backgroundColor: "#f5a5a5",
    },
    placeOrderButtonText: {
        color: "#fff",
        fontWeight: "bold",
        fontSize: 16,
    },
})

export default CheckoutFooter