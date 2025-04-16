import { View, Text, TouchableOpacity, StyleSheet } from "react-native"
import { Ionicons } from "@expo/vector-icons"

const PaymentMethodSelector = ({ paymentMethod, setPaymentMethod }) => {
    return (
        <View style={styles.section}>
            <Text style={styles.sectionTitle}>Phương thức thanh toán</Text>

            <View style={styles.paymentMethods}>
                <TouchableOpacity
                    style={[styles.paymentMethodItem, paymentMethod === "COD" && styles.selectedPaymentMethod]}
                    onPress={() => setPaymentMethod("COD")}
                >
                    <Ionicons name="cash-outline" size={24} color={paymentMethod === "COD" ? "#e30019" : "#666"} />
                    <Text style={[styles.paymentMethodText, paymentMethod === "COD" && styles.selectedPaymentMethodText]}>
                        Thanh toán khi nhận hàng (COD)
                    </Text>
                    {paymentMethod === "COD" && <Ionicons name="checkmark-circle" size={20} color="#e30019" />}
                </TouchableOpacity>

                <TouchableOpacity
                    style={[styles.paymentMethodItem, paymentMethod === "BANK" && styles.selectedPaymentMethod]}
                    onPress={() => setPaymentMethod("BANK")}
                >
                    <Ionicons name="card-outline" size={24} color={paymentMethod === "BANK" ? "#e30019" : "#666"} />
                    <Text style={[styles.paymentMethodText, paymentMethod === "BANK" && styles.selectedPaymentMethodText]}>
                        Chuyển khoản ngân hàng
                    </Text>
                    {paymentMethod === "BANK" && <Ionicons name="checkmark-circle" size={20} color="#e30019" />}
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    section: {
        backgroundColor: "#fff",
        borderRadius: 10,
        padding: 15,
        marginBottom: 15,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    sectionTitle: {
        fontSize: 16,
        fontWeight: "bold",
        color: "#333",
        marginBottom: 15,
    },
    paymentMethods: {
        marginBottom: 10,
    },
    paymentMethodItem: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#f9f9f9",
        borderRadius: 8,
        padding: 12,
        marginBottom: 10,
    },
    selectedPaymentMethod: {
        backgroundColor: "#fff3f3",
        borderWidth: 1,
        borderColor: "#e30019",
    },
    paymentMethodText: {
        fontSize: 14,
        color: "#333",
        marginLeft: 10,
        flex: 1,
    },
    selectedPaymentMethodText: {
        color: "#e30019",
        fontWeight: "500",
    },
})

export default PaymentMethodSelector