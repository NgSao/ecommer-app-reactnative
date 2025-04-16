import { View, Text, Switch, StyleSheet } from "react-native"
import { Ionicons } from "@expo/vector-icons"

const NotificationsSection = ({
    emailNotifications,
    setEmailNotifications,
    orderNotifications,
    setOrderNotifications,
    stockNotifications,
    setStockNotifications,
    promotionNotifications,
    setPromotionNotifications,
}) => {
    return (
        <View style={styles.section}>
            <View style={styles.sectionHeader}>
                <Ionicons name="notifications-outline" size={22} color="#333" />
                <Text style={styles.sectionTitle}>Cài đặt thông báo</Text>
            </View>

            <View style={styles.switchItem}>
                <Text style={styles.switchLabel}>Thông báo qua email</Text>
                <Switch
                    value={emailNotifications}
                    onValueChange={setEmailNotifications}
                    trackColor={{ false: "#ccc", true: "#e30019" }}
                    thumbColor="#fff"
                />
            </View>

            <View style={styles.switchItem}>
                <Text style={styles.switchLabel}>Thông báo đơn hàng mới</Text>
                <Switch
                    value={orderNotifications}
                    onValueChange={setOrderNotifications}
                    trackColor={{ false: "#ccc", true: "#e30019" }}
                    thumbColor="#fff"
                />
            </View>

            <View style={styles.switchItem}>
                <Text style={styles.switchLabel}>Thông báo hàng sắp hết</Text>
                <Switch
                    value={stockNotifications}
                    onValueChange={setStockNotifications}
                    trackColor={{ false: "#ccc", true: "#e30019" }}
                    thumbColor="#fff"
                />
            </View>

            <View style={styles.switchItem}>
                <Text style={styles.switchLabel}>Thông báo khuyến mãi sắp hết hạn</Text>
                <Switch
                    value={promotionNotifications}
                    onValueChange={setPromotionNotifications}
                    trackColor={{ false: "#ccc", true: "#e30019" }}
                    thumbColor="#fff"
                />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    section: {
        backgroundColor: "#fff",
        borderRadius: 10,
        padding: 15,
        marginBottom: 20,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    sectionHeader: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 15,
        paddingBottom: 10,
        borderBottomWidth: 1,
        borderBottomColor: "#eee",
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: "bold",
        color: "#333",
        marginLeft: 10,
    },
    switchItem: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingVertical: 12,
        borderBottomWidth: 1,
        borderBottomColor: "#eee",
    },
    switchLabel: {
        fontSize: 16,
        color: "#333",
    },
})

export default NotificationsSection