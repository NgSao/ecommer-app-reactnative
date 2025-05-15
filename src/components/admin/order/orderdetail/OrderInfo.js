import { View, Text, StyleSheet } from "react-native"
import { formatDate, formatDateFull } from '@utils/formatUtils';

const OrderInfo = ({ order }) => {
    return (
        <View style={styles.section}>
            <Text style={styles.sectionTitle}>Thông tin đơn hàng</Text>
            <View style={styles.infoRow}>
                <Text style={styles.infoLabel}>Mã đơn hàng:</Text>
                <Text style={styles.infoValue}>#{order.orderCode}</Text>
            </View>
            <View style={styles.infoRow}>
                <Text style={styles.infoLabel}>Ngày đặt:</Text>
                <Text style={styles.infoValue}>{formatDateFull(order.createdAt)}</Text>
            </View>
            <View style={styles.infoRow}>
                <Text style={styles.infoLabel}>Phương thức vận chuyển:</Text>
                <Text style={styles.infoValue}>{order.shipping.method}</Text>
            </View>
            <View style={styles.infoRow}>
                <Text style={styles.infoLabel}>Phương thức thanh toán:</Text>
                <Text style={styles.infoValue}>{order.payment.method}</Text>
            </View>
            <View style={styles.infoRow}>
                <Text style={styles.infoLabel}>Trạng thái thanh toán:</Text>
                <Text
                    style={[
                        styles.infoValue,
                        { color: order.payment.status !== "Chưa thanh toán" ? "#2ecc71" : "#e74c3c" },
                    ]}
                >
                    {order.payment.status !== "Chưa thanh toán" ? "Đã thanh toán" : "Chưa thanh toán"}
                </Text>
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
        marginBottom: 10,
    },
    infoRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 8,
        alignItems: "flex-start",
    },

    infoLabel: {
        fontSize: 14,
        color: "#666",
        flex: 1,
    },

    infoValue: {
        fontSize: 14,
        color: "#333",
        fontWeight: "500",
        flex: 2, //
        flexWrap: 'wrap',
        textAlign: 'right',
    },
})

export default OrderInfo