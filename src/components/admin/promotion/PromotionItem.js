import { View, Text, TouchableOpacity, StyleSheet } from "react-native"
import { Ionicons } from "@expo/vector-icons"
import { formatCurrency, formatDate } from '@utils/formatUtils';

const PromotionItem = ({ item, onToggleStatus, onEdit, onDelete, onViewDetails, getStatusColor, getStatusText }) => {
    return (
        <View style={styles.promotionItem}>
            <View style={styles.promotionHeader}>
                <Text style={styles.promotionName}>{item.name}</Text>
                <View style={[styles.statusBadge, { backgroundColor: getStatusColor(item) }]}>
                    <Text style={styles.statusText}>{getStatusText(item)}</Text>
                </View>
            </View>

            <View style={styles.promotionInfo}>
                <View style={styles.infoRow}>
                    <Ionicons name="pricetag-outline" size={16} color="#666" />
                    <Text style={styles.infoText}>Mã: {item.code}</Text>
                </View>
                <View style={styles.infoRow}>
                    <Ionicons name="cash-outline" size={16} color="#666" />
                    <Text style={styles.infoText}>
                        Giảm giá: {item.discountType === "percentage" ? `${item.discountValue}%` : formatCurrency(item.discountValue)}
                    </Text>
                </View>
                <View style={styles.infoRow}>
                    <Ionicons name="calendar-outline" size={16} color="#666" />
                    <Text style={styles.infoText}>
                        Thời gian: {formatDate(item.startDate)} - {formatDate(item.endDate)}
                    </Text>
                </View>
                {item.minOrderValue > 0 && (
                    <View style={styles.infoRow}>
                        <Ionicons name="cart-outline" size={16} color="#666" />
                        <Text style={styles.infoText}>Đơn tối thiểu: {formatCurrency(item.minOrderValue)}</Text>
                    </View>
                )}
                {item.usageLimit && (
                    <View style={styles.infoRow}>
                        <Ionicons name="repeat-outline" size={16} color="#666" />
                        <Text style={styles.infoText}>
                            Đã dùng: {item.usageCount}/{item.usageLimit}
                        </Text>
                    </View>
                )}
            </View>

            <View style={styles.promotionActions}>
                <TouchableOpacity style={[styles.actionButton, styles.viewButton]} onPress={() => onViewDetails(item.id)}>
                    <Text style={styles.actionButtonText}>Xem chi tiết</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[styles.actionButton, styles.toggleButton, !item.active && styles.activateButton]}
                    onPress={() => onToggleStatus(item)}
                >
                    <Text style={styles.actionButtonText}>{item.active ? "Vô hiệu" : "Kích hoạt"}</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.actionButton, styles.editButton]} onPress={() => onEdit(item)}>
                    <Text style={styles.actionButtonText}>Sửa</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.actionButton, styles.deleteButton]} onPress={() => onDelete(item.id)}>
                    <Text style={styles.actionButtonText}>Xóa</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    promotionItem: {
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
    promotionHeader: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 10,
    },
    promotionName: {
        fontSize: 16,
        fontWeight: "bold",
        color: "#333",
        flex: 1,
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
    promotionInfo: {
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
    promotionActions: {
        flexDirection: "row",
        justifyContent: "flex-end",
        borderTopWidth: 1,
        borderTopColor: "#eee",
        paddingTop: 10,
    },
    actionButton: {
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 5,
        marginLeft: 8,
    },
    viewButton: {
        backgroundColor: "#0066cc",
    },
    toggleButton: {
        backgroundColor: "#f39c12",
    },
    activateButton: {
        backgroundColor: "#2ecc71",
    },
    editButton: {
        backgroundColor: "#3498db",
    },
    deleteButton: {
        backgroundColor: "#e74c3c",
    },
    actionButtonText: {
        fontSize: 12,
        color: "#fff",
        fontWeight: "bold",
    },
})

export default PromotionItem