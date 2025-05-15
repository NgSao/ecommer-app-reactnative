import { View, Text, TextInput, StyleSheet } from "react-native"
import { formatCurrency } from '@utils/formatUtils';

const PaymentInfo = ({ subtotal, shippingFee, setShippingFee, discount, setDiscount, tax, total }) => {
    return (
        <View style={styles.section}>
            <Text style={styles.sectionTitle}>Thông tin thanh toán</Text>

            <View style={styles.paymentRow}>
                <Text style={styles.paymentLabel}>Tạm tính:</Text>
                <Text style={styles.paymentValue}>{formatCurrency(subtotal)}</Text>
            </View>

            <View style={styles.paymentRow}>
                <Text style={styles.paymentLabel}>Phí vận chuyển:</Text>
                <TextInput
                    style={styles.paymentInput}
                    value={shippingFee}
                    onChangeText={setShippingFee}
                    keyboardType="number-pad"
                    placeholder="0"
                />
            </View>

            <View style={styles.paymentRow}>
                <Text style={styles.paymentLabel}>Giảm giá:</Text>
                <TextInput
                    style={styles.paymentInput}
                    value={discount}
                    onChangeText={setDiscount}
                    keyboardType="number-pad"
                    placeholder="0"
                />
            </View>

            <View style={styles.paymentRow}>
                <Text style={styles.paymentLabel}>Thuế (VAT 0%):</Text>
                <Text style={styles.paymentValue}>{formatCurrency(tax)}</Text>
            </View>

            <View style={styles.totalRow}>
                <Text style={styles.totalLabel}>Tổng cộng:</Text>
                <Text style={styles.totalValue}>{formatCurrency(total)}</Text>
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
        marginBottom: 15,
    },
    paymentRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 10,
    },
    paymentLabel: {
        fontSize: 14,
        color: "#666",
    },
    paymentValue: {
        fontSize: 14,
        color: "#333",
        fontWeight: "500",
    },
    paymentInput: {
        borderWidth: 1,
        borderColor: "#ddd",
        borderRadius: 5,
        paddingHorizontal: 10,
        paddingVertical: 5,
        width: 120,
        textAlign: "right",
    },
    totalRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
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
        fontSize: 18,
        fontWeight: "bold",
        color: "#e30019",
    },
})

export default PaymentInfo