
import { View, FlatList, ActivityIndicator, Text, SafeAreaView } from "react-native"
import { Ionicons } from "@expo/vector-icons"

import styles from "../../styles/AdminReviewsManagementStyles"
import useAdminReviews from "@hooks/useAdminReviews"
import AdminHeader from "@components/admin/AdminHeader"
import SearchBar from "@components/admin/product/SearchBar"
import FilterBar from "@components/admin/review/FilterBar"
import ReviewItem from "@components/admin/review/ReviewItem"
import ReplyModal from "@components/admin/review/ReplyModal"
import DetailModal from "@components/admin/review/DetailModal"
import ImageViewerModal from "@components/review/ImageViewerModal"

const AdminReviewsManagement = () => {
    const {
        navigation,
        loading,
        reviews,
        filteredReviews,
        searchQuery,
        setSearchQuery,
        ratingFilter,
        setRatingFilter,
        statusFilter,
        setStatusFilter,
        replyModalVisible,
        setReplyModalVisible,
        selectedReview,
        replyText,
        setReplyText,
        submittingReply,
        detailModalVisible,
        setDetailModalVisible,
        selectedDetailReview,
        imageViewerVisible,
        setImageViewerVisible,
        selectedViewImage,
        setSelectedViewImage,
        handleReplyReview,
        handleViewReviewDetail,
        submitReply,
        deleteReview,
        renderRatingStars,
    } = useAdminReviews()

    return (
        <SafeAreaView style={styles.container}>
            <AdminHeader title="Quản lý đánh giá" />

            <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />

            <FilterBar
                ratingFilter={ratingFilter}
                setRatingFilter={setRatingFilter}
                statusFilter={statusFilter}
                setStatusFilter={setStatusFilter}
            />

            {loading ? (
                <View style={styles.loadingContainer}>
                    <ActivityIndicator size="large" color="#e30019" />
                    <Text style={styles.loadingText}>Đang tải danh sách đánh giá...</Text>
                </View>
            ) : (
                <>
                    <View style={styles.statsContainer}>
                        <Text style={styles.statsText}>
                            Hiển thị {filteredReviews.length} / {reviews.length} đánh giá
                        </Text>
                    </View>

                    <FlatList
                        data={filteredReviews}
                        renderItem={({ item }) => (
                            <ReviewItem
                                item={item}
                                navigation={navigation}
                                renderRatingStars={renderRatingStars}
                                handleViewReviewDetail={handleViewReviewDetail}
                                handleReplyReview={handleReplyReview}
                                deleteReview={deleteReview}
                            />
                        )}
                        keyExtractor={(item) => item.id.toString()}
                        contentContainerStyle={styles.listContainer}
                        ListEmptyComponent={
                            <View style={styles.emptyContainer}>
                                <Ionicons name="chatbubble-ellipses-outline" size={60} color="#ccc" />
                                <Text style={styles.emptyText}>Không tìm thấy đánh giá nào</Text>
                            </View>
                        }
                    />
                </>
            )}

            <ReplyModal
                replyModalVisible={replyModalVisible}
                setReplyModalVisible={setReplyModalVisible}
                selectedReview={selectedReview}
                renderRatingStars={renderRatingStars}
                replyText={replyText}
                setReplyText={setReplyText}
                submitReply={submitReply}
                submittingReply={submittingReply}
                setImageViewerVisible={setImageViewerVisible}
                setSelectedViewImage={setSelectedViewImage}
            />

            <DetailModal
                detailModalVisible={detailModalVisible}
                setDetailModalVisible={setDetailModalVisible}
                selectedDetailReview={selectedDetailReview}
                renderRatingStars={renderRatingStars}
                handleReplyReview={handleReplyReview}
                deleteReview={deleteReview}
                setImageViewerVisible={setImageViewerVisible}
                setSelectedViewImage={setSelectedViewImage}
            />

            <ImageViewerModal
                imageViewerVisible={imageViewerVisible}
                setImageViewerVisible={setImageViewerVisible}
                selectedViewImage={selectedViewImage}
            />
        </SafeAreaView>
    )
}

export default AdminReviewsManagement