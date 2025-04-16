import { View, Text, StyleSheet } from "react-native"

const SummarySection = ({ calculateSubtotal, calculateDiscount, calculateTotal, formatPrice }) => (
    <View style={styles.summaryContainer}>
        <Text style={styles.summaryTitle}>Tóm tắt đơn hàng</Text>
        <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Tạm tính</Text>
            <Text style={styles.summaryValue}>{formatPrice(calculateSubtotal())}</Text>
        </View>
        <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Giảm giá</Text>
            <Text style={styles.discountValue}>-{formatPrice(calculateDiscount())}</Text>
        </View>
        <View style={[styles.summaryRow, styles.totalRow]}>
            <Text style={styles.totalLabel}>Tổng cộng</Text>
            <Text style={styles.totalValue}>{formatPrice(calculateTotal())}</Text>
        </View>
    </View>
)

const styles = StyleSheet.create({
    summaryContainer: {
        backgroundColor: "#fff",
        padding: 15,
        marginBottom: 80,
    },
    summaryTitle: {
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

export default SummarySection