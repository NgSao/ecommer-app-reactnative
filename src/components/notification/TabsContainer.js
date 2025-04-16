import { View, TouchableOpacity, Text, StyleSheet } from "react-native"

const notificationTabs = [
    { id: "all", label: "Tất cả" },
    { id: "order", label: "Đơn hàng" },
    { id: "promotion", label: "Khuyến mãi" },
    { id: "news", label: "Tin tức" },
]

const TabsContainer = ({ activeTab, setActiveTab }) => (
    <View style={styles.tabsContainer}>
        {notificationTabs.map((tab) => (
            <TouchableOpacity
                key={tab.id}
                style={[styles.tab, activeTab === tab.id && styles.activeTab]}
                onPress={() => setActiveTab(tab.id)}
            >
                <Text style={[styles.tabText, activeTab === tab.id && styles.activeTabText]}>
                    {tab.label}
                </Text>
            </TouchableOpacity>
        ))}
    </View>
)

const styles = StyleSheet.create({
    tabsContainer: {
        flexDirection: "row",
        backgroundColor: "#fff",
        borderBottomWidth: 1,
        borderBottomColor: "#eee",
    },
    tab: {
        flex: 1,
        paddingVertical: 12,
        alignItems: "center",
    },
    activeTab: {
        borderBottomWidth: 2,
        borderBottomColor: "#e30019",
    },
    tabText: {
        fontSize: 14,
        color: "#666",
    },
    activeTabText: {
        color: "#e30019",
        fontWeight: "bold",
    },
})

export default TabsContainer