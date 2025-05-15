import { View, Text, TouchableOpacity, StyleSheet } from "react-native"
import { Ionicons } from "@expo/vector-icons"
import { getNotificationColor, getNotificationIcon } from "@utils/dashboardUtils"

const NotificationsList = ({ notifications, onViewAll, onViewNotification }) => {
    return (
        <View style={styles.notificationsContainer}>
            <View style={styles.sectionHeader}>
                <Text style={styles.sectionTitle}>Thông báo</Text>
                <TouchableOpacity onPress={onViewAll}>
                    <Text style={styles.viewAllText}>Xem tất cả</Text>
                </TouchableOpacity>
            </View>
            {notifications.length === 0 ? (
                <View style={styles.emptyContainer}>
                    <Ionicons name="notifications-outline" size={40} color="#ccc" />
                    <Text style={styles.emptyText}>Không có thông báo mới</Text>
                </View>
            ) : (
                notifications.map((notification) => (
                    <TouchableOpacity
                        key={notification.id}
                        style={[styles.notificationItem, !notification.read && styles.unreadNotification]}
                        onPress={() => onViewNotification(notification.screen, notification.params)}
                    >
                        <View
                            style={[styles.notificationIcon, { backgroundColor: `${getNotificationColor(notification.type)}20` }]}
                        >
                            <Ionicons
                                name={getNotificationIcon(notification.type)}
                                size={20}
                                color={getNotificationColor(notification.type)}
                            />
                        </View>
                        <View style={styles.notificationContent}>
                            <Text style={styles.notificationTitle}>{notification.title}</Text>
                            <Text style={styles.notificationMessage}>{notification.message}</Text>
                            <Text style={styles.notificationTime}>{notification.time}</Text>
                        </View>
                        {!notification.read && <View style={styles.unreadDot} />}
                    </TouchableOpacity>
                ))
            )}
        </View>
    )
}

const styles = StyleSheet.create({
    notificationsContainer: {
        backgroundColor: "#fff",
        borderRadius: 12,
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
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 15,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: "bold",
        color: "#333",
    },
    viewAllText: {
        fontSize: 14,
        color: "#e30019",
    },
    emptyContainer: {
        alignItems: "center",
        justifyContent: "center",
        paddingVertical: 30,
    },
    emptyText: {
        fontSize: 14,
        color: "#666",
        marginTop: 10,
    },
    notificationItem: {
        flexDirection: "row",
        padding: 12,
        borderRadius: 8,
        marginBottom: 10,
        backgroundColor: "#f9f9f9",
    },
    unreadNotification: {
        backgroundColor: "#f0f8ff",
    },
    notificationIcon: {
        width: 40,
        height: 40,
        borderRadius: 20,
        justifyContent: "center",
        alignItems: "center",
        marginRight: 12,
    },
    notificationContent: {
        flex: 1,
    },
    notificationTitle: {
        fontSize: 14,
        fontWeight: "bold",
        color: "#333",
        marginBottom: 5,
    },
    notificationMessage: {
        fontSize: 13,
        color: "#666",
        marginBottom: 5,
    },
    notificationTime: {
        fontSize: 12,
        color: "#999",
    },
    unreadDot: {
        width: 10,
        height: 10,
        borderRadius: 5,
        backgroundColor: "#e30019",
        marginLeft: 5,
        alignSelf: "center",
    },
})

export default NotificationsList