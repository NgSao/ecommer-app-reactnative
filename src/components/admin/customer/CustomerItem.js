import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { formatDate, formatDateFull } from '@utils/formatUtils';
import { formatPrice } from '@utils/formatUtils';

const CustomerItem = ({ customer, handleViewCustomerDetails, handleToggleStatus, navigation, roleOptions }) => {
    const getStatusColor = (status) => {
        switch (status) {
            case "ACTIVE":
                return "#2ecc71";
            case "INACTIVE":
                return "#e74c3c";
            case "BLOCKED":
                return "#3498db";
            default:
                return "#7f8c8d";
        }
    };

    const getStatusText = (status) => {
        switch (status) {
            case "ACTIVE":
                return "Hoạt động";
            case "INACTIVE":
                return "Chưa kích hoạt";
            case "BLOCKED":
                return "Bị khóa";
            default:
                return "Không xác định";
        }
    };
    const getRoleText = (role) => {
        const roleOption = roleOptions.find((r) => r.id === role);
        return roleOption ? roleOption.label : "Không xác định";
    };

    const getRoleColor = (role) => {
        switch (role) {
            case "CUSTOMER":
                return "#3498db";
            case "STAFF":
                return "#f1c40f";
            case "ADMIN":
                return "#e74c3c";
            default:
                return "#7f8c8d";
        }
    };


    return (
        <View style={styles.customerItem}>
            <View style={styles.customerStatsRole}>
                <View style={styles.statItemRole}>
                    <Text style={[styles.statValueRole, { color: getRoleColor(customer.role) }]}>
                        {getRoleText(customer.role)}
                    </Text>
                </View>

            </View>


            <View style={styles.customerHeader}>
                <Image
                    source={{ uri: customer.profileImageUrl || "https://tophinhanh.net/wp-content/uploads/2024/01/avatar-mau-do-7.jpg" }}
                    style={styles.customerAvatar}
                />
                <View style={styles.customerInfo}>
                    <Text style={styles.customerName}>{customer.fullName}</Text>
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
                    <Text style={styles.statLabel}>Lần đăng nhập cuối</Text>
                    <Text style={styles.statValue}>{formatDateFull(customer.lastLoginDate)}</Text>
                </View>
                <View style={styles.statItem}>
                    <Text style={styles.statLabel}>Ngày đăng ký</Text>
                    <Text style={styles.statValue}>{formatDate(customer.createdAt)}</Text>
                </View>
            </View>

            <View style={styles.customerStats}>
                <View style={styles.statItem}>
                    <Text style={styles.statLabel}>Đơn hàng</Text>
                    <Text style={styles.statValue}>{customer.totalOrders}</Text>
                </View>
                <View style={styles.statItem}>
                    <Text style={styles.statLabel}>Chi tiêu</Text>
                    <Text style={styles.statValue}>{formatPrice(customer.totalPrice)}</Text>
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
                    style={[styles.actionButton, customer.status === "ACTIVE" ? styles.deactivateButton : styles.activateButton]}
                    onPress={() => handleToggleStatus(customer.id, customer.status)}
                >
                    <Text style={styles.actionButtonText}>
                        {customer.status === "ACTIVE"
                            ? "Vô hiệu hóa"
                            : customer.status === "BLOCKED"
                                ? "Kích hoạt lại"
                                : "Kích hoạt"}
                    </Text>

                </TouchableOpacity>


            </View>
        </View>
    );
};

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
        position: "absolute",
        right: 0,
        top: 0,
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
    customerStatsRole: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        borderTopColor: "#eee",
        paddingTop: 10,
        marginBottom: 10,
    },
    statItemRole: {
        flex: 1,
    },
    statValueRole: {
        fontSize: 18,
        fontWeight: "bold",
        color: "#333",
    },
    statLabelRole: {
        fontSize: 12,
        color: "#666",
        marginTop: 5,
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
        flexWrap: "wrap",
    },
    actionButton: {
        paddingHorizontal: 15,
        paddingVertical: 8,
        borderRadius: 5,
        marginLeft: 10,
        marginBottom: 5,
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
    roleButton: {
        backgroundColor: "#f1c40f",
    },
    actionButtonText: {
        fontSize: 12,
        color: "#fff",
        fontWeight: "bold",
    },
});

export default CustomerItem;