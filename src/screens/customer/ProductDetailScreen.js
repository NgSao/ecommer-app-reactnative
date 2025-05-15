
import { View, Animated, Text, TouchableOpacity } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { Ionicons } from "@expo/vector-icons"
import { useRef, useState, useEffect } from "react"
import ProductDetailHeader from "@components/product/ProductDetailHeader"
import ImageCarousel from "@components/product/ImageCarousel"
import ProductInfo from "@components/product/ProductInfo"
import ColorSelection from "@components/product/ColorSelection"
import StorageSelection from './../../components/product/StorageSelection';
import QuantitySelector from "@components/product/QuantitySelector"
import Specifications from "@components/product/Specifications"
import Description from "@components/product/Description"
import ActionBar from "@components/product/ActionBar"
import styles from "../../styles/ProductDetailStyles"
import { useNavigation, useRoute } from "@react-navigation/native"
import ReviewsSection from "@components/product/ReviewsSection"
import { Alert } from "react-native"
import { useWishlist } from "@contexts/WishlistContext"
import { useCart } from "@contexts/CartContext"
import { GET_ID } from "api/apiService"

export default function ProductDetailScreen() {
    const scrollY = useRef(new Animated.Value(0)).current

    const navigation = useNavigation();
    const route = useRoute()
    const { productId, variantId } = route.params
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
            const response = await GET_ID("products", productId)

            if (response.status === 200) {
                setProduct(response.data.data)
                if (response.data.data.variants && response.data.data.variants.length > 0) {
                    setVariants(response.data.data.variants)
                    const images = {}
                    response.data.data.variants.forEach((variant) => {
                        if (!images[variant.color]) {
                            images[variant.color] = variant.images || [variant.image]
                        }
                    })
                    setColorImages(images)

                    // Prioritize variantId from params if provided
                    let initialVariant = null
                    if (variantId) {
                        initialVariant = response.data.data.variants.find((v) => v.id === variantId)
                    }
                    if (!initialVariant) {
                        initialVariant = response.data.data.variants.find((v) => v.stock > 0) || response.data.variants[0]
                    }

                    if (initialVariant) {
                        setSelectedColor(initialVariant.color)
                        setSelectedStorage(initialVariant.storage)
                        setSelectedVariant(initialVariant)
                    }
                } else {
                    // Handle case where variants is null or empty
                    setVariants([])
                    setColorImages({})
                    setSelectedVariant(null)
                    setSelectedColor(null)
                    setSelectedStorage(null)
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
        } else if (!selectedVariant && product && product.stock && quantity < product.stock) {
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
        if (variants.length > 0 && !selectedVariant) {
            Alert.alert("Thông báo", "Vui lòng chọn phiên bản sản phẩm.")
            return
        }
        if (selectedVariant && selectedVariant.stock <= 0) {
            Alert.alert("Thông báo", "Sản phẩm đã hết hàng.")
            return
        }
        if (!selectedVariant && product.stock <= 0) {
            Alert.alert("Thông báo", "Sản phẩm đã hết hàng.")
            return
        }

        const productToAdd = selectedVariant
            ? {
                id: selectedVariant.id,
                name: `${product.name} ${selectedVariant.storage || ""} ${selectedVariant.color || ""}`.trim(),
                price: selectedVariant.price === 0 ? selectedVariant.originalPrice : selectedVariant.price,
                image: selectedVariant.image || (colorImages[selectedVariant.color] && colorImages[selectedVariant.color][0]),
                maxQuantity: selectedVariant.stock,
            }
            : {
                id: product.id,
                name: product.name,
                price: product.price === 0 ? product.originalPrice : product.price,
                image: product.images && product.images.length > 0 ? product.images[0] : null,
                maxQuantity: product.stock,
            }

        const options = selectedVariant
            ? {
                color: selectedVariant.color,
                storage: selectedVariant.storage,
            }
            : {}

        addToCart(productToAdd, quantity, options)
    }

    const handleBuyNow = () => {
        handleAddToCart()
        navigation.navigate("Cart")
    }

    const handleAddToWishlist = () => {
        if (variants.length > 0 && !selectedVariant) {
            Alert.alert("Thông báo", "Vui lòng chọn phiên bản sản phẩm.")
            return
        }
        const productToAdd = selectedVariant
            ? {
                id: selectedVariant.id,
                productId: product.id,
                name: product.name,
                color: selectedVariant.color,
                storage: selectedVariant.storage,
                price: selectedVariant.price === 0 ? selectedVariant.originalPrice : selectedVariant.price,
                image: selectedVariant.image || (colorImages[selectedVariant.color] && colorImages[selectedVariant.color][0]),
            }
            : {
                id: product.id,
                productId: product.id,
                name: product.name,
                image: product.images && product.images.length > 0 ? product.images[0] : null,
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
        if (variants.length > 0 && !selectedVariant) return ""
        if (selectedVariant && selectedVariant.stock <= 0) {
            return "Hết hàng"
        } else if (selectedVariant && selectedVariant.stock <= 5) {
            return `Còn ${selectedVariant.stock} sản phẩm`
        } else if (!selectedVariant && product.stock <= 0) {
            return "Hết hàng"
        } else if (!selectedVariant && product.stock <= 5) {
            return `Còn ${product.stock} sản phẩm`
        } else {
            return "Còn hàng"
        }
    }

    const getStockStatusColor = () => {
        if (variants.length > 0 && !selectedVariant) return "#999"
        if (selectedVariant && selectedVariant.stock <= 0) {
            return "#e30019"
        } else if (selectedVariant && selectedVariant.stock <= 5) {
            return "#ff9800"
        } else if (!selectedVariant && product.stock <= 0) {
            return "#e30019"
        } else if (!selectedVariant && product.stock <= 5) {
            return "#ff9800"
        } else {
            return "#4caf50"
        }
    }

    const getSelectedVariantImages = () => {
        if (selectedVariant && selectedVariant.image) {
            const productImages = product && product.images && product.images.length > 0 ? product.images : []
            const combinedImages = [selectedVariant.image, ...productImages.filter(img => img !== selectedVariant.image)]
            return combinedImages
        }
        return product && product.images && product.images.length > 0 ? product.images : []
    }

    if (loading) {
        return (
            <View style={styles.loadingContainer}>
                <Ionicons name="hourglass-outline" size={40} color="#e30019" />
                <Text style={styles.loadingText}>Đang tải thông tin sản phẩm...</Text>
            </View>
        )
    }

    if (!product) {
        return (
            <View style={styles.errorContainer}>
                <Ionicons name="alert-circle-outline" size={40} color="#e30019" />
                <Text style={styles.errorText}>Không tìm thấy thông tin sản phẩm</Text>
                <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
                    <Text style={styles.backButtonText}>Quay lại</Text>
                </TouchableOpacity>
            </View>
        )
    }

    return (
        <SafeAreaView style={styles.container}>
            <Animated.ScrollView
                showsVerticalScrollIndicator={false}
                onScroll={Animated.event([{ nativeEvent: { contentOffset: { y: scrollY } } }], {
                    useNativeDriver: false,
                })}
                scrollEventThrottle={16}
            >
                <ProductDetailHeader />
                <ImageCarousel images={getSelectedVariantImages()} />
                <ProductInfo
                    product={product}
                    selectedVariant={selectedVariant}
                    formatPrice={formatPrice}
                    renderRatingStars={renderRatingStars}
                    getStockStatusText={getStockStatusText}
                    getStockStatusColor={getStockStatusColor}
                />
                <StorageSelection
                    availableStorageOptions={getAvailableStorageOptions()}
                    selectedStorage={selectedStorage}
                    handleStorageSelect={handleStorageSelect}
                    isVariantInStock={isVariantInStock}
                    selectedColor={selectedColor}
                />
                <ColorSelection
                    availableColors={getAvailableColors()}
                    selectedColor={selectedColor}
                    handleColorSelect={handleColorSelect}
                    isVariantInStock={isVariantInStock}
                    selectedStorage={selectedStorage}
                />

                <QuantitySelector
                    quantity={quantity}
                    incrementQuantity={incrementQuantity}
                    decrementQuantity={decrementQuantity}
                    selectedVariant={selectedVariant}
                    product={product}
                />
                <Specifications specifications={product.specification} />
                <Description description={product.description} />
                <ReviewsSection productId={product.id} />
            </Animated.ScrollView>
            <ActionBar
                handleAddToWishlist={handleAddToWishlist}
                isInWishlist={isInWishlist}
                handleAddToCart={handleAddToCart}
                handleBuyNow={handleBuyNow}
                selectedVariant={selectedVariant}
                product={product}
            />
        </SafeAreaView>
    )
}