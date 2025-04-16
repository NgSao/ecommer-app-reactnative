import { View, FlatList, ActivityIndicator, RefreshControl, Text } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"

import styles from "../../styles/OrderHistoryStyles"
import useOrderHistory from "@hooks/useOrderHistory"
import OrderTabs from "@components/order/OrderTabs"
import OrderItem from "@components/order/OrderItem"
import EmptyState from "@components/list/EmptyState"

const OrderHistoryScreen = () => {
    const {
        loading,
        refreshing,
        activeTab,
        setActiveTab,
        filteredOrders,
        onRefresh,
        navigateToOrderDetail,
        formatDate,
        formatPrice,
        getStatusColor,
    } = useOrderHistory()

    if (loading && !refreshing) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#e30019" />
                <Text style={styles.loadingText}>Đang tải đơn hàng...</Text>
            </View>
        )
    }

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerTitle}>Đơn hàng của tôi</Text>
            </View>

            <OrderTabs activeTab={activeTab} setActiveTab={setActiveTab} />
            <FlatList
                data={filteredOrders}
                renderItem={({ item }) => (
                    <OrderItem
                        item={item}
                        navigateToOrderDetail={navigateToOrderDetail}
                        formatDate={formatDate}
                        formatPrice={formatPrice}
                        getStatusColor={getStatusColor}
                    />
                )}
                keyExtractor={(item) => item.id}
                contentContainerStyle={styles.ordersList}
                ListEmptyComponent={<EmptyState />}
                refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} colors={["#e30019"]} />}
            />
        </SafeAreaView>
    )
}

export default OrderHistoryScreen