import { View, Text, TouchableOpacity, StyleSheet } from "react-native"
import { Ionicons } from "@expo/vector-icons"
import { formatDateFull, formatPrice } from "@utils/formatUtils"

const OrderItem = ({ item, navigateToOrderDetail, getStatusColor, getStatusText }) => (
    <TouchableOpacity style={styles.orderItem} onPress={() => navigateToOrderDetail(item.id)}>
        <View style={styles.orderHeader}>
            <Text style={styles.orderId}>Đơn hàng#{item.orderCode}</Text>
            <View style={[styles.statusBadge, { backgroundColor: getStatusColor(item.orderStatus) }]}>
                <Text style={styles.statusText}>{getStatusText(item.orderStatus)} </Text>
            </View>
        </View>
        <View style={styles.orderInfo}>
            <Text style={styles.orderDate}>Ngày đặt: {formatDateFull(item.createdAt)}</Text>

        </View>
        <View style={styles.orderInfo}>
            <Text style={styles.orderTotal}>Tổng tiền: {formatPrice(item.total)}</Text>

        </View>
        {item.promoCode && (
            <View style={styles.orderInfo}>

                <Text style={styles.orderDiscount}>
                    Mã giảm giá: {item.promoCode} (-{formatPrice(item.discount)})
                </Text>
            </View>

        )}


        <View style={styles.orderItems}>
            <Text style={styles.orderItemsTitle}>Sản phẩm:</Text>
            {item.items.map((product, index) => (
                <Text key={index} style={styles.orderItemText} numberOfLines={1}>
                    {product.name} x{product.quantity}
                </Text>
            ))}
        </View>
        <View style={styles.orderFooter}>
            <TouchableOpacity style={styles.viewDetailButton} onPress={() => navigateToOrderDetail(item.id)}>
                <Text style={styles.viewDetailText}>Xem chi tiết</Text>
                <Ionicons name="chevron-forward" size={16} color="#e30019" />
            </TouchableOpacity>
        </View>
    </TouchableOpacity>
)

const styles = StyleSheet.create({
    orderItem: {
        backgroundColor: "#fff",
        borderRadius: 10,
        padding: 15,
        marginBottom: 10,
        borderWidth: 1,
        borderColor: "#eee",
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
    },
    statusBadge: {
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 10,
    },
    statusText: {
        color: "#fff",
        fontSize: 12,
        fontWeight: "bold",
    },
    orderInfo: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 10,
    },
    orderDate: {
        fontSize: 14,
        color: "#666",
    },
    orderTotal: {
        fontSize: 14,
        fontWeight: "bold",
    },
    orderItems: {
        marginBottom: 10,
    },
    orderItemsTitle: {
        fontSize: 14,
        fontWeight: "bold",
        marginBottom: 5,
    },
    orderItemText: {
        fontSize: 14,
        color: "#666",
        marginBottom: 2,
    },
    orderFooter: {
        borderTopWidth: 1,
        borderTopColor: "#eee",
        paddingTop: 10,
        alignItems: "flex-end",
    },
    viewDetailButton: {
        flexDirection: "row",
        alignItems: "center",
    },
    viewDetailText: {
        color: "#e30019",
        fontSize: 14,
        fontWeight: "bold",
        marginRight: 5,
    },
    orderDiscount: {
        fontSize: 14,
        color: "#e30019",
    },
})

export default OrderItem