import { View, Text, TouchableOpacity, StyleSheet } from "react-native"
import { Ionicons } from "@expo/vector-icons"

const QuickActions = ({ onNavigate }) => {
    const actions = [
        { icon: "bar-chart-outline", color: "#e30019", bgColor: "rgba(227, 0, 25, 0.1)", label: "Thống kê", tab: "charts" },
        { icon: "list-outline", color: "#3498db", bgColor: "rgba(52, 152, 219, 0.1)", label: "Đơn hàng", screen: "AdminOrdersManagement" },
        { icon: "phone-portrait-outline", color: "#2ecc71", bgColor: "rgba(46, 204, 113, 0.1)", label: "Sản phẩm", screen: "AdminProductsManagement" },
        { icon: "grid-outline", color: "#9b59b6", bgColor: "rgba(155, 89, 182, 0.1)", label: "Danh mục", screen: "AdminCategoriesManagement" },
        { icon: "pricetag-outline", color: "#f39c12", bgColor: "rgba(243, 156, 18, 0.1)", label: "Khuyến mãi", screen: "AdminPromotionsManagement" },
        { icon: "people-outline", color: "#e74c3c", bgColor: "rgba(231, 76, 60, 0.1)", label: "Khách hàng", screen: "AdminCustomersManagement" },
        { icon: "download-outline", color: "#34495e", bgColor: "rgba(52, 73, 94, 0.1)", label: "Xuất báo cáo", screen: "AdminExportData" },
        { icon: "settings-outline", color: "#7f8c8d", bgColor: "rgba(127, 140, 141, 0.1)", label: "Cài đặt", screen: "AdminSettings" },
        { icon: "star-half-outline", color: "#f39c12", bgColor: "rgba(243, 156, 18, 0.1)", label: "Đánh giá", screen: "AdminReviewsManagement" },
        { icon: "chatbubbles-outline", color: "#3498db", bgColor: "rgba(52, 152, 219, 0.1)", label: "Tin nhắn", screen: "AdminChatManagement" },
    ]

    return (
        <View style={styles.quickActionsContainer}>
            <Text style={styles.sectionTitle}>Quản lý cửa hàng</Text>
            <View style={styles.quickActionsGrid}>
                {actions.map((action, index) => (
                    <TouchableOpacity
                        key={index}
                        style={styles.quickActionButton}
                        onPress={() => onNavigate(action.tab || action.screen)}
                    >
                        <View style={[styles.quickActionIcon, { backgroundColor: action.bgColor }]}>
                            <Ionicons name={action.icon} size={24} color={action.color} />
                        </View>
                        <Text style={styles.quickActionText}>{action.label}</Text>
                    </TouchableOpacity>
                ))}
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    quickActionsContainer: {
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
    sectionTitle: {
        fontSize: 18,
        fontWeight: "bold",
        color: "#333",
        marginBottom: 15,
    },
    quickActionsGrid: {
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "space-between",
    },
    quickActionButton: {
        width: "23%",
        alignItems: "center",
        marginBottom: 15,
    },
    quickActionIcon: {
        width: 50,
        height: 50,
        borderRadius: 25,
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 8,
    },
    quickActionText: {
        fontSize: 12,
        color: "#333",
        textAlign: "center",
    },
})

export default QuickActions