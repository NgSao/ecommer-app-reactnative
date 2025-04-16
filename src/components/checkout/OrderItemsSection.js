import { View, Text, StyleSheet } from "react-native"

const OrderItemsSection = ({ cartItems, formatPrice }) => (
    <View style={styles.section}>
        <Text style={styles.sectionTitle}>Sản phẩm</Text>
        {cartItems.map((item, index) => (
            <View key={index} style={styles.orderItem}>
                <Text style={styles.orderItemName}>{item.name}</Text>
                <View style={styles.orderItemDetails}>
                    <Text style={styles.orderItemVariant}>
                        {item.color}
                        {item.storage ? `, ${item.storage}` : ""}
                        {item.size ? `, ${item.size}` : ""}
                    </Text>
                    <Text style={styles.orderItemQuantity}>x{item.quantity}</Text>
                </View>
                <Text style={styles.orderItemPrice}>{formatPrice(item.price * item.quantity)}</Text>
            </View>
        ))}
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
    orderItem: {
        borderBottomWidth: 1,
        borderBottomColor: "#eee",
        paddingVertical: 10,
    },
    orderItemName: {
        fontSize: 14,
        fontWeight: "bold",
        marginBottom: 5,
    },
    orderItemDetails: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 5,
    },
    orderItemVariant: {
        fontSize: 14,
        color: "#666",
    },
    orderItemQuantity: {
        fontSize: 14,
        color: "#666",
    },
    orderItemPrice: {
        fontSize: 14,
        fontWeight: "bold",
        color: "#e30019",
        textAlign: "right",
    },
})

export default OrderItemsSection