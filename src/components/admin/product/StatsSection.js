import { View, Text, StyleSheet } from "react-native"

const StatsSection = ({ totalProducts, lowStockCount, outOfStockCount }) => (
    <View style={styles.statsContainer}>
        <View style={styles.statItem}>
            <Text style={styles.statValue}>{totalProducts}</Text>
            <Text style={styles.statLabel}>Tổng sản phẩm</Text>
        </View>
        <View style={styles.statItem}>
            <Text style={styles.statValue}>{lowStockCount}</Text>
            <Text style={styles.statLabel}>Sắp hết hàng</Text>
        </View>
        <View style={styles.statItem}>
            <Text style={styles.statValue}>{outOfStockCount}</Text>
            <Text style={styles.statLabel}>Hết hàng</Text>
        </View>
    </View>
)

const styles = StyleSheet.create({
    statsContainer: {
        flexDirection: "row",
        backgroundColor: "#fff",
        paddingVertical: 15,
        paddingHorizontal: 10,
        marginBottom: 10,
    },
    statItem: {
        flex: 1,
        alignItems: "center",
    },
    statValue: {
        fontSize: 18,
        fontWeight: "bold",
        color: "#333",
    },
    statLabel: {
        fontSize: 12,
        color: "#666",
        marginTop: 5,
    },
})

export default StatsSection