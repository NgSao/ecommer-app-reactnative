import { View, Animated, Text, TouchableOpacity } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { Ionicons } from "@expo/vector-icons"
import { useRef } from "react"
import useProductDetail from "@hooks/useProductDetail"
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
import { useNavigation } from "@react-navigation/native"
import ReviewsSection from "@components/product/ReviewsSection"

export default function ProductDetailScreen() {
    const scrollY = useRef(new Animated.Value(0)).current
    const {
        loading,
        product,
        selectedColor,
        selectedStorage,
        quantity,
        variants,
        selectedVariant,
        colorImages,
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
    } = useProductDetail()
    const navigation = useNavigation();

    if (loading) {
        return (
            <View style={styles.loadingContainer}>
                <Ionicons name="hourglass-outline" size={40} color="#e30019" />
                <Text style={styles.loadingText}>Đang tải thông tin sản phẩm...</Text>
            </View>
        )
    }

    if (!product) {
        console.log("productNe", product)
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
                {selectedColor && colorImages[selectedColor] && (
                    <ImageCarousel images={colorImages[selectedColor]} />
                )}
                <ProductInfo
                    product={product}
                    selectedVariant={selectedVariant}
                    formatPrice={formatPrice}
                    renderRatingStars={renderRatingStars}
                    getStockStatusText={getStockStatusText}
                    getStockStatusColor={getStockStatusColor}
                />
                <ColorSelection
                    availableColors={getAvailableColors()}
                    selectedColor={selectedColor}
                    handleColorSelect={handleColorSelect}
                    isVariantInStock={isVariantInStock}
                    selectedStorage={selectedStorage}
                />
                <StorageSelection
                    availableStorageOptions={getAvailableStorageOptions()}
                    selectedStorage={selectedStorage}
                    handleStorageSelect={handleStorageSelect}
                    isVariantInStock={isVariantInStock}
                    selectedColor={selectedColor}
                />
                <QuantitySelector
                    quantity={quantity}
                    incrementQuantity={incrementQuantity}
                    decrementQuantity={decrementQuantity}
                    selectedVariant={selectedVariant}
                />
                <Specifications specifications={product.specifications} />
                <Description description={product.description} />
                <ReviewsSection productId={product.id} />
            </Animated.ScrollView>
            <ActionBar
                handleAddToWishlist={handleAddToWishlist}
                isInWishlist={isInWishlist}
                handleAddToCart={handleAddToCart}
                handleBuyNow={handleBuyNow}
                selectedVariant={selectedVariant}
            />
        </SafeAreaView>
    )
}