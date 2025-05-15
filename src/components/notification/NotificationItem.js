import { View, TouchableOpacity, Text, StyleSheet } from "react-native"
import { Ionicons } from "@expo/vector-icons"
import { formatDateNotification } from "@utils/formatUtils"

const NotificationItem = ({ item, handleNotificationPress, deleteNotification, getNotificationIcon }) => (
    <TouchableOpacity
        style={[styles.notificationItem, item.read ? styles.readNotification : styles.unreadNotification]}
        onPress={() => handleNotificationPress(item)}
    >
        <View style={styles.notificationIconContainer}>{getNotificationIcon(item.type)}</View>
        <View style={styles.notificationContent}>
            <Text style={styles.notificationTitle} numberOfLines={1}>
                {item.title}
            </Text>
            <Text style={styles.notificationMessage} numberOfLines={2}>
                {item.message}
            </Text>
            <Text style={styles.notificationDate}>{formatDateNotification(item.date)}</Text>
        </View>
        <TouchableOpacity style={styles.deleteButton} onPress={() => deleteNotification(item.id)}>
            <Ionicons name="trash-outline" size={20} color="#999" />
        </TouchableOpacity>
    </TouchableOpacity>
)

const styles = StyleSheet.create({
    notificationItem: {
        flexDirection: "row",
        backgroundColor: "#fff",
        borderRadius: 10,
        padding: 15,
        marginBottom: 10,
        borderWidth: 1,
        borderColor: "#eee",
    },
    unreadNotification: {
        backgroundColor: "#f8f8f8",
        borderLeftWidth: 3,
        borderLeftColor: "#e30019",
    },
    readNotification: {
        backgroundColor: "#fff",
    },
    notificationIconContainer: {
        marginRight: 15,
    },
    notificationContent: {
        flex: 1,
    },
    notificationTitle: {
        fontSize: 16,
        fontWeight: "bold",
        marginBottom: 5,
    },
    notificationMessage: {
        fontSize: 14,
        color: "#666",
        marginBottom: 5,
    },
    notificationDate: {
        fontSize: 12,
        color: "#999",
    },
    deleteButton: {
        padding: 5,
    },
})

export default NotificationItem