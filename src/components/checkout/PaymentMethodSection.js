


import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native"
import { Ionicons } from "@expo/vector-icons"

const paymentMethods = [
    { id: "cod", title: "Thanh toán khi nhận hàng (COD)", description: "Thanh toán bằng tiền mặt khi nhận hàng", icon: "cash-outline" },
    { id: "bank", title: "Chuyển khoản ngân hàng qua mã QR", description: "Thanh toán qua tài khoản ngân hàng", icon: "card-outline" },
    { id: "vnpay", title: "Thanh toán qua VNPAY", description: "Thanh toán qua ví điện tử VNPAY", icon: "wallet-outline" },
    { id: "momo", title: "Thanh toán qua Momo", description: "Thanh toán qua ví điện tử Momo", icon: require('../../assets/images/momo.jpg') },
    { id: "zalopay", title: "Thanh toán qua Zalopay", description: "Thanh toán qua ví điện tử Zalopay", icon: require('../../assets/images/zalo.jpg') },

]

const PaymentMethodSection = ({ paymentMethod, setPaymentMethod }) => {
    return (
        <View style={styles.section}>
            <Text style={styles.sectionTitle}>Phương thức thanh toán</Text>

            <View style={styles.paymentMethods}>
                {paymentMethods.map((method) => (
                    <TouchableOpacity
                        key={method.id}
                        style={[styles.paymentMethodItem, paymentMethod === method.id && styles.selectedPaymentMethod]}
                        onPress={() => setPaymentMethod(method.id)}
                    >
                        {typeof method.icon === 'string' ? (
                            <Ionicons
                                name={method.icon}
                                size={24}
                                color={paymentMethod === method.id ? "#e30019" : "#666"}
                            />
                        ) : (
                            <Image source={method.icon} style={{ width: 24, height: 24 }} />
                        )}
                        <View style={{ flex: 1 }}>
                            <Text
                                style={[styles.paymentMethodText, paymentMethod === method.id && styles.selectedPaymentMethodText]}
                            >
                                {method.title}
                            </Text>
                            <Text style={[styles.paymentMethodText, { fontSize: 12, color: "#666" }]}>
                                {method.description}
                            </Text>
                        </View>
                        {paymentMethod === method.id && <Ionicons name="checkmark-circle" size={20} color="#e30019" />}
                    </TouchableOpacity>
                ))}
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

export default PaymentMethodSection
