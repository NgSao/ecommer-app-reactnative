import { View, ScrollView, RefreshControl, ActivityIndicator, Text, SafeAreaView } from "react-native"
import styles from "../../styles/AdminDashboardStyles"
import { formatCurrency } from "@utils/formatUtils"
import useAdminDashboard from "@hooks/useAdminDashboard"
import DashboardHeader from "@components/admin/dashboard/DashboardHeader"
import TabNavigation from "@components/admin/dashboard/TabNavigation"
import StatsCard from "@components/admin/dashboard/StatsCard"
import QuickActions from "@components/admin/dashboard/QuickActions"
import RecentOrders from "@components/admin/dashboard/RecentOrders"
import NotificationsList from "@components/admin/dashboard/NotificationsList"
import ChartSection from "@components/admin/dashboard/ChartSection"

const AdminDashboardScreen = () => {
    const {
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
    } = useAdminDashboard()

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