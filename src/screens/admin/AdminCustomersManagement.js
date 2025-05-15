import { View, FlatList, ActivityIndicator, RefreshControl, TouchableOpacity, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import styles from "../../styles/AdminCustomersManagementStyles";
import SearchFilter from "@components/admin/customer/SearchFilter";
import CustomerStats from "@components/admin/customer/CustomerStats";
import CustomerItem from "@components/admin/customer/CustomerItem";
import CustomerDetailModal from "@components/admin/customer/CustomerDetailModal";
import { useState, useEffect } from "react";
import { Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { ADMIN_GET_ALL_PAGE, ADMIN_POST_ADD, POST_ADD } from "api/apiService";
import { useAuth } from "@contexts/AuthContext";

const AdminCustomersManagement = () => {
    const navigation = useNavigation();
    const [customers, setCustomers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const [filteredCustomers, setFilteredCustomers] = useState([]);
    const [statusFilter, setStatusFilter] = useState("all");
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedCustomer, setSelectedCustomer] = useState(null);
    const [customerOrders, setCustomerOrders] = useState([]);
    const [loadingCustomerDetails, setLoadingCustomerDetails] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [totalCustomers, setTotalCustomers] = useState(0);
    const customersPerPage = 4;
    const { user } = useAuth();


    const statusOptions = [
        { id: "all", label: "Tất cả" },
        { id: "ACTIVE", label: "Hoạt động" },
        { id: "INACTIVE", label: "Chưa kích hoạt" },
        { id: "BLOCKED", label: "Bị khóa" },
    ];

    const roleOptions = [
        { id: "CUSTOMER", label: "Khách hàng" },
        { id: "STAFF", label: "Nhân viên" },
        { id: "ADMIN", label: "Quản trị viên" },
    ];

    useEffect(() => {
        fetchCustomers();
    }, [currentPage]);

    useEffect(() => {
        filterCustomers();
    }, [searchQuery, statusFilter, customers]);

    const fetchCustomers = async () => {
        setLoading(true);
        const params = {
            page: currentPage,
            limit: customersPerPage,
        };

        try {
            const response = await ADMIN_GET_ALL_PAGE("users", params);
            if (response.status === 200) {
                setCustomers(response.data.data.content);
                setTotalPages(response.data.data.totalPages);
                setTotalCustomers(response.data.data.totalElements);
            } else {
                Alert.alert("Lỗi", "Không thể tải danh sách khách hàng");
            }
        } catch (error) {
            console.error("Error fetching customers:", error);
            Alert.alert("Lỗi", "Đã xảy ra lỗi khi tải danh sách khách hàng");
        } finally {
            setLoading(false);
            setRefreshing(false);
        }
    };

    const filterCustomers = () => {
        let filtered = [...customers];
        if (statusFilter !== "all") {
            filtered = filtered.filter((customer) => customer.status === statusFilter);
        }
        if (searchQuery.trim() !== "") {
            filtered = filtered.filter((customer) => {
                const fullName = customer.fullName ? customer.fullName.toLowerCase() : "";
                const email = customer.email ? customer.email.toLowerCase() : "";
                const phone = customer.phone ? customer.phone : "";
                return (
                    fullName.includes(searchQuery.toLowerCase()) ||
                    email.includes(searchQuery.toLowerCase()) ||
                    phone.includes(searchQuery)
                );
            });
        }
        setFilteredCustomers(filtered);
    };

    const onRefresh = () => {
        setRefreshing(true);
        setCurrentPage(1);
        fetchCustomers();
    };

    const handleViewCustomerDetails = async (customer) => {
        setSelectedCustomer(customer);
        setModalVisible(true);
        setLoadingCustomerDetails(true);
        try {
            // const response = await api.admin.getCustomerOrders(customer.id);
            // if (response.success) {
            //     setCustomerOrders(response.data);
            // } else {
            //     setCustomerOrders([]);
            //     Alert.alert("Thông báo", "Không thể tải lịch sử đơn hàng của khách hàng");
            // }
        } catch (error) {
            console.error("Error fetching customer orders:", error);
            setCustomerOrders([]);
        } finally {
            setLoadingCustomerDetails(false);
        }
    };

    const handleToggleStatus = async (customerId, currentStatus) => {

        const newStatus = currentStatus === "ACTIVE" ? "BLOCKED" : "ACTIVE";
        const fromData = {
            id: customerId,
            status: newStatus,
        };
        if (customerId === user.id) {
            Alert.alert("Thông báo", "Bạn không thể thay đổi trạng thái tài khoản của chính mình");
            return;
        }

        try {
            await ADMIN_POST_ADD("users/active", fromData);
            const updatedCustomers = customers.map((customer) =>
                customer.id === customerId ? { ...customer, status: newStatus } : customer
            );
            setCustomers(updatedCustomers);
            Alert.alert("Thành công", `Đã ${newStatus === "ACTIVE" ? "kích hoạt" : "vô hiệu hóa"} tài khoản khách hàng`);
        } catch (error) {
            console.error("Error updating customer status:", error);
            Alert.alert("Lỗi", "Đã xảy ra lỗi khi cập nhật trạng thái khách hàng");
        }
    };

    const handleChangeRole = async (customerId, email, newRole) => {
        console.log("customerId", customerId);
        console.log("email", email);
        console.log("newRole", newRole);
        const fromData = {
            id: customerId,
            roleAuthorities: newRole,
        };
        try {
            const response = await ADMIN_POST_ADD("users/role", fromData);
            const updatedCustomers = customers.map((customer) =>
                customer.id === customerId ? { ...customer, role: newRole } : customer
            );
            setCustomers(updatedCustomers);
            Alert.alert("Thành công", `Đã thay đổi quyền thành ${roleOptions.find((r) => r.id === newRole).label}`);
        } catch (error) {
            console.error("Error changing customer role:", error);
            Alert.alert("Lỗi", "Đã xảy ra lỗi khi thay đổi quyền khách hàng");
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
                    <Ionicons name="arrow-back" size={24} color="#333" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Quản lý khách hàng</Text>
                <TouchableOpacity style={styles.addButton} onPress={() => navigation.navigate("AdminCreateCustomer")}>
                    <Ionicons name="add" size={24} color="#fff" />
                </TouchableOpacity>
            </View>

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
                    <CustomerStats customers={customers} totalCustomers={totalCustomers} />

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
                                        roleOptions={roleOptions}
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
                handleChangeRole={handleChangeRole}
                roleOptions={roleOptions}
                navigation={navigation}
            />
        </SafeAreaView>
    );
};

export default AdminCustomersManagement;