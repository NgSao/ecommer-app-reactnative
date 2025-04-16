import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native"
import { Ionicons } from "@expo/vector-icons"
import { formatCurrency } from '@utils/formatUtils';

const CartItem = ({ item, updateQuantity, removeFromCart }) => {
    return (
        <View style={styles.cartItem}>
            <Image source={{ uri: item.image }} style={styles.cartItemImage} />
            <View style={styles.cartItemInfo}>
                <Text style={styles.cartItemName}>{item.name}</Text>
                {item.variant && <Text style={styles.cartItemVariant}>{item.variant}</Text>}
                <Text style={styles.cartItemPrice}>{formatCurrency(item.price)}</Text>

                <View style={styles.cartItemActions}>
                    <View style={styles.quantityControls}>
                        <TouchableOpacity
                            style={styles.quantityButton}
                            onPress={() => updateQuantity(item.id, item.quantity - 1)}
                        >
                            <Ionicons name="remove" size={16} color="#333" />
                        </TouchableOpacity>
                        <Text style={styles.cartItemQuantity}>{item.quantity}</Text>
                        <TouchableOpacity
                            style={styles.quantityButton}
                            onPress={() => updateQuantity(item.id, item.quantity + 1)}
                        >
                            <Ionicons name="add" size={16} color="#333" />
                        </TouchableOpacity>
                    </View>

                    <TouchableOpacity style={styles.removeButton} onPress={() => removeFromCart(item.id)}>
                        <Ionicons name="trash-outline" size={16} color="#e30019" />
                    </TouchableOpacity>
                </View>
            </View>
            <Text style={styles.cartItemTotal}>{formatCurrency(item.price * item.quantity)}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    cartItem: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#f9f9f9",
        borderRadius: 8,
        padding: 10,
        marginBottom: 10,
    },
    cartItemImage: {
        width: 60,
        height: 60,
        borderRadius: 5,
        marginRight: 10,
    },
    cartItemInfo: {
        flex: 1,
    },
    cartItemName: {
        fontSize: 14,
        fontWeight: "bold",
        color: "#333",
        marginBottom: 3,
    },
    cartItemVariant: {
        fontSize: 12,
        color: "#666",
        marginBottom: 3,
    },
    cartItemPrice: {
        fontSize: 13,
        color: "#e30019",
        marginBottom: 5,
    },
    cartItemActions: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
    },
    quantityControls: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#fff",
        borderRadius: 5,
        borderWidth: 1,
        borderColor: "#ddd",
    },
    quantityButton: {
        padding: 5,
    },
    cartItemQuantity: {
        paddingHorizontal: 10,
        fontSize: 14,
    },
    removeButton: {
        padding: 5,
    },
    cartItemTotal: {
        fontSize: 14,
        fontWeight: "bold",
        color: "#333",
        width: 80,
        textAlign: "right",
    },
})

export default CartItem