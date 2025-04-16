import { View, Image, Text, TouchableOpacity, StyleSheet } from "react-native"
import { Ionicons } from "@expo/vector-icons"

const CartItem = ({ item, index, formatPrice, incrementQuantity, decrementQuantity, removeItem }) => (
    <View style={styles.cartItem}>
        <Image source={{ uri: item.image }} style={styles.productImage} resizeMode="contain" />
        <View style={styles.productInfo}>
            <Text style={styles.productName} numberOfLines={2}>
                {item.name}
            </Text>
            <Text style={styles.productVariant}>
                {item.color}
                {item.storage ? `, ${item.storage}` : ""}
                {item.size ? `, ${item.size}` : ""}
            </Text>
            <Text style={styles.productPrice}>{formatPrice(item.price)}</Text>
            <View style={styles.quantityContainer}>
                <TouchableOpacity style={styles.quantityButton} onPress={() => decrementQuantity(index)}>
                    <Ionicons name="remove" size={16} color="#333" />
                </TouchableOpacity>
                <Text style={styles.quantityText}>{item.quantity}</Text>
                <TouchableOpacity style={styles.quantityButton} onPress={() => incrementQuantity(index)}>
                    <Ionicons name="add" size={16} color="#333" />
                </TouchableOpacity>
            </View>
        </View>
        <TouchableOpacity style={styles.removeButton} onPress={() => removeItem(index)}>
            <Ionicons name="trash-outline" size={20} color="#999" />
        </TouchableOpacity>
    </View>
)

const styles = StyleSheet.create({
    cartItem: {
        flexDirection: "row",
        backgroundColor: "#fff",
        padding: 15,
        marginBottom: 10,
        borderBottomWidth: 1,
        borderBottomColor: "#eee",
    },
    productImage: {
        width: 80,
        height: 80,
        marginRight: 15,
    },
    productInfo: {
        flex: 1,
    },
    productName: {
        fontSize: 16,
        fontWeight: "bold",
        marginBottom: 5,
    },
    productVariant: {
        fontSize: 14,
        color: "#666",
        marginBottom: 5,
    },
    productPrice: {
        fontSize: 16,
        fontWeight: "bold",
        color: "#e30019",
        marginBottom: 10,
    },
    quantityContainer: {
        flexDirection: "row",
        alignItems: "center",
    },
    quantityButton: {
        borderWidth: 1,
        borderColor: "#ddd",
        width: 28,
        height: 28,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 5,
    },
    quantityText: {
        paddingHorizontal: 15,
        fontSize: 14,
    },
    removeButton: {
        padding: 10,
    },
})

export default CartItem