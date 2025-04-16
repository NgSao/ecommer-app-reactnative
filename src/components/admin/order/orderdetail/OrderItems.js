import { View, Text, Image, StyleSheet } from "react-native"
import { formatCurrency } from '@utils/formatUtils';

const OrderItems = ({ items }) => {
    return (
        <View style={styles.section}>
            <Text style={styles.sectionTitle}>Sản phẩm</Text>
            {items.map((item) => (
                <View key={item.id} style={styles.productItem}>
                    <Image source={{ uri: item.image }} style={styles.productImage} />
                    <View style={styles.productInfo}>
                        <Text style={styles.productName}>{item.name}</Text>
                        <Text style={styles.productVariant}>{item.variant && `Phiên bản: ${item.variant}`}</Text>
                        <View style={styles.productPriceRow}>
                            <Text style={styles.productPrice}>{formatCurrency(item.price)}</Text>
                            <Text style={styles.productQuantity}>x{item.quantity}</Text>
                        </View>
                        <Text style={styles.productTotal}>{formatCurrency(item.price * item.quantity)}</Text>
                    </View>
                </View>
            ))}
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
    productItem: {
        flexDirection: "row",
        borderBottomWidth: 1,
        borderBottomColor: "#eee",
        paddingVertical: 10,
    },
    productImage: {
        width: 70,
        height: 70,
        borderRadius: 8,
        marginRight: 10,
    },
    productInfo: {
        flex: 1,
    },
    productName: {
        fontSize: 14,
        fontWeight: "bold",
        color: "#333",
        marginBottom: 5,
    },
    productVariant: {
        fontSize: 12,
        color: "#666",
        marginBottom: 5,
    },
    productPriceRow: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 5,
    },
    productPrice: {
        fontSize: 14,
        color: "#333",
        marginRight: 10,
    },
    productQuantity: {
        fontSize: 14,
        color: "#666",
    },
    productTotal: {
        fontSize: 14,
        fontWeight: "bold",
        color: "#e30019",
    },
})

export default OrderItems