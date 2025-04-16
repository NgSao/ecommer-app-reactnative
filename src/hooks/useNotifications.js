import { useState, useEffect } from "react"
import { useNavigation } from "@react-navigation/native"
import { api } from "@service/api"
import { Ionicons } from "@expo/vector-icons"

const useNotifications = () => {
    const navigation = useNavigation()
    const [notifications, setNotifications] = useState([])
    const [loading, setLoading] = useState(true)
    const [refreshing, setRefreshing] = useState(false)
    const [activeTab, setActiveTab] = useState("all")

    useEffect(() => {
        fetchNotifications()
    }, [])

    const fetchNotifications = async () => {
        try {
            setLoading(true)
            // In a real app, this would be an API call
            const response = await api.getNotifications();
            setTimeout(() => {
                setNotifications(response.data)
                setLoading(false)
                setRefreshing(false)
            }, 1000)
        } catch (error) {
            console.error("Error fetching notifications:", error)
            setLoading(false)
            setRefreshing(false)
        }
    }

    const onRefresh = () => {
        setRefreshing(true)
        fetchNotifications()
    }

    const markAsRead = (id) => {
        setNotifications((prev) =>
            prev.map((notification) => (notification.id === id ? { ...notification, read: true } : notification)),
        )
    }

    const deleteNotification = (id) => {
        setNotifications((prev) => prev.filter((notification) => notification.id !== id))
    }

    const markAllAsRead = () => {
        setNotifications((prev) => prev.map((notification) => ({ ...notification, read: true })))
    }

    const filteredNotifications = notifications.filter((notification) => {
        if (activeTab === "all") return true
        return notification.type === activeTab
    })

    const formatDate = (dateString) => {
        const date = new Date(dateString)
        const now = new Date()
        const diffTime = Math.abs(now - date)
        const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24))

        if (diffDays === 0) {
            return `Hôm nay, ${date.getHours()}:${date.getMinutes().toString().padStart(2, "0")}`
        } else if (diffDays === 1) {
            return `Hôm qua, ${date.getHours()}:${date.getMinutes().toString().padStart(2, "0")}`
        } else {
            return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`
        }
    }

    const getNotificationIcon = (type) => {
        switch (type) {
            case "order":
                return <Ionicons name="receipt-outline" size={24} color="#e30019" />
            case "promotion":
                return <Ionicons name="pricetag-outline" size={24} color="#ff9800" />
            case "news":
                return <Ionicons name="newspaper-outline" size={24} color="#2196f3" />
            default:
                return <Ionicons name="notifications-outline" size={24} color="#666" />
        }
    }

    const handleNotificationPress = (notification) => {
        markAsRead(notification.id)
        switch (notification.type) {
            case "order":
                navigation.navigate("OrderDetail", { orderId: notification.data.orderId })
                break
            case "promotion":
                console.log("Navigate to promotion:", notification.data.promotionId)
                break
            case "news":
                console.log("Navigate to news:", notification.data.newsId)
                break
            default:
                break
        }
    }

    return {
        notifications,
        loading,
        refreshing,
        activeTab,
        setActiveTab,
        filteredNotifications,
        fetchNotifications,
        onRefresh,
        markAsRead,
        deleteNotification,
        markAllAsRead,
        formatDate,
        getNotificationIcon,
        handleNotificationPress,
    }
}

export default useNotifications