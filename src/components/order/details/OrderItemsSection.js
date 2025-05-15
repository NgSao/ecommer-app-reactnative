import { formatPrice } from "@utils/formatUtils"
import { View, Text, StyleSheet, Image } from "react-native"

const OrderItemsSection = ({ items }) => (
    <View style={styles.section}>
        <Text style={styles.sectionTitle}>Sản phẩm</Text>
        {items.map((item, index) => (
            <View key={index} style={styles.orderItem}>
                <Image
                    source={{ uri: item.imageUrl }}
                    style={styles.image}
                    resizeMode="cover"
                />
                <View style={styles.infoContainer}>
                    <View style={styles.header}>
                        <Text style={styles.name} numberOfLines={2}>{item.name}</Text>
                        <Text style={styles.price}>{formatPrice(item.price * item.quantity)}</Text>
                    </View>
                    <View style={styles.details}>
                        <Text style={styles.variant}>
                            {item.color}
                            {item.storage ? `, ${item.storage}` : ""}
                        </Text>
                        <Text style={styles.quantity}>x{item.quantity}</Text>
                    </View>
                </View>
            </View>
        ))}
    </View>
)

const styles = StyleSheet.create({
    section: {
        backgroundColor: "#fff",
        padding: 15,
        marginBottom: 10,
        borderRadius: 10,
    },
    sectionTitle: {
        fontSize: 16,
        fontWeight: "bold",
        marginBottom: 15,
    },
    orderItem: {
        flexDirection: "row",
        marginBottom: 15,
        paddingBottom: 10,
        borderBottomWidth: 1,
        borderBottomColor: "#eee",
    },
    image: {
        width: 60,
        height: 60,
        borderRadius: 8,
        marginRight: 10,
    },
    infoContainer: {
        flex: 1,
        justifyContent: "center",
    },
    header: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 5,
    },
    name: {
        fontSize: 14,
        fontWeight: "bold",
        flex: 1,
        marginRight: 10,
    },
    price: {
        fontSize: 14,
        fontWeight: "bold",
        color: "#e30019",
    },
    details: {
        flexDirection: "row",
        justifyContent: "space-between",
    },
    variant: {
        fontSize: 13,
        color: "#555",
    },
    quantity: {
        fontSize: 13,
        color: "#555",
    },
})

export default OrderItemsSection
