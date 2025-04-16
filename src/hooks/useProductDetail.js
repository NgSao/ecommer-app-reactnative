import { useState, useEffect } from "react"
import { useNavigation, useRoute } from "@react-navigation/native"
import { Alert } from "react-native"
import { api } from "@service/api"
import { useWishlist } from "@contexts/WishlistContext"
import { useCart } from "@contexts/CartContext"
import { Ionicons } from "@expo/vector-icons"

const useProductDetail = () => {
    const navigation = useNavigation()
    const route = useRoute()
    const { productId } = route.params
    const { addToCart } = useCart()
    const { addToWishlist, isInWishlist } = useWishlist()

    const [loading, setLoading] = useState(true)
    const [product, setProduct] = useState(null)
    const [selectedColor, setSelectedColor] = useState(null)
    const [selectedStorage, setSelectedStorage] = useState(null)
    const [quantity, setQuantity] = useState(1)
    const [variants, setVariants] = useState([])
    const [selectedVariant, setSelectedVariant] = useState(null)
    const [colorImages, setColorImages] = useState({})
    const [isOnSale, setIsOnSale] = useState(false)
    const [soldPercentage, setSoldPercentage] = useState(0)

    useEffect(() => {
        fetchProductDetails()
    }, [productId])

    const fetchProductDetails = async () => {
        try {
            setLoading(true)
            const response = await api.getProductById(productId)

            if (response.success) {
                setProduct(response.data)
                if (response.data.variants && response.data.variants.length > 0) {
                    setVariants(response.data.variants)
                    const images = {}
                    response.data.variants.forEach((variant) => {
                        if (!images[variant.color]) {
                            images[variant.color] = variant.images || [variant.image]
                        }
                    })
                    setColorImages(images)
                    const availableVariant = response.data.variants.find((v) => v.stock > 0)
                    if (availableVariant) {
                        setSelectedColor(availableVariant.color)
                        setSelectedStorage(availableVariant.storage)
                        setSelectedVariant(availableVariant)
                    } else {
                        setSelectedColor(response.data.variants[0].color)
                        setSelectedStorage(response.data.variants[0].storage)
                        setSelectedVariant(response.data.variants[0])
                    }
                }
            }
        } catch (error) {
            console.error("Error fetching product details:", error)
            Alert.alert("Lỗi", "Không thể tải thông tin sản phẩm. Vui lòng thử lại sau.")
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        if (product) {
            const now = new Date()
            const saleEndDate = product.saleEndDate ? new Date(product.saleEndDate) : null
            if (saleEndDate && saleEndDate > now) {
                setIsOnSale(true)
                if (product.saleQuantity && product.soldQuantity) {
                    const soldPercentage = (product.soldQuantity / product.saleQuantity) * 100
                    setSoldPercentage(soldPercentage)
                }
            } else {
                setIsOnSale(false)
            }
        }
    }, [product])

    useEffect(() => {
        if (selectedColor && selectedStorage && variants.length > 0) {
            const variant = variants.find((v) => v.color === selectedColor && v.storage === selectedStorage)
            if (variant) {
                setSelectedVariant(variant)
                if (quantity > variant.stock) {
                    setQuantity(variant.stock > 0 ? 1 : 0)
                }
            }
        }
    }, [selectedColor, selectedStorage, variants])

    const handleColorSelect = (color) => {
        setSelectedColor(color)
        const variantsWithColor = variants.filter((v) => v.color === color)
        if (variantsWithColor.length > 0) {
            const sameStorageVariant = variantsWithColor.find((v) => v.storage === selectedStorage)
            if (sameStorageVariant) {
                setSelectedStorage(sameStorageVariant.storage)
            } else {
                setSelectedStorage(variantsWithColor[0].storage)
            }
        }
    }

    const handleStorageSelect = (storage) => {
        setSelectedStorage(storage)
    }

    const incrementQuantity = () => {
        if (selectedVariant && quantity < selectedVariant.stock) {
            setQuantity(quantity + 1)
        } else {
            Alert.alert("Thông báo", "Số lượng đã đạt mức tối đa có sẵn trong kho.")
        }
    }

    const decrementQuantity = () => {
        if (quantity > 1) {
            setQuantity(quantity - 1)
        }
    }

    const handleAddToCart = () => {
        if (!selectedVariant) {
            Alert.alert("Thông báo", "Vui lòng chọn phiên bản sản phẩm.")
            return
        }
        if (selectedVariant.stock <= 0) {
            Alert.alert("Thông báo", "Sản phẩm đã hết hàng.")
            return
        }
        const productToAdd = {
            ...product,
            id: selectedVariant.id,
            color: selectedVariant.color,
            storage: selectedVariant.storage,
            price: selectedVariant.price,
            image: selectedVariant.image || (colorImages[selectedVariant.color] && colorImages[selectedVariant.color][0]),
            maxQuantity: selectedVariant.stock,
        }
        addToCart(productToAdd, quantity)
        Alert.alert("Thành công", "Đã thêm sản phẩm vào giỏ hàng.")
    }

    const handleBuyNow = () => {
        handleAddToCart()
        navigation.navigate("Giỏ hàng")
    }

    const handleAddToWishlist = () => {
        if (!selectedVariant) {
            Alert.alert("Thông báo", "Vui lòng chọn phiên bản sản phẩm.")
            return
        }
        const productToAdd = {
            ...product,
            id: selectedVariant.id,
            color: selectedVariant.color,
            storage: selectedVariant.storage,
            price: selectedVariant.price,
            image: selectedVariant.image || (colorImages[selectedVariant.color] && colorImages[selectedVariant.color][0]),
        }
        addToWishlist(productToAdd)
    }

    const formatPrice = (price) => {
        return price ? price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".") + "đ" : ""
    }

    const renderRatingStars = (rating) => {
        if (!rating && rating !== 0) return null
        const stars = []
        for (let i = 1; i <= 5; i++) {
            stars.push(<Ionicons key={i} name={i <= rating ? "star" : "star-outline"} size={16} color="#FFD700" />)
        }
        return stars
    }

    const getAvailableColors = () => {
        if (!variants || variants.length === 0) return []
        return [...new Set(variants.map((v) => v.color))]
    }

    const getAvailableStorageOptions = () => {
        if (!variants || variants.length === 0 || !selectedColor) return []
        return variants.filter((v) => v.color === selectedColor).map((v) => v.storage)
    }

    const isVariantInStock = (color, storage) => {
        const variant = variants.find((v) => v.color === color && v.storage === storage)
        return variant && variant.stock > 0
    }

    const getStockStatusText = () => {
        if (!selectedVariant) return ""
        if (selectedVariant.stock <= 0) {
            return "Hết hàng"
        } else if (selectedVariant.stock <= 5) {
            return `Còn ${selectedVariant.stock} sản phẩm`
        } else {
            return "Còn hàng"
        }
    }

    const getStockStatusColor = () => {
        if (!selectedVariant) return "#999"
        if (selectedVariant.stock <= 0) {
            return "#e30019"
        } else if (selectedVariant.stock <= 5) {
            return "#ff9800"
        } else {
            return "#4caf50"
        }
    }

    return {
        loading,
        product,
        selectedColor,
        selectedStorage,
        quantity,
        variants,
        selectedVariant,
        colorImages,
        isOnSale,
        soldPercentage,
        isInWishlist,
        handleColorSelect,
        handleStorageSelect,
        incrementQuantity,
        decrementQuantity,
        handleAddToCart,
        handleBuyNow,
        handleAddToWishlist,
        formatPrice,
        renderRatingStars,
        getAvailableColors,
        getAvailableStorageOptions,
        isVariantInStock,
        getStockStatusText,
        getStockStatusColor,
    }
}

export default useProductDetail