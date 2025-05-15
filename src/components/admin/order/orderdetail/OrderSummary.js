import { View, Text, StyleSheet } from "react-native"
import { formatPrice } from '@utils/formatUtils';

const OrderSummary = ({ order }) => {
    return (
        <View style={styles.section}>
            <Text style={styles.sectionTitle}>Tổng cộng</Text>
            <View style={styles.summaryRow}>
                <Text style={styles.summaryLabel}>Tạm tính:</Text>
                <Text style={styles.summaryValue}>{formatPrice(order.total)}</Text>
            </View>
            <View style={styles.summaryRow}>
                <Text style={styles.summaryLabel}>Phí vận chuyển:</Text>
                <Text style={styles.summaryValue}>{formatPrice(order.shipping.fee)}</Text>
            </View>
            {order.discount > 0 && (
                <View style={styles.summaryRow}>
                    <Text style={styles.summaryLabel}>Giảm giá:</Text>
                    <Text style={[styles.summaryValue, { color: "#e30019" }]}>-{formatPrice(order.discount)}</Text>
                </View>
            )}
            <View style={styles.summaryRow}>
                <Text style={styles.summaryLabel}>Thuế (VAT):</Text>
                <Text style={styles.summaryValue}>0 đ</Text>
            </View>
            <View style={[styles.summaryRow, styles.totalRow]}>
                <Text style={styles.totalLabel}>Tổng cộng:</Text>
                <Text style={styles.totalValue}>{formatPrice(order.total)}</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    section: {
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
    sectionTitle: {
        fontSize: 16,
        fontWeight: "bold",
        color: "#333",
        marginBottom: 10,
    },
    summaryRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 8,
    },
    summaryLabel: {
        fontSize: 14,
        color: "#666",
    },
    summaryValue: {
        fontSize: 14,
        color: "#333",
    },
    totalRow: {
        borderTopWidth: 1,
        borderTopColor: "#eee",
        paddingTop: 10,
        marginTop: 5,
    },
    totalLabel: {
        fontSize: 16,
        fontWeight: "bold",
        color: "#333",
    },
    totalValue: {
        fontSize: 16,
        fontWeight: "bold",
        color: "#e30019",
    },
})

export default OrderSummary