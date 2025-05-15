import { View, Text, TouchableOpacity, ActivityIndicator, StyleSheet } from "react-native"
import { Ionicons } from "@expo/vector-icons"

const OrderStatus = ({ order, updatingStatus, getStatusColor, getStatusText, handleUpdateStatus }) => {
    return (
        <View style={styles.orderStatusContainer}>
            <View style={styles.orderStatusHeader}>
                <Text style={styles.sectionTitle}>Trạng thái đơn hàng</Text>
                <View style={[styles.statusBadge, { backgroundColor: getStatusColor(order.orderStatus) }]}>
                    <Text style={styles.statusText}>{getStatusText(order.orderStatus)}</Text>
                </View>
            </View>

            {order.orderStatus !== "DELIVERED" && order.orderStatus !== "CANCELLED" && (
                <TouchableOpacity
                    style={[styles.updateStatusButton, updatingStatus && styles.disabledButton]}
                    onPress={handleUpdateStatus}
                    disabled={updatingStatus}
                >
                    {updatingStatus ? (
                        <ActivityIndicator size="small" color="#fff" />
                    ) : (
                        <>
                            <Ionicons name="refresh-outline" size={20} color="#fff" />
                            <Text style={styles.updateStatusButtonText}>Cập nhật trạng thái</Text>
                        </>
                    )}
                </TouchableOpacity>
            )}
        </View>
    )
}

const styles = StyleSheet.create({
    orderStatusContainer: {
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
    orderStatusHeader: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 15,
    },
    sectionTitle: {
        fontSize: 16,
        fontWeight: "bold",
        color: "#333",
        marginBottom: 10,
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
    updateStatusButton: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#3498db",
        paddingVertical: 10,
        borderRadius: 8,
    },
    updateStatusButtonText: {
        color: "#fff",
        fontWeight: "bold",
        marginLeft: 8,
    },
    disabledButton: {
        opacity: 0.7,
    },
})

export default OrderStatus