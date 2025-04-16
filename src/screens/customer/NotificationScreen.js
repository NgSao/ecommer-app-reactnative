import { View, FlatList, ActivityIndicator, RefreshControl, Text, SafeAreaView } from "react-native"
import styles from "../../styles/NotificationStyles"
import useNotifications from "@hooks/useNotifications"
import NotificationHeader from "@components/notification/NotificationHeader"
import NotificationItem from "@components/notification/NotificationItem"
import EmptyState from "@components/list/EmptyState"
import TabsContainer from "@components/notification/TabsContainer"
import { Ionicons } from "@expo/vector-icons"

export default function NotificationScreen() {
    const {
        notifications,
        loading,
        refreshing,
        activeTab,
        setActiveTab,
        filteredNotifications,
        onRefresh,
        markAllAsRead,
        deleteNotification,
        formatDate,
        getNotificationIcon,
        handleNotificationPress,
    } = useNotifications()

    if (loading && !refreshing) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#e30019" />
                <Text style={styles.loadingText}>Đang tải thông báo...</Text>
            </View>
        )
    }

    return (
        <SafeAreaView style={styles.container}>
            <NotificationHeader notifications={notifications} markAllAsRead={markAllAsRead} />
            <TabsContainer activeTab={activeTab} setActiveTab={setActiveTab} />
            <FlatList
                data={filteredNotifications}
                renderItem={({ item }) => (
                    <NotificationItem
                        item={item}
                        handleNotificationPress={handleNotificationPress}
                        deleteNotification={deleteNotification}
                        getNotificationIcon={getNotificationIcon}
                        formatDate={formatDate}
                    />
                )}
                keyExtractor={(item) => item.id}
                contentContainerStyle={styles.notificationsList}
                ListEmptyComponent={<EmptyState />}
                refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} colors={["#e30019"]} />}
            />
        </SafeAreaView>
    )
}