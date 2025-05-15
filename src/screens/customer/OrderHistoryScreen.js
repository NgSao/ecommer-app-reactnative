import { View, FlatList, ActivityIndicator, RefreshControl, Text } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"

import styles from "../../styles/OrderHistoryStyles"
import OrderTabs from "@components/order/OrderTabs"
import OrderItem from "@components/order/OrderItem"
import EmptyState from "@components/list/EmptyState"
import { useState, useEffect } from "react"
import { useNavigation } from "@react-navigation/native"
import { useAuth } from "@contexts/AuthContext"
import { GET_TOKEN, POST_TOKEN } from "api/apiService"
const OrderHistoryScreen = () => {
    const navigation = useNavigation()
    const { token, isLoggedIn } = useAuth()

    const [orders, setOrders] = useState([])
    const [loading, setLoading] = useState(true)
    const [refreshing, setRefreshing] = useState(false)
    const [activeTab, setActiveTab] = useState("all")

    useEffect(() => {
        if (isLoggedIn) {
            fetchOrders()
        }
    }, [isLoggedIn])

    const fetchOrders = async () => {
        try {
            setLoading(true)
            const response = await GET_TOKEN("user/my-orders", token)
            if (response.status === 200) {
                setOrders(response.data.data)
            }
        } catch (error) {
            console.error("Error fetching orders:", error)
        } finally {
            setLoading(false)
            setRefreshing(false)
        }
    }

    const onRefresh = () => {
        setRefreshing(true)
        fetchOrders()
    }

    const navigateToOrderDetail = (orderId) => {
        navigation.navigate("OrderDetail", { orderId })
    }


    const getStatusColor = (status) => {
        switch (status) {
            case "PENDING":
                return "#FFC107"; // Màu vàng - Đang xử lý
            case "CONFIRMED":
                return "#03A9F4"; // Màu xanh dương nhạt - Đã xác nhận
            case "SHIPPED":
                return "#3F51B5"; // Màu xanh dương đậm - Đã giao hàng
            case "DELIVERED":
                return "#4CAF50"; // Màu xanh lá - Giao thành công
            case "CANCELLED":
                return "#F44336"; // Màu đỏ - Đã hủy
            default:
                return "#9E9E9E"; // Màu xám - Không xác định
        }
    };

    const getStatusText = (status) => {
        switch (status) {
            case "PENDING":
                return "Đang xử lý";
            case "CONFIRMED":
                return "Đã xác nhận";
            case "SHIPPED":
                return "Đã giao hàng";
            case "DELIVERED":
                return "Đã giao thành công";
            case "CANCELLED":
                return "Đã hủy";
            default:
                return "Không xác định";
        }
    };



    const filteredOrders = orders.filter((order) => {
        if (activeTab === "all") return true;
        switch (activeTab) {
            case "processing":
                return order.orderStatus === "PENDING" || order.orderStatus === "CONFIRMED";
            case "shipping":
                return order.orderStatus === "SHIPPED";
            case "delivered":
                return order.orderStatus === "DELIVERED";
            case "cancelled":
                return order.orderStatus === "CANCELLED";
            default:
                return true;
        }
    });



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
                        getStatusColor={getStatusColor}
                        getStatusText={getStatusText}
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