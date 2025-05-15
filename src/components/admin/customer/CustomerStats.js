import { View, Text, StyleSheet } from "react-native"

const CustomerStats = ({ customers, totalCustomers }) => {
    return (
        <View style={styles.statsContainer}>
            <View style={styles.statItem}>
                <Text style={styles.statValue}>{totalCustomers}</Text>
                <Text style={styles.statLabel}>Tổng số</Text>
            </View>
            <View style={styles.statItem}>
                <Text style={styles.statValue}>
                    {customers.filter((customer) => customer.status === "ACTIVE").length}
                </Text>
                <Text style={styles.statLabel}>Hoạt động</Text>
            </View>
            <View style={styles.statItem}>
                <Text style={styles.statValue}>
                    {customers.filter((customer) => customer.status === "INACTIVE").length}
                </Text>
                <Text style={styles.statLabel}>Chưa kích hoạt</Text>
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

export default CustomerStats