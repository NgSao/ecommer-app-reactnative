import { Modal, View, ScrollView, Text, Image, TouchableOpacity, ActivityIndicator, StyleSheet } from "react-native"
import { Ionicons } from "@expo/vector-icons"
import { formatDate } from '@utils/formatUtils';

const CustomerDetailModal = ({
    modalVisible,
    setModalVisible,
    selectedCustomer,
    customerOrders,
    loadingCustomerDetails,
    handleToggleStatus,
    navigation,
}) => {
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

    const getOrderStatusColor = (status) => {
        switch (status) {
            case "Chờ xử lý":
                return "#f39c12"
            case "Đang xử lý":
                return "#3498db"
            case "Đang giao":
                return "#9b59b6"
            case "Đã giao":
                return "#2ecc71"
            case "Đã hủy":
                return "#e74c3c"
            default:
                return "#7f8c8d"
        }
    }

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
                            <View style={styles.customerDetailHeader}>
                                <Image
                                    source={{
                                        uri:
                                            selectedCustomer.avatar ||
                                            "https://ui-avatars.com/api/?name=" + encodeURIComponent(selectedCustomer.name),
                                    }}
                                    style={styles.detailAvatar}
                                />
                                <View style={styles.customerDetailInfo}>
                                    <Text style={styles.detailName}>{selectedCustomer.name}</Text>
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
                                {selectedCustomer.address && (
                                    <View style={styles.detailRow}>
                                        <Ionicons name="location-outline" size={18} color="#666" />
                                        <Text style={styles.detailText}>{selectedCustomer.address}</Text>
                                    </View>
                                )}
                            </View>

                            <View style={styles.detailSection}>
                                <Text style={styles.sectionTitle}>Thông tin tài khoản</Text>
                                <View style={styles.detailRow}>
                                    <Ionicons name="calendar-outline" size={18} color="#666" />
                                    <Text style={styles.detailText}>Ngày đăng ký: {formatDate(selectedCustomer.createdAt)}</Text>
                                </View>
                                <View style={styles.detailRow}>
                                    <Ionicons name="time-outline" size={18} color="#666" />
                                    <Text style={styles.detailText}>
                                        Đăng nhập gần nhất:{" "}
                                        {selectedCustomer.lastLogin ? formatDate(selectedCustomer.lastLogin) : "Chưa đăng nhập"}
                                    </Text>
                                </View>
                            </View>

                            <View style={styles.detailSection}>
                                <Text style={styles.sectionTitle}>Thống kê mua hàng</Text>
                                <View style={styles.statsRow}>
                                    <View style={styles.detailStatItem}>
                                        <Text style={styles.detailStatValue}>{selectedCustomer.orderCount}</Text>
                                        <Text style={styles.detailStatLabel}>Tổng đơn</Text>
                                    </View>
                                    <View style={styles.detailStatItem}>
                                        <Text style={styles.detailStatValue}>
                                            {selectedCustomer.totalSpent.toLocaleString("vi-VN")}đ
                                        </Text>
                                        <Text style={styles.detailStatLabel}>Chi tiêu</Text>
                                    </View>
                                    <View style={styles.detailStatItem}>
                                        <Text style={styles.detailStatValue}>
                                            {selectedCustomer.orderCount > 0
                                                ? Math.round(selectedCustomer.totalSpent / selectedCustomer.orderCount).toLocaleString(
                                                    "vi-VN",
                                                )
                                                : 0}
                                            đ
                                        </Text>
                                        <Text style={styles.detailStatLabel}>Trung bình/đơn</Text>
                                    </View>
                                </View>
                            </View>

                            <View style={styles.detailSection}>
                                <View style={styles.sectionHeader}>
                                    <Text style={styles.sectionTitle}>Lịch sử đơn hàng</Text>
                                    <TouchableOpacity
                                        onPress={() =>
                                            navigation.navigate("AdminCustomerOrders", { customerId: selectedCustomer.id })
                                        }
                                    >
                                        <Text style={styles.viewAllText}>Xem tất cả</Text>
                                    </TouchableOpacity>
                                </View>

                                {loadingCustomerDetails ? (
                                    <ActivityIndicator size="small" color="#e30019" style={{ marginVertical: 20 }} />
                                ) : customerOrders.length === 0 ? (
                                    <Text style={styles.emptyOrdersText}>Khách hàng chưa có đơn hàng nào</Text>
                                ) : (
                                    customerOrders.slice(0, 3).map((order) => (
                                        <View key={order.id} style={styles.orderItem}>
                                            <View style={styles.orderHeader}>
                                                <Text style={styles.orderId}>#{order.id}</Text>
                                                <View
                                                    style={[styles.orderStatusBadge, { backgroundColor: getOrderStatusColor(order.status) }]}
                                                >
                                                    <Text style={styles.orderStatusText}>{order.status}</Text>
                                                </View>
                                            </View>
                                            <View style={styles.orderInfo}>
                                                <Text style={styles.orderDate}>{formatDate(order.date)}</Text>
                                                <Text style={styles.orderTotal}>{order.total.toLocaleString("vi-VN")}đ</Text>
                                            </View>
                                        </View>
                                    ))
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
                                        selectedCustomer.status === "active" ? styles.deactivateButton : styles.activateButton,
                                    ]}
                                    onPress={() => {
                                        setModalVisible(false)
                                        handleToggleStatus(selectedCustomer.id, selectedCustomer.status)
                                    }}
                                >
                                    <Text style={styles.modalActionButtonText}>
                                        {selectedCustomer.status === "active" ? "Vô hiệu hóa tài khoản" : "Kích hoạt tài khoản"}
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
    },
    detailStatusBadge: {
        alignSelf: "flex-start",
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderRadius: 15,
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
        flexDirection: "row",
        justifyContent: "space-between",
    },
    detailStatItem: {
        alignItems: "center",
        flex: 1,
    },
    detailStatValue: {
        fontSize: 16,
        fontWeight: "bold",
        color: "#333",
    },
    detailStatLabel: {
        fontSize: 12,
        color: "#666",
        marginTop: 5,
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
})

export default CustomerDetailModal