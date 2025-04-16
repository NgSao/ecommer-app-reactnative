import { View, Text, TouchableOpacity, StyleSheet } from "react-native"

const TabNavigation = ({ activeTab, onTabChange }) => (
    <View style={styles.tabContainer}>
        <TouchableOpacity
            style={[styles.tabButton, activeTab === "overview" && styles.activeTabButton]}
            onPress={() => onTabChange("overview")}
        >
            <Text style={[styles.tabText, activeTab === "overview" && styles.activeTabText]}>Tổng quan</Text>
        </TouchableOpacity>
        <TouchableOpacity
            style={[styles.tabButton, activeTab === "charts" && styles.activeTabButton]}
            onPress={() => onTabChange("charts")}
        >
            <Text style={[styles.tabText, activeTab === "charts" && styles.activeTabText]}>Biểu đồ</Text>
        </TouchableOpacity>
    </View>
)

const styles = StyleSheet.create({
    tabContainer: {
        flexDirection: "row",
        backgroundColor: "#fff",
        borderBottomWidth: 1,
        borderBottomColor: "#eee",
    },
    tabButton: {
        flex: 1,
        paddingVertical: 12,
        alignItems: "center",
    },
    activeTabButton: {
        borderBottomWidth: 2,
        borderBottomColor: "#e30019",
    },
    tabText: {
        fontSize: 14,
        color: "#666",
        fontWeight: "500",
    },
    activeTabText: {
        color: "#e30019",
        fontWeight: "bold",
    },
})

export default TabNavigation