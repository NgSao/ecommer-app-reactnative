import { useState } from "react"
import { useNavigation } from "@react-navigation/native"
import { useWishlist } from "@contexts/WishlistContext"
import { useCart } from "@contexts/CartContext"
import { useAuth } from "@contexts/AuthContext"
import { Alert } from "react-native"

const useWishlistScreen = () => {
    const navigation = useNavigation()
    const { wishlistItems, removeFromWishlist, loading } = useWishlist()
    const { addToCart } = useCart()
    const { isLoggedIn } = useAuth()

    const [refreshing, setRefreshing] = useState(false)

    const onRefresh = () => {
        setRefreshing(true)
        setTimeout(() => {
            setRefreshing(false)
        }, 1000)
    }

    const navigateToProductDetail = (product) => {
        navigation.navigate("ProductDetail", { productId: product.id })
    }

    const formatPrice = (price) => {
        return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".") + "đ"
    }

    const handleRemoveFromWishlist = (productId) => {
        Alert.alert("Xóa sản phẩm", "Bạn có chắc chắn muốn xóa sản phẩm này khỏi danh sách yêu thích?", [
            {
                text: "Hủy",
                style: "cancel",
            },
            {
                text: "Xóa",
                onPress: () => removeFromWishlist(productId),
                style: "destructive",
            },
        ])
    }

    const handleAddToCart = (product) => {
        addToCart(product, 1)
    }

    const clearAllWishlist = () => {
        wishlistItems.forEach((item) => removeFromWishlist(item.id))
    }

    const onShopNow = () => {
        navigation.navigate("Trang chủ")
    }

    const onLogin = () => {
        navigation.navigate("Login")
    }

    return {
        wishlistItems,
        loading,
        refreshing,
        isLoggedIn,
        onRefresh,
        navigateToProductDetail,
        formatPrice,
        handleRemoveFromWishlist,
        handleAddToCart,
        clearAllWishlist,
        onShopNow,
        onLogin,
    }
}

export default useWishlistScreen