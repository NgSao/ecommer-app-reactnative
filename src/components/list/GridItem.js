import { TouchableOpacity, Image, Text, View, StyleSheet } from "react-native"
import { Ionicons } from "@expo/vector-icons"

const GridItem = ({ item, navigateToProductDetail, formatPrice, addToCart, addToWishlist, isInWishlist }) => (
    <TouchableOpacity style={styles.gridItem} onPress={() => navigateToProductDetail(item)}>
        <Image source={{ uri: item.image }} style={styles.gridItemImage} resizeMode="contain" />
        {item.discount > 0 && (
            <View style={styles.discountBadge}>
                <Text style={styles.discountText}>-{item.discount}%</Text>
            </View>
        )}
        <Text style={styles.gridItemName} numberOfLines={2}>
            {item.name}
        </Text>
        <View style={styles.priceContainer}>
            <Text style={styles.productPrice}>{formatPrice(item.price)}đ</Text>
            {item.originalPrice > item.price && (
                <Text style={styles.originalPrice}>{formatPrice(item.originalPrice)}đ</Text>
            )}
        </View>
        <View style={styles.productActions}>
            <TouchableOpacity style={styles.addToCartButton} onPress={() => addToCart(item, 1)}>
                <Ionicons name="cart-outline" size={16} color="#fff" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.wishlistButton} onPress={() => addToWishlist(item)}>
                <Ionicons
                    name={isInWishlist(item.id) ? "heart" : "heart-outline"}
                    size={16}
                    color={isInWishlist(item.id) ? "#e30019" : "#666"}
                />
            </TouchableOpacity>
        </View>
    </TouchableOpacity>
)

const styles = StyleSheet.create({
    gridItem: {
        flex: 1,
        backgroundColor: "#fff",
        borderRadius: 10,
        padding: 10,
        margin: 5,
        borderWidth: 1,
        borderColor: "#eee",
    },
    gridItemImage: {
        width: "100%",
        height: 150,
        marginBottom: 10,
    },
    gridItemName: {
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
    productActions: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 5,
    },
    addToCartButton: {
        backgroundColor: "#e30019",
        borderRadius: 5,
        padding: 8,
        flex: 1,
        marginRight: 5,
        alignItems: "center",
    },
    wishlistButton: {
        width: 36,
        height: 36,
        justifyContent: "center",
        alignItems: "center",
        borderWidth: 1,
        borderColor: "#eee",
        borderRadius: 5,
    },
})

export default GridItem