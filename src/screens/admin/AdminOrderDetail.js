import { View, ScrollView, Text, TouchableOpacity, ActivityIndicator, SafeAreaView } from "react-native"
import { Ionicons } from "@expo/vector-icons"

import styles from "../../styles/AdminOrderDetailStyles"
import OrderStatus from "@components/admin/order/orderdetail/OrderStatus"
import OrderInfo from "@components/admin/order/orderdetail/OrderInfo"
import CustomerInfo from "@components/admin/order/orderdetail/CustomerInfo"
import ShippingAddress from "@components/admin/order/orderdetail/ShippingAddress"
import OrderItems from "@components/admin/order/orderdetail/OrderItems"
import OrderSummary from "@components/admin/order/orderdetail/OrderSummary"
import OrderNote from "@components/admin/order/orderdetail/OrderNote"
import useOrdersManagementDetail from "@hooks/useOrdersManagementDetail"

const AdminOrderDetail = () => {
    const { navigation, orderId, loading, order, updatingStatus, getStatusColor, handleUpdateStatus, handlePrintOrder } = useOrdersManagementDetail()

    if (loading) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#e30019" />
                <Text style={styles.loadingText}>Đang tải thông tin đơn hàng...</Text>
            </View>
        )
    }

    if (!order) {
        return (
            <View style={styles.errorContainer}>
                <Ionicons name="alert-circle-outline" size={60} color="#e74c3c" />
                <Text style={styles.errorText}>Không tìm thấy thông tin đơn hàng</Text>
                <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
                    <Text style={styles.backButtonText}>Quay lại</Text>
                </TouchableOpacity>
            </View>
        )
    }

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
                    <Ionicons name="arrow-back" size={24} color="#333" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Chi tiết đơn hàng #{order.id}</Text>
                <TouchableOpacity
                    style={styles.printButton}
                    onPress={handlePrintOrder}
                >
                    <Ionicons name="print-outline" size={24} color="#333" />
                </TouchableOpacity>
            </View>

            <ScrollView style={styles.scrollContainer}>
                <OrderStatus
                    order={order}
                    updatingStatus={updatingStatus}
                    getStatusColor={getStatusColor}
                    handleUpdateStatus={handleUpdateStatus}
                />
                <OrderInfo order={order} />
                <CustomerInfo order={order} />
                <ShippingAddress order={order} />
                <OrderItems items={order.items} />
                <OrderSummary order={order} />
                {order.note && <OrderNote note={order.note} />}
            </ScrollView>
        </SafeAreaView>
    )
}

export default AdminOrderDetail


