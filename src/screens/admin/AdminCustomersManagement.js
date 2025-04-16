import { View, FlatList, ActivityIndicator, RefreshControl, TouchableOpacity, Text, SafeAreaView } from "react-native"
import { Ionicons } from "@expo/vector-icons"

import styles from "../../styles/AdminCustomersManagementStyles"
import useCustomerManagement from "@hooks/useCustomerManagement"
import AdminHeader from "@components/admin/AdminHeader"
import SearchFilter from "@components/admin/customer/SearchFilter"
import CustomerStats from "@components/admin/customer/CustomerStats"
import CustomerItem from "@components/admin/customer/CustomerItem"
import CustomerDetailModal from "@components/admin/customer/CustomerDetailModal"

const AdminCustomersManagement = () => {
    const {
        navigation,
        customers,
        loading,
        refreshing,
        searchQuery,
        setSearchQuery,
        filteredCustomers,
        statusFilter,
        setStatusFilter,
        modalVisible,
        setModalVisible,
        selectedCustomer,
        customerOrders,
        loadingCustomerDetails,
        statusOptions,
        currentPage,
        totalPages,
        setCurrentPage,
        sortBy,
        sortOrder,
        handleSort,
        onRefresh,
        handleViewCustomerDetails,
        handleToggleStatus,
    } = useCustomerManagement()

    return (
        <SafeAreaView style={styles.container}>
            <AdminHeader title="Quản lý khách hàng" />

            <SearchFilter
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
                statusFilter={statusFilter}
                setStatusFilter={setStatusFilter}
                statusOptions={statusOptions}
            />

            {loading && !refreshing ? (
                <View style={styles.loadingContainer}>
                    <ActivityIndicator size="large" color="#e30019" />
                    <Text style={styles.loadingText}>Đang tải danh sách khách hàng...</Text>
                </View>
            ) : (
                <>
                    <CustomerStats customers={customers} />

                    <View style={styles.sortContainer}>
                        <TouchableOpacity style={styles.sortButton} onPress={() => handleSort("name")}>
                            <Text style={styles.sortButtonText}>Sắp xếp theo tên</Text>
                            <Ionicons
                                name={sortBy === "name" && sortOrder === "asc" ? "arrow-up" : "arrow-down"}
                                size={16}
                                color="#333"
                            />
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.sortButton} onPress={() => handleSort("createdAt")}>
                            <Text style={styles.sortButtonText}>Sắp xếp theo ngày đăng ký</Text>
                            <Ionicons
                                name={sortBy === "createdAt" && sortOrder === "asc" ? "arrow-up" : "arrow-down"}
                                size={16}
                                color="#333"
                            />
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.sortButton} onPress={() => handleSort("totalSpent")}>
                            <Text style={styles.sortButtonText}>Sắp xếp theo chi tiêu</Text>
                            <Ionicons
                                name={sortBy === "totalSpent" && sortOrder === "asc" ? "arrow-up" : "arrow-down"}
                                size={16}
                                color="#333"
                            />
                        </TouchableOpacity>
                    </View>

                    {filteredCustomers.length === 0 ? (
                        <View style={styles.emptyContainer}>
                            <Ionicons name="people-outline" size={60} color="#ccc" />
                            <Text style={styles.emptyText}>
                                {searchQuery.length > 0 || statusFilter !== "all"
                                    ? "Không tìm thấy khách hàng phù hợp"
                                    : "Chưa có khách hàng nào trong hệ thống"}
                            </Text>
                        </View>
                    ) : (
                        <>
                            <FlatList
                                data={filteredCustomers}
                                renderItem={({ item }) => (
                                    <CustomerItem
                                        customer={item}
                                        handleViewCustomerDetails={handleViewCustomerDetails}
                                        handleToggleStatus={handleToggleStatus}
                                        navigation={navigation}
                                    />
                                )}
                                keyExtractor={(item) => item.id.toString()}
                                contentContainerStyle={styles.listContainer}
                                refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
                            />

                            <View style={styles.paginationContainer}>
                                <TouchableOpacity
                                    style={styles.paginationButton}
                                    onPress={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                                    disabled={currentPage === 1}
                                >
                                    <Text style={styles.paginationButtonText}>Trang trước</Text>
                                </TouchableOpacity>
                                <Text style={styles.pageText}>
                                    Trang {currentPage} / {totalPages}
                                </Text>
                                <TouchableOpacity
                                    style={styles.paginationButton}
                                    onPress={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                                    disabled={currentPage === totalPages}
                                >
                                    <Text style={styles.paginationButtonText}>Trang sau</Text>
                                </TouchableOpacity>
                            </View>
                        </>
                    )}
                </>
            )}

            <CustomerDetailModal
                modalVisible={modalVisible}
                setModalVisible={setModalVisible}
                selectedCustomer={selectedCustomer}
                customerOrders={customerOrders}
                loadingCustomerDetails={loadingCustomerDetails}
                handleToggleStatus={handleToggleStatus}
                navigation={navigation}
            />

            <TouchableOpacity style={styles.addButton} onPress={() => navigation.navigate("AdminCreateCustomer")}>
                <Ionicons name="add" size={30} color="#fff" />
            </TouchableOpacity>
        </SafeAreaView>
    )
}

export default AdminCustomersManagement