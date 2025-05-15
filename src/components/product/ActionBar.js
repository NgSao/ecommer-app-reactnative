import { View, TouchableOpacity, Text, StyleSheet } from "react-native"
import { Ionicons } from "@expo/vector-icons"

const ActionBar = ({
    handleAddToWishlist,
    isInWishlist,
    handleAddToCart,
    handleBuyNow,
    selectedVariant,
    product,
}) => (
    <View style={styles.actionBar}>
        <TouchableOpacity style={styles.wishlistButton} onPress={handleAddToWishlist}>
            <Ionicons
                name={isInWishlist(selectedVariant ? selectedVariant.id : product?.id) ? "heart" : "heart-outline"}
                size={24}
                color={isInWishlist(selectedVariant ? selectedVariant.id : product?.id) ? "#e30019" : "#333"}
            />
        </TouchableOpacity>
        <TouchableOpacity
            style={[
                styles.addToCartButton,
                (selectedVariant
                    ? selectedVariant.stock <= 0
                    : !product || product.stock <= 0) && styles.disabledActionButton,
            ]}
            onPress={handleAddToCart}
            disabled={selectedVariant ? selectedVariant.stock <= 0 : !product || product.stock <= 0}
        >
            <Text style={styles.addToCartText}>Thêm vào giỏ hàng</Text>
        </TouchableOpacity>
        <TouchableOpacity
            style={[
                styles.buyNowButton,
                (selectedVariant
                    ? selectedVariant.stock <= 0
                    : !product || product.stock <= 0) && styles.disabledActionButton,
            ]}
            onPress={handleBuyNow}
            disabled={selectedVariant ? selectedVariant.stock <= 0 : !product || product.stock <= 0}
        >
            <Text style={styles.buyNowText}>Mua ngay</Text>
        </TouchableOpacity>
    </View>
)

const styles = StyleSheet.create({
    actionBar: {
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: "#fff",
        flexDirection: "row",
        padding: 10,
        borderTopWidth: 1,
        borderTopColor: "#eee",
    },
    wishlistButton: {
        width: 50,
        height: 50,
        justifyContent: "center",
        alignItems: "center",
        borderWidth: 1,
        borderColor: "#ddd",
        borderRadius: 5,
    },
    addToCartButton: {
        flex: 1,
        height: 50,
        backgroundColor: "#FFF0F0",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 5,
        marginHorizontal: 10,
        borderWidth: 1,
        borderColor: "#e30019",
    },
    addToCartText: {
        color: "#e30019",
        fontWeight: "bold",
    },
    buyNowButton: {
        flex: 1,
        height: 50,
        backgroundColor: "#e30019",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 5,
    },
    buyNowText: {
        color: "#fff",
        fontWeight: "bold",
    },
    disabledActionButton: {
        backgroundColor: "#f5f5f5",
        borderColor: "#ddd",
    },
})

export default ActionBar