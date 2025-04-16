import { useState, useEffect } from "react"
import { useNavigation } from "@react-navigation/native"
import { useAuth } from "@contexts/AuthContext"
import { api } from "@service/api"

const useOrderHistory = () => {
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
            const response = await api.getOrders(token)
            if (response.success) {
                setOrders(response.data)
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

    const formatDate = (dateString) => {
        const date = new Date(dateString)
        return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`
    }

    const formatPrice = (price) => {
        return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".") + "đ"
    }

    const getStatusColor = (status) => {
        switch (status) {
            case "Đã giao hàng":
                return "#4caf50"
            case "Đang giao hàng":
                return "#2196f3"
            case "Đang xử lý":
                return "#ff9800"
            case "Đã hủy":
                return "#f44336"
            default:
                return "#666"
        }
    }

    const filteredOrders = orders.filter((order) => {
        if (activeTab === "all") return true
        switch (activeTab) {
            case "processing":
                return order.status === "Đang xử lý"
            case "shipping":
                return order.status === "Đang giao hàng"
            case "delivered":
                return order.status === "Đã giao hàng"
            case "cancelled":
                return order.status === "Đã hủy"
            default:
                return true
        }
    })

    return {
        orders,
        loading,
        refreshing,
        activeTab,
        setActiveTab,
        filteredOrders,
        fetchOrders,
        onRefresh,
        navigateToOrderDetail,
        formatDate,
        formatPrice,
        getStatusColor,
    }
}

export default useOrderHistory