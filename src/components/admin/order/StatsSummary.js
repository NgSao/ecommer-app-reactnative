import { View, Text, StyleSheet } from "react-native"

const StatsSummary = ({ orders, totalOrder }) => {
    return (
        <View style={styles.statsContainer}>
            <View style={styles.statItem}>
                <Text style={styles.statValue}>{totalOrder}</Text>
                <Text style={styles.statLabel}>Tổng đơn</Text>
            </View>
            <View style={styles.statItem}>
                <Text style={styles.statValue}>{orders.filter((order) => order.orderStatus === "PENDING").length}</Text>
                <Text style={styles.statLabel}>Đang xử lý</Text>
            </View>
            <View style={styles.statItem}>
                <Text style={styles.statValue}>{orders.filter((order) => order.orderStatus === "SHIPPED").length}</Text>
                <Text style={styles.statLabel}>Đang giao</Text>
            </View>
            <View style={styles.statItem}>
                <Text style={styles.statValue}>{orders.filter((order) => order.orderStatus === "DELIVERED").length}</Text>
                <Text style={styles.statLabel}>Đã giao</Text>
            </View>


        </View>
    )
}

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

export default StatsSummary