import { View, Text, TouchableOpacity, StyleSheet } from "react-native"
import { Ionicons } from "@expo/vector-icons"
import { formatCurrency, formatDateFull, formatPrice } from '@utils/formatUtils';
import { getStatusColor } from "@utils/dashboardUtils";

const RecentOrders = ({ orders, onViewAll, onViewOrderDetail }) => {
    const getStatusText = (status) => {
        switch (status) {
            case "PENDING":
                return "Đang xử lý";
            case "CONFIRMED":
                return "Đã xác nhận";
            case "SHIPPED":
                return "Đã giao hàng";
            case "DELIVERED":
                return "Đã giao thành công";
            case "CANCELLED":
                return "Đã hủy";
            default:
                return "Không xác định";
        }
    };

    return (<View style={styles.recentOrdersContainer}>
        <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Đơn hàng gần đây</Text>
            <TouchableOpacity onPress={onViewAll}>
                <Text style={styles.viewAllText}>Xem tất cả</Text>
            </TouchableOpacity>
        </View>
        {orders.length === 0 ? (
            <View style={styles.emptyContainer}>
                <Ionicons name="cart-outline" size={40} color="#ccc" />
                <Text style={styles.emptyText}>Chưa có đơn hàng nào</Text>
            </View>
        ) : (
            orders.map((order) => (
                <TouchableOpacity
                    key={order.id}
                    style={styles.orderItem}
                    onPress={() => onViewOrderDetail(order.id, order.userId)}
                >
                    <View style={styles.orderHeader}>
                        <Text style={styles.orderId}>#{order.orderCode}</Text>
                        <View style={[styles.statusBadge, { backgroundColor: getStatusColor(order.orderStatus) }]}>
                            <Text style={styles.statusText}>{getStatusText(order.orderStatus)}</Text>
                        </View>
                    </View>
                    <View style={styles.orderInfo}>
                        <View style={styles.orderCustomer}>
                            <Ionicons name="person-outline" size={16} color="#666" />
                            <Text style={styles.orderCustomerName}>{order.shipping.fullName}</Text>
                        </View>
                        <Text style={styles.orderDate}>{formatDateFull(order.createdAt)}</Text>
                    </View>
                    <View style={styles.orderFooter}>
                        <Text style={styles.orderTotal}>{formatPrice(order.total)}</Text>
                        <TouchableOpacity
                            style={styles.viewButton}
                            onPress={() => onViewOrderDetail(order.id, order.userId)}
                        >
                            <Text style={styles.viewButtonText}>Chi tiết</Text>
                        </TouchableOpacity>
                    </View>
                </TouchableOpacity>
            ))
        )}
    </View>
    )
}

const styles = StyleSheet.create({
    recentOrdersContainer: {
        backgroundColor: "#fff",
        borderRadius: 12,
        padding: 15,
        marginBottom: 20,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    sectionHeader: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 15,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: "bold",
        color: "#333",
    },
    viewAllText: {
        fontSize: 14,
        color: "#e30019",
    },
    emptyContainer: {
        alignItems: "center",
        justifyContent: "center",
        paddingVertical: 30,
    },
    emptyText: {
        fontSize: 14,
        color: "#666",
        marginTop: 10,
    },
    orderItem: {
        backgroundColor: "#f9f9f9",
        borderRadius: 8,
        padding: 12,
        marginBottom: 10,
        borderLeftWidth: 3,
        borderLeftColor: "#e30019",
    },
    orderHeader: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 8,
    },
    orderId: {
        fontSize: 14,
        fontWeight: "bold",
        color: "#333",
    },
    statusBadge: {
        paddingHorizontal: 8,
        paddingVertical: 3,
        borderRadius: 12,
    },
    statusText: {
        fontSize: 10,
        color: "#fff",
        fontWeight: "bold",
    },
    orderInfo: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 8,
    },
    orderCustomer: {
        flexDirection: "row",
        alignItems: "center",
    },
    orderCustomerName: {
        fontSize: 14,
        color: "#333",
        marginLeft: 5,
    },
    orderDate: {
        fontSize: 12,
        color: "#666",
    },
    orderFooter: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        borderTopWidth: 1,
        borderTopColor: "#eee",
        paddingTop: 8,
    },
    orderTotal: {
        fontSize: 14,
        fontWeight: "bold",
        color: "#e30019",
    },
    viewButton: {
        backgroundColor: "#3498db",
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 5,
    },
    viewButtonText: {
        fontSize: 12,
        color: "#fff",
        fontWeight: "bold",
    },
})

export default RecentOrders