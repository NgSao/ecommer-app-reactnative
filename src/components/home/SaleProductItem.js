import { TouchableOpacity, View, Text, Image, StyleSheet } from "react-native"
import CountdownTimer from './CountdownTimer';

const SaleProductItem = ({ item, onPress, formatPrice }) => (
    <TouchableOpacity style={styles.saleProductItem} onPress={() => onPress(item)}>
        <View style={styles.saleProductImageContainer}>
            <Image source={{ uri: item.image }} style={styles.saleProductImage} resizeMode="contain" />
            <View style={styles.saleProductBadge}>
                <Text style={styles.saleProductBadgeText}>SALE</Text>
            </View>
        </View>
        <View style={styles.saleProductInfo}>
            <Text style={styles.saleProductName} numberOfLines={2}>
                {item.name}
            </Text>
            <View style={styles.saleProductPrices}>
                <Text style={styles.saleProductPrice}>{formatPrice(item.price)}</Text>
                <Text style={styles.saleProductOriginalPrice}>{formatPrice(item.originalPrice)}</Text>
            </View>
            <View style={styles.saleProductProgress}>
                <View
                    style={[styles.saleProductProgressBar, { width: `${(item.soldQuantity / item.saleQuantity) * 100}%` }]}
                />
                <Text style={styles.saleProductProgressText}>
                    Đã bán {item.soldQuantity}/{item.saleQuantity}
                </Text>
            </View>
            <View style={styles.saleProductCountdown}>
                <Text style={styles.saleProductCountdownLabel}>Kết thúc sau:</Text>
                <CountdownTimer endDate={item.saleEndDate} />
            </View>
        </View>
    </TouchableOpacity>
)

const styles = StyleSheet.create({
    saleProductItem: {
        backgroundColor: "#fff",
        borderRadius: 10,
        width: 200,
        marginLeft: 10,
        marginRight: 5,
        overflow: "hidden",
    },
    saleProductImageContainer: {
        position: "relative",
        height: 150,
        backgroundColor: "#f9f9f9",
    },
    saleProductImage: {
        width: "100%",
        height: "100%",
    },
    saleProductBadge: {
        position: "absolute",
        top: 10,
        left: 10,
        backgroundColor: "#e30019",
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 3,
    },
    saleProductBadgeText: {
        color: "#fff",
        fontWeight: "bold",
        fontSize: 12,
    },
    saleProductInfo: {
        padding: 10,
    },
    saleProductName: {
        fontSize: 14,
        fontWeight: "bold",
        marginBottom: 5,
        height: 40,
    },
    saleProductPrices: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 5,
    },
    saleProductPrice: {
        fontSize: 14,
        fontWeight: "bold",
        color: "#e30019",
        marginRight: 5,
    },
    saleProductOriginalPrice: {
        fontSize: 12,
        color: "#999",
        textDecorationLine: "line-through",
    },
    saleProductProgress: {
        height: 15,
        backgroundColor: "rgba(0, 0, 0, 0.1)",
        borderRadius: 7.5,
        marginBottom: 5,
        overflow: "hidden",
        position: "relative",
    },
    saleProductProgressBar: {
        position: "absolute",
        top: 0,
        left: 0,
        height: "100%",
        backgroundColor: "#ffcc00",
    },
    saleProductProgressText: {
        position: "absolute",
        width: "100%",
        textAlign: "center",
        fontSize: 10,
        fontWeight: "bold",
        color: "#000",
        lineHeight: 15,
    },
    saleProductCountdown: {
        marginTop: 5,
    },
    saleProductCountdownLabel: {
        fontSize: 12,
        color: "#666",
        marginBottom: 2,
    },
})

export default SaleProductItem