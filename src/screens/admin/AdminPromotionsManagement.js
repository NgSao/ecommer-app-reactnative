import { ScrollView, View, FlatList, ActivityIndicator, RefreshControl, Text, TouchableOpacity, SafeAreaView } from "react-native"
import { Ionicons } from "@expo/vector-icons"

import styles from "../../styles/AdminPromotionsManagementStyles"
import usePromotionsManagement from "@hooks/usePromotionsManagement"
import SearchBar from "@components/search/SearchBar"
import FilterBar from "@components/admin/promotion/FilterBar"
import StatsBar from "@components/admin/promotion/StatsBar"
import EmptyState from "@components/admin/product/EmptyState"
import PromotionItem from "@components/admin/promotion/PromotionItem"
import PromotionModal from "@components/admin/promotion/PromotionModal"

const AdminPromotionsManagement = () => {
    const {
        navigation,
        promotions,
        loading,
        refreshing,
        searchQuery,
        setSearchQuery,
        filteredPromotions,
        statusFilter,
        setStatusFilter,
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
    } = usePromotionsManagement()

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

            <View style={styles.sortContainer}>
                <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                    <TouchableOpacity onPress={() => handleSort("name")}>
                        <Text style={styles.sortButton}>Sort theo tên ({sortOrder})</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => handleSort("discountValue")}>
                        <Text style={styles.sortButton}>Sort theo giá trị ({sortOrder})</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => handleSort("startDate")}>
                        <Text style={styles.sortButton}>Sort theo ngày bắt đầu ({sortOrder})</Text>
                    </TouchableOpacity>
                </ScrollView>
            </View>

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
                            onEndReached={loadMore}
                            onEndReachedThreshold={0.5}
                            ListFooterComponent={
                                loading && hasMore ? (
                                    <ActivityIndicator size="small" color="#e30019" />
                                ) : null
                            }
                        />
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
                isActive={isActive}
                setIsActive={setIsActive}
                usageLimit={usageLimit}
                setUsageLimit={setUsageLimit}
                showStartDatePicker={showStartDatePicker}
                setShowStartDatePicker={setShowStartDatePicker}
                showEndDatePicker={showEndDatePicker}
                setShowEndDatePicker={setShowEndDatePicker}
                savePromotion={savePromotion}
                savingPromotion={savingPromotion}
            />
        </SafeAreaView>
    )
}

export default AdminPromotionsManagement