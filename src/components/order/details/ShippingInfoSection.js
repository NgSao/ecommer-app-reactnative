import { View, Text, StyleSheet } from "react-native"

const ShippingInfoSection = ({ shipping }) => (
    <View style={styles.section}>
        <Text style={styles.sectionTitle}>Thông tin giao hàng</Text>
        <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Người nhận:</Text>
            <Text style={styles.infoValue}>{shipping.fullName}</Text>
        </View>
        <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Số điện thoại:</Text>
            <Text style={styles.infoValue}>{shipping.phone}</Text>
        </View>
        <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Địa chỉ:</Text>
            <Text style={styles.infoValue}>{shipping.addressDetail}</Text>
        </View>
        <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Phương thức:</Text>
            <Text style={styles.infoValue}>{shipping.method}</Text>
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
    infoRow: {
        flexDirection: "row",
        marginBottom: 10,
    },
    infoLabel: {
        width: 120,
        fontSize: 14,
        color: "#666",
    },
    infoValue: {
        flex: 1,
        fontSize: 14,
        fontWeight: "500",
    },
})

export default ShippingInfoSection