import { View, FlatList, ActivityIndicator, RefreshControl } from "react-native"

import styles from "../../styles/WishlistStyles"
import WishlistHeader from "@components/wishlist/WishlistHeader"
import LoginPrompt from "@components/wishlist/LoginPrompt"
import WishlistItem from "@components/wishlist/WishlistItem"
import EmptyState from "@components/wishlist/EmptyState"
import { useState } from "react"
import { useNavigation } from "@react-navigation/native"
import { useWishlist } from "@contexts/WishlistContext"
import { useCart } from "@contexts/CartContext"
import { useAuth } from "@contexts/AuthContext"
import { Alert } from "react-native"
import { SafeAreaView } from 'react-native-safe-area-context';
const WishlistScreen = () => {
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
        navigation.replace("AppTab")
    }

    const onLogin = () => {
        navigation.replace("Login")
    }


    if (loading && !refreshing) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#e30019" />
                <Text style={styles.loadingText}>Đang tải danh sách yêu thích...</Text>
            </View>
        )
    }

    return (
        <SafeAreaView style={styles.container}>
            <WishlistHeader wishlistItems={wishlistItems} clearAllWishlist={clearAllWishlist} />
            {!isLoggedIn ? (
                <LoginPrompt onLogin={onLogin} />
            ) : (
                <FlatList
                    data={wishlistItems}
                    renderItem={({ item }) => (
                        <WishlistItem
                            item={item}
                            navigateToProductDetail={navigateToProductDetail}
                            formatPrice={formatPrice}
                            handleRemoveFromWishlist={handleRemoveFromWishlist}
                            handleAddToCart={handleAddToCart}
                        />
                    )}
                    keyExtractor={(item) => item.id}
                    contentContainerStyle={styles.wishlistList}
                    ListEmptyComponent={<EmptyState onShopNow={onShopNow} />}
                    refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} colors={["#e30019"]} />}
                />
            )}
        </SafeAreaView>
    )
}

export default WishlistScreen