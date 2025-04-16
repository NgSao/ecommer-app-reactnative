import { useState, useEffect } from "react"
import { Alert } from "react-native"
import * as ImagePicker from "expo-image-picker"
import { api } from "@service/api"
import { useAuth } from "@contexts/AuthContext"
import { Ionicons } from "@expo/vector-icons"

const useReviews = ({ productId }) => {
    const { isLoggedIn, user } = useAuth()
    const [loading, setLoading] = useState(true)
    const [reviews, setReviews] = useState([])
    const [visibleReviews, setVisibleReviews] = useState(3)
    const [sortOption, setSortOption] = useState("newest")
    const [ratingFilter, setRatingFilter] = useState(0)
    const [reviewModalVisible, setReviewModalVisible] = useState(false)
    const [selectedImages, setSelectedImages] = useState([])
    const [userReview, setUserReview] = useState({ rating: 5, comment: "" })
    const [reviewStats, setReviewStats] = useState({
        average: 0,
        total: 0,
        distribution: { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 },
    })
    const [imageViewerVisible, setImageViewerVisible] = useState(false)
    const [selectedViewImage, setSelectedViewImage] = useState(null)

    useEffect(() => {
        fetchReviews()
    }, [productId])

    const fetchReviews = async () => {
        try {
            setLoading(true)
            const response = await api.getProductReviews(productId)
            if (response.success) {
                setReviews(response.data.reviews || [])
                setReviewStats({
                    average: response.data.average || 0,
                    total: response.data.total || 0,
                    distribution: response.data.distribution || { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 },
                })
            }
        } catch (error) {
            console.error("Error fetching reviews:", error)
        } finally {
            setLoading(false)
        }
    }

    const getFilteredAndSortedReviews = () => {
        let filtered = [...reviews]
        if (ratingFilter > 0) {
            filtered = filtered.filter((review) => review.rating === ratingFilter)
        }
        switch (sortOption) {
            case "newest":
                filtered.sort((a, b) => new Date(b.date) - new Date(a.date))
                break
            case "oldest":
                filtered.sort((a, b) => new Date(a.date) - new Date(b.date))
                break
            case "highest":
                filtered.sort((a, b) => b.rating - a.rating)
                break
            case "lowest":
                filtered.sort((a, b) => a.rating - b.rating)
                break
        }
        return filtered
    }

    const displayedReviews = getFilteredAndSortedReviews().slice(0, visibleReviews)
    const hasMoreReviews = getFilteredAndSortedReviews().length > visibleReviews

    const loadMoreReviews = () => {
        setVisibleReviews(visibleReviews + 3)
    }

    const renderRatingStars = (rating) => {
        if (!rating && rating !== 0) return null
        const stars = []
        for (let i = 1; i <= 5; i++) {
            stars.push(<Ionicons key={i} name={i <= rating ? "star" : "star-outline"} size={16} color="#FFD700" />)
        }
        return stars
    }

    const pickImages = async () => {
        try {
            const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync()
            if (permissionResult.granted === false) {
                Alert.alert("Cần quyền truy cập", "Bạn cần cấp quyền truy cập thư viện ảnh để chọn ảnh.")
                return
            }
            const result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                allowsMultipleSelection: true,
                selectionLimit: 5,
                quality: 0.8,
            })
            if (!result.canceled) {
                if (selectedImages.length + result.assets.length > 5) {
                    Alert.alert("Giới hạn ảnh", "Bạn chỉ có thể tải lên tối đa 5 ảnh.")
                    return
                }
                setSelectedImages([...selectedImages, ...result.assets.map((asset) => asset.uri)])
            }
        } catch (error) {
            console.error("Error picking images:", error)
            Alert.alert("Lỗi", "Không thể chọn ảnh. Vui lòng thử lại sau.")
        }
    }

    const removeImage = (index) => {
        const newImages = [...selectedImages]
        newImages.splice(index, 1)
        setSelectedImages(newImages)
    }

    const submitReview = async () => {
        if (!isLoggedIn) {
            Alert.alert("Đăng nhập", "Bạn cần đăng nhập để đánh giá sản phẩm.", [
                { text: "Hủy", style: "cancel" },
                { text: "Đăng nhập", onPress: () => navigation.navigate("Login") },
            ])
            return
        }
        if (!userReview.comment.trim()) {
            Alert.alert("Thông báo", "Vui lòng nhập nhận xét của bạn.")
            return
        }
        try {
            setLoading(true)
            const reviewData = {
                productId,
                rating: userReview.rating,
                comment: userReview.comment,
                images: selectedImages,
            }
            const response = await api.submitProductReview(reviewData)
            if (response.success) {
                Alert.alert("Thành công", "Cảm ơn bạn đã đánh giá sản phẩm!")
                setReviewModalVisible(false)
                setUserReview({ rating: 5, comment: "" })
                setSelectedImages([])
                fetchReviews()
            } else {
                Alert.alert("Lỗi", response.error || "Không thể gửi đánh giá. Vui lòng thử lại sau.")
            }
        } catch (error) {
            console.error("Error submitting review:", error)
            Alert.alert("Lỗi", "Không thể gửi đánh giá. Vui lòng thử lại sau.")
        } finally {
            setLoading(false)
        }
    }

    const formatDate = (dateString) => {
        const date = new Date(dateString)
        return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`
    }

    const calculateRatingPercentage = (rating) => {
        if (reviewStats.total === 0) return 0
        return (reviewStats.distribution[rating] / reviewStats.total) * 100
    }

    return {
        loading,
        reviews,
        visibleReviews,
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
        displayedReviews,
        hasMoreReviews,
        loadMoreReviews,
        renderRatingStars,
        pickImages,
        removeImage,
        submitReview,
        formatDate,
        calculateRatingPercentage,
    }
}

export default useReviews