import { View, Text, FlatList, ActivityIndicator, RefreshControl, SafeAreaView } from "react-native"
import { Ionicons } from "@expo/vector-icons"
import styles from "../../styles/AdminOrdersManagementStyles"
import { TouchableOpacity } from "react-native"
import useOrdersManagement from "@hooks/useOrdersManagement"
import SearchBar from "@components/admin/order/SearchBar"
import StatusFilter from "@components/admin/order/StatusFilter"
import StatsSummary from "@components/admin/order/StatsSummary"
import OrderItem from "@components/admin/order/OrderItem"

const AdminOrdersManagement = () => {
    const {
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
    } = useOrdersManagement()

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity style={styles.backButton} onPress={navigateBack}>
                    <Ionicons name="arrow-back" size={24} color="#333" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Quản lý đơn hàng</Text>
                <TouchableOpacity style={styles.exportButton} onPress={navigateToExportOrders}>
                    <Ionicons name="download-outline" size={20} color="#fff" />
                </TouchableOpacity>
            </View>
            <View style={styles.header}>
                <Text style={styles.headerTitle}>Tạo đơn hàng</Text>
                <TouchableOpacity style={styles.exportButton} onPress={navigateToCreateOrder}>
                    <Ionicons name="document-text-outline" size={20} color="#fff" />
                </TouchableOpacity>
            </View>

            <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
            <StatusFilter
                statusOptions={statusOptions}
                statusFilter={statusFilter}
                setStatusFilter={setStatusFilter}
                getStatusColor={getStatusColor}
            />

            {loading && !refreshing ? (
                <View style={styles.loadingContainer}>
                    <ActivityIndicator size="large" color="#e30019" />
                    <Text style={styles.loadingText}>Đang tải đơn hàng...</Text>
                </View>
            ) : (
                <>
                    <StatsSummary orders={orders} />
                    {filteredOrders.length === 0 ? (
                        <View style={styles.emptyContainer}>
                            <Ionicons name="document-text-outline" size={60} color="#ccc" />
                            <Text style={styles.emptyText}>
                                {searchQuery.length > 0 || statusFilter !== "all"
                                    ? "Không tìm thấy đơn hàng phù hợp"
                                    : "Chưa có đơn hàng nào trong hệ thống"}
                            </Text>
                        </View>
                    ) : (
                        <FlatList
                            data={filteredOrders}
                            renderItem={({ item }) => (
                                <OrderItem
                                    order={item}
                                    getStatusColor={getStatusColor}
                                    handleUpdateStatus={handleUpdateStatus}
                                    navigateToOrderDetail={navigateToOrderDetail}
                                />
                            )}
                            keyExtractor={(item) => item.id.toString()}
                            contentContainerStyle={styles.listContainer}
                            refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
                        />
                    )}
                </>
            )}
        </SafeAreaView>
    )
}

export default AdminOrdersManagement