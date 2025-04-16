import { useState, useEffect } from "react"
import { useNavigation } from "@react-navigation/native"
import { Alert } from "react-native"
import { api } from '@service/apiAdmin';

const usePromotionsManagement = () => {
    const navigation = useNavigation()
    const [promotions, setPromotions] = useState([])
    const [loading, setLoading] = useState(true)
    const [refreshing, setRefreshing] = useState(false)
    const [searchQuery, setSearchQuery] = useState("")
    const [filteredPromotions, setFilteredPromotions] = useState([])
    const [statusFilter, setStatusFilter] = useState("all")
    const [page, setPage] = useState(1)
    const [hasMore, setHasMore] = useState(true)
    const [sortBy, setSortBy] = useState("name")
    const [sortOrder, setSortOrder] = useState("asc")

    // State cho modal thêm/sửa khuyến mãi
    const [modalVisible, setModalVisible] = useState(false)
    const [editingPromotion, setEditingPromotion] = useState(null)
    const [promotionName, setPromotionName] = useState("")
    const [promotionCode, setPromotionCode] = useState("")
    const [discountType, setDiscountType] = useState("percentage")
    const [discountValue, setDiscountValue] = useState("")
    const [minOrderValue, setMinOrderValue] = useState("")
    const [maxDiscount, setMaxDiscount] = useState("")
    const [startDate, setStartDate] = useState(new Date())
    const [endDate, setEndDate] = useState(new Date(Date.now() + 7 * 24 * 60 * 60 * 1000))
    const [isActive, setIsActive] = useState(true)
    const [usageLimit, setUsageLimit] = useState("")
    const [showStartDatePicker, setShowStartDatePicker] = useState(false)
    const [showEndDatePicker, setShowEndDatePicker] = useState(false)
    const [savingPromotion, setSavingPromotion] = useState(false)

    const statusOptions = [
        { id: "all", label: "Tất cả" },
        { id: "active", label: "Đang hoạt động" },
        { id: "upcoming", label: "Sắp diễn ra" },
        { id: "expired", label: "Đã kết thúc" },
    ]

    useEffect(() => {
        fetchPromotions()
    }, [])

    useEffect(() => {
        filterPromotions()
    }, [searchQuery, statusFilter, promotions])

    const fetchPromotions = async (pageNum = 1) => {
        setLoading(pageNum === 1)
        try {
            const response = await api.admin.getPromotions({ page: pageNum, limit: 20 })
            if (response.success) {
                const newPromotions = pageNum === 1 ? response.data : [...promotions, ...response.data]
                const sortedPromotions = sortPromotions(newPromotions, sortBy, sortOrder)
                setPromotions(sortedPromotions)
                setHasMore(response.data.length === 20)
            } else {
                Alert.alert("Lỗi", "Không thể tải danh sách khuyến mãi")
            }
        } catch (error) {
            console.error("Error fetching promotions:", error)
            Alert.alert("Lỗi", "Đã xảy ra lỗi khi tải danh sách khuyến mãi")
        } finally {
            setLoading(false)
            setRefreshing(false)
        }
    }

    const loadMore = () => {
        if (!loading && hasMore) {
            const nextPage = page + 1
            setPage(nextPage)
            fetchPromotions(nextPage)
        }
    }

    const sortPromotions = (promotionsToSort, criteria, order) => {
        return [...promotionsToSort].sort((a, b) => {
            if (criteria === "name") {
                return order === "asc"
                    ? a.name.localeCompare(b.name)
                    : b.name.localeCompare(a.name)
            } else if (criteria === "discountValue") {
                return order === "asc"
                    ? a.discountValue - b.discountValue
                    : b.discountValue - a.discountValue
            } else if (criteria === "startDate") {
                return order === "asc"
                    ? new Date(a.startDate) - new Date(b.startDate)
                    : new Date(b.startDate) - new Date(a.startDate)
            }
            return 0
        })
    }

    const handleSort = (criteria) => {
        const newOrder = sortBy === criteria && sortOrder === "asc" ? "desc" : "asc"
        setSortBy(criteria)
        setSortOrder(newOrder)

        const sortedPromotions = sortPromotions(promotions, criteria, newOrder)
        setPromotions(sortedPromotions)
        setFilteredPromotions(
            searchQuery.trim() === "" && statusFilter === "all"
                ? sortedPromotions
                : filterPromotionsLogic(sortedPromotions)
        )
    }

    const filterPromotions = () => {
        setFilteredPromotions(filterPromotionsLogic(promotions))
    }

    const filterPromotionsLogic = (promos) => {
        let filtered = [...promos]
        const now = new Date()

        // Lọc theo trạng thái
        if (statusFilter !== "all") {
            if (statusFilter === "active") {
                filtered = filtered.filter(
                    (promo) => promo.isActive && new Date(promo.startDate) <= now && new Date(promo.endDate) >= now
                )
            } else if (statusFilter === "upcoming") {
                filtered = filtered.filter((promo) => promo.isActive && new Date(promo.startDate) > now)
            } else if (statusFilter === "expired") {
                filtered = filtered.filter((promo) => !promo.isActive || new Date(promo.endDate) < now)
            }
        }

        // Lọc theo từ khóa tìm kiếm
        if (searchQuery.trim() !== "") {
            filtered = filtered.filter(
                (promo) =>
                    promo.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                    promo.code.toLowerCase().includes(searchQuery.toLowerCase())
            )
        }

        return filtered
    }

    const onRefresh = () => {
        setRefreshing(true)
        setPage(1)
        fetchPromotions(1)
    }

    const getStatusColor = (promo) => {
        const now = new Date()
        if (!promo.isActive) {
            return "#e74c3c"
        } else if (new Date(promo.startDate) > now) {
            return "#3498db"
        } else if (new Date(promo.endDate) < now) {
            return "#7f8c8d"
        } else {
            return "#2ecc71"
        }
    }

    const getStatusText = (promo) => {
        const now = new Date()
        if (!promo.isActive) {
            return "Không hoạt động"
        } else if (new Date(promo.startDate) > now) {
            return "Sắp diễn ra"
        } else if (new Date(promo.endDate) < now) {
            return "Đã kết thúc"
        } else {
            return "Đang hoạt động"
        }
    }

    const handleAddPromotion = () => {
        setEditingPromotion(null)
        setPromotionName("")
        setPromotionCode("")
        setDiscountType("percentage")
        setDiscountValue("")
        setMinOrderValue("")
        setMaxDiscount("")
        setStartDate(new Date())
        setEndDate(new Date(Date.now() + 7 * 24 * 60 * 60 * 1000))
        setIsActive(true)
        setUsageLimit("")
        setModalVisible(true)
    }

    const handleEditPromotion = (promotion) => {
        setEditingPromotion(promotion)
        setPromotionName(promotion.name)
        setPromotionCode(promotion.code)
        setDiscountType(promotion.discountType)
        setDiscountValue(promotion.discountValue.toString())
        setMinOrderValue(promotion.minOrderValue ? promotion.minOrderValue.toString() : "")
        setMaxDiscount(promotion.maxDiscount ? promotion.maxDiscount.toString() : "")
        setStartDate(new Date(promotion.startDate))
        setEndDate(new Date(promotion.endDate))
        setIsActive(promotion.isActive)
        setUsageLimit(promotion.usageLimit ? promotion.usageLimit.toString() : "")
        setModalVisible(true)
    }

    const handleDeletePromotion = (promotionId) => {
        Alert.alert(
            "Xác nhận xóa",
            "Bạn có chắc chắn muốn xóa khuyến mãi này không?",
            [
                { text: "Hủy", style: "cancel" },
                {
                    text: "Xóa",
                    style: "destructive",
                    onPress: async () => {
                        try {
                            const response = await api.admin.deletePromotion(promotionId)
                            if (response.success) {
                                const updatedPromotions = promotions.filter((promo) => promo.id !== promotionId)
                                setPromotions(updatedPromotions)
                                Alert.alert("Thành công", "Đã xóa khuyến mãi")
                            } else {
                                Alert.alert("Lỗi", response.error || "Không thể xóa khuyến mãi")
                            }
                        } catch (error) {
                            console.error("Error deleting promotion:", error)
                            Alert.alert("Lỗi", "Đã xảy ra lỗi khi xóa khuyến mãi")
                        }
                    },
                },
            ],
            { cancelable: true }
        )
    }

    const handleViewUsageDetails = (promotionId) => {
        navigation.navigate("AdminPromotionUsageDetails", { promotionId })
    }

    const handleToggleStatus = async (promotion) => {
        try {
            const newStatus = !promotion.isActive
            const response = await api.admin.updatePromotionStatus(promotion.id, newStatus)
            if (response.success) {
                const updatedPromotions = promotions.map((promo) => {
                    if (promo.id === promotion.id) {
                        return { ...promo, isActive: newStatus }
                    }
                    return promo
                })
                setPromotions(updatedPromotions)
                Alert.alert(
                    "Thành công",
                    `Đã ${newStatus ? "kích hoạt" : "vô hiệu hóa"} khuyến mãi "${promotion.name}"`
                )
            } else {
                Alert.alert("Lỗi", response.error || "Không thể cập nhật trạng thái khuyến mãi")
            }
        } catch (error) {
            console.error("Error updating promotion status:", error)
            Alert.alert("Lỗi", "Đã xảy ra lỗi khi cập nhật trạng thái khuyến mãi")
        }
    }

    const savePromotion = async () => {
        if (!promotionName.trim()) {
            Alert.alert("Lỗi", "Vui lòng nhập tên khuyến mãi")
            return
        }
        if (!promotionCode.trim()) {
            Alert.alert("Lỗi", "Vui lòng nhập mã khuyến mãi")
            return
        }
        if (!discountValue.trim() || isNaN(Number(discountValue))) {
            Alert.alert("Lỗi", "Vui lòng nhập giá trị khuyến mãi hợp lệ")
            return
        }
        if (discountType === "percentage" && Number(discountValue) > 100) {
            Alert.alert("Lỗi", "Giá trị phần trăm không thể vượt quá 100%")
            return
        }

        setSavingPromotion(true)
        try {
            const promotionData = {
                name: promotionName,
                code: promotionCode,
                discountType,
                discountValue: Number(discountValue),
                minOrderValue: minOrderValue ? Number(minOrderValue) : 0,
                maxDiscount: maxDiscount ? Number(maxDiscount) : null,
                startDate: startDate.toISOString(),
                endDate: endDate.toISOString(),
                isActive,
                usageLimit: usageLimit ? Number(usageLimit) : null,
            }

            let response
            if (editingPromotion) {
                response = await api.admin.updatePromotion(editingPromotion.id, promotionData)
            } else {
                response = await api.admin.createPromotion(promotionData)
            }

            if (response.success) {
                setModalVisible(false)
                setPage(1)
                fetchPromotions(1)
                Alert.alert("Thành công", editingPromotion ? "Đã cập nhật khuyến mãi" : "Đã thêm khuyến mãi mới")
            } else {
                Alert.alert("Lỗi", response.error || "Không thể lưu khuyến mãi")
            }
        } catch (error) {
            console.error("Error saving promotion:", error)
            Alert.alert("Lỗi", "Đã xảy ra lỗi khi lưu khuyến mãi")
        } finally {
            setSavingPromotion(false)
        }
    }

    return {
        navigation,
        promotions,
        loading,
        refreshing,
        searchQuery,
        setSearchQuery,
        filteredPromotions,
        statusFilter,
        setStatusFilter,
        page,
        hasMore,
        sortBy,
        sortOrder,
        handleSort,
        modalVisible,
        setModalVisible,
        editingPromotion,
        promotionName,
        setPromotionName,
        promotionCode,
        setPromotionCode,
        discountType,
        setDiscountType,
        discountValue,
        setDiscountValue,
        minOrderValue,
        setMinOrderValue,
        maxDiscount,
        setMaxDiscount,
        startDate,
        setStartDate,
        endDate,
        setEndDate,
        isActive,
        setIsActive,
        usageLimit,
        setUsageLimit,
        showStartDatePicker,
        setShowStartDatePicker,
        showEndDatePicker,
        setShowEndDatePicker,
        savingPromotion,
        statusOptions,
        fetchPromotions,
        onRefresh,
        loadMore,
        getStatusColor,
        getStatusText,
        handleAddPromotion,
        handleEditPromotion,
        handleDeletePromotion,
        handleViewUsageDetails,
        handleToggleStatus,
        savePromotion,
    }
}

export default usePromotionsManagement