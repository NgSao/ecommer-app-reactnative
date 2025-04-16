import { useState, useEffect } from "react"
import { Alert } from "react-native"
import { useNavigation } from "@react-navigation/native"
import { api } from '@service/apiAdmin';

const useCustomerManagement = () => {
    const navigation = useNavigation()
    const [customers, setCustomers] = useState([])
    const [loading, setLoading] = useState(true)
    const [refreshing, setRefreshing] = useState(false)
    const [searchQuery, setSearchQuery] = useState("")
    const [filteredCustomers, setFilteredCustomers] = useState([])
    const [statusFilter, setStatusFilter] = useState("all")
    const [modalVisible, setModalVisible] = useState(false)
    const [selectedCustomer, setSelectedCustomer] = useState(null)
    const [customerOrders, setCustomerOrders] = useState([])
    const [loadingCustomerDetails, setLoadingCustomerDetails] = useState(false)

    // Phân trang
    const [currentPage, setCurrentPage] = useState(1)
    const [totalPages, setTotalPages] = useState(1)
    const customersPerPage = 10

    // Sắp xếp
    const [sortBy, setSortBy] = useState("name")
    const [sortOrder, setSortOrder] = useState("asc")

    const statusOptions = [
        { id: "all", label: "Tất cả" },
        { id: "active", label: "Hoạt động" },
        { id: "inactive", label: "Không hoạt động" },
        { id: "new", label: "Mới" },
    ]

    useEffect(() => {
        fetchCustomers()
    }, [currentPage, sortBy, sortOrder])

    useEffect(() => {
        filterCustomers()
    }, [searchQuery, statusFilter, customers])

    const fetchCustomers = async () => {
        setLoading(true)
        try {
            const response = await api.admin.getCustomers({
                page: currentPage,
                limit: customersPerPage,
                sortBy,
                sortOrder,
            })
            if (response.success) {
                setCustomers(response.data)
                setTotalPages(Math.ceil(response.data.total / customersPerPage))
            } else {
                Alert.alert("Lỗi", "Không thể tải danh sách khách hàng")
            }
        } catch (error) {
            console.error("Error fetching customers:", error)
            Alert.alert("Lỗi", "Đã xảy ra lỗi khi tải danh sách khách hàng")
        } finally {
            setLoading(false)
            setRefreshing(false)
        }
    }

    const filterCustomers = () => {
        let filtered = [...customers]

        // Lọc theo trạng thái
        if (statusFilter !== "all") {
            filtered = filtered.filter((customer) => customer.status === statusFilter)
        }

        // Lọc theo từ khóa tìm kiếm
        if (searchQuery.trim() !== "") {
            filtered = filtered.filter(
                (customer) =>
                    customer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                    customer.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
                    customer.phone.includes(searchQuery),
            )
        }

        setFilteredCustomers(filtered)
    }

    const onRefresh = () => {
        setRefreshing(true)
        setCurrentPage(1)
        fetchCustomers()
    }

    const handleViewCustomerDetails = async (customer) => {
        setSelectedCustomer(customer)
        setModalVisible(true)
        setLoadingCustomerDetails(true)

        try {
            const response = await api.admin.getCustomerOrders(customer.id)
            if (response.success) {
                setCustomerOrders(response.data)
            } else {
                setCustomerOrders([])
                Alert.alert("Thông báo", "Không thể tải lịch sử đơn hàng của khách hàng")
            }
        } catch (error) {
            console.error("Error fetching customer orders:", error)
            setCustomerOrders([])
        } finally {
            setLoadingCustomerDetails(false)
        }
    }

    const handleToggleStatus = async (customerId, currentStatus) => {
        const newStatus = currentStatus === "active" ? "inactive" : "active"

        try {
            const response = await api.admin.updateCustomerStatus(customerId, newStatus)
            if (response.success) {
                const updatedCustomers = customers.map((customer) =>
                    customer.id === customerId ? { ...customer, status: newStatus } : customer,
                )
                setCustomers(updatedCustomers)
                Alert.alert("Thành công", `Đã ${newStatus === "active" ? "kích hoạt" : "vô hiệu hóa"} tài khoản khách hàng`)
            } else {
                Alert.alert("Lỗi", response.error || "Không thể cập nhật trạng thái khách hàng")
            }
        } catch (error) {
            console.error("Error updating customer status:", error)
            Alert.alert("Lỗi", "Đã xảy ra lỗi khi cập nhật trạng thái khách hàng")
        }
    }

    const handleSort = (newSortBy) => {
        if (sortBy === newSortBy) {
            setSortOrder(sortOrder === "asc" ? "desc" : "asc")
        } else {
            setSortBy(newSortBy)
            setSortOrder("asc")
        }
        setCurrentPage(1)
    }

    return {
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
        fetchCustomers,
        onRefresh,
        handleViewCustomerDetails,
        handleToggleStatus,
    }
}

export default useCustomerManagement