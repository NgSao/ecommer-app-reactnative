import { View, FlatList, ActivityIndicator, RefreshControl, Text } from "react-native";
import styles from "../../styles/NotificationStyles";
import NotificationHeader from "@components/notification/NotificationHeader";
import NotificationItem from "@components/notification/NotificationItem";
import EmptyState from "@components/list/EmptyState";
import TabsContainer from "@components/notification/TabsContainer";
import { Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { useState, useContext, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { NotificationContext } from "@contexts/NotificationContext";

export default function NotificationScreen() {
    const navigation = useNavigation();
    const { notifications, loading, fetchNotifications, markAsRead, deleteNotification, markAllAsRead } = useContext(NotificationContext);
    const [refreshing, setRefreshing] = useState(false);
    const [activeTab, setActiveTab] = useState("all");

    useEffect(() => {
        fetchNotifications();
    }, [fetchNotifications]);

    const onRefresh = async () => {
        setRefreshing(true);
        await fetchNotifications();
        setRefreshing(false);
    };

    const filteredNotifications = notifications.filter((notification) => {
        if (activeTab === "all") return true;
        return notification.type === activeTab;
    });

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const now = new Date();
        const diffTime = Math.abs(now - date);
        const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

        if (diffDays === 0) {
            return `Hôm nay, ${date.getHours()}:${date.getMinutes().toString().padStart(2, "0")}`;
        } else if (diffDays === 1) {
            return `Hôm qua, ${date.getHours()}:${date.getMinutes().toString().padStart(2, "0")}`;
        } else {
            return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
        }
    };

    const getNotificationIcon = (type) => {
        switch (type) {
            case "order":
                return <Ionicons name="receipt-outline" size={24} color="#e30019" />;
            case "promotion":
                return <Ionicons name="pricetag-outline" size={24} color="#ff9800" />;
            case "news":
                return <Ionicons name="newspaper-outline" size={24} color="#2196f3" />;
            default:
                return <Ionicons name="notifications-outline" size={24} color="#666" />;
        }
    };

    const handleNotificationPress = async (notification) => {
        await markAsRead(notification.id);
        const orderId = notification.flagId
        switch (notification.type) {
            case "order":
                navigation.navigate("OrderDetail", { orderId })
                break;
            case "promotion":
                console.log("Navigate to promotion:", notification.data.promotionId);
                break;
            case "news":
                console.log("Navigate to news:", notification.data.newsId);
                break;
            default:
                break;
        }
    };

    if (loading && !refreshing) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#e30019" />
                <Text style={styles.loadingText}>Đang tải thông báo...</Text>
            </View>
        );
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
    );
}