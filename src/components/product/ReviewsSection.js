import { View, Text, FlatList, TouchableOpacity } from "react-native"
import styles from './../../styles/ReviewsSectionStyles';
import useReviews from "@hooks/useReviews"
import OverallRating from "@components/review/OverallRating";
import RatingFilters from "@components/review/RatingFilters";
import SortOptions from "@components/review/SortOptions";
import ReviewItem from "@components/review/ReviewItem";
import WriteReviewModal from "@components/review/WriteReviewModal";
import ImageViewerModal from "@components/review/ImageViewerModal";
import { useState } from "react";

const ReviewsSection = ({ productId }) => {
    const {
        loading,
        displayedReviews,
        hasMoreReviews,
        loadMoreReviews,
        sortOption,
        setSortOption,
        ratingFilter,
        setRatingFilter,
        reviewModalVisible,
        setReviewModalVisible,
        selectedImages,
        userReview,
        setUserReview,
        reviewStats,
        imageViewerVisible,
        setImageViewerVisible,
        selectedViewImage,
        setSelectedViewImage,
        renderRatingStars,
        pickImages,
        removeImage,
        submitReview,
        formatDate,
        calculateRatingPercentage,
    } = useReviews({ productId });

    const [reviewsToShow, setReviewsToShow] = useState(2);

    const loadMoreReviewsHandler = () => {
        setReviewsToShow(reviewsToShow + 2);
    }

    const noMoreReviews = displayedReviews.length <= reviewsToShow;

    return (
        <View style={styles.reviewsContainer}>
            <View style={styles.reviewsHeader}>
                <Text style={styles.sectionTitle}>Đánh giá từ khách hàng</Text>
                <TouchableOpacity
                    style={styles.writeReviewButton}
                    onPress={() => setReviewModalVisible(true)}
                >
                    <Text style={styles.writeReviewText}>Viết đánh giá</Text>
                </TouchableOpacity>
            </View>
            <OverallRating
                reviewStats={reviewStats}
                renderRatingStars={renderRatingStars}
                calculateRatingPercentage={calculateRatingPercentage}
            />
            <RatingFilters
                ratingFilter={ratingFilter}
                setRatingFilter={setRatingFilter}
                reviewStats={reviewStats}
            />
            <SortOptions sortOption={sortOption} setSortOption={setSortOption} />
            {loading ? (
                <View style={styles.loadingContainer}>
                    <Text style={styles.loadingText}>Đang tải đánh giá...</Text>
                </View>
            ) : (
                <>
                    {displayedReviews.length > 0 ? (
                        <>
                            <FlatList
                                data={displayedReviews.slice(0, reviewsToShow)}  // Chỉ hiển thị số lượng đánh giá theo trạng thái reviewsToShow
                                renderItem={({ item }) => (
                                    <ReviewItem
                                        item={item}
                                        renderRatingStars={renderRatingStars}
                                        formatDate={formatDate}
                                        setSelectedViewImage={setSelectedViewImage}
                                        setImageViewerVisible={setImageViewerVisible}
                                    />
                                )}
                                keyExtractor={(item) => item.id}
                                scrollEnabled={false}
                            />
                            {!noMoreReviews && (
                                <TouchableOpacity style={styles.loadMoreButton} onPress={loadMoreReviewsHandler}>
                                    <Text style={styles.loadMoreText}>Xem thêm đánh giá</Text>
                                </TouchableOpacity>
                            )}
                        </>
                    ) : (
                        <View style={styles.emptyReviewsContainer}>
                            <Text style={styles.emptyReviewsText}>Chưa có đánh giá nào cho sản phẩm này.</Text>
                            <TouchableOpacity
                                style={styles.beFirstReviewButton}
                                onPress={() => setReviewModalVisible(true)}
                            >
                                <Text style={styles.beFirstReviewText}>Hãy là người đầu tiên đánh giá!</Text>
                            </TouchableOpacity>
                        </View>
                    )}
                </>
            )}
            <WriteReviewModal
                reviewModalVisible={reviewModalVisible}
                setReviewModalVisible={setReviewModalVisible}
                userReview={userReview}
                setUserReview={setUserReview}
                selectedImages={selectedImages}
                pickImages={pickImages}
                removeImage={removeImage}
                submitReview={submitReview}
                loading={loading}
            />
            <ImageViewerModal
                imageViewerVisible={imageViewerVisible}
                setImageViewerVisible={setImageViewerVisible}
                selectedViewImage={selectedViewImage}
            />
        </View>
    )
}

export default ReviewsSection;
