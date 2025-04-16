import { useState, useEffect } from "react"
import { useNavigation } from "@react-navigation/native"
import { Alert } from "react-native"
import { api } from '@service/apiAdmin';

const useOrdersManagement = () => {
    const navigation = useNavigation()
    const [orders, setOrders] = useState([])
    const [loading, setLoading] = useState(true)
    const [refreshing, setRefreshing] = useState(false)
    const [searchQuery, setSearchQuery] = useState("")
    const [filteredOrders, setFilteredOrders] = useState([])
    const [statusFilter, setStatusFilter] = useState("all")

    const statusOptions = [
        { id: "all", label: "Tất cả" },
        { id: "pending", label: "Chờ xử lý" },
        { id: "processing", label: "Đang xử lý" },
        { id: "shipping", label: "Đang giao" },
        { id: "delivered", label: "Đã giao" },
        { id: "cancelled", label: "Đã hủy" },
    ]

    useEffect(() => {
        fetchOrders()
    }, [])

    useEffect(() => {
        filterOrders()
    }, [searchQuery, statusFilter, orders])

    const fetchOrders = async () => {
        setLoading(true)
        try {
            const response = await api.admin.getOrders()
            if (response.success) {
                setOrders(response.data)
            } else {
                Alert.alert("Lỗi", "Không thể tải danh sách đơn hàng")
            }
        } catch (error) {
            console.error("Error fetching orders:", error)
            Alert.alert("Lỗi", "Đã xảy ra lỗi khi tải danh sách đơn hàng")
        } finally {
            setLoading(false)
            setRefreshing(false)
        }
    }

    const filterOrders = () => {
        let filtered = [...orders]

        if (statusFilter !== "all") {
            filtered = filtered.filter((order) => order.statusCode === statusFilter)
        }

        if (searchQuery.trim() !== "") {
            filtered = filtered.filter(
                (order) =>
                    order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
                    order.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                    order.customerPhone.includes(searchQuery),
            )
        }

        setFilteredOrders(filtered)
    }

    const onRefresh = () => {
        setRefreshing(true)
        fetchOrders()
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

    const handleUpdateStatus = (orderId, currentStatus) => {
        const nextStatusOptions = getNextStatusOptions(currentStatus)

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
                    onPress: () => confirmUpdateStatus(orderId, status.id),
                })),
            ],
            { cancelable: true },
        )
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

    const confirmUpdateStatus = async (orderId, newStatus) => {
        try {
            const response = await api.admin.updateOrderStatus(orderId, newStatus)
            if (response.success) {
                const updatedOrders = orders.map((order) => {
                    if (order.id === orderId) {
                        return {
                            ...order,
                            statusCode: newStatus,
                            status: statusOptions.find((option) => option.id === newStatus)?.label || newStatus,
                        }
                    }
                    return order
                })
                setOrders(updatedOrders)
                Alert.alert("Thành công", "Đã cập nhật trạng thái đơn hàng")
            } else {
                Alert.alert("Lỗi", response.error || "Không thể cập nhật trạng thái đơn hàng")
            }
        } catch (error) {
            console.error("Error updating order status:", error)
            Alert.alert("Lỗi", "Đã xảy ra lỗi khi cập nhật trạng thái đơn hàng")
        }
    }

    const navigateToOrderDetail = (orderId) => {
        navigation.navigate("AdminOrderDetail", { orderId })
    }

    const navigateToExportOrders = () => {
        navigation.navigate("AdminExportOrders")
    }

    const navigateToCreateOrder = () => {
        navigation.navigate("AdminCreateOrder")
    }

    const navigateBack = () => {
        navigation.goBack()
    }

    return {
        orders,
        loading,
        refreshing,
        searchQuery,
        filteredOrders,
        statusFilter,
        statusOptions,
        setSearchQuery,
        setStatusFilter,
        onRefresh,
        getStatusColor,
        handleUpdateStatus,
        navigateToOrderDetail,
        navigateToExportOrders,
        navigateToCreateOrder,
        navigateBack,
    }
}

export default useOrdersManagement