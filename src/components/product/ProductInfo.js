import { View, Text, StyleSheet } from "react-native"
import { Ionicons } from "@expo/vector-icons"
import CountdownTimer from './../home/CountdownTimer';

const ProductInfo = ({
    product,
    selectedVariant,
    formatPrice,
    renderRatingStars,
    getStockStatusText,
    getStockStatusColor,
}) => {
    return (
        <View style={styles.infoContainer}>
            <Text style={styles.productName}>
                {product.name} {selectedVariant ? `- ${selectedVariant.color} ${selectedVariant.storage}` : ""}
            </Text>
            <View style={styles.ratingContainer}>
                {renderRatingStars(product.rating || 0)}
                <Text style={styles.ratingText}>({product.ratingCount || 0} đánh giá)</Text>
            </View>
            <View style={styles.priceContainer}>
                {selectedVariant && (
                    <>
                        <Text style={styles.productPrice}>{formatPrice(selectedVariant.price)}</Text>
                        {selectedVariant.originalPrice > selectedVariant.price && (
                            <Text style={styles.originalPrice}>{formatPrice(selectedVariant.originalPrice)}</Text>
                        )}
                    </>
                )}
            </View>
            <View style={styles.stockContainer}>
                <Text style={[styles.stockStatus, { color: getStockStatusColor() }]}>{getStockStatusText()}</Text>
            </View>
            {product.saleEndDate && (
                <View style={styles.saleContainer}>
                    <View style={styles.saleHeader}>
                        <Ionicons name="flash" size={20} color="#fff" />
                        <Text style={styles.saleTitle}>FLASH SALE</Text>
                    </View>
                    <CountdownTimer endDate={product.saleEndDate} />
                    {product.saleQuantity && (
                        <View style={styles.saleProgress}>
                            <View
                                style={[
                                    styles.saleProgressBar,
                                    { width: `${(product.soldQuantity / product.saleQuantity) * 100}%` },
                                ]}
                            />
                            <Text style={styles.saleProgressText}>
                                Đã bán {product.soldQuantity}/{product.saleQuantity}
                            </Text>
                        </View>
                    )}
                </View>
            )}
            {product.promotions && product.promotions.length > 0 && (
                <View style={styles.promotionContainer}>
                    {product.promotions.map((promo, index) => (
                        <View key={index} style={styles.promotionItem}>
                            <Ionicons name="gift-outline" size={16} color="#e30019" style={styles.promotionIcon} />
                            <Text style={styles.promotionText}>{promo}</Text>
                        </View>
                    ))}
                </View>
            )}
        </View>
    )
}

const styles = StyleSheet.create({
    infoContainer: {
        backgroundColor: "#fff",
        padding: 15,
        marginTop: 10,
    },
    productName: {
        fontSize: 20,
        fontWeight: "bold",
        marginBottom: 10,
    },
    ratingContainer: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 10,
    },
    ratingText: {
        marginLeft: 5,
        color: "#666",
        fontSize: 14,
    },
    priceContainer: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 10,
    },
    productPrice: {
        fontSize: 22,
        fontWeight: "bold",
        color: "#e30019",
        marginRight: 10,
    },
    originalPrice: {
        fontSize: 16,
        color: "#999",
        textDecorationLine: "line-through",
    },
    stockContainer: {
        marginBottom: 10,
    },
    stockStatus: {
        fontSize: 14,
        fontWeight: "500",
    },
    saleContainer: {
        backgroundColor: "#e30019",
        borderRadius: 5,
        padding: 10,
        marginTop: 5,
        marginBottom: 10,
    },
    saleHeader: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 5,
    },
    saleTitle: {
        color: "#fff",
        fontWeight: "bold",
        fontSize: 16,
        marginLeft: 5,
    },
    saleProgress: {
        height: 20,
        backgroundColor: "rgba(255, 255, 255, 0.3)",
        borderRadius: 10,
        marginTop: 10,
        overflow: "hidden",
        position: "relative",
    },
    saleProgressBar: {
        position: "absolute",
        top: 0,
        left: 0,
        height: "100%",
        backgroundColor: "#fff",
    },
    saleProgressText: {
        position: "absolute",
        width: "100%",
        textAlign: "center",
        color: "#000",
        fontWeight: "bold",
        fontSize: 12,
        lineHeight: 20,
    },
    promotionContainer: {
        marginTop: 10,
    },
    promotionItem: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 5,
    },
    promotionIcon: {
        marginRight: 5,
    },
    promotionText: {
        color: "#333",
        fontSize: 14,
    },
})

export default ProductInfo