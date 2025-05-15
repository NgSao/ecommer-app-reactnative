import { Modal, View, ScrollView, Text, Image, TouchableOpacity, ActivityIndicator, StyleSheet, Alert } from "react-native"
import { Ionicons } from "@expo/vector-icons"
import { formatDate, formatDateFull } from '@utils/formatUtils';
import { formatPrice } from '@utils/formatUtils';

const CustomerDetailModal = ({
    modalVisible,
    setModalVisible,
    selectedCustomer,
    customerOrders,
    loadingCustomerDetails,
    handleToggleStatus,
    handleChangeRole,
    roleOptions,
    navigation,
}) => {
    const getStatusColor = (status) => {
        switch (status) {
            case "ACTIVE":
                return "#2ecc71"
            case "INACTIVE":
                return "#e74c3c"
            case "BLOCKED":
                return "#3498db"
            default:
                return "#7f8c8d"
        }
    }

    const getStatusText = (status) => {
        switch (status) {
            case "ACTIVE":
                return "Hoạt động"
            case "INACTIVE":
                return "Chưa kích hoạt"
            case "BLOCKED":
                return "Đã bị khóa"
            default:
                return "Không xác định"
        }
    }

    const getOrderStatusColor = (status) => {
        switch (status) {
            case "PENDING":
                return "#f39c12"
            case "CONFIRMED":
                return "#3498db"
            case "SHIPPED":
                return "#9b59b6"
            case "DELIVERED":
                return "#2ecc71"
            case "CANCELLED":
                return "#e74c3c"
            default:
                return "#7f8c8d"
        }
    }

    const getOrderStatusText = (status) => {
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
    const activeAddress = selectedCustomer?.addresses?.find(addr => addr.active);

    const recentOrders = selectedCustomer?.orders
        ? [...selectedCustomer.orders]
            .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
            .slice(0, 3)
        : [];



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

    const handleRoleChange = () => {
        const currentRole = selectedCustomer.role;
        let newRole;

        if (currentRole === "CUSTOMER") {
            newRole = "STAFF";
        } else if (currentRole === "STAFF") {
            newRole = "CUSTOMER";
        } else {
            Alert.alert("Thông báo", "Không thể thay đổi quyền cho tài khoản này.");
            return;
        }

        handleChangeRole(selectedCustomer.id, selectedCustomer.email, newRole);
    };

    return (
        <Modal animationType="slide" transparent={true} visible={modalVisible} onRequestClose={() => setModalVisible(false)}>
            <View style={styles.modalContainer}>
                <View style={styles.modalContent}>
                    <View style={styles.modalHeader}>
                        <Text style={styles.modalTitle}>Chi tiết khách hàng</Text>
                        <TouchableOpacity style={styles.closeButton} onPress={() => setModalVisible(false)}>
                            <Ionicons name="close" size={24} color="#333" />
                        </TouchableOpacity>
                    </View>


                    {selectedCustomer && (
                        <ScrollView>
                            <View style={styles.customerStatsRole}>
                                <View style={styles.statItemRole}>
                                    <Text style={[styles.statValueRole, { color: getRoleColor(selectedCustomer.role) }]}>
                                        {getRoleText(selectedCustomer.role)}
                                    </Text>
                                </View>

                            </View>
                            <View style={styles.customerDetailHeader}>
                                <Image
                                    source={{
                                        uri: selectedCustomer.profileImageUrl || "https://tophinhanh.net/wp-content/uploads/2024/01/avatar-mau-do-7.jpg"
                                    }}
                                    style={styles.detailAvatar}
                                />
                                <View style={styles.customerDetailInfo}>
                                    <Text style={styles.detailName}>{selectedCustomer.fullName}</Text>
                                    <View style={styles.detailRow}>
                                        <Text style={styles.detailText}>{selectedCustomer.email}</Text>
                                    </View>

                                    <View
                                        style={[styles.detailStatusBadge, { backgroundColor: getStatusColor(selectedCustomer.status) }]}
                                    >
                                        <Text style={styles.detailStatusText}>{getStatusText(selectedCustomer.status)}</Text>
                                    </View>
                                </View>
                            </View>

                            <View style={styles.detailSection}>
                                <Text style={styles.sectionTitle}>Thông tin liên hệ</Text>
                                <View style={styles.detailRow}>
                                    <Ionicons name="mail-outline" size={18} color="#666" />
                                    <Text style={styles.detailText}>{selectedCustomer.email}</Text>
                                </View>
                                <View style={styles.detailRow}>
                                    <Ionicons name="call-outline" size={18} color="#666" />
                                    <Text style={styles.detailText}>{selectedCustomer.phone}</Text>
                                </View>
                                {activeAddress ? (
                                    <View style={styles.detailRow}>
                                        <Ionicons name="location-outline" size={18} color="#666" />
                                        <Text style={styles.detailText}>
                                            {`${activeAddress.addressDetail}, ${activeAddress.street}, ${activeAddress.district}, ${activeAddress.city}`}
                                        </Text>
                                    </View>
                                ) : (
                                    <View style={styles.detailRow}>
                                        <Ionicons name="location-outline" size={18} color="#666" />
                                        <Text style={styles.detailText}>Chưa có địa chỉ</Text>
                                    </View>
                                )}


                            </View>

                            <View style={styles.detailSection}>
                                <Text style={styles.sectionTitle}>Thông tin tài khoản</Text>
                                <View style={styles.detailRow}>
                                    <Ionicons name="calendar-outline" size={18} color="#666" />
                                    <Text style={styles.detailText}>Ngày đăng ký: {formatDateFull(selectedCustomer.createdAt)}</Text>
                                </View>
                                <View style={styles.detailRow}>
                                    <Ionicons name="time-outline" size={18} color="#666" />
                                    <Text style={styles.detailText}>
                                        Đăng nhập gần nhất:{" "}
                                        {selectedCustomer.lastLoginDate ? formatDateFull(selectedCustomer.lastLoginDate) : "Chưa đăng nhập"}
                                    </Text>
                                </View>
                            </View>



                            <View style={styles.detailSection}>
                                <Text style={styles.sectionTitle}>Thống kê mua hàng</Text>
                                <View style={styles.statsRow}>
                                    <View style={styles.detailStatItem}>
                                        <Text style={styles.detailStatLabel}>Tổng đơn</Text>
                                        <Text style={styles.detailStatValue}>{selectedCustomer.totalOrders}</Text>
                                    </View>
                                    <View style={styles.detailStatItem}>
                                        <Text style={styles.detailStatLabel}>Chi tiêu</Text>
                                        <Text style={styles.detailStatValue}>
                                            {formatPrice(selectedCustomer.totalPrice)}
                                        </Text>
                                    </View>
                                    <View style={styles.detailStatItem}>
                                        <Text style={styles.detailStatLabel}>Trung bình/đơn</Text>
                                        <Text style={styles.detailStatValue}>
                                            {selectedCustomer.totalOrders > 0
                                                ? formatPrice(selectedCustomer.totalPrice / selectedCustomer.totalOrders)
                                                : 0}
                                        </Text>
                                    </View>
                                </View>
                            </View>

                            <View style={styles.detailSection}>
                                <View style={styles.sectionHeader}>
                                    <Text style={styles.sectionTitle}>Lịch sử đơn hàng</Text>
                                    {/* <TouchableOpacity
                                        onPress={() =>
                                            navigation.navigate("AdminCustomerOrders", { customerId: selectedCustomer.id })
                                        }
                                    >
                                        <Text style={styles.viewAllText}>Xem tất cả</Text>
                                    </TouchableOpacity> */}
                                </View>

                                {loadingCustomerDetails ? (
                                    <ActivityIndicator size="small" color="#e30019" style={{ marginVertical: 20 }} />
                                ) : recentOrders.length > 0 ? (
                                    recentOrders.map((order) => (
                                        <View key={order.orderCode} style={styles.orderItem}>
                                            <View style={styles.orderHeader}>
                                                <Text style={styles.orderId}>#{order.orderCode}</Text>
                                                <View
                                                    style={[styles.orderStatusBadge, { backgroundColor: getOrderStatusColor(order.orderStatus) }]}
                                                >
                                                    <Text style={styles.orderStatusText}>{getOrderStatusText(order.orderStatus)}</Text>
                                                </View>
                                            </View>
                                            <View style={styles.orderInfo}>
                                                <Text style={styles.orderDate}>{formatDateFull(order.createdAt)}</Text>
                                                <Text style={styles.orderTotal}>{formatPrice(order.total)}</Text>
                                            </View>
                                        </View>
                                    ))
                                ) : (
                                    <Text style={styles.emptyOrdersText}>Khách hàng chưa có đơn hàng nào</Text>
                                )}

                            </View>

                            <View style={styles.actionButtonsContainer}>
                                <TouchableOpacity
                                    style={[styles.modalActionButton, styles.createOrderButton]}
                                    onPress={() => {
                                        setModalVisible(false)
                                        navigation.navigate("AdminCreateOrder", { customer: selectedCustomer })
                                    }}
                                >
                                    <Text style={styles.modalActionButtonText}>Tạo đơn hàng mới</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={[
                                        styles.modalActionButton,
                                        selectedCustomer.status === "ACTIVE" ? styles.deactivateButton : styles.activateButton,
                                    ]}
                                    onPress={() => {
                                        setModalVisible(false)
                                        handleToggleStatus(selectedCustomer.id, selectedCustomer.status)
                                    }}
                                >
                                    <Text style={styles.modalActionButtonText}>
                                        {selectedCustomer.status === "ACTIVE" ? "Vô hiệu hóa tài khoản" : "Kích hoạt tài khoản"}
                                    </Text>
                                </TouchableOpacity>

                                <TouchableOpacity
                                    style={[styles.modalActionButton, styles.roleButton]}
                                    onPress={handleRoleChange}
                                >
                                    <Text style={styles.modalActionButtonText}>
                                        {selectedCustomer.role === "CUSTOMER"
                                            ? "Nâng quyền thành Nhân viên"
                                            : selectedCustomer.role === "STAFF"
                                                ? "Hạ quyền thành Khách hàng"
                                                : "Thay đổi quyền"}
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        </ScrollView>
                    )}
                </View>
            </View>
        </Modal>
    )
}

const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        justifyContent: "center",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        padding: 20,
    },
    modalContent: {
        backgroundColor: "#fff",
        borderRadius: 10,
        padding: 20,
        maxHeight: "90%",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    modalHeader: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 20,
    },
    modalTitle: {
        fontSize: 18,
        fontWeight: "bold",
        color: "#333",
    },
    closeButton: {
        padding: 5,
    },
    customerDetailHeader: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 20,
    },
    detailAvatar: {
        width: 70,
        height: 70,
        borderRadius: 35,
        marginRight: 15,
    },
    customerDetailInfo: {
        flex: 1,
    },
    detailName: {
        fontSize: 18,
        fontWeight: "bold",
        color: "#333",
        marginBottom: 5,
        marginLeft: 10,
    },
    detailStatusBadge: {
        alignSelf: "flex-start",
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderRadius: 15,
        marginLeft: 10,
    },
    detailStatusText: {
        fontSize: 12,
        color: "#fff",
        fontWeight: "bold",
    },
    detailSection: {
        marginBottom: 20,
        padding: 15,
        backgroundColor: "#f9f9f9",
        borderRadius: 10,
    },
    sectionHeader: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 10,
    },
    sectionTitle: {
        fontSize: 16,
        fontWeight: "bold",
        color: "#333",
        marginBottom: 10,
    },
    viewAllText: {
        fontSize: 14,
        color: "#e30019",
    },
    detailRow: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 8,
    },
    detailText: {
        fontSize: 14,
        color: "#666",
        marginLeft: 10,
    },
    statsRow: {
        marginTop: 10,
    },
    detailStatItem: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        padding: 5,
    },
    detailStatValue: {
        fontSize: 16,
        fontWeight: "bold",
        color: "#333",
    },
    detailStatLabel: {
        fontSize: 14,
        color: "#666",
        fontWeight: "bold",

    },
    emptyOrdersText: {
        fontSize: 14,
        color: "#666",
        fontStyle: "italic",
        textAlign: "center",
        marginVertical: 15,
    },
    orderItem: {
        backgroundColor: "#fff",
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
    orderStatusBadge: {
        paddingHorizontal: 8,
        paddingVertical: 3,
        borderRadius: 12,
    },
    orderStatusText: {
        fontSize: 10,
        color: "#fff",
        fontWeight: "bold",
    },
    orderInfo: {
        flexDirection: "row",
        justifyContent: "space-between",
    },
    orderDate: {
        fontSize: 12,
        color: "#666",
    },
    orderTotal: {
        fontSize: 14,
        fontWeight: "bold",
        color: "#e30019",
    },
    actionButtonsContainer: {
        marginTop: 10,
        marginBottom: 20,
    },
    modalActionButton: {
        paddingVertical: 12,
        borderRadius: 8,
        alignItems: "center",
        marginBottom: 10,
    },
    createOrderButton: {
        backgroundColor: "#3498db",
    },
    modalActionButtonText: {
        fontSize: 16,
        color: "#fff",
        fontWeight: "bold",
    },
    deactivateButton: {
        backgroundColor: "#e74c3c",
    },
    activateButton: {
        backgroundColor: "#2ecc71",
    },
    roleButton: {
        backgroundColor: "#f1c40f",
    },
    viewButton: {
        backgroundColor: "#3498db",
    },
    customerStatsRole: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        borderTopColor: "#eee",
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
})

export default CustomerDetailModal