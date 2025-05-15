import { View, Text, StyleSheet } from "react-native"

const ShippingAddress = ({ order }) => {
    return (
        <View style={styles.section}>
            <Text style={styles.sectionTitle}>Địa chỉ giao hàng</Text>
            <Text style={styles.addressText}>{order.shipping.addressDetail}</Text>
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
    addressText: {
        fontSize: 14,
        color: "#333",
        lineHeight: 20,
    },
})

export default ShippingAddress