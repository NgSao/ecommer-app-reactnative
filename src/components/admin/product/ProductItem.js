import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { formatCurrency } from "@utils/formatUtils";
import { useNavigation } from "@react-navigation/native";

const ProductItem = ({ product, onEdit, onDelete }) => {
    const navigation = useNavigation();
    const totalStock =
        product.variants && product.variants.length > 0
            ? product.variants.reduce((sum, variant) => sum + (variant.stock || 0), 0)
            : product.stock || 0;

    const totalVariants =
        product.variants && product.variants.length > 0 ? product.variants.length : 0;

    // Get the first valid image or use a fallback
    const productImage =
        product.images && product.images.length > 0
            ? product.images[0]
            : "https://via.placeholder.com/80"; // Fallback image URL

    const handleViewDetails = () => {
        navigation.navigate("AdminProductDetails", { product });
    };

    return (
        <View style={styles.productItem}>
            <Image
                source={{ uri: productImage }}
                style={styles.productImage}
                onError={() => console.log(`Failed to load image for product ${product.id}`)}
            />
            <View style={styles.productInfo}>
                <Text style={styles.productName} numberOfLines={2}>
                    {product.name}
                </Text>
                <Text style={styles.productSku} numberOfLines={1}>
                    {product.sku}
                </Text>
                <Text style={styles.productCategory}>
                    {product.categories?.[0]?.name || "Không có danh mục"}
                </Text>
                <View style={styles.productPriceContainer}>
                    <Text style={styles.productPrice}>{formatCurrency(product.price)}</Text>
                    {product.originalPrice > product.price && (
                        <Text style={styles.productOriginalPrice}>
                            {formatCurrency(product.originalPrice)}
                        </Text>
                    )}
                </View>
                <View style={styles.stockContainer}>
                    <Text style={[styles.stockText, totalStock < 5 ? styles.lowStock : null]}>
                        Kho: {totalStock} sản phẩm
                    </Text>
                    <Text style={styles.variantText}>({totalVariants} biến thể)</Text>
                </View>
            </View>
            <View style={styles.productActions}>
                <TouchableOpacity style={styles.actionButton} onPress={handleViewDetails}>
                    <Ionicons name="eye-outline" size={20} color="#0066cc" />
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.actionButton}
                    onPress={() => onEdit(product.id)}
                >
                    <Ionicons name="create-outline" size={20} color="#0066cc" />
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.actionButton}
                    onPress={() => onDelete(product.id)}
                >
                    <Ionicons name="trash-outline" size={20} color="#e30019" />
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    productItem: {
        flexDirection: "row",
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
    productImage: {
        width: 80,
        height: 80,
        borderRadius: 8,
        marginRight: 15,
    },
    productInfo: {
        flex: 1,
    },
    productName: {
        fontSize: 16,
        fontWeight: "bold",
        color: "#333",
        marginBottom: 5,
    },
    productSku: {
        fontSize: 12,
        color: "#333",
    },
    productCategory: {
        fontSize: 14,
        color: "#666",
        marginBottom: 5,
    },
    productPriceContainer: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 5,
    },
    productPrice: {
        fontSize: 16,
        fontWeight: "bold",
        color: "#e30019",
        marginRight: 8,
    },
    productOriginalPrice: {
        fontSize: 14,
        color: "#999",
        textDecorationLine: "line-through",
    },
    stockContainer: {
        flexDirection: "row",
        alignItems: "center",
    },
    stockText: {
        fontSize: 14,
        color: "#666",
    },
    lowStock: {
        color: "#e30019",
    },
    variantText: {
        fontSize: 14,
        color: "#666",
        marginLeft: 5,
    },
    productActions: {
        justifyContent: "space-around",
        paddingLeft: 10,
    },
    actionButton: {
        padding: 8,
    },
});

export default ProductItem;