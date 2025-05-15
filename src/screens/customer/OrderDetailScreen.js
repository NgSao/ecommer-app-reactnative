import { View, ScrollView, ActivityIndicator, Text } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"

import styles from "../../styles/OrderDetailStyles"
import ErrorState from "@components/order/details/ErrorState"
import OrderHeader from "@components/order/details/OrderHeader"
import OrderItemsSection from "@components/order/details/OrderItemsSection"
import ShippingInfoSection from "@components/order/details/ShippingInfoSection"
import PaymentInfoSection from "@components/order/details/PaymentInfoSection"
import OrderSummarySection from "@components/order/details/OrderSummarySection"
import OrderActions from "@components/order/details/OrderActions"
import { useState, useEffect } from "react"
import { useNavigation, useRoute } from "@react-navigation/native"
import { Alert } from "react-native"
import { useAuth } from "@contexts/AuthContext"
import { GET_TOKEN, GET_TOKEN_ID, PUT_TOKEN } from "api/apiService"


const OrderDetailScreen = () => {
    const navigation = useNavigation()
    const route = useRoute()
    const { token } = useAuth()
    const { orderId } = route.params

    const [order, setOrder] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        fetchOrderDetails()
    }, [])


    console.log("asss", orderId);

    const fetchOrderDetails = async () => {
        try {
            setLoading(true)
            const response = await GET_TOKEN_ID("user/orders", orderId, token)
            if (response.status === 200) {
                setOrder(response.data.data)
            } else {
                Alert.alert("Lỗi", "Không thể tải thông tin đơn hàng")
                navigation.goBack()
            }
        } catch (error) {
            console.error("Error fetching order details:", error)
            Alert.alert("Lỗi", "Đã có lỗi xảy ra khi tải thông tin đơn hàng")
            navigation.goBack()
        } finally {
            setLoading(false)
        }
    }


    const getStatusColor = (status) => {
        switch (status) {
            case "PENDING":
                return "#FFC107";
            case "CONFIRMED":
                return "#03A9F4";
            case "SHIPPED":
                return "#3F51B5";
            case "DELIVERED":
                return "#4CAF50";
            case "CANCELLED":
                return "#F44336";
            default:
                return "#9E9E9E";
        }
    }

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
    const handleCancelOrder = async () => {
        Alert.alert("Hủy đơn hàng", "Bạn có chắc chắn muốn hủy đơn hàng này?", [
            {
                text: "Không",
                style: "cancel",
            },
            {
                text: "Có, hủy đơn hàng",
                onPress: () => {
                    // In a real app, this would call an API to cancel the order
                    const id = orderId;
                    GET_TOKEN_ID("user/orders/cancel", id, token)

                    setOrder((prevOrder) => ({ ...prevOrder, orderStatus: "CANCELLED" }))
                    Alert.alert("Thành công", "Đơn hàng đã được hủy")

                    navigation.goBack()

                },
                style: "destructive",
            },
        ])
    }

    if (loading) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#e30019" />
                <Text style={styles.loadingText}>Đang tải thông tin đơn hàng...</Text>
            </View>
        )
    }

    if (!order) {
        return <ErrorState onBack={() => navigation.goBack()} />
    }

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView showsVerticalScrollIndicator={false}>
                <OrderHeader order={order} getStatusText={getStatusText} getStatusColor={getStatusColor} />
                <OrderItemsSection items={order.items} />
                <ShippingInfoSection shipping={order.shipping} />
                <PaymentInfoSection payment={order.payment} />
                <OrderSummarySection order={order} />
                {order.orderStatus === "PENDING" && (
                    <OrderActions onCancelOrder={handleCancelOrder} />
                )}
            </ScrollView>
        </SafeAreaView>
    )
}

export default OrderDetailScreen