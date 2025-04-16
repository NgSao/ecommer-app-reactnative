import { useState, useEffect } from "react"
import { Alert } from "react-native"
import { useNavigation } from "@react-navigation/native"
import { api } from '@service/apiAdmin';
import { Ionicons } from "@expo/vector-icons"
import { View } from "react-native"

const useAdminReviews = () => {
    const navigation = useNavigation()
    const [loading, setLoading] = useState(true)
    const [reviews, setReviews] = useState([])
    const [filteredReviews, setFilteredReviews] = useState([])
    const [searchQuery, setSearchQuery] = useState("")
    const [ratingFilter, setRatingFilter] = useState(0) // 0 = tất cả, 5, 4, 3, 2, 1
    const [statusFilter, setStatusFilter] = useState("all") // all, replied, not_replied
    const [productFilter, setProductFilter] = useState(null)
    const [products, setProducts] = useState([])
    const [loadingProducts, setLoadingProducts] = useState(false)

    // Modal phản hồi đánh giá
    const [replyModalVisible, setReplyModalVisible] = useState(false)
    const [selectedReview, setSelectedReview] = useState(null)
    const [replyText, setReplyText] = useState("")
    const [submittingReply, setSubmittingReply] = useState(false)

    // Modal xem chi tiết đánh giá
    const [detailModalVisible, setDetailModalVisible] = useState(false)
    const [selectedDetailReview, setSelectedDetailReview] = useState(null)
    const [imageViewerVisible, setImageViewerVisible] = useState(false)
    const [selectedViewImage, setSelectedViewImage] = useState(null)

    useEffect(() => {
        fetchReviews()
        fetchProducts()
    }, [])

    useEffect(() => {
        filterReviews()
    }, [searchQuery, ratingFilter, statusFilter, productFilter, reviews])

    const fetchReviews = async () => {
        setLoading(true)
        try {
            const response = await api.admin.getAllReviews()
            if (response.success) {
                setReviews(response.data)
                setFilteredReviews(response.data)
            } else {
                Alert.alert("Lỗi", "Không thể tải danh sách đánh giá")
            }
        } catch (error) {
            console.error("Error fetching reviews:", error)
            Alert.alert("Lỗi", "Đã xảy ra lỗi khi tải danh sách đánh giá")
        } finally {
            setLoading(false)
        }
    }

    const fetchProducts = async () => {
        setLoadingProducts(true)
        try {
            const response = await api.admin.getProducts()
            if (response.success) {
                setProducts(response.data)
            }
        } catch (error) {
            console.error("Error fetching products:", error)
        } finally {
            setLoadingProducts(false)
        }
    }

    const filterReviews = () => {
        let filtered = [...reviews]

        // Lọc theo đánh giá sao
        if (ratingFilter > 0) {
            filtered = filtered.filter((review) => review.rating === ratingFilter)
        }

        // Lọc theo trạng thái phản hồi
        if (statusFilter === "replied") {
            filtered = filtered.filter((review) => review.reply && review.reply.trim() !== "")
        } else if (statusFilter === "not_replied") {
            filtered = filtered.filter((review) => !review.reply || review.reply.trim() === "")
        }

        // Lọc theo sản phẩm
        if (productFilter) {
            filtered = filtered.filter((review) => review.productId === productFilter)
        }

        // Lọc theo từ khóa tìm kiếm
        if (searchQuery.trim() !== "") {
            const query = searchQuery.toLowerCase()
            filtered = filtered.filter(
                (review) =>
                    review.userName.toLowerCase().includes(query) ||
                    review.comment.toLowerCase().includes(query) ||
                    review.productName.toLowerCase().includes(query),
            )
        }

        setFilteredReviews(filtered)
    }

    const handleReplyReview = (review) => {
        setSelectedReview(review)
        setReplyText(review.reply || "")
        setReplyModalVisible(true)
    }

    const handleViewReviewDetail = (review) => {
        setSelectedDetailReview(review)
        setDetailModalVisible(true)
    }

    const submitReply = async () => {
        if (!replyText.trim()) {
            Alert.alert("Thông báo", "Vui lòng nhập nội dung phản hồi")
            return
        }

        setSubmittingReply(true)
        try {
            const response = await api.admin.replyToReview(selectedReview.id, replyText)
            if (response.success) {
                const updatedReviews = reviews.map((review) => {
                    if (review.id === selectedReview.id) {
                        return { ...review, reply: replyText }
                    }
                    return review
                })
                setReviews(updatedReviews)
                Alert.alert("Thành công", "Đã gửi phản hồi đánh giá")
                setReplyModalVisible(false)
            } else {
                Alert.alert("Lỗi", response.error || "Không thể gửi phản hồi đánh giá")
            }
        } catch (error) {
            console.error("Error submitting reply:", error)
            Alert.alert("Lỗi", "Đã xảy ra lỗi khi gửi phản hồi đánh giá")
        } finally {
            setSubmittingReply(false)
        }
    }

    const deleteReview = async (reviewId) => {
        Alert.alert("Xác nhận xóa", "Bạn có chắc chắn muốn xóa đánh giá này không?", [
            { text: "Hủy", style: "cancel" },
            {
                text: "Xóa",
                style: "destructive",
                onPress: async () => {
                    try {
                        const response = await api.admin.deleteReview(reviewId)
                        if (response.success) {
                            const updatedReviews = reviews.filter((review) => review.id !== reviewId)
                            setReviews(updatedReviews)
                            if (detailModalVisible) {
                                setDetailModalVisible(false)
                            }
                            Alert.alert("Thành công", "Đã xóa đánh giá")
                        } else {
                            Alert.alert("Lỗi", response.error || "Không thể xóa đánh giá")
                        }
                    } catch (error) {
                        console.error("Error deleting review:", error)
                        Alert.alert("Lỗi", "Đã xảy ra lỗi khi xóa đánh giá")
                    }
                },
            },
        ])
    }

    const renderRatingStars = (rating) => {
        const stars = []
        for (let i = 1; i <= 5; i++) {
            stars.push(
                <Ionicons
                    key={i}
                    name={i <= rating ? "star" : "star-outline"}
                    size={16}
                    color="#FFD700"
                    style={{ marginRight: 2 }}
                />,
            )
        }
        return <View style={{ flexDirection: "row" }}>{stars}</View>
    }

    return {
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
        productFilter,
        setProductFilter,
        products,
        loadingProducts,
        replyModalVisible,
        setReplyModalVisible,
        selectedReview,
        setSelectedReview,
        replyText,
        setReplyText,
        submittingReply,
        setSubmittingReply,
        detailModalVisible,
        setDetailModalVisible,
        selectedDetailReview,
        setSelectedDetailReview,
        imageViewerVisible,
        setImageViewerVisible,
        selectedViewImage,
        setSelectedViewImage,
        handleReplyReview,
        handleViewReviewDetail,
        submitReply,
        deleteReview,
        renderRatingStars,
    }
}

export default useAdminReviews