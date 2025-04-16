import { useState, useEffect } from "react"
import { useNavigation, useRoute } from "@react-navigation/native"
import { Alert } from "react-native"
import { useAuth } from "@contexts/AuthContext"
import { api } from "@service/api"

const useOrderDetail = () => {
    const navigation = useNavigation()
    const route = useRoute()
    const { token } = useAuth()
    const { orderId } = route.params

    const [order, setOrder] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        fetchOrderDetails()
    }, [])

    const fetchOrderDetails = async () => {
        try {
            setLoading(true)
            const response = await api.getOrderById(token, orderId)
            if (response.success) {
                setOrder(response.data)
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

    const formatDate = (dateString) => {
        const date = new Date(dateString)
        return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()} ${date.getHours()}:${date.getMinutes().toString().padStart(2, "0")}`
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

    const handleCancelOrder = () => {
        Alert.alert("Hủy đơn hàng", "Bạn có chắc chắn muốn hủy đơn hàng này?", [
            {
                text: "Không",
                style: "cancel",
            },
            {
                text: "Có, hủy đơn hàng",
                onPress: () => {
                    // In a real app, this would call an API to cancel the order
                    console.log("Cancel order:", orderId)
                    Alert.alert("Thành công", "Đơn hàng đã được hủy")
                    navigation.goBack()
                },
                style: "destructive",
            },
        ])
    }

    return {
        order,
        loading,
        navigation,
        formatDate,
        formatPrice,
        getStatusColor,
        handleCancelOrder,
    }
}

export default useOrderDetail