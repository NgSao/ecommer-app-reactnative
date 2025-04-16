import { View, Text, TouchableOpacity, StyleSheet } from "react-native"

const NotificationHeader = ({ notifications, markAllAsRead }) => (
    <View style={styles.header}>
        <Text style={styles.headerTitle}>Thông báo</Text>
        {notifications.some((notification) => !notification.read) && (
            <TouchableOpacity onPress={markAllAsRead}>
                <Text style={styles.markAllReadText}>Đánh dấu tất cả đã đọc</Text>
            </TouchableOpacity>
        )}
    </View>
)

const styles = StyleSheet.create({
    header: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        padding: 15,
        backgroundColor: "#fff",
        borderBottomWidth: 1,
        borderBottomColor: "#eee",
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: "bold",
    },
    markAllReadText: {
        color: "#e30019",
        fontSize: 14,
    },
})

export default NotificationHeader