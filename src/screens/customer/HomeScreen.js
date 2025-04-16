import { View, ScrollView, FlatList, SafeAreaView, ActivityIndicator, TouchableOpacity, Text, StatusBar } from "react-native"
import { Ionicons } from "@expo/vector-icons"
import { RefreshControl } from "react-native"
import Header from "@components/home/Header"
import CategoryItem from "@components/home/CategoryItem"
import Banner from "@components/home/Banner"
import SaleProductItem from "@components/home/SaleProductItem"
import PromotionSection from "@components/home/PromotionSection"
import ProductItem from "@components/home/ProductItem"
import useHomeScreen from "@hooks/useHomeScreen"
import styles from "@styles/HomeScreenStyles"
import { useNavigation } from "@react-navigation/native"


const HomeScreen = () => {
    const {
        loading,
        refreshing,
        categories,
        products,
        hotProducts,
        newProducts,
        saleProducts,
        banners,
        searchQuery,
        setSearchQuery,
        onRefresh,
        handleSearch,
        navigateToProductDetail,
        navigateToCategory,
        handleAddToCart,
        handleAddToWishlist,
        isInWishlist,
        formatPrice,
    } = useHomeScreen()
    const navigation = useNavigation();

    if (loading && !refreshing) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#e30019" />
                <Text style={styles.loadingText}>Đang tải dữ liệu...</Text>
            </View>
        )
    }

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar style="light" />
            <Header searchQuery={searchQuery} setSearchQuery={setSearchQuery} handleSearch={handleSearch} />
            <ScrollView
                showsVerticalScrollIndicator={false}
                refreshControl={
                    <RefreshControl refreshing={refreshing} onRefresh={onRefresh} colors={["#e30019"]} />
                }
            >
                {/* Categories */}
                <View style={styles.categoriesContainer}>
                    <FlatList
                        data={categories}
                        renderItem={({ item }) => <CategoryItem item={item} onPress={navigateToCategory} />}
                        keyExtractor={(item) => item.id}
                        horizontal
                        showsHorizontalScrollIndicator={false}
                    />
                </View>

                {/* Banners */}
                <View style={styles.bannersContainer}>
                    <FlatList
                        data={banners}
                        renderItem={({ item }) => <Banner item={item} />}
                        keyExtractor={(item) => item.id}
                        horizontal
                        pagingEnabled
                        showsHorizontalScrollIndicator={false}
                    />
                </View>

                {/* Flash Sale Section */}
                {saleProducts.length > 0 && (
                    <View style={styles.saleSection}>
                        <View style={styles.saleSectionHeader}>
                            <View style={styles.saleSectionTitleContainer}>
                                <Ionicons name="flash" size={24} color="#fff" />
                                <Text style={styles.saleSectionTitle}>FLASH SALE</Text>
                            </View>
                            <TouchableOpacity
                                onPress={() => navigation.navigate("ProductList", { isSale: true, title: "Flash Sale" })}   >
                                <Text style={styles.sectionViewAll}>Xem tất cả</Text>
                            </TouchableOpacity>
                        </View>
                        <FlatList
                            data={saleProducts}
                            renderItem={({ item }) => (
                                <SaleProductItem
                                    item={item}
                                    onPress={navigateToProductDetail}
                                    formatPrice={formatPrice}
                                />
                            )}
                            keyExtractor={(item) => item.id}
                            horizontal
                            showsHorizontalScrollIndicator={false}
                        />
                    </View>
                )}

                {/* Promotions */}
                <PromotionSection />

                {/* Hot Products */}
                <View style={styles.productsSection}>
                    <View style={styles.sectionHeader}>
                        <Text style={styles.sectionTitle}>Sản phẩm nổi bật</Text>
                        <TouchableOpacity
                            // onPress={() =>
                            //     navigateToProductDetail({ isHot: true, title: "Sản phẩm nổi bật" })
                            // }
                            onPress={() => navigation.navigate("ProductList", { isSale: true, title: "Sản phẩm nổi bật" })}   >
                            <Text style={styles.sectionViewAll}>Xem tất cả</Text>
                        </TouchableOpacity>
                    </View>
                    <FlatList
                        data={hotProducts}
                        renderItem={({ item }) => (
                            <ProductItem
                                item={item}
                                onPress={navigateToProductDetail}
                                onAddToCart={handleAddToCart}
                                onAddToWishlist={handleAddToWishlist}
                                isInWishlist={isInWishlist}
                                formatPrice={formatPrice}
                            />
                        )}
                        keyExtractor={(item) => item.id}
                        horizontal
                        showsHorizontalScrollIndicator={false}
                    />
                </View>

                {/* New Products */}
                <View style={styles.productsSection}>
                    <View style={styles.sectionHeader}>
                        <Text style={styles.sectionTitle}>Sản phẩm mới</Text>
                        <TouchableOpacity
                            onPress={() => navigation.navigate("ProductList", { isSale: true, title: "Sản phẩm mới" })}   >

                            <Text style={styles.sectionViewAll}>Xem tất cả</Text>
                        </TouchableOpacity>
                    </View>
                    <FlatList
                        data={newProducts}
                        renderItem={({ item }) => (
                            <ProductItem
                                item={item}
                                onPress={navigateToProductDetail}
                                onAddToCart={handleAddToCart}
                                onAddToWishlist={handleAddToWishlist}
                                isInWishlist={isInWishlist}
                                formatPrice={formatPrice}
                            />
                        )}
                        keyExtractor={(item) => item.id}
                        horizontal
                        showsHorizontalScrollIndicator={false}
                    />
                </View>

                {/* All Products */}
                <View style={styles.productsSection}>
                    <View style={styles.sectionHeader}>
                        <Text style={styles.sectionTitle}>Tất cả sản phẩm</Text>
                        <TouchableOpacity onPress={() => navigation.navigate("ProductList", { isSale: true, title: "Xem tất cả" })}   >
                            <Text style={styles.sectionViewAll}>Xem tất cả</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.productsGrid}>
                        {products.slice(0, 4).map((product) => (
                            <View key={product.id} style={styles.productGridItem}>
                                <ProductItem
                                    item={product}
                                    onPress={navigateToProductDetail}
                                    onAddToCart={handleAddToCart}
                                    onAddToWishlist={handleAddToWishlist}
                                    isInWishlist={isInWishlist}
                                    formatPrice={formatPrice}
                                />
                            </View>
                        ))}
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

export default HomeScreen