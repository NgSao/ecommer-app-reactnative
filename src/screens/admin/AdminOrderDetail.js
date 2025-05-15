import { View, ScrollView, Text, TouchableOpacity, ActivityIndicator } from "react-native"
import { Ionicons } from "@expo/vector-icons"

import styles from "../../styles/AdminOrderDetailStyles"
import OrderStatus from "@components/admin/order/orderdetail/OrderStatus"
import OrderInfo from "@components/admin/order/orderdetail/OrderInfo"
import CustomerInfo from "@components/admin/order/orderdetail/CustomerInfo"
import ShippingAddress from "@components/admin/order/orderdetail/ShippingAddress"
import OrderItems from "@components/admin/order/orderdetail/OrderItems"
import OrderSummary from "@components/admin/order/orderdetail/OrderSummary"
import OrderNote from "@components/admin/order/orderdetail/OrderNote"
import { useState, useEffect } from "react"
import { useNavigation, useRoute } from "@react-navigation/native"
import { Alert } from "react-native"
import * as Print from "expo-print"
import * as Sharing from "expo-sharing"
import { formatPrice } from '@utils/formatUtils';
import { ADMIN_GET_ID, ADMIN_PUT_ID, GET_TOKEN_ID } from "api/apiService"
import { useAuth } from "@contexts/AuthContext"
import { SafeAreaView } from 'react-native-safe-area-context';

