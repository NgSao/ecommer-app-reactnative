import { TouchableOpacity, Image, Text, View, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const ListItem = ({ item, navigateToProductDetail, formatPrice, addToCart, addToWishlist, isInWishlist }) => {
    const handleAddToCart = () => {
        const productToAdd = {
            id: item.id,
            name: item.name,
            price: item.price,
            image: item.image,
            maxQuantity: item.stock
        };

        const options = item.color || item.storage
            ? {
                color: item.color,
                storage: item.storage
            }
            : {};

        addToCart(productToAdd, 1, options);
    };
    return (
        <TouchableOpacity style={styles.listItem} onPress={() => navigateToProductDetail(item)}>
            <Image
                source={{ uri: item.image || "https://via.placeholder.com/100" }}
                style={styles.listItemImage}
                resizeMode="contain"
            />
            <View style={styles.listItemContent}>
                <Text style={styles.listItemName} numberOfLines={2}>
                    {item.name}
                </Text>
                <View style={styles.priceContainer}>
                    <Text style={styles.productPrice}>{formatPrice(item.price)}</Text>
                    {item.originalPrice > item.price && (
                        <Text style={styles.originalPrice}>{formatPrice(item.originalPrice)}</Text>
                    )}
                </View>
                {item.discount > 0 && (
                    <View style={styles.listDiscountBadge}>
                        <Text style={styles.discountText}>-{item.discount}%</Text>
                    </View>
                )}
                <View style={styles.listItemActions}>
                    <TouchableOpacity style={styles.listAddToCartButton} onPress={handleAddToCart}>
                        <Text style={styles.addToCartText}>Thêm vào giỏ</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.listWishlistButton} onPress={() => addToWishlist(item)}>
                        <Ionicons
                            name={isInWishlist(item.id) ? "heart" : "heart-outline"}
                            size={20}
                            color={isInWishlist(item.id) ? "#e30019" : "#666"}
                        />
                    </TouchableOpacity>
                </View>
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    listItem: {
        flexDirection: "row",
        backgroundColor: "#fff",
        borderRadius: 10,
        padding: 10,
        marginBottom: 10,
        borderWidth: 1,
        borderColor: "#eee",
    },
    listItemImage: {
        width: 100,
        height: 100,
        marginRight: 10,
    },
    listItemContent: {
        flex: 1,
    },
    listItemName: {
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
    listDiscountBadge: {
        backgroundColor: "#ff9800",
        borderRadius: 10,
        paddingHorizontal: 5,
        height: 20,
        justifyContent: "center",
        alignItems: "center",
        alignSelf: "flex-start",
        marginBottom: 5,
    },
    discountText: {
        color: "#fff",
        fontSize: 10,
        fontWeight: "bold",
    },
    listItemActions: {
        flexDirection: "row",
        alignItems: "center",
    },
    listAddToCartButton: {
        backgroundColor: "#e30019",
        borderRadius: 5,
        paddingVertical: 5,
        paddingHorizontal: 10,
        marginRight: 10,
    },
    addToCartText: {
        color: "#fff",
        fontSize: 12,
        fontWeight: "bold",
    },
    listWishlistButton: {
        padding: 5,
    },
});

export default ListItem;