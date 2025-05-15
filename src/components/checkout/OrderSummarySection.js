


import { formatPrice } from "@utils/formatUtils";
import { View, Text, StyleSheet } from "react-native";

const OrderSummarySection = ({
    calculateSubtotal,
    calculateShippingFee,
    calculatePromoDiscount,
    calculateTotal,
    appliedPromoCode,
    storeLocation,
    buyerLocation,
    shippingProvider,
    ghtkDeliveryOption,
    routeDistance

}) => {
    return (
        <View style={styles.section}>
            <Text style={styles.sectionTitle}>Tóm tắt đơn hàng</Text>
            {/* <View style={styles.summaryRow}>
                <Text style={styles.summaryLabel}>Giao hàng từ</Text>
                <Text style={styles.summaryValue}>
                    {storeLocation
                        ? `${storeLocation.district_name}, ${storeLocation.ward_name}, ${storeLocation.city}`
                        : "Đang tải..."}
                </Text>
            </View>
            <View style={styles.summaryRow}>
                <Text style={styles.summaryLabel}>Giao đến</Text>
                <Text style={styles.summaryValue}>
                    {buyerLocation
                        ? `${buyerLocation.district_name}, ${buyerLocation.ward_name}, ${buyerLocation.city}`
                        : "Vui lòng chọn địa chỉ"}
                </Text>
            </View> */}
            <View style={styles.summaryRow}>
                <Text style={styles.summaryLabel}>Tạm tính</Text>
                <Text style={styles.summaryValue}>{formatPrice(calculateSubtotal())}</Text>
            </View>
            <View style={styles.summaryRow}>
                <Text style={styles.summaryLabel}>Đơn vị vận chuyển</Text>

                <Text style={styles.summaryValue}>
                    {shippingProvider === "GHTK"
                        ? `GHTK (${ghtkDeliveryOption === "xteam" ? "Nhanh" : "Thường"})`
                        : "GHN"}
                </Text>
            </View>
            <View style={styles.summaryRow}>
                <Text style={styles.summaryLabel}>Phí vận chuyển</Text>
                <Text style={styles.summaryValue}>
                    {calculateShippingFee === null
                        ? "Đang tính..."
                        : calculateShippingFee === 0
                            ? "Miễn phí"
                            : formatPrice(calculateShippingFee)}
                </Text>
            </View>
            {routeDistance && (
                <View style={styles.summaryRow}>
                    <Text style={styles.summaryLabel}>Khoảng cách:</Text>
                    <Text style={styles.summaryValue}>{routeDistance} km</Text>
                </View>
            )}
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
    );
};

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
});

export default OrderSummarySection;