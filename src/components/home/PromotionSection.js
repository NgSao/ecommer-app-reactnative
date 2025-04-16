import { View, Text, StyleSheet } from "react-native"

const PromotionSection = () => (
    <View style={styles.promotionContainer}>
        <View style={styles.promotionHeader}>
            <Text style={styles.promotionTitle}>Siêu Deal - Liệu Xiêu Phải Đẹp</Text>
            <Text style={styles.promotionSubtitle}>TỪ 19.03 - 23.03</Text>
        </View>
        <View style={styles.promotionItems}>
            <View style={styles.promotionItem}>
                <Text style={styles.promotionItemTitle}>WATCH</Text>
                <Text style={styles.promotionItemPrice}>Chỉ từ 5.590K</Text>
            </View>
            <View style={styles.promotionItem}>
                <Text style={styles.promotionItemTitle}>MacBook</Text>
                <Text style={styles.promotionItemPrice}>Chỉ từ 17.290K</Text>
            </View>
            <View style={styles.promotionItem}>
                <Text style={styles.promotionItemTitle}>iPhone 16 Pro Max</Text>
                <Text style={styles.promotionItemPrice}>Chỉ từ 30.490K</Text>
            </View>
        </View>
    </View>
)

const styles = StyleSheet.create({
    promotionContainer: {
        backgroundColor: "#e30019",
        padding: 15,
        marginTop: 10,
        borderRadius: 10,
        marginHorizontal: 10,
    },
    promotionHeader: {
        alignItems: "center",
        marginBottom: 15,
    },
    promotionTitle: {
        color: "#fff",
        fontSize: 20,
        fontWeight: "bold",
    },
    promotionSubtitle: {
        color: "#fff",
        fontSize: 14,
    },
    promotionItems: {
        flexDirection: "column",
        gap: 10,
    },
    promotionItem: {
        backgroundColor: "#fff",
        padding: 10,
        borderRadius: 10,
        alignItems: "center",
    },
    promotionItemTitle: {
        fontSize: 14,
        fontWeight: "bold",
    },
    promotionItemPrice: {
        fontSize: 16,
        fontWeight: "bold",
        color: "#e30019",
    },
})

export default PromotionSection