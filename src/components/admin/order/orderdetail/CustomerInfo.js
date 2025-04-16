import { View, Text, StyleSheet } from "react-native"

const CustomerInfo = ({ order }) => {
    return (
        <View style={styles.section}>
            <Text style={styles.sectionTitle}>Thông tin khách hàng</Text>
            <View style={styles.infoRow}>
                <Text style={styles.infoLabel}>Tên khách hàng:</Text>
                <Text style={styles.infoValue}>{order.customerName}</Text>
            </View>
            <View style={styles.infoRow}>
                <Text style={styles.infoLabel}>Số điện thoại:</Text>
                <Text style={styles.infoValue}>{order.customerPhone}</Text>
            </View>
            <View style={styles.infoRow}>
                <Text style={styles.infoLabel}>Email:</Text>
                <Text style={styles.infoValue}>{order.customerEmail}</Text>
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
    infoRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 8,
    },
    infoLabel: {
        fontSize: 14,
        color: "#666",
    },
    infoValue: {
        fontSize: 14,
        color: "#333",
        fontWeight: "500",
    },
})

export default CustomerInfo