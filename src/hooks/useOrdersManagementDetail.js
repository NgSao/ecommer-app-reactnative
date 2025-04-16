import { useState, useEffect } from "react"
import { useNavigation, useRoute } from "@react-navigation/native"
import { Alert } from "react-native"
import * as Print from "expo-print"
import * as Sharing from "expo-sharing"
import { formatCurrency } from '@utils/formatUtils';
import { api } from '@service/apiAdmin';

const useOrdersManagementDetail = () => {
    const navigation = useNavigation()
    const route = useRoute()
    const { orderId } = route.params

    const [loading, setLoading] = useState(true)
    const [order, setOrder] = useState(null)
    const [updatingStatus, setUpdatingStatus] = useState(false)

    const fetchOrderDetails = async () => {
        setLoading(true)
        try {
            const response = await api.admin.getOrderDetails(orderId)
            if (response.success) {
                setOrder(response.data)
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

    const getStatusColor = (statusCode) => {
        switch (statusCode) {
            case "pending":
                return "#f39c12"
            case "processing":
                return "#3498db"
            case "shipping":
                return "#9b59b6"
            case "delivered":
                return "#2ecc71"
            case "cancelled":
                return "#e74c3c"
            default:
                return "#7f8c8d"
        }
    }

    const getStatusLabel = (statusCode) => {
        switch (statusCode) {
            case "pending":
                return "Chờ xử lý"
            case "processing":
                return "Đang xử lý"
            case "shipping":
                return "Đang giao"
            case "delivered":
                return "Đã giao"
            case "cancelled":
                return "Đã hủy"
            default:
                return "Không xác định"
        }
    }

    const getNextStatusOptions = (currentStatus) => {
        switch (currentStatus) {
            case "pending":
                return [
                    { id: "processing", label: "Đang xử lý" },
                    { id: "cancelled", label: "Đã hủy" },
                ]
            case "processing":
                return [
                    { id: "shipping", label: "Đang giao" },
                    { id: "cancelled", label: "Đã hủy" },
                ]
            case "shipping":
                return [
                    { id: "delivered", label: "Đã giao" },
                    { id: "cancelled", label: "Đã hủy" },
                ]
            case "delivered":
            case "cancelled":
                return []
            default:
                return []
        }
    }

    const handleUpdateStatus = () => {
        const nextStatusOptions = getNextStatusOptions(order.statusCode)

        if (nextStatusOptions.length === 0) {
            Alert.alert("Thông báo", "Không thể thay đổi trạng thái của đơn hàng này")
            return
        }

        Alert.alert(
            "Cập nhật trạng thái",
            "Chọn trạng thái mới cho đơn hàng",
            [
                { text: "Hủy", style: "cancel" },
                ...nextStatusOptions.map((status) => ({
                    text: status.label,
                    onPress: () => confirmUpdateStatus(status.id),
                })),
            ],
            { cancelable: true }
        )
    }

    const confirmUpdateStatus = async (newStatus) => {
        setUpdatingStatus(true)
        try {
            const response = await api.admin.updateOrderStatus(orderId, newStatus)
            if (response.success) {
                setOrder({
                    ...order,
                    statusCode: newStatus,
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
                            padding: 20px;
                            color: #333;
                        }
                        h1 {
                            color: #e30019;
                            border-bottom: 2px solid #eee;
                            padding-bottom: 5px;
                            text-align: center;
                            font-size: 24px;
                        }
                        h2 {
                            color: #333;
                            font-size: 20px;
                            margin-top: 20px;
                        }
                        p {
                            margin: 5px 0;
                            font-size: 14px;
                        }
                        .info-section {
                            margin-bottom: 20px;
                        }
                        table {
                            width: 100%;
                            border-collapse: collapse;
                            margin-top: 10px;
                            font-size: 14px;
                        }
                        th, td {
                            border: 1px solid #ddd;
                            padding: 8px;
                            text-align: left;
                        }
                        th {
                            background-color: #f2f2f2;
                            font-weight: bold;
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
                    </style>
                </head>
                <body>
                    <h1>Đơn hàng #${order.id}</h1>
                    <div class="info-section">
                        <p><strong>Khách hàng:</strong> ${order.customerName}</p>
                        <p><strong>Số điện thoại:</strong> ${order.customerPhone}</p>
                        <p><strong>Email:</strong> ${order.customerEmail}</p>
                        <p><strong>Địa chỉ giao hàng:</strong> ${order.shippingAddress}</p>
                        <p><strong>Phương thức thanh toán:</strong> ${order.paymentMethod}</p>
                        <p><strong>Trạng thái:</strong> ${order.status}</p>
                    </div>
                    <h2>Sản phẩm</h2>
                    <table>
                        <thead>
                            <tr>
                                <th>Tên sản phẩm</th>
                                <th>Phiên bản</th>
                                <th>Giá</th>
                                <th>Số lượng</th>
                                <th>Tổng</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${order.items
                .map(
                    (item) => `
                                <tr>
                                    <td>${item.name}</td>
                                    <td>${item.variant || "N/A"}</td>
                                    <td>${formatCurrency(item.price)}</td>
                                    <td>${item.quantity}</td>
                                    <td>${formatCurrency(item.price * item.quantity)}</td>
                                </tr>
                            `
                )
                .join("")}
                        </tbody>
                    </table>
                    <div class="summary">
                        <p>Tạm tính: ${formatCurrency(order.subtotal)}</p>
                        <p>Phí vận chuyển: ${formatCurrency(order.shippingFee)}</p>
                        ${order.discount > 0
                ? `<p>Giảm giá: -${formatCurrency(order.discount)}</p>`
                : ""
            }
                        <p>Thuế (VAT): ${formatCurrency(order.tax)}</p>
                        <p>Tổng cộng: ${formatCurrency(order.total)}</p>
                        ${order.note
                ? `<p class="note"><strong>Ghi chú:</strong> ${order.note}</p>`
                : ""
            }
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
        fetchOrderDetails()
    }, [orderId])

    return {
        navigation,
        orderId,
        loading,
        order,
        updatingStatus,
        getStatusColor,
        handleUpdateStatus,
        handlePrintOrder,
    }
}

export default useOrdersManagementDetail