import { View, ScrollView, RefreshControl, ActivityIndicator, Text } from "react-native"
import styles from "../../styles/AdminDashboardStyles"
import { formatCurrency } from "@utils/formatUtils"
import DashboardHeader from "@components/admin/dashboard/DashboardHeader"
import TabNavigation from "@components/admin/dashboard/TabNavigation"
import StatsCard from "@components/admin/dashboard/StatsCard"
import QuickActions from "@components/admin/dashboard/QuickActions"
import RecentOrders from "@components/admin/dashboard/RecentOrders"
import NotificationsList from "@components/admin/dashboard/NotificationsList"
import ChartSection from "@components/admin/dashboard/ChartSection"
import { SafeAreaView } from 'react-native-safe-area-context';
import { useState, useEffect } from "react"
import { useNavigation } from "@react-navigation/native"
import { Alert } from "react-native"
import { useAuth } from "@contexts/AuthContext"
import { ADMIN_GET_ALL, ADMIN_GET_ALL_PAGE, GET_ALL } from "api/apiService"
const AdminDashboardScreen = () => {
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


    const customersPerPage = 3;
    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
        fetchDashboardData()
    }, [])

    const fetchDashboardData = async () => {
        setLoading(true)
        const params = {
            page: currentPage,
            limit: customersPerPage,
        };
        try {
            const statsResponse = await ADMIN_GET_ALL("stats")
            if (statsResponse.status === 200) {
                setStats(statsResponse.data.data)
            }


            const ordersResponse = await ADMIN_GET_ALL_PAGE("orders", params)
            if (ordersResponse.status === 200) {
                setRecentOrders(ordersResponse.data.data.content)
            }



            const notificationsResponse = await ADMIN_GET_ALL(`notifications?limit=5`)
            if (notificationsResponse.status === 200) {
                setNotifications(notificationsResponse.data.data)

            }


            const revenueResponse = await ADMIN_GET_ALL("orders/revenue-stats")
            if (revenueResponse.status === 200) {
                setRevenueData(revenueResponse.data.data)
            }

            // const categoryResponse = await api.admin.getCategorySales()
            // if (categoryResponse.success) {
            //     const pieChartData = categoryResponse.data.labels.map((label, index) => ({
            //         name: label,
            //         data: categoryResponse.data.data[index],
            //         color: categoryResponse.data.colors[index],
            //         legendFontColor: "#7F7F7F",
            //         legendFontSize: 12,
            //     }))
            //     setCategoryData(pieChartData)
            // }

            const orderStatusResponse = await ADMIN_GET_ALL("orders/status-stats")
            if (orderStatusResponse.status === 200) {
                const barChartData = {
                    labels: orderStatusResponse.data.data.labels,
                    datasets: [{ data: orderStatusResponse.data.data.data }],
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
        Alert.alert(
            "Xác nhận đăng xuất",
            "Bạn có chắc chắn muốn đăng xuất khỏi tài khoản quản trị?",
            [
                { text: "Hủy", style: "cancel" },
                {
                    text: "Đăng xuất",
                    style: "destructive",
                    onPress: () => {
                        logout();
                        navigation.replace("AppTab");
                    }
                }
            ]
        );
    };


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

    const navigateToOrderDetail = (orderId, userId) => {
        navigation.navigate("AdminOrderDetail", {
            orderId,
            userId
        })
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

    if (loading && !refreshing) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#e30019" />
                <Text style={styles.loadingText}>Đang tải dữ liệu...</Text>
            </View>
        )
    }

    return (
        <SafeAreaView style={styles.container}>
            <DashboardHeader
                user={user}
                onNavigateToUserApp={navigateToUserApp}
                onNavigateToSettings={navigateToSettings}
                onLogout={handleLogout}
            />
            <TabNavigation activeTab={activeTab} onTabChange={setActiveTab} />
            <ScrollView
                style={styles.scrollContainer}
                refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
            >
                {activeTab === "overview" ? (
                    <>
                        <View style={{ flexDirection: "row", flexWrap: "wrap", justifyContent: "space-between", marginBottom: 20 }}>
                            <StatsCard
                                icon="cash-outline"
                                value={formatCurrency(stats.totalRevenue)}
                                label="Doanh thu"
                                iconColor="#e30019"
                                backgroundColor="rgba(227, 0, 25, 0.1)"
                            />
                            <StatsCard
                                icon="cart-outline"
                                value={stats.totalOrders}
                                label="Đơn hàng"
                                iconColor="#3498db"
                                backgroundColor="rgba(52, 152, 219, 0.1)"
                                onPress={navigateToOrders}
                            />
                            <StatsCard
                                icon="phone-portrait-outline"
                                value={stats.totalProducts}
                                label="Sản phẩm"
                                iconColor="#2ecc71"
                                backgroundColor="rgba(46, 204, 113, 0.1)"
                                onPress={navigateToProducts}
                            />
                            <StatsCard
                                icon="people-outline"
                                value={stats.totalCustomers}
                                label="Khách hàng"
                                iconColor="#9b59b6"
                                backgroundColor="rgba(155, 89, 182, 0.1)"
                                onPress={navigateToCustomers}
                            />
                            <StatsCard
                                icon="time-outline"
                                value={stats.pendingOrders}
                                label="Chờ xử lý"
                                iconColor="#e74c3c"
                                backgroundColor="rgba(231, 76, 60, 0.1)"
                            />
                            <StatsCard
                                icon="alert-circle-outline"
                                value={stats.lowStockProducts}
                                label="Sắp hết hàng"
                                iconColor="#f1c40f"
                                backgroundColor="rgba(241, 196, 15, 0.1)"
                            />
                        </View>
                        <QuickActions onNavigate={navigateToScreenOrTab} />
                        <RecentOrders
                            orders={recentOrders}
                            onViewAll={navigateToOrders}
                            onViewOrderDetail={navigateToOrderDetail}
                        />
                        <NotificationsList
                            notifications={notifications}
                            onViewAll={navigateToNotifications}
                            onViewNotification={navigateToNotificationScreen}
                        />
                    </>
                ) : (
                    <ChartSection
                        revenueData={revenueData}
                        categoryData={categoryData}
                        orderStatusData={orderStatusData}
                        onExport={navigateToExportData}
                        onViewRevenueReport={navigateToRevenueReport}
                        onViewCategoryReport={navigateToCategoryReport}
                        onViewOrders={navigateToOrders}
                    />
                )}
            </ScrollView>
        </SafeAreaView>
    )
}

export default AdminDashboardScreen