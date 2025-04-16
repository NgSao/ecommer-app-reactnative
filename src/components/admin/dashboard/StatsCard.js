import { View, Text, TouchableOpacity, StyleSheet } from "react-native"
import { Ionicons } from "@expo/vector-icons"

const StatsCard = ({ icon, value, label, iconColor, backgroundColor, onPress }) => (
    <TouchableOpacity style={styles.statCard} onPress={onPress}>
        <View style={[styles.statIconContainer, { backgroundColor }]}>
            <Ionicons name={icon} size={24} color={iconColor} />
        </View>
        <View style={styles.statContent}>
            <Text style={styles.statValue}>{value}</Text>
            <Text style={styles.statLabel}>{label}</Text>
        </View>
    </TouchableOpacity>
)

const styles = StyleSheet.create({
    statCard: {
        width: "48%",
        backgroundColor: "#fff",
        borderRadius: 12,
        padding: 15,
        marginBottom: 15,
        flexDirection: "row",
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    statIconContainer: {
        width: 40,
        height: 40,
        borderRadius: 20,
        justifyContent: "center",
        alignItems: "center",
        marginRight: 12,
    },
    statContent: {
        flex: 1,
    },
    statValue: {
        fontSize: 16,
        fontWeight: "bold",
        color: "#333",
    },
    statLabel: {
        fontSize: 12,
        color: "#666",
        marginTop: 2,
    },
})

export default StatsCard