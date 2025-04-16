import { View, Text, TouchableOpacity, StyleSheet } from "react-native"

const paymentMethods = [
    { id: "1", title: "Thanh toán khi nhận hàng (COD)", description: "Thanh toán bằng tiền mặt khi nhận hàng" },
    { id: "2", title: "Chuyển khoản ngân hàng", description: "Thanh toán qua tài khoản ngân hàng" },
    { id: "3", title: "Thanh toán qua VNPAY", description: "Thanh toán qua ví điện tử VNPAY" },
]

const PaymentMethodSection = ({ paymentMethod, setPaymentMethod }) => (
    <View style={styles.section}>
        <Text style={styles.sectionTitle}>Phương thức thanh toán</Text>
        {paymentMethods.map((method) => (
            <TouchableOpacity
                key={method.id}
                style={[styles.paymentMethod, paymentMethod === method.id && styles.selectedPaymentMethod]}
                onPress={() => setPaymentMethod(method.id)}
            >
                <View style={styles.paymentMethodRadio}>
                    {paymentMethod === method.id && <View style={styles.paymentMethodRadioSelected} />}
                </View>
                <View style={styles.paymentMethodContent}>
                    <Text style={styles.paymentMethodTitle}>{method.title}</Text>
                    <Text style={styles.paymentMethodDescription}>{method.description}</Text>
                </View>
            </TouchableOpacity>
        ))}
    </View>
)

const styles = StyleSheet.create({
    section: {
        backgroundColor: "#fff",
        padding: 15,
        marginBottom: 10,
    },
    sectionTitle: {
        fontSize: 16,
        fontWeight: "bold",
        marginBottom: 15,
    },
    paymentMethod: {
        flexDirection: "row",
        alignItems: "center",
        borderWidth: 1,
        borderColor: "#ddd",
        borderRadius: 5,
        padding: 10,
        marginBottom: 10,
    },
    selectedPaymentMethod: {
        borderColor: "#e30019",
        backgroundColor: "#fff0f0",
    },
    paymentMethodRadio: {
        width: 20,
        height: 20,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: "#ddd",
        justifyContent: "center",
        alignItems: "center",
        marginRight: 10,
    },
    paymentMethodRadioSelected: {
        width: 12,
        height: 12,
        borderRadius: 6,
        backgroundColor: "#e30019",
    },
    paymentMethodContent: {
        flex: 1,
    },
    paymentMethodTitle: {
        fontSize: 14,
        fontWeight: "bold",
        marginBottom: 5,
    },
    paymentMethodDescription: {
        fontSize: 12,
        color: "#666",
    },
})

export default PaymentMethodSection