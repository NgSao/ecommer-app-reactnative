import { TouchableOpacity, Image, Text, View, StyleSheet } from "react-native"

const ProductItem = ({ item, navigateToProductDetail, formatPrice, addToCart }) => (
    <TouchableOpacity style={styles.productItem} onPress={() => navigateToProductDetail(item)}>
        <Image source={{ uri: item.image }} style={styles.productImage} resizeMode="contain" />
        <View style={styles.productInfo}>
            <Text style={styles.productName} numberOfLines={2}>
                {item.name}
            </Text>
            <Text style={styles.productPrice}>{formatPrice(item.price)}đ</Text>
            {item.originalPrice > item.price && (
                <Text style={styles.originalPrice}>{formatPrice(item.originalPrice)}đ</Text>
            )}
            <TouchableOpacity style={styles.addToCartButton} onPress={() => addToCart(item, 1)}>
                <Text style={styles.addToCartText}>Thêm vào giỏ</Text>
            </TouchableOpacity>
        </View>
    </TouchableOpacity>
)

const styles = StyleSheet.create({
    productItem: {
        flexDirection: "row",
        backgroundColor: "#fff",
        borderRadius: 10,
        padding: 10,
        marginBottom: 10,
        borderWidth: 1,
        borderColor: "#eee",
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
    productPrice: {
        fontSize: 14,
        color: "#e30019",
        fontWeight: "bold",
    },
    originalPrice: {
        fontSize: 12,
        color: "#999",
        textDecorationLine: "line-through",
        marginBottom: 5,
    },
    addToCartButton: {
        backgroundColor: "#e30019",
        borderRadius: 5,
        padding: 5,
        alignItems: "center",
        marginTop: 5,
        alignSelf: "flex-start",
    },
    addToCartText: {
        color: "#fff",
        fontSize: 12,
        fontWeight: "bold",
    },
})

export default ProductItem