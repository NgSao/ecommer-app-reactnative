import { View, Text, StyleSheet } from "react-native"

const PaymentInfoSection = ({ payment }) => (
    <View style={styles.section}>
        <Text style={styles.sectionTitle}>Thông tin thanh toán</Text>
        <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Phương thức:</Text>
            <Text style={styles.infoValue}>
                {payment.method === "cod"
                    ? "Thanh toán khi nhận hàng (COD)"
                    : payment.method === "banking"
                        ? "Chuyển khoản ngân hàng"
                        : payment.method === "vnpay"
                            ? "vnpay"
                            : payment.method}
            </Text>
        </View>
        <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Trạng thái:</Text>
            <Text
                style={[styles.infoValue, { color: payment.status === "Đã thanh toán" ? "#4caf50" : "#ff9800" }]}
            >
                {payment.status}
            </Text>
        </View>
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
    infoRow: {
        flexDirection: "row",
        marginBottom: 10,
    },
    infoLabel: {
        width: 120,
        fontSize: 14,
        color: "#666",
    },
    infoValue: {
        flex: 1,
        fontSize: 14,
        fontWeight: "500",
    },
})

export default PaymentInfoSection