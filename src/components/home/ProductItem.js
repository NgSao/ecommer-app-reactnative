import { TouchableOpacity, View, Text, Image, StyleSheet } from "react-native"
import { Ionicons } from "@expo/vector-icons"

const ProductItem = ({ item, onPress, onAddToCart, onAddToWishlist, isInWishlist, formatPrice }) => {
    if (!item) return null

    return (
        <TouchableOpacity style={styles.productItem} onPress={() => onPress(item)}>
            <Image source={{ uri: item.image }} style={styles.productImage} resizeMode="contain" />
            {item.isHot && (
                <View style={styles.hotBadge}>
                    <Ionicons name="flame" size={12} color="#fff" />
                </View>
            )}
            {item.isNew && (
                <View style={[styles.hotBadge, styles.newBadge]}>
                    <Text style={styles.newBadgeText}>New</Text>
                </View>
            )}
            {item.discount > 0 && (
                <View style={styles.discountBadge}>
                    <Text style={styles.discountText}>-{item.discount}%</Text>
                </View>
            )}
            <Text style={styles.productName} numberOfLines={2}>
                {item.name}
            </Text>
            <View style={styles.priceContainer}>
                <Text style={styles.productPrice}>{formatPrice(item.price)}</Text>
                {item.originalPrice > item.price && (
                    <Text style={styles.originalPrice}>{formatPrice(item.originalPrice)}</Text>
                )}
            </View>
            <View style={styles.productActions}>
                <TouchableOpacity style={styles.addToCartButton} onPress={() => onAddToCart(item)}>
                    <Text style={styles.addToCartText}>Mua ngay</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.wishlistButton} onPress={() => onAddToWishlist(item)}>
                    <Ionicons
                        name={isInWishlist(item.id) ? "heart" : "heart-outline"}
                        size={20}
                        color={isInWishlist(item.id) ? "#e30019" : "#666"}
                    />
                </TouchableOpacity>
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    productItem: {
        width: 190,
        backgroundColor: "#fff",
        borderRadius: 10,
        padding: 10,
        marginRight: 10,
        borderWidth: 1,
        borderColor: "#eee",
    },
    productImage: {
        width: "100%",
        height: 120,
        marginBottom: 10,
    },
    hotBadge: {
        position: "absolute",
        top: 5,
        right: 5,
        backgroundColor: "#e30019",
        borderRadius: 10,
        width: 20,
        height: 20,
        justifyContent: "center",
        alignItems: "center",
    },
    newBadge: {
        backgroundColor: "#00a65a",
        width: "auto",
        paddingHorizontal: 5,
    },
    newBadgeText: {
        color: "#fff",
        fontSize: 10,
        fontWeight: "bold",
    },
    discountBadge: {
        position: "absolute",
        top: 5,
        left: 5,
        backgroundColor: "#ff9800",
        borderRadius: 10,
        paddingHorizontal: 5,
        height: 20,
        justifyContent: "center",
        alignItems: "center",
    },
    discountText: {
        color: "#fff",
        fontSize: 10,
        fontWeight: "bold",
    },
    productName: {
        fontSize: 14,
        fontWeight: "bold",
        marginBottom: 5,
        height: 40,
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
    productActions: {
        flexDirection: "row",
        alignItems: "center",
    },
    addToCartButton: {
        flex: 1,
        backgroundColor: "#e30019",
        borderRadius: 5,
        padding: 5,
        alignItems: "center",
        marginRight: 5,
    },
    addToCartText: {
        color: "#fff",
        fontSize: 12,
        fontWeight: "bold",
    },
    wishlistButton: {
        width: 30,
        height: 30,
        justifyContent: "center",
        alignItems: "center",
        borderWidth: 1,
        borderColor: "#eee",
        borderRadius: 15,
    },
})

export default ProductItem