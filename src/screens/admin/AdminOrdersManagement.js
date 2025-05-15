import { View, Text, FlatList, ActivityIndicator, RefreshControl } from "react-native"
import { Ionicons } from "@expo/vector-icons"
import styles from "../../styles/AdminOrdersManagementStyles"
import { TouchableOpacity } from "react-native"
import SearchBar from "@components/admin/order/SearchBar"
import StatusFilter from "@components/admin/order/StatusFilter"
import StatsSummary from "@components/admin/order/StatsSummary"
import OrderItem from "@components/admin/order/OrderItem"
import { useState, useEffect } from "react"
import { useNavigation } from "@react-navigation/native"
import { Alert } from "react-native"
import { SafeAreaView } from 'react-native-safe-area-context';
import { ADMIN_GET_ALL, ADMIN_GET_ALL_PAGE, ADMIN_PUT_ID } from 'api/apiService';


const AdminOrdersManagement = () => {
    const navigation = useNavigation()
    const [orders, setOrders] = useState([])
    const [loading, setLoading] = useState(true)
    const [refreshing, setRefreshing] = useState(false)
    const [searchQuery, setSearchQuery] = useState("")
    const [filteredOrders, setFilteredOrders] = useState([])
    const [statusFilter, setStatusFilter] = useState("all")


    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [totalOrder, setTotalOrder] = useState(0);

    const customersPerPage = 100;


    const statusOptions = [
        { id: "all", label: "Tất cả" },
        { id: "PENDING", label: "Đang xử lý" },
        { id: "CONFIRMED", label: "Đã xác nhận" },
        { id: "SHIPPED", label: "Đang giao" },
        { id: "DELIVERED", label: "Đã giao" },
        { id: "CANCELLED", label: "Đã hủy" },
    ]

    useEffect(() => {
        fetchOrders()
    }, [])

    useEffect(() => {
        filterOrders()
    }, [searchQuery, statusFilter, orders])

    const fetchOrders = async () => {
        const params = {
            page: currentPage,
            limit: customersPerPage,
        };
        setLoading(true)
        try {
            const response = await ADMIN_GET_ALL_PAGE("orders", params)
            if (response.status == 200) {
                setOrders(response.data.data.content)
                setTotalPages(response.data.data.totalPages);
                setTotalOrder(response.data.data.totalElements);

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
            filtered = filtered.filter((order) => order.orderStatus === statusFilter)
        }

        if (searchQuery.trim() !== "") {
            filtered = filtered.filter((order) => {
                const orderCode = order.orderCode?.toLowerCase() || "";
                const fullName = order.shipping?.fullName?.toLowerCase() || "";
                const phone = order.shipping?.phone || "";

                return (
                    orderCode.includes(searchQuery.toLowerCase()) ||
                    fullName.includes(searchQuery.toLowerCase()) ||
                    phone.includes(searchQuery)
                );
            });
        }

        setFilteredOrders(filtered)
    }

    const onRefresh = () => {
        setRefreshing(true);
        setCurrentPage(1);
        fetchOrders();
    }

    const getStatusColor = (orderStatus) => {
        switch (orderStatus) {
            case "PENDING":
                return "#f39c12"
            case "CONFIRMED":
                return "#3498db"
            case "SHIPPED":
                return "#9b59b6"
            case "DELIVERED":
                return "#2ecc71"
            case "CANCELLED":
                return "#e74c3c"
            default:
                return "#7f8c8d"
        }
    }

    const getStatusText = (status) => {
        switch (status) {
            case "PENDING":
                return "Đang xử lý";
            case "CONFIRMED":
                return "Đã xác nhận";
            case "SHIPPED":
                return "Đã giao hàng";
            case "DELIVERED":
                return "Đã giao thành công";
            case "CANCELLED":
                return "Đã hủy";
            default:
                return "Không xác định";
        }
    };

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
                ...nextStatusOptions.map((orderStatus) => ({
                    text: orderStatus.label,
                    onPress: () => confirmUpdateStatus(orderId, orderStatus.id),
                })),
            ],
            { cancelable: true },
        )
    }

    const getNextStatusOptions = (currentStatus) => {
        switch (currentStatus) {
            case "PENDING":
                return [
                    { id: "CONFIRMED", label: "Xác nhận" },
                    { id: "CANCELLED", label: "Đã hủy" },
                ]
            case "CONFIRMED":
                return [
                    { id: "SHIPPED", label: "Đang giao" },
                    { id: "CANCELLED", label: "Đã hủy" },
                ]
            case "SHIPPED":
                return [
                    { id: "DELIVERED", label: "Đã giao" },
                    { id: "CANCELLED", label: "Đã hủy" },
                ]
            case "DELIVERED":
            case "CANCELLED":
                return []
            default:
                return []
        }
    }

    const confirmUpdateStatus = async (orderId, newStatus) => {
        try {
            const response = await ADMIN_PUT_ID("orders/status", orderId, { status: newStatus })
            if (response.status === 200) {
                const updatedOrders = orders.map((order) => {
                    if (order.id === orderId) {
                        return {
                            ...order,
                            orderStatus: newStatus,
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

    const navigateToOrderDetail = (orderId, userId) => {
        navigation.navigate("AdminOrderDetail", {
            orderId,
            userId
        })
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

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity style={styles.backButton} onPress={navigateBack}>
                    <Ionicons name="arrow-back" size={24} color="#333" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Quản lý đơn hàng</Text>
                <TouchableOpacity style={styles.addButton} onPress={navigateToCreateOrder}>
                    <Ionicons name="add" size={24} color="#fff" />
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
                    <StatsSummary orders={orders} totalOrder={totalOrder} />
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
                                    getStatusText={getStatusText}
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