import { View, ScrollView, ActivityIndicator, Text } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"

import styles from "../../styles/OrderDetailStyles"
import useOrderDetail from "@hooks/useOrderDetail"
import ErrorState from "@components/order/details/ErrorState"
import OrderHeader from "@components/order/details/OrderHeader"
import OrderItemsSection from "@components/order/details/OrderItemsSection"
import ShippingInfoSection from "@components/order/details/ShippingInfoSection"
import PaymentInfoSection from "@components/order/details/PaymentInfoSection"
import OrderSummarySection from "@components/order/details/OrderSummarySection"
import OrderActions from "@components/order/details/OrderActions"

const OrderDetailScreen = () => {
    const {
        order,
        loading,
        navigation,
        formatDate,
        formatPrice,
        getStatusColor,
        handleCancelOrder,
    } = useOrderDetail()

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
                <OrderHeader order={order} formatDate={formatDate} getStatusColor={getStatusColor} />
                <OrderItemsSection items={order.items} formatPrice={formatPrice} />
                <ShippingInfoSection shipping={order.shipping} />
                <PaymentInfoSection payment={order.payment} />
                <OrderSummarySection order={order} formatPrice={formatPrice} />
                {order.status === "Đang xử lý" && (
                    <OrderActions onCancelOrder={handleCancelOrder} />
                )}
            </ScrollView>
        </SafeAreaView>
    )
}

export default OrderDetailScreen