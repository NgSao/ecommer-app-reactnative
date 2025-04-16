import { View, Text, StyleSheet } from "react-native"

const StatsBar = ({ promotions }) => {
    const now = new Date()
    const totalPromotions = promotions.length
    const activePromotions = promotions.filter(
        (promo) => promo.isActive && new Date(promo.startDate) <= now && new Date(promo.endDate) >= now
    ).length
    const upcomingPromotions = promotions.filter(
        (promo) => promo.isActive && new Date(promo.startDate) > now
    ).length

    return (
        <View style={styles.statsContainer}>
            <View style={styles.statItem}>
                <Text style={styles.statValue}>{totalPromotions}</Text>
                <Text style={styles.statLabel}>Tổng số</Text>
            </View>
            <View style={styles.statItem}>
                <Text style={styles.statValue}>{activePromotions}</Text>
                <Text style={styles.statLabel}>Đang hoạt động</Text>
            </View>
            <View style={styles.statItem}>
                <Text style={styles.statValue}>{upcomingPromotions}</Text>
                <Text style={styles.statLabel}>Sắp diễn ra</Text>
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

export default StatsBar