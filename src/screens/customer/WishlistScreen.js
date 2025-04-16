import { View, FlatList, ActivityIndicator, RefreshControl, SafeAreaView } from "react-native"

import styles from "../../styles/WishlistStyles"
import useWishlistScreen from "@hooks/useWishlistScreen"
import WishlistHeader from "@components/wishlist/WishlistHeader"
import LoginPrompt from "@components/wishlist/LoginPrompt"
import WishlistItem from "@components/wishlist/WishlistItem"
import EmptyState from "@components/wishlist/EmptyState"

const WishlistScreen = () => {
    const {
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
    } = useWishlistScreen()

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