import { View, Text, StyleSheet } from "react-native"

const OrderSummarySection = ({
    calculateSubtotal,
    calculateShippingFee,
    calculatePromoDiscount,
    calculateTotal,
    formatPrice,
    appliedPromoCode,
}) => (
    <View style={styles.section}>
        <Text style={styles.sectionTitle}>Tóm tắt đơn hàng</Text>
        <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Tạm tính</Text>
            <Text style={styles.summaryValue}>{formatPrice(calculateSubtotal())}</Text>
        </View>
        <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Phí vận chuyển</Text>
            <Text style={styles.summaryValue}>
                {calculateShippingFee() === 0 ? "Miễn phí" : formatPrice(calculateShippingFee())}
            </Text>
        </View>
        {appliedPromoCode && (
            <View style={styles.summaryRow}>
                <Text style={styles.summaryLabel}>Giảm giá</Text>
                <Text style={styles.discountValue}>-{formatPrice(calculatePromoDiscount())}</Text>
            </View>
        )}
        <View style={[styles.summaryRow, styles.totalRow]}>
            <Text style={styles.totalLabel}>Tổng cộng</Text>
            <Text style={styles.totalValue}>{formatPrice(calculateTotal())}</Text>
        </View>
    </View>
)

const styles = StyleSheet.create({
    section: {
        backgroundColor: "#fff",
        padding: 15,
        marginBottom: 10,
    },
    sectionTitle: {
        fontSize: 16,
        fontWeight: "bold",
        marginBottom: 15,
    },
    summaryRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        paddingVertical: 10,
        borderBottomWidth: 1,
        borderBottomColor: "#eee",
    },
    summaryLabel: {
        fontSize: 14,
        color: "#666",
    },
    summaryValue: {
        fontSize: 14,
        fontWeight: "500",
    },
    discountValue: {
        fontSize: 14,
        fontWeight: "500",
        color: "#e30019",
    },
    totalRow: {
        borderBottomWidth: 0,
        marginTop: 5,
    },
    totalLabel: {
        fontSize: 16,
        fontWeight: "bold",
    },
    totalValue: {
        fontSize: 18,
        fontWeight: "bold",
        color: "#e30019",
    },
})

export default OrderSummarySection