import { View, Text, FlatList, TouchableOpacity } from "react-native";
import styles from "./../../styles/ReviewsSectionStyles";
import OverallRating from "@components/review/OverallRating";
import RatingFilters from "@components/review/RatingFilters";
import SortOptions from "@components/review/SortOptions";
import ReviewItem from "@components/review/ReviewItem";
import WriteReviewModal from "@components/review/WriteReviewModal";
import ImageViewerModal from "@components/review/ImageViewerModal";
import { useState, useEffect } from "react";
import { Alert } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { useAuth } from "@contexts/AuthContext";
import { Ionicons } from "@expo/vector-icons";
import { GET_ID, POST_TOKEN, USER_POST_UPLOAD } from "api/apiService";
import { useNavigation } from "@react-navigation/native";

const ReviewsSection = ({ productId }) => {
    const { isLoggedIn, token } = useAuth();
    const navigation = useNavigation();
    const [loading, setLoading] = useState(true);
    const [reviews, setReviews] = useState([]);
    const [visibleReviews, setVisibleReviews] = useState(3); // Khởi tạo với 3
    const [sortOption, setSortOption] = useState("newest");
    const [ratingFilter, setRatingFilter] = useState(0);
    const [reviewModalVisible, setReviewModalVisible] = useState(false);
    const [selectedImages, setSelectedImages] = useState([]);
    const [userReview, setUserReview] = useState({ rating: 5, comment: "" });
    const [reviewStats, setReviewStats] = useState({
        average: 0,
        total: 0,
        distribution: { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 },
    });
    const [imageViewerVisible, setImageViewerVisible] = useState(false);
    const [selectedViewImage, setSelectedViewImage] = useState(null);

    useEffect(() => {
        fetchReviews();
    }, [productId]);

    const fetchReviews = async () => {
        try {
            setLoading(true);
            const response = await GET_ID("reviews/product", productId);
            if (response.status === 200) {
                setReviews(response.data.data.reviews || []);
                setReviewStats({
                    average: response.data.data.average || 0,
                    total: response.data.data.total || 0,
                    distribution: response.data.data.distribution || { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 },
                });
            }
        } catch (error) {
            console.error("Error fetching reviews:", error);
        } finally {
            setLoading(false);
        }
    };

    const getFilteredAndSortedReviews = () => {
        let filtered = [...reviews];
        if (ratingFilter > 0) {
            filtered = filtered.filter((review) => review.rating === ratingFilter);
        }
        switch (sortOption) {
            case "newest":
                filtered.sort((a, b) => new Date(b.createAt) - new Date(a.createAt));
                break;
            case "oldest":
                filtered.sort((a, b) => new Date(a.createAt) - new Date(b.createAt));
                break;
            case "highest":
                filtered.sort((a, b) => b.rating - a.rating);
                break;
            case "lowest":
                filtered.sort((a, b) => a.rating - b.rating);
                break;
        }
        return filtered.slice(0, visibleReviews); // Cắt danh sách theo visibleReviews
    };

    const displayedReviews = getFilteredAndSortedReviews();
    const hasMoreReviews = reviews.length > visibleReviews;

    const loadMoreReviews = () => {
        setVisibleReviews(visibleReviews + 3);
    };

    const renderRatingStars = (rating) => {
        if (!rating && rating !== 0) return null;
        const stars = [];
        for (let i = 1; i <= 5; i++) {
            stars.push(<Ionicons key={i} name={i <= rating ? "star" : "star-outline"} size={16} color="#FFD700" />);
        }
        return stars;
    };

    const pickImages = async () => {
        try {
            const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
            if (permissionResult.granted === false) {
                Alert.alert("Cần quyền truy cập", "Bạn cần cấp quyền truy cập thư viện ảnh để chọn ảnh.");
                return;
            }
            const result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                allowsMultipleSelection: true,
                selectionLimit: 5,
                quality: 0.8,
            });
            if (!result.canceled) {
                if (selectedImages.length + result.assets.length > 5) {
                    Alert.alert("Giới hạn ảnh", "Bạn chỉ có thể tải lên tối đa 5 ảnh.");
                    return;
                }
                setSelectedImages([...selectedImages, ...result.assets.map((asset) => asset.uri)]);
            }
        } catch (error) {
            console.error("Error picking images:", error);
            Alert.alert("Lỗi", "Không thể chọn ảnh. Vui lòng thử lại sau.");
        }
    };

    const removeImage = (index) => {
        const newImages = [...selectedImages];
        newImages.splice(index, 1);
        setSelectedImages(newImages);
    };

    const submitReview = async () => {
        if (!isLoggedIn) {
            Alert.alert("Đăng nhập", "Bạn cần đăng nhập để đánh giá sản phẩm.", [
                { text: "Hủy", style: "cancel" },
                { text: "Đăng nhập", onPress: () => navigation.replace("Login") },
            ]);
            return;
        }
        if (!userReview.comment.trim()) {
            Alert.alert("Thông báo", "Vui lòng nhập nhận xét của bạn.");
            return;
        }
        if (userReview.comment.length < 15) {
            Alert.alert("Thông báo", "Nhận xét phải có ít nhất 15 ký tự.");
            return;
        }
        try {
            setLoading(true);
            const reviewData = {
                productId: productId,
                rating: userReview.rating,
                comment: userReview.comment,
                images: null,
            };

            const response = await POST_TOKEN("public/reviews/submit", token, reviewData);

            if (selectedImages.length > 0) {
                const formData = new FormData();
                selectedImages.forEach((uri, index) => {
                    formData.append("file", {
                        uri,
                        name: `review_image_${index}.jpg`,
                        type: "image/jpeg",
                    });
                });
                formData.append("productId", response.data.data.id);
                formData.append("flagData", "review");
                const uploadResponse = await USER_POST_UPLOAD("public/file/upload-images/products", formData, {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                });

                if (uploadResponse.status !== 200) {
                    console.error("Image upload failed:", uploadResponse.data);
                    Alert.alert("Cảnh báo", "Đánh giá đã được gửi, nhưng không thể tải ảnh lên. Vui lòng thử lại sau.");
                }
            }

            if (response.status === 200) {
                Alert.alert("Thành công", "Cảm ơn bạn đã đánh giá sản phẩm!");
                setReviewModalVisible(false);
                setUserReview({ rating: 5, comment: "" });
                setSelectedImages([]);
                fetchReviews();
            } else {
                Alert.alert("Lỗi", response.error || "Không thể gửi đánh giá. Vui lòng thử lại sau.");
            }
        } catch (error) {
            Alert.alert("Thông báo", "Bạn đã đánh giá sản phẩm rồi");
        } finally {
            setLoading(false);
        }
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
    };

    const calculateRatingPercentage = (rating) => {
        if (reviewStats.total === 0) return 0;
        return (reviewStats.distribution[rating] / reviewStats.total) * 100;
    };

    return (
        <View style={styles.reviewsContainer}>
            <View style={styles.reviewsHeader}>
                <Text style={styles.sectionTitle}>Đánh giá từ khách hàng</Text>
                <TouchableOpacity style={styles.writeReviewButton} onPress={() => setReviewModalVisible(true)}>
                    <Text style={styles.writeReviewText}>Viết đánh giá</Text>
                </TouchableOpacity>
            </View>
            <OverallRating
                reviewStats={reviewStats}
                renderRatingStars={renderRatingStars}
                calculateRatingPercentage={calculateRatingPercentage}
            />
            <RatingFilters ratingFilter={ratingFilter} setRatingFilter={setRatingFilter} reviewStats={reviewStats} />
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
                                data={displayedReviews} // Sử dụng displayedReviews trực tiếp
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
                            {hasMoreReviews && (
                                <TouchableOpacity style={styles.loadMoreButton} onPress={loadMoreReviews}>
                                    <Text style={styles.loadMoreText}>Xem thêm đánh giá</Text>
                                </TouchableOpacity>
                            )}
                        </>
                    ) : (
                        <View style={styles.emptyReviewsContainer}>
                            <Text style={styles.emptyReviewsText}>Chưa có đánh giá nào cho sản phẩm này.</Text>
                            <TouchableOpacity style={styles.beFirstReviewButton} onPress={() => setReviewModalVisible(true)}>
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
    );
};

export default ReviewsSection;