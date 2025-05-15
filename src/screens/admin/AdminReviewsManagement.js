import { View, FlatList, ActivityIndicator, Text, SafeAreaView, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import styles from "../../styles/AdminReviewsManagementStyles";
import SearchBar from "@components/admin/product/SearchBar";
import FilterBar from "@components/admin/review/FilterBar";
import ReviewItem from "@components/admin/review/ReviewItem";
import ReplyModal from "@components/admin/review/ReplyModal";
import DetailModal from "@components/admin/review/DetailModal";
import ImageViewerModal from "@components/review/ImageViewerModal";
import { useState, useEffect } from "react";
import { Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { ADMIN_GET_ALL, ADMIN_POST_ADD } from "api/apiService";

const AdminReviewsManagement = () => {
    const navigation = useNavigation();
    const [loading, setLoading] = useState(true);
    const [reviews, setReviews] = useState([]);
    const [filteredReviews, setFilteredReviews] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [ratingFilter, setRatingFilter] = useState(0); // 0 = tất cả, 5, 4, 3, 2, 1
    const [statusFilter, setStatusFilter] = useState("all"); // all, replied, not_replied
    const [productFilter, setProductFilter] = useState(null);
    const [products, setProducts] = useState([]);
    const [loadingProducts, setLoadingProducts] = useState(false);

    // Modal phản hồi đánh giá
    const [replyModalVisible, setReplyModalVisible] = useState(false);
    const [selectedReview, setSelectedReview] = useState(null);
    const [replyText, setReplyText] = useState("");
    const [submittingReply, setSubmittingReply] = useState(false);

    // Modal xem chi tiết đánh giá
    const [detailModalVisible, setDetailModalVisible] = useState(false);
    const [selectedDetailReview, setSelectedDetailReview] = useState(null);
    const [imageViewerVisible, setImageViewerVisible] = useState(false);
    const [selectedViewImage, setSelectedViewImage] = useState(null);

    useEffect(() => {
        fetchReviews();
    }, []);

    useEffect(() => {
        filterReviews();
    }, [searchQuery, ratingFilter, statusFilter, productFilter, reviews]);

    const fetchReviews = async () => {
        setLoading(true);
        try {
            const response = await ADMIN_GET_ALL("reviews/products");
            if (response.status === 200) {
                setReviews(response.data.data);
                setFilteredReviews(response.data.data);
            } else {
                Alert.alert("Lỗi", "Không thể tải danh sách đánh giá");
            }
        } catch (error) {
            console.error("Error fetching reviews:", error);
            Alert.alert("Lỗi", "Đã xảy ra lỗi khi tải danh sách đánh giá");
        } finally {
            setLoading(false);
        }
    };

    // const fetchProducts = async () => {
    //     setLoadingProducts(true);
    //     try {
    //         const response = await api.admin.getProducts();
    //         if (response.success) {
    //             setProducts(response.data);
    //         }
    //     } catch (error) {
    //         console.error("Error fetching products:", error);
    //     } finally {
    //         setLoadingProducts(false);
    //     }
    // };

    const filterReviews = () => {
        let filtered = [...reviews];

        // Lọc theo đánh giá sao
        if (ratingFilter > 0) {
            filtered = filtered.filter((review) => review.rating === ratingFilter);
        }

        // Lọc theo trạng thái phản hồi
        if (statusFilter === "replied") {
            filtered = filtered.filter((review) => review.replies[0]?.reply && review.replies[0]?.reply.trim() !== "");
        } else if (statusFilter === "not_replied") {
            filtered = filtered.filter((review) => !review.replies[0]?.reply || review.replies[0]?.reply.trim() === "");
        }

        // Lọc theo sản phẩm
        if (productFilter) {
            filtered = filtered.filter((review) => review.productId === productFilter);
        }

        // Lọc theo từ khóa tìm kiếm
        if (searchQuery.trim() !== "") {
            const query = searchQuery.toLowerCase();
            filtered = filtered.filter(
                (review) =>
                    review.fullName?.toLowerCase().includes(query) ||
                    review.comment?.toLowerCase().includes(query) ||
                    review.productName?.toLowerCase().includes(query),
            );
        }

        setFilteredReviews(filtered);
    };

    const handleReplyReview = (review) => {
        setSelectedReview(review);
        setReplyText(review.replies[0]?.reply || "");
        setReplyModalVisible(true);
    };

    const handleViewReviewDetail = (review) => {
        setSelectedDetailReview(review);
        setDetailModalVisible(true);
    };

    const submitReply = async () => {
        if (!replyText.trim()) {
            Alert.alert("Thông báo", "Vui lòng nhập nội dung phản hồi");
            return;
        }

        setSubmittingReply(true);
        try {
            const fromtData = {
                reviewId: selectedReview.id,
                reply: replyText.trim()
            }
            console.log("fromData", fromtData);

            const response = await ADMIN_POST_ADD("reviews/reply", fromtData);
            if (response.status === 200) {
                // const updatedReviews = reviews.map((review) =>
                //     review.id === selectedReview.id ? { ...review, reply: replyText } : review,
                // );
                // setReviews(updatedReviews);
                Alert.alert("Thành công", "Đã gửi phản hồi đánh giá");
                fetchReviews();
                setReplyModalVisible(false);
            } else {
                Alert.alert("Lỗi", response.error || "Không thể gửi phản hồi đánh giá");
            }
        } catch (error) {
            console.error("Error submitting reply:", error);
            Alert.alert("Lỗi", "Đã xảy ra lỗi khi gửi phản hồi đánh giá");
        } finally {
            setSubmittingReply(false);
        }
    };

    const deleteReview = async (reviewId) => {
        Alert.alert("Xác nhận xóa", "Bạn có chắc chắn muốn xóa đánh giá này không?", [
            { text: "Hủy", style: "cancel" },
            {
                text: "Xóa",
                style: "destructive",
                onPress: async () => {
                    try {
                        // const response = await api.admin.deleteReview(reviewId);
                        // if (response.success) {
                        //     const updatedReviews = reviews.filter((review) => review.id !== reviewId);
                        //     setReviews(updatedReviews);
                        //     if (detailModalVisible) {
                        //         setDetailModalVisible(false);
                        //     }
                        //     Alert.alert("Thành công", "Đã xóa đánh giá");
                        // } else {
                        //     Alert.alert("Lỗi", response.error || "Không thể xóa đánh giá");
                        // }
                    } catch (error) {
                        console.error("Error deleting review:", error);
                        Alert.alert("Lỗi", "Đã xảy ra lỗi khi xóa đánh giá");
                    }
                },
            },
        ]);
    };

    const renderRatingStars = (rating) => {
        const stars = [];
        for (let i = 1; i <= 5; i++) {
            stars.push(
                <Ionicons
                    key={i}
                    name={i <= rating ? "star" : "star-outline"}
                    size={16}
                    color="#FFD700"
                    style={{ marginRight: 2 }}
                />,
            );
        }
        return <View style={{ flexDirection: "row" }}>{stars}</View>;
    };

    const navigateToCreateOrder = () => {
        navigation.navigate("AdminCreateOrder");
    };

    const navigateBack = () => {
        navigation.goBack();
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity style={styles.backButton} onPress={navigateBack}>
                    <Ionicons name="arrow-back" size={24} color="#333" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Quản lý đánh giá</Text>
                <TouchableOpacity style={styles.addButton} onPress={navigateToCreateOrder}>
                    <Ionicons name="add" size={24} color="#fff" />
                </TouchableOpacity>
            </View>
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
                        contentContainerStyle={[styles.listContainer, filteredReviews.length === 0 && { flex: 1 }]}
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
                selectedViewImage={selectedViewImage}  // ảnh giả
            />
        </SafeAreaView>
    );
};

export default AdminReviewsManagement;