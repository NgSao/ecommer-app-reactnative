


import { ScrollView, View, FlatList, ActivityIndicator, RefreshControl, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import styles from "../../styles/AdminPromotionsManagementStyles";
import SearchBar from "@components/search/SearchBar";
import FilterBar from "@components/admin/promotion/FilterBar";
import StatsBar from "@components/admin/promotion/StatsBar";
import EmptyState from "@components/admin/product/EmptyState";
import PromotionItem from "@components/admin/promotion/PromotionItem";
import PromotionModal from "@components/admin/promotion/PromotionModal";
import { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { Alert } from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';
import { ADMIN_DELETE_ID, ADMIN_GET_ALL_PAGE, ADMIN_POST_ADD, ADMIN_PUT_ID, GET_ALL_PAGE } from "api/apiService";

const AdminPromotionsManagement = () => {
    const navigation = useNavigation();
    const [promotions, setPromotions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const [filteredPromotions, setFilteredPromotions] = useState([]);
    const [statusFilter, setStatusFilter] = useState("all");
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [limit] = useState(10);
    const [sortBy, setSortBy] = useState("name");
    const [sortOrder, setSortOrder] = useState("asc");

    // Modal states
    const [modalVisible, setModalVisible] = useState(false);
    const [editingPromotion, setEditingPromotion] = useState(null);
    const [promotionName, setPromotionName] = useState("");
    const [promotionCode, setPromotionCode] = useState("");
    const [discountType, setDiscountType] = useState("percentage");
    const [discountValue, setDiscountValue] = useState("");
    const [minOrderValue, setMinOrderValue] = useState("");
    const [maxDiscount, setMaxDiscount] = useState("");
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date(Date.now() + 7 * 24 * 60 * 60 * 1000));
    const [active, setIsActive] = useState(true);
    const [usageLimit, setUsageLimit] = useState("");
    const [showStartDatePicker, setShowStartDatePicker] = useState(false);
    const [showEndDatePicker, setShowEndDatePicker] = useState(false);
    const [savingPromotion, setSavingPromotion] = useState(false);
    const [associatedProductId, setAssociatedProductId] = useState(null);

    const statusOptions = [
        { id: "all", label: "Tất cả" },
        { id: "active", label: "Đang hoạt động" },
        { id: "upcoming", label: "Sắp diễn ra" },
        { id: "expired", label: "Đã kết thúc" },
    ];

    useEffect(() => {
        fetchPromotions(1);
    }, []);

    useEffect(() => {
        filterPromotions();
    }, [searchQuery, statusFilter, promotions]);

    const fetchPromotions = async (pageNum) => {
        setLoading(pageNum === 1);
        try {
            const params = { page: pageNum, limit };

            const response = await ADMIN_GET_ALL_PAGE("promotions", params);
            if (response.status === 200) {
                const { content, pageNumber, totalPages } = response.data.data;
                const newPromotions = pageNum === 1 ? content : [...promotions, ...content];
                const sortedPromotions = sortPromotions(newPromotions, sortBy, sortOrder);
                setPromotions(sortedPromotions);
                setFilteredPromotions(sortedPromotions);
                setPage(pageNumber);
                setTotalPages(totalPages);
            } else {
                Alert.alert("Lỗi", response.error || "Không thể tải danh sách khuyến mãi");
            }
        } catch (error) {
            console.error("Error fetching promotions:", error);
            Alert.alert("Lỗi", "Đã xảy ra lỗi khi tải danh sách khuyến mãi");
        } finally {
            setLoading(false);
            setRefreshing(false);
        }
    };

    const sortPromotions = (promotionsToSort, criteria, order) => {
        return [...promotionsToSort].sort((a, b) => {
            if (criteria === "name") {
                return order === "asc"
                    ? a.name.localeCompare(b.name)
                    : b.name.localeCompare(a.name);
            } else if (criteria === "discountValue") {
                return order === "asc"
                    ? a.discountValue - b.discountValue
                    : b.discountValue - a.discountValue;
            } else if (criteria === "startDate") {
                return order === "asc"
                    ? new Date(a.startDate) - new Date(b.startDate)
                    : new Date(b.startDate) - new Date(a.startDate);
            }
            return 0;
        });
    };

    const handleSort = (criteria) => {
        const newOrder = sortBy === criteria && sortOrder === "asc" ? "desc" : "asc";
        setSortBy(criteria);
        setSortOrder(newOrder);
        const sortedPromotions = sortPromotions(promotions, criteria, newOrder);
        setPromotions(sortedPromotions);
        setFilteredPromotions(
            searchQuery.trim() === "" && statusFilter === "all"
                ? sortedPromotions
                : filterPromotionsLogic(sortedPromotions)
        );
    };

    const filterPromotions = () => {
        setFilteredPromotions(filterPromotionsLogic(promotions));
    };

    const filterPromotionsLogic = (promos) => {
        let filtered = [...promos];
        const now = new Date();

        if (statusFilter !== "all") {
            if (statusFilter === "active") {
                filtered = filtered.filter(
                    (promo) => promo.active && new Date(promo.startDate) <= now && new Date(promo.endDate) >= now
                );
            } else if (statusFilter === "upcoming") {
                filtered = filtered.filter((promo) => promo.active && new Date(promo.startDate) > now);
            } else if (statusFilter === "expired") {
                filtered = filtered.filter((promo) => !promo.active || new Date(promo.endDate) < now);
            }
        }

        if (searchQuery.trim() !== "") {
            filtered = filtered.filter(
                (promo) =>
                    promo.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                    promo.code.toLowerCase().includes(searchQuery.toLowerCase())
            );
        }

        return filtered;
    };

    const onRefresh = () => {
        setRefreshing(true);
        setPage(1);
        fetchPromotions(1);
    };

    const getStatusColor = (promo) => {
        const now = new Date();
        if (!promo.active) {
            return "#e74c3c";
        } else if (new Date(promo.startDate) > now) {
            return "#3498db";
        } else if (new Date(promo.endDate) < now) {
            return "#7f8c8d";
        } else {
            return "#2ecc71";
        }
    };

    const getStatusText = (promo) => {
        const now = new Date();
        if (!promo.active) {
            return "Không hoạt động";
        } else if (new Date(promo.startDate) > now) {
            return "Sắp diễn ra";
        } else if (new Date(promo.endDate) < now) {
            return "Đã kết thúc";
        } else {
            return "Đang hoạt động";
        }
    };

    const handleAddPromotion = () => {
        setEditingPromotion(null);
        setPromotionName("");
        setPromotionCode("");
        setDiscountType("percentage");
        setDiscountValue("");
        setMinOrderValue("");
        setMaxDiscount("");
        setStartDate(new Date());
        setEndDate(new Date(Date.now() + 7 * 24 * 60 * 60 * 1000));
        setIsActive(true);
        setUsageLimit("");
        setAssociatedProductId(null);
        setModalVisible(true);
    };

    const handleEditPromotion = (promotion) => {
        setEditingPromotion(promotion);
        setPromotionName(promotion.name);
        setPromotionCode(promotion.code);
        setDiscountType(promotion.discountType);
        setDiscountValue(promotion.discountValue.toString());
        setMinOrderValue(promotion.minOrderValue ? promotion.minOrderValue.toString() : "");
        setMaxDiscount(promotion.maxDiscount ? promotion.maxDiscount.toString() : "");
        setStartDate(new Date(promotion.startDate));
        setEndDate(new Date(promotion.endDate));
        setIsActive(promotion.active);
        setUsageLimit(promotion.usageLimit ? promotion.usageLimit.toString() : "");
        setAssociatedProductId(null); // Reset product association for simplicity
        setModalVisible(true);
    };

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
                            const response = await ADMIN_DELETE_ID("promotions/delete", promotionId);
                            if (response.status === 200) {
                                const updatedPromotions = promotions.filter((promo) => promo.id !== promotionId);
                                setPromotions(updatedPromotions);
                                setFilteredPromotions(updatedPromotions);
                                Alert.alert("Thành công", "Đã xóa khuyến mãi");
                            } else {
                                Alert.alert("Lỗi", response.error || "Không thể xóa khuyến mãi");
                            }
                        } catch (error) {
                            console.error("Error deleting promotion:", error);
                            Alert.alert("Lỗi", "Đã xảy ra lỗi khi xóa khuyến mãi");
                        }
                    },
                },
            ],
            { cancelable: true }
        );
    };

    const handleViewUsageDetails = (promotionId) => {
        navigation.navigate("AdminPromotionUsageDetails", { promotionId });
    };

    const handleToggleStatus = async (promotion) => {
        try {
            const newStatus = !promotion.active;
            const response = await ADMIN_PUT_ID("promotions/status", promotion.id, { active: newStatus });
            if (response.status === 200) {
                const updatedPromotions = promotions.map((promo) => {
                    if (promo.id === promotion.id) {
                        return { ...promo, active: newStatus };
                    }
                    return promo;
                });
                setPromotions(updatedPromotions);
                setFilteredPromotions(updatedPromotions);
                Alert.alert(
                    "Thành công",
                    `Đã ${newStatus ? "kích hoạt" : "vô hiệu hóa"} khuyến mãi "${promotion.name}"`
                );
            } else {
                Alert.alert("Lỗi", response.error || "Không thể cập nhật trạng thái khuyến mãi");
            }
        } catch (error) {
            console.error("Error updating promotion status:", error);
            Alert.alert("Lỗi", "Đã xảy ra lỗi khi cập nhật trạng thái khuyến mãi");
        }
    };

    const savePromotion = async () => {
        if (!promotionName.trim()) {
            Alert.alert("Lỗi", "Vui lòng nhập tên khuyến mãi");
            return;
        }
        if (!promotionCode.trim()) {
            Alert.alert("Lỗi", "Vui lòng nhập mã khuyến mãi");
            return;
        }
        if (!discountValue.trim() || isNaN(Number(discountValue))) {
            Alert.alert("Lỗi", "Vui lòng nhập giá trị khuyến mãi hợp lệ");
            return;
        }
        if (discountType === "percentage" && Number(discountValue) > 100) {
            Alert.alert("Lỗi", "Giá trị phần trăm không thể vượt quá 100%");
            return;
        }

        setSavingPromotion(true);
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
                active,
                usageLimit: usageLimit ? Number(usageLimit) : null,
            };

            let response;
            if (editingPromotion) {
                response = await ADMIN_PUT_ID("promotions/updated", editingPromotion.id, promotionData);
            } else {
                response = await ADMIN_POST_ADD("promotions/create", promotionData);
            }

            if (response.status === 200) {
                // If associated with a product, assign the promotion
                // if (associatedProductId && !editingPromotion) {
                //     const assignResponse = await admin.assignPromotionToProduct(
                //         associatedProductId,
                //         response.data.id
                //     );
                //     if (!assignResponse.success) {
                //         Alert.alert("Lỗi", "Không thể gán khuyến mãi cho sản phẩm");
                //     }
                // }
                setModalVisible(false);
                setPage(1);
                fetchPromotions(1);
                Alert.alert("Thành công", editingPromotion ? "Đã cập nhật khuyến mãi" : "Đã thêm khuyến mãi mới");
            } else {
                Alert.alert("Lỗi", response.error || "Không thể lưu khuyến mãi");
            }
        } catch (error) {
            console.error("Error saving promotion:", error);
            Alert.alert("Lỗi", "Đã xảy ra lỗi khi lưu khuyến mãi");
        } finally {
            setSavingPromotion(false);
        }
    };

    const goToPreviousPage = () => {
        if (page > 1) {
            setPage(page - 1);
            fetchPromotions(page - 1);
        }
    };

    const goToNextPage = () => {
        if (page < totalPages) {
            setPage(page + 1);
            fetchPromotions(page + 1);
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
                    <Ionicons name="arrow-back" size={24} color="#333" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Quản lý khuyến mãi</Text>
                <TouchableOpacity style={styles.addButton} onPress={handleAddPromotion}>
                    <Ionicons name="add" size={24} color="#fff" />
                </TouchableOpacity>
            </View>

            <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />

            <FilterBar statusOptions={statusOptions} statusFilter={statusFilter} setStatusFilter={setStatusFilter} />
            {/* <View style={styles.sortContainer}>
//                 <ScrollView horizontal showsHorizontalScrollIndicator={false}>
//                     <TouchableOpacity onPress={() => handleSort("name")}>
//                         <Text style={styles.sortButton}>Sort theo tên ({sortOrder})</Text>
//                     </TouchableOpacity>
//                     <TouchableOpacity onPress={() => handleSort("discountValue")}>
//                         <Text style={styles.sortButton}>Sort theo giá trị ({sortOrder})</Text>
//                     </TouchableOpacity>
//                     <TouchableOpacity onPress={() => handleSort("startDate")}>
//                         <Text style={styles.sortButton}>Sort theo ngày bắt đầu ({sortOrder})</Text>
//                     </TouchableOpacity>
//                 </ScrollView>
//             </View> */}
            {loading && !refreshing ? (
                <View style={styles.loadingContainer}>
                    <ActivityIndicator size="large" color="#e30019" />
                    <Text style={styles.loadingText}>Đang tải khuyến mãi...</Text>
                </View>
            ) : (
                <>
                    <StatsBar promotions={promotions} />

                    {filteredPromotions.length === 0 ? (
                        <EmptyState
                            searchQuery={searchQuery}
                            onAdd={handleAddPromotion}
                            customText={
                                searchQuery.length > 0 || statusFilter !== "all"
                                    ? "Không tìm thấy khuyến mãi phù hợp"
                                    : "Chưa có khuyến mãi nào trong hệ thống"
                            }
                            iconName="pricetag-outline"
                        />
                    ) : (
                        <>
                            <FlatList
                                data={filteredPromotions}
                                renderItem={({ item }) => (
                                    <PromotionItem
                                        item={item}
                                        onToggleStatus={handleToggleStatus}
                                        onEdit={handleEditPromotion}
                                        onDelete={handleDeletePromotion}
                                        onViewDetails={handleViewUsageDetails}
                                        getStatusColor={getStatusColor}
                                        getStatusText={getStatusText}
                                    />
                                )}
                                keyExtractor={(item) => item.id.toString()}
                                contentContainerStyle={styles.listContainer}
                                refreshControl={
                                    <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                                }
                            />
                            <View style={styles.paginationContainer}>
                                <TouchableOpacity
                                    style={[styles.paginationButton, page === 1 && styles.disabledButton]}
                                    onPress={goToPreviousPage}
                                    disabled={page === 1}
                                >
                                    <Text style={styles.paginationText}>Trang trước</Text>
                                </TouchableOpacity>
                                <Text style={styles.pageInfo}>Trang {page} / {totalPages}</Text>
                                <TouchableOpacity
                                    style={[styles.paginationButton, page === totalPages && styles.disabledButton]}
                                    onPress={goToNextPage}
                                    disabled={page === totalPages}
                                >
                                    <Text style={styles.paginationText}>Trang sau</Text>
                                </TouchableOpacity>
                            </View>
                        </>
                    )}
                </>
            )}

            <PromotionModal
                visible={modalVisible}
                onClose={() => setModalVisible(false)}
                editingPromotion={editingPromotion}
                promotionName={promotionName}
                setPromotionName={setPromotionName}
                promotionCode={promotionCode}
                setPromotionCode={setPromotionCode}
                discountType={discountType}
                setDiscountType={setDiscountType}
                discountValue={discountValue}
                setDiscountValue={setDiscountValue}
                minOrderValue={minOrderValue}
                setMinOrderValue={setMinOrderValue}
                maxDiscount={maxDiscount}
                setMaxDiscount={setMaxDiscount}
                startDate={startDate}
                setStartDate={setStartDate}
                endDate={endDate}
                setEndDate={setEndDate}
                isActive={active}
                setIsActive={setIsActive}
                usageLimit={usageLimit}
                setUsageLimit={setUsageLimit}
                showStartDatePicker={showStartDatePicker}
                setShowStartDatePicker={setShowStartDatePicker}
                showEndDatePicker={showEndDatePicker}
                setShowEndDatePicker={setShowEndDatePicker}
                savePromotion={savePromotion}
                savingPromotion={savingPromotion}
                associatedProductId={associatedProductId}
                setAssociatedProductId={setAssociatedProductId}
            />
        </SafeAreaView>
    );
};

export default AdminPromotionsManagement;