import { View, Text, TouchableOpacity, Image, StyleSheet } from "react-native"
import { Ionicons } from "@expo/vector-icons"

const WishlistItem = ({ item, navigateToProductDetail, formatPrice, handleRemoveFromWishlist, handleAddToCart }) => (
    <View style={styles.wishlistItem}>
        <TouchableOpacity style={styles.productContainer} onPress={() => navigateToProductDetail(item)}>
            <Image source={{ uri: item.image }} style={styles.productImage} resizeMode="contain" />
            <View style={styles.productInfo}>
                <Text style={styles.productName} numberOfLines={2}>
                    {item.name}
                </Text>
                <View style={styles.priceContainer}>
                    <Text style={styles.productPrice}>{formatPrice(item.price)}</Text>
                    {item.originalPrice > item.price && (
                        <Text style={styles.originalPrice}>{formatPrice(item.originalPrice)}</Text>
                    )}
                </View>
                {item.discount > 0 && (
                    <View style={styles.discountBadge}>
                        <Text style={styles.discountText}>-{item.discount}%</Text>
                    </View>
                )}
            </View>
        </TouchableOpacity>
        <View style={styles.actionButtons}>
            <TouchableOpacity style={styles.addToCartButton} onPress={() => handleAddToCart(item)}>
                <Text style={styles.addToCartText}>Thêm vào giỏ</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.removeButton} onPress={() => handleRemoveFromWishlist(item.id)}>
                <Ionicons name="trash-outline" size={20} color="#666" />
            </TouchableOpacity>
        </View>
    </View>
)

const styles = StyleSheet.create({
    wishlistItem: {
        backgroundColor: "#fff",
        borderRadius: 10,
        padding: 15,
        marginBottom: 10,
        borderWidth: 1,
        borderColor: "#eee",
    },
    productContainer: {
        flexDirection: "row",
        marginBottom: 10,
    },
    productImage: {
        width: 80,
        height: 80,
        marginRight: 10,
    },
    productInfo: {
        flex: 1,
    },
    productName: {
        fontSize: 14,
        fontWeight: "bold",
        marginBottom: 5,
    },
    priceContainer: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 5,
    },
    productPrice: {
        fontSize: 14,
        color: "#e30019",
        fontWeight: "bold",
        marginRight: 5,
    },
    originalPrice: {
        fontSize: 12,
        color: "#999",
        textDecorationLine: "line-through",
    },
    discountBadge: {
        backgroundColor: "#ff9800",
        borderRadius: 10,
        paddingHorizontal: 5,
        height: 20,
        justifyContent: "center",
        alignItems: "center",
        alignSelf: "flex-start",
    },
    discountText: {
        color: "#fff",
        fontSize: 10,
        fontWeight: "bold",
    },
    actionButtons: {
        flexDirection: "row",
        borderTopWidth: 1,
        borderTopColor: "#eee",
        paddingTop: 10,
    },
    addToCartButton: {
        flex: 1,
        backgroundColor: "#e30019",
        borderRadius: 5,
        paddingVertical: 8,
        alignItems: "center",
        marginRight: 10,
    },
    addToCartText: {
        color: "#fff",
        fontWeight: "bold",
        fontSize: 14,
    },
    removeButton: {
        width: 40,
        height: 40,
        justifyContent: "center",
        alignItems: "center",
        borderWidth: 1,
        borderColor: "#eee",
        borderRadius: 5,
    },
})

export default WishlistItem