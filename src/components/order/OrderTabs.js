import { View, Text, TouchableOpacity, StyleSheet } from "react-native"
const orderTabs = [
    { id: "all", label: "Tất cả" },
    { id: "processing", label: "Đang xử lý" },
    { id: "shipping", label: "Đang giao" },
    { id: "delivered", label: "Đã giao" },
    { id: "cancelled", label: "Đã hủy" },
]
const OrderTabs = ({ activeTab, setActiveTab }) => (
    <View style={styles.tabsContainer}>
        {orderTabs.map((tab) => (
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
        fontSize: 12,
        color: "#666",
    },
    activeTabText: {
        color: "#e30019",
        fontWeight: "bold",
    },
})

export default OrderTabs