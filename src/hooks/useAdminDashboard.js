import { useState, useEffect } from "react"
import { useNavigation } from "@react-navigation/native"
import { Alert } from "react-native"
import { useAuth } from "@contexts/AuthContext"
import { api } from "@service/apiAdmin"

const useAdminDashboard = () => {
    const navigation = useNavigation()
    const { user, logout } = useAuth()
    const [loading, setLoading] = useState(true)
    const [refreshing, setRefreshing] = useState(false)
    const [activeTab, setActiveTab] = useState("overview")
    const [stats, setStats] = useState({
        totalRevenue: 0,
        totalOrders: 0,
        pendingOrders: 0,
        totalProducts: 0,
        lowStockProducts: 0,
        totalCustomers: 0,
    })
    const [recentOrders, setRecentOrders] = useState([])
    const [notifications, setNotifications] = useState([])
    const [revenueData, setRevenueData] = useState({
        labels: ["T1", "T2", "T3", "T4", "T5", "T6"],
        datasets: [{ data: [0, 0, 0, 0, 0, 0] }],
    })
    const [categoryData, setCategoryData] = useState([
        { name: "iPhone", data: 45, color: "#FF6384", legendFontColor: "#7F7F7F", legendFontSize: 12 },
        { name: "iPad", data: 25, color: "#36A2EB", legendFontColor: "#7F7F7F", legendFontSize: 12 },
        { name: "Mac", data: 15, color: "#FFCE56", legendFontColor: "#7F7F7F", legendFontSize: 12 },
        { name: "Watch", data: 10, color: "#4BC0C0", legendFontColor: "#7F7F7F", legendFontSize: 12 },
        { name: "Phụ kiện", data: 5, color: "#9966FF", legendFontColor: "#7F7F7F", legendFontSize: 12 },
    ])
    const [orderStatusData, setOrderStatusData] = useState({
        labels: ["Đang xử lý", "Đang giao", "Đã giao", "Đã hủy"],
        datasets: [{ data: [0, 0, 0, 0] }],
    })

    useEffect(() => {
        fetchDashboardData()
    }, [])

    const fetchDashboardData = async () => {
        setLoading(true)
        try {
            const statsResponse = await api.admin.getStats()
            if (statsResponse.success) {
                setStats(statsResponse.data)
            }

            const ordersResponse = await api.admin.getRecentOrders()
            if (ordersResponse.success) {
                setRecentOrders(ordersResponse.data)
            }

            const notificationsResponse = await api.admin.getNotifications()
            if (notificationsResponse.success) {
                setNotifications(notificationsResponse.data)
            }

            const revenueResponse = await api.admin.getRevenueData()
            if (revenueResponse.success) {
                setRevenueData(revenueResponse.data)
            }

            const categoryResponse = await api.admin.getCategorySales()
            if (categoryResponse.success) {
                const pieChartData = categoryResponse.data.labels.map((label, index) => ({
                    name: label,
                    data: categoryResponse.data.data[index],
                    color: categoryResponse.data.colors[index],
                    legendFontColor: "#7F7F7F",
                    legendFontSize: 12,
                }))
                setCategoryData(pieChartData)
            }

            const orderStatusResponse = await api.admin.getOrderStatusStats()
            if (orderStatusResponse.success) {
                const barChartData = {
                    labels: orderStatusResponse.data.labels,
                    datasets: [{ data: orderStatusResponse.data.data }],
                }
                setOrderStatusData(barChartData)
            }
        } catch (error) {
            console.error("Error fetching dashboard data:", error)
            Alert.alert("Lỗi", "Đã xảy ra lỗi khi tải dữ liệu trang quản trị")
        } finally {
            setLoading(false)
            setRefreshing(false)
        }
    }

    const onRefresh = () => {
        setRefreshing(true)
        fetchDashboardData()
    }

    const handleLogout = () => {
        Alert.alert("Xác nhận đăng xuất", "Bạn có chắc chắn muốn đăng xuất khỏi tài khoản quản trị?", [
            { text: "Hủy", style: "cancel" },
            { text: "Đăng xuất", style: "destructive", onPress: () => logout() },
        ])
    }

    const navigateToUserApp = () => {
        navigation.navigate("AppTab")
    }

    const navigateToSettings = () => {
        navigation.navigate("AdminSettings")
    }

    const navigateToOrders = () => {
        navigation.navigate("AdminOrdersManagement")
    }

    const navigateToProducts = () => {
        navigation.navigate("AdminProductsManagement")
    }

    const navigateToCustomers = () => {
        navigation.navigate("AdminCustomersManagement")
    }

    const navigateToOrderDetail = (orderId) => {
        navigation.navigate("AdminOrderDetail", { orderId })
    }

    const navigateToNotifications = () => {
        navigation.navigate("AdminNotifications")
    }

    const navigateToScreenOrTab = (destination) => {
        if (destination === "charts") {
            setActiveTab("charts")
        } else {
            navigation.navigate(destination)
        }
    }

    const navigateToExportData = () => {
        navigation.navigate("AdminExportData")
    }

    const navigateToRevenueReport = () => {
        navigation.navigate("AdminRevenueReport")
    }

    const navigateToCategoryReport = () => {
        navigation.navigate("AdminCategoryReport")
    }

    const navigateToNotificationScreen = (screen, params) => {
        navigation.navigate(screen, params)
    }

    return {
        user,
        loading,
        refreshing,
        activeTab,
        stats,
        recentOrders,
        notifications,
        revenueData,
        categoryData,
        orderStatusData,
        setActiveTab,
        onRefresh,
        handleLogout,
        navigateToUserApp,
        navigateToSettings,
        navigateToOrders,
        navigateToProducts,
        navigateToCustomers,
        navigateToOrderDetail,
        navigateToNotifications,
        navigateToScreenOrTab,
        navigateToExportData,
        navigateToRevenueReport,
        navigateToCategoryReport,
        navigateToNotificationScreen,
    }
}

export default useAdminDashboard