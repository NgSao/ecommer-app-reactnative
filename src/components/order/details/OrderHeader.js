import { formatDateFull } from "@utils/formatUtils"
import { View, Text, StyleSheet } from "react-native"

const OrderHeader = ({ order, getStatusColor, getStatusText }) => (
    <View style={styles.section}>
        <View style={styles.orderHeader}>
            <Text style={styles.orderId}>Đơn hàng #{order.orderCode}</Text>
            <View style={[styles.statusBadge, { backgroundColor: getStatusColor(order.orderStatus) }]}>
                <Text style={styles.statusText}>{getStatusText(order.orderStatus)}</Text>
            </View>
        </View>
        <Text style={styles.orderDate}>Ngày đặt: {formatDateFull(order.createdAt)}</Text>
    </View>
)

const styles = StyleSheet.create({
    section: {
        backgroundColor: "#fff",
        padding: 15,
        marginBottom: 10,
    },
    orderHeader: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 5,
    },
    orderId: {
        fontSize: 18,
        fontWeight: "bold",
    },
    statusBadge: {
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderRadius: 15,
    },
    statusText: {
        color: "#fff",
        fontSize: 12,
        fontWeight: "bold",
    },
    orderDate: {
        fontSize: 14,
        color: "#666",
    },
})

export default OrderHeader