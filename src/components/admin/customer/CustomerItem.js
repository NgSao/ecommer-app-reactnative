import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native"
import { Ionicons } from "@expo/vector-icons"
import { formatDate } from '@utils/formatUtils';

const CustomerItem = ({ customer, handleViewCustomerDetails, handleToggleStatus, navigation }) => {
    const getStatusColor = (status) => {
        switch (status) {
            case "active":
                return "#2ecc71"
            case "inactive":
                return "#e74c3c"
            case "new":
                return "#3498db"
            default:
                return "#7f8c8d"
        }
    }

    const getStatusText = (status) => {
        switch (status) {
            case "active":
                return "Hoạt động"
            case "inactive":
                return "Không hoạt động"
            case "new":
                return "Mới"
            default:
                return "Không xác định"
        }
    }

    return (
        <View style={styles.customerItem}>
            <View style={styles.customerHeader}>
                <Image
                    source={{ uri: customer.avatar || "https://ui-avatars.com/api/?name=" + encodeURIComponent(customer.name) }}
                    style={styles.customerAvatar}
                />
                <View style={styles.customerInfo}>
                    <Text style={styles.customerName}>{customer.name}</Text>
                    <View style={styles.infoRow}>
                        <Ionicons name="mail-outline" size={14} color="#666" />
                        <Text style={styles.infoText}>{customer.email}</Text>
                    </View>
                    <View style={styles.infoRow}>
                        <Ionicons name="call-outline" size={14} color="#666" />
                        <Text style={styles.infoText}>{customer.phone}</Text>
                    </View>
                </View>
                <View style={[styles.statusBadge, { backgroundColor: getStatusColor(customer.status) }]}>
                    <Text style={styles.statusText}>{getStatusText(customer.status)}</Text>
                </View>
            </View>

            <View style={styles.customerStats}>
                <View style={styles.statItem}>
                    <Text style={styles.statValue}>{customer.orderCount}</Text>
                    <Text style={styles.statLabel}>Đơn hàng</Text>
                </View>
                <View style={styles.statItem}>
                    <Text style={styles.statValue}>{customer.totalSpent.toLocaleString("vi-VN")}đ</Text>
                    <Text style={styles.statLabel}>Chi tiêu</Text>
                </View>
                <View style={styles.statItem}>
                    <Text style={styles.statValue}>{formatDate(customer.createdAt)}</Text>
                    <Text style={styles.statLabel}>Ngày đăng ký</Text>
                </View>
            </View>

            <View style={styles.customerActions}>
                <TouchableOpacity
                    style={[styles.actionButton, styles.viewButton]}
                    onPress={() => handleViewCustomerDetails(customer)}
                >
                    <Text style={styles.actionButtonText}>Chi tiết</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[styles.actionButton, styles.orderButton]}
                    onPress={() => navigation.navigate("AdminCreateOrder", { customer })}
                >
                    <Text style={styles.actionButtonText}>Tạo đơn</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[styles.actionButton, customer.status === "active" ? styles.deactivateButton : styles.activateButton]}
                    onPress={() => handleToggleStatus(customer.id, customer.status)}
                >
                    <Text style={styles.actionButtonText}>{customer.status === "active" ? "Vô hiệu hóa" : "Kích hoạt"}</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    customerItem: {
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
    customerHeader: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 15,
    },
    customerAvatar: {
        width: 50,
        height: 50,
        borderRadius: 25,
        marginRight: 15,
    },
    customerInfo: {
        flex: 1,
    },
    customerName: {
        fontSize: 16,
        fontWeight: "bold",
        color: "#333",
        marginBottom: 5,
    },
    infoRow: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 3,
    },
    infoText: {
        fontSize: 14,
        color: "#666",
        marginLeft: 8,
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
    customerStats: {
        flexDirection: "row",
        justifyContent: "space-between",
        borderTopWidth: 1,
        borderTopColor: "#eee",
        paddingTop: 10,
        marginBottom: 10,
    },
    statItem: {
        flex: 1,
        alignItems: "center",
    },
    statValue: {
        fontSize: 18,
        fontWeight: "bold",
        color: "#333",
    },
    statLabel: {
        fontSize: 12,
        color: "#666",
        marginTop: 5,
    },
    customerActions: {
        flexDirection: "row",
        justifyContent: "flex-end",
    },
    actionButton: {
        paddingHorizontal: 15,
        paddingVertical: 8,
        borderRadius: 5,
        marginLeft: 10,
    },
    viewButton: {
        backgroundColor: "#3498db",
    },
    orderButton: {
        backgroundColor: "#9b59b6",
    },
    activateButton: {
        backgroundColor: "#2ecc71",
    },
    deactivateButton: {
        backgroundColor: "#e74c3c",
    },
    actionButtonText: {
        fontSize: 12,
        color: "#fff",
        fontWeight: "bold",
    },
})

export default CustomerItem