const AdminOrderDetail = () => {
    const navigation = useNavigation()
    const route = useRoute()
    const { orderId, userId } = route.params
    const { token } = useAuth()


    const [loading, setLoading] = useState(true)
    const [order, setOrder] = useState(null)
    const [userAll, setUserAll] = useState(null)
    const [updatingStatus, setUpdatingStatus] = useState(false)


    const fetchOrderDetails = async () => {
        setLoading(true)
        try {
            const response = await GET_TOKEN_ID("user/orders", orderId, token)
            if (response.status === 200) {
                setOrder(response.data.data)
            } else {
                Alert.alert("Lỗi", "Không thể tải thông tin đơn hàng")
                navigation.goBack()
            }


        } catch (error) {
            console.error("Error fetching order details:", error)
            Alert.alert("Lỗi", "Đã xảy ra lỗi khi tải thông tin đơn hàng")
            navigation.goBack()
        } finally {
            setLoading(false)
        }
    }

    const fetchUserDetails = async () => {
        const id = userId;
        try {
            const response = await ADMIN_GET_ID("users", id)
            if (response.status === 200) {
                setUserAll(response.data.data)
            } else {
                Alert.alert("Lỗi", "Không thể tải thông tin người dùng")
                navigation.goBack()
            }


        } catch (error) {
            console.error("Error fetching order details:", error)
            Alert.alert("Lỗi", "Đã xảy ra lỗi khi tải thông tin người dùng")
            navigation.goBack()
        } finally {
            setLoading(false)
        }
    }

    const getStatusColor = (orderStatus) => {
        switch (orderStatus) {
            case "PENDING":
                return "#f39c12"
            case "CONFIRMED":
                return "#3498db"
            case "SHIPPED":
                return "#9b59b6"
            case "DELIVERED":
                return "#2ecc71"
            case "CANCELLED":
                return "#e74c3c"
            default:
                return "#7f8c8d"

        }
    }

    const getStatusLabel = (orderStatus) => {
        switch (orderStatus) {
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
    }

    const getNextStatusOptions = (currentStatus) => {
        switch (currentStatus) {
            case "PENDING":
                return [
                    { id: "CONFIRMED", label: "Đã xác nhận" },
                    { id: "CANCELLED", label: "Đã hủy" },
                ]
            case "CONFIRMED":
                return [
                    { id: "SHIPPED", label: "Đang giao" },
                    { id: "CANCELLED", label: "Đã hủy" },
                ]
            case "SHIPPED":
                return [
                    { id: "DELIVERED", label: "Đã giao" },
                    { id: "CANCELLED", label: "Đã hủy" },
                ]
            case "DELIVERED":
            case "CANCELLED":
                return []
            default:
                return []
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

    const handleUpdateStatus = () => {
        const nextStatusOptions = getNextStatusOptions(order.orderStatus)

        if (nextStatusOptions.length === 0) {
            Alert.alert("Thông báo", "Không thể thay đổi trạng thái của đơn hàng này")
            return
        }
        console.log("Next status options:", nextStatusOptions); // Debug log
        Alert.alert(
            "Cập nhật trạng thái",
            "Chọn trạng thái mới cho đơn hàng",
            [
                { text: "Hủy", style: "cancel" },
                ...nextStatusOptions.map((orderStatus) => ({
                    text: orderStatus.label,
                    onPress: () => confirmUpdateStatus(orderStatus.id),
                })),
            ],
            { cancelable: true }
        )
    }

    const confirmUpdateStatus = async (newStatus) => {
        setUpdatingStatus(true)
        try {
            const response = await ADMIN_PUT_ID("orders/status", orderId, { status: newStatus })
            if (response.status === 200) {
                setOrder({
                    ...order,
                    orderStatus: newStatus,
                    status: getStatusLabel(newStatus),
                })
                Alert.alert("Thành công", "Đã cập nhật trạng thái đơn hàng")
            } else {
                Alert.alert("Lỗi", response.error || "Không thể cập nhật trạng thái đơn hàng")
            }
        } catch (error) {
            console.error("Error updating order status:", error)
            Alert.alert("Lỗi", "Đã xảy ra lỗi khi cập nhật trạng thái đơn hàng")
        } finally {
            setUpdatingStatus(false)
        }
    }

    const handlePrintOrder = async () => {
        if (!order) return

        const htmlContent = `
 <html>
<head>
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #f9f9f9;
            line-height: 1.6;
            margin: 0;
            padding: 20px;
        }
        .header {
            background-color: #d70018;
            padding: 10px;
            text-align: center;
        }
        .container {
            max-width: 800px;
            margin: auto;
            background: #fff;
            border-radius: 8px;
            box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
            padding: 20px;
        }
        .footer {
            background-color: #d70018;
            padding: 10px;
            text-align: center;
            color: #fff;
        }
        h1 {
            color: #e30019;
            border-bottom: 2px solid #eee;
            padding-bottom: 5px;
            text-align: center;
            font-size: 24px;
        }
        h2 {
            font-size: 16px;
            font-weight: bold;
            color: #333;
            margin-bottom: 10px;
        }
        p {
            margin: 5px 0;
            font-size: 14px;
        }
        .info-section {
            margin-bottom: 20px;
        }
        .product-section {
            background-color: #fff;
            border-radius: 10px;
            padding: 15px;
            margin-bottom: 15px;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        }
        .product-item {
            display: flex;
            border-bottom: 1px solid #eee;
            padding: 10px 0;
        }
        .product-image {
            width: 70px;
            height: 70px;
            border-radius: 8px;
            margin-right: 10px;
        }
        .product-info {
            flex: 1;
        }
        .product-name {
            font-size: 14px;
            font-weight: bold;
            color: #333;
            margin-bottom: 5px;
        }
        .product-variant {
            font-size: 12px;
            color: #666;
            margin-bottom: 5px;
        }
        .product-price-row {
            display: flex;
            align-items: center;
            margin-bottom: 5px;
        }
        .product-price {
            font-size: 14px;
            color: #333;
            margin-right: 10px;
        }
        .product-quantity {
            font-size: 14px;
            color: #666;
        }
        .product-total {
            font-size: 14px;
            font-weight: bold;
            color: #e30019;
        }
        .summary {
            margin-top: 20px;
            border-top: 1px solid #eee;
            padding-top: 10px;
        }
        .summary p {
            font-weight: bold;
            font-size: 14px;
        }
        .note {
            font-style: italic;
            color: #666;
            margin-top: 10px;
        }
        .logo {
            max-width: 150px;
            margin-bottom: 10px;
        }
    </style>
</head>
<body>
    <div style='max-width:800px;margin: auto;'>
        <div class='header'>
            <img src='https://minhtuanmobile.com/assets/front/img/logo.png?250507' alt='MinhTuan Mobile Logo' class='logo'>
            <h1 style='color: #FFF'>MinhTuan <span style='color:#000'>Mobile</span></h1>
        </div>
        <div class='container'>
            <h1>Đơn hàng #${order.orderCode}</h1>
            <div class="info-section">
                <p><strong>Khách hàng:</strong> ${order.shipping.fullName}</p>
                <p><strong>Số điện thoại:</strong> ${order.shipping.phone}</p>
                <p><strong>Email:</strong> ${userAll?.email}</p>
                <p><strong>Địa chỉ giao hàng:</strong> ${order.shipping.addressDetail}</p>
                <p><strong>Phương thức thanh toán:</strong> ${order.shipping.method}</p>
                <p><strong>Trạng thái thanh toán:</strong> ${order.payment.status}</p>

                <p><strong>Trạng thái đơn hàng:</strong> ${getStatusText(order.orderStatus)}</p>
            </div>
            <div class="product-section">
                <h2>Sản phẩm</h2>
                ${order.items
                .map(
                    (item) => `
                            <div class="product-item">
                                <img src="${item.imageUrl || 'https://via.placeholder.com/70'}" alt="${item.name}" class="product-image">
                                <div class="product-info">
                                    <div class="product-name">${item.name}</div>
                                    ${item.storage ? `<div class="product-variant">Phiên bản: ${item.storage}</div>` : ''}
                                    ${item.color ? `<div class="product-variant">Màu sắc: ${item.color}</div>` : ''}
                                    <div class="product-price-row">
                                        <span class="product-price">${formatPrice(item.price)}</span>
                                        <span class="product-quantity">x${item.quantity}</span>
                                    </div>
                                    <div class="product-total">${formatPrice(item.price * item.quantity)}</div>
                                </div>
                            </div>
                        `
                )
                .join("")}
            </div>
            <div class="summary">
                <p>Tạm tính: ${formatPrice(order.total)}</p>
                <p>Phí vận chuyển: ${formatPrice(order.shipping.fee)}</p>
                ${order.discount > 0
                ? `<p>Giảm giá: -${formatPrice(order.discount)}</p>`
                : ""
            }
                <p>Thuế (VAT): 0 đ</p>
                <p>Tổng cộng: ${formatPrice(order.total)}</p>
                ${order.note
                ? `<p class="note"><strong>Ghi chú:</strong> ${order.note}</p>`
                : ""
            }
            </div>
            <div style='text-align: center; margin-top: 40px'>
                <p>Chúc bạn luôn có những trải nghiệm tuyệt vời khi sử dụng dịch vụ tại MinhTuan Mobile.</p>
                <p>Tổng đài Landline miễn phí: <span style='color:#d70018;'>1800 1234</span></p>
                <p>Tổng đài Mobile: <span style='color:#d70018;'>0392445255</span></p>
                <p>MinhTuan Mobile cảm ơn quý khách.</p>
            </div>
        </div>
        <div class='footer'>
            <p>MinhTuan Mobile © 2025</p>
        </div>
    </div>
</body>
</html>
        `

        try {
            const { uri } = await Print.printToFileAsync({
                html: htmlContent,
                base64: false,
            })
            if (await Sharing.isAvailableAsync()) {
                await Sharing.shareAsync(uri, {
                    dialogTitle: `Chia sẻ đơn hàng #${order.id}`,
                    mimeType: "application/pdf",
                    UTI: "com.adobe.pdf",
                })
                Alert.alert("Thành công", "Đã tạo file PDF và mở chia sẻ")
            } else {
                Alert.alert("Lỗi", "Chia sẻ không khả dụng trên thiết bị này")
            }
        } catch (error) {
            console.error("Error printing or sharing order:", error)
            Alert.alert("Lỗi", "Không thể tạo hoặc chia sẻ file PDF")
        }
    }

    useEffect(() => {
        fetchUserDetails()

        fetchOrderDetails()
    }, [orderId, userId])
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
                <Text style={styles.headerTitle}>Chi tiết đơn hàng #{order.orderCode}</Text>
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
                    getStatusText={getStatusText}
                />
                <OrderInfo order={order} />
                <CustomerInfo user={userAll} order={order} />

                <ShippingAddress order={order} />
                <OrderItems items={order.items} />
                <OrderSummary order={order} />
                {order.note && <OrderNote note={order.note} />}
            </ScrollView>
        </SafeAreaView>
    )
}

export default AdminOrderDetail


