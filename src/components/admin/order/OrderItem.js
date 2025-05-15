import { View, Text, TouchableOpacity, StyleSheet } from "react-native"
import { Ionicons } from "@expo/vector-icons"
import { formatCurrency, formatDate, formatDateFull } from '@utils/formatUtils';

const OrderItem = ({ order, getStatusColor, handleUpdateStatus, navigateToOrderDetail, getStatusText }) => {
    return (
        <TouchableOpacity
            style={styles.orderItem}
            onPress={() => navigateToOrderDetail(order.id, order.userId)}
        >
            <View style={styles.orderHeader}>
                <Text style={styles.orderId}>#{order.orderCode}</Text>
                <View style={[styles.statusBadge, { backgroundColor: getStatusColor(order.orderStatus) }]}>
                    <Text style={styles.statusText}>{getStatusText(order.orderStatus)}</Text>
                </View>
            </View>

            <View style={styles.orderInfo}>
                <View style={styles.infoRow}>
                    <Ionicons name="person-outline" size={16} color="#666" />
                    <Text style={styles.infoText}>{order.shipping.fullName || "Chưa cập nhật"}</Text>
                </View>
                <View style={styles.infoRow}>
                    <Ionicons name="call-outline" size={16} color="#666" />
                    <Text style={styles.infoText}>{order.shipping.phone || "Chưa cập nhật"}</Text>
                </View>
                <View style={styles.infoRow}>
                    <Ionicons name="calendar-outline" size={16} color="#666" />
                    <Text style={styles.infoText}>{formatDateFull(order.createdAt)}</Text>
                </View>
            </View>

            <View style={styles.orderFooter}>
                <Text style={styles.orderTotal}>{formatCurrency(order.total)}</Text>
                <View style={styles.actionButtons}>
                    <TouchableOpacity
                        style={[styles.actionButton, styles.updateButton]}
                        onPress={() => handleUpdateStatus(order.id, order.orderStatus)}
                    >
                        <Text style={styles.actionButtonText}>Cập nhật</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[styles.actionButton, styles.viewButton]}
                        onPress={() => navigateToOrderDetail(order.id, order.userId)}
                    >
                        <Text style={styles.actionButtonText}>Chi tiết</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    orderItem: {
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
    orderHeader: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 10,
    },
    orderId: {
        fontSize: 16,
        fontWeight: "bold",
        color: "#333",
    },
    statusBadge: {
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderRadius: 15,
    },
    statusText: {
        fontSize: 12,
        color: "#fff",
        fontWeight: "bold",
    },
    orderInfo: {
        marginBottom: 15,
    },
    infoRow: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 5,
    },
    infoText: {
        fontSize: 14,
        color: "#666",
        marginLeft: 8,
    },
    orderFooter: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        borderTopWidth: 1,
        borderTopColor: "#eee",
        paddingTop: 10,
    },
    orderTotal: {
        fontSize: 16,
        fontWeight: "bold",
        color: "#e30019",
    },
    actionButtons: {
        flexDirection: "row",
    },
    actionButton: {
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 5,
        marginLeft: 8,
    },
    updateButton: {
        backgroundColor: "#3498db",
    },
    viewButton: {
        backgroundColor: "#2ecc71",
    },
    actionButtonText: {
        fontSize: 12,
        color: "#fff",
        fontWeight: "bold",
    },
})

export default OrderItem