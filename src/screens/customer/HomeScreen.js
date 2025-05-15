
import { useState, useEffect } from "react"
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    Image,
    TouchableOpacity,
    TextInput,
    FlatList,
    Dimensions,
    ActivityIndicator,
    RefreshControl,
} from "react-native"
import { Ionicons } from "@expo/vector-icons"
import { useNavigation } from "@react-navigation/native"
import { useCart } from "@contexts/CartContext"
import { useWishlist } from "@contexts/WishlistContext"
import { GET_ALL } from "api/apiService"
import { SafeAreaView } from "react-native-safe-area-context"

const { width } = Dimensions.get("window")

const HomeScreen = () => {
    const navigation = useNavigation()
    const { addToCart, getTotalItems } = useCart()
    const { addToWishlist, isInWishlist } = useWishlist()

    const [loading, setLoading] = useState(true)
    const [refreshing, setRefreshing] = useState(false)
    const [categories, setCategories] = useState([])
    const [products, setProducts] = useState([])
    const [hotProducts, setHotProducts] = useState([])
    const [newProducts, setNewProducts] = useState([])
    const [saleProducts, setSaleProducts] = useState([])
    const [banners, setBanners] = useState([])
    const [searchQuery, setSearchQuery] = useState("")

    useEffect(() => {
        fetchData()
    }, [])

    const flattenProductVariants = (products) => {
        return products.flatMap(product =>
            product.variants?.length > 0
                ? product.variants.map(variant => ({
                    id: `${product.id}${variant.id}`,
                    productId: product.id,
                    variantId: variant.id,
                    name: `${product.name}${variant?.storage ? ' ' + variant.storage : ''}`,
                    price: variant.price === 0 ? variant.originalPrice : variant.price,
                    originalPrice: variant.originalPrice,
                    image: variant.image,
                    stock: variant.stock,
                    variant: variant,
                    sold: product.sold

                }))
                : [{
                    id: `${product.id}`,
                    productId: product.id,
                    variant: null,
                    name: product.name,
                    price: product.price === 0 ? product.originalPrice : product.price,
                    originalPrice: product.originalPrice,
                    image: product.images && product.images.length > 0 ? product.images[0] : null,
                    stock: product.stock,
                    sold: product.sold
                }]
        )
    }

    const filterVariantsByStorage = (products) => {
        return products.map(product => {
            if (!product.variants || product.variants.length === 0) {
                return product;
            }
            const variantsByStorage = product.variants.reduce((acc, variant) => {
                const storage = variant.storage || 'default';
                if (!acc[storage]) {
                    acc[storage] = [];
                }
                acc[storage].push(variant);
                return acc;
            }, {});

            const filteredVariants = Object.values(variantsByStorage).map(variants => variants[0]);

            return {
                ...product,
                variants: filteredVariants,
            };
        });
    };

    const fetchData = async () => {
        try {
            setLoading(true)

            const categoriesResponse = await GET_ALL("categories")
            if (categoriesResponse.status === 200) {
                setCategories(categoriesResponse.data.data)
            }

            const bannersResponse = await GET_ALL("banners")
            if (bannersResponse.status === 200) {
                setBanners(bannersResponse.data.data)
            }

            // const productsResponse = await api.getProducts()
            // if (productsResponse.success) {
            //     const flattenedProducts = flattenProductVariants(productsResponse.data)
            //     setProducts(flattenedProducts)

            //     const hotProds = flattenedProducts.filter((p) => p.isHot)
            //     setHotProducts(hotProds)

            //     const newProds = flattenedProducts.filter((p) => p.isNew)
            //     setNewProducts(newProds)
            // }

            const productSale = await GET_ALL("products/sale")
            if (productSale.status === 200) {
                const filteredProducts = filterVariantsByStorage(productSale.data.data);
                const flattenedProducts = flattenProductVariants(filteredProducts);
                setSaleProducts(flattenedProducts);

            }

            const hotDealsResponse = await GET_ALL("products/hot")
            if (hotDealsResponse.status === 200) {
                const filteredProducts = filterVariantsByStorage(hotDealsResponse.data.data);
                const flattenedProducts = flattenProductVariants(filteredProducts);
                setHotProducts(flattenedProducts);
            }

            const productsResponse = await GET_ALL("products")
            if (productsResponse.status === 200) {

                const filteredProducts = filterVariantsByStorage(productsResponse.data.data);
                const flattenedProducts = flattenProductVariants(filteredProducts);
                setProducts(flattenedProducts);

            }



            // const saleResponse = await api.getSaleProducts()
            // const flashSaleResponse = await api.getFlashSaleProducts()
            // let combinedSaleProducts = []

            // if (saleResponse.success) {
            //     combinedSaleProducts = flattenProductVariants(saleResponse.data)
            // }
            // if (flashSaleResponse.success) {
            //     const flashSaleProds = flattenProductVariants(flashSaleResponse.data)
            //     combinedSaleProducts = [...combinedSaleProducts, ...flashSaleProds]
            // }
            // setSaleProducts(combinedSaleProducts)


        } catch (error) {
            console.error("Error fetching home data:", error)
        } finally {
            setLoading(false)
            setRefreshing(false)
        }
    }

    const onRefresh = () => {
        setRefreshing(true)
        fetchData()
    }

    const handleSearch = () => {
        if (searchQuery.trim()) {
            navigation.navigate("Search", { query: searchQuery })
        }
    }

    const navigateToProductDetail = (item) => {
        navigation.navigate("ProductDetail", {
            productId: item.productId,
            variantId: item.variantId
        })
    }

    const handleAddToCart = (item) => {
        if (item.variant) {
            navigation.navigate("ProductDetail", {
                productId: item.productId,
                variantId: item.variantId
            })
            return
        }
        addToCart(item, 1)
    }

    const handleAddToWishlist = (item) => {
        const productToAdd = {
            id: item.id,
            productId: item.productId,
            name: item.name,
            price: item.price || 0,
            image: item.image,
            ...(item.variant?.color && { color: item.variant.color }),
            ...(item.variant?.storage && { storage: item.variant.storage }),
        };
        addToWishlist(productToAdd);
    };
    const formatPrice = (price) => {
        return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".") + "đ"
    }

    const renderCategoryItem = ({ item }) => (
        <TouchableOpacity
            style={styles.categoryItem}
            onPress={() => navigation.navigate("ProductList", { category: item.name, title: item.name })}
        >
            <Image style={styles.categoryImage} source={{ uri: item.imageUrl }} resizeMode="contain" />
            <Text style={styles.categoryName}>{item.name}</Text>
        </TouchableOpacity>
    )

    const renderProductItem = ({ item }) => {
        if (!item) return null


        return (
            <TouchableOpacity style={styles.productItem} onPress={() => navigateToProductDetail(item)}>
                <Image source={{ uri: item.image }} style={styles.productImage} resizeMode="contain" />
                {/* {item.isHot && (
                    <View style={styles.hotBadge}>
                        <Ionicons name="flame" size={12} color="#fff" />
                    </View>
                )}
                {item.isNew && (
                    <View style={[styles.hotBadge, styles.newBadge]}>
                        <Text style={styles.newBadgeText}>New</Text>
                    </View>
                )} */}
                {item.discount > 0 && (
                    <View style={styles.discountBadge}>
                        <Text style={styles.discountText}>-{item.discount}%</Text>
                    </View>
                )}
                <Text style={styles.productName} numberOfLines={2}>
                    {item.name}
                </Text>
                <View style={styles.priceContainer}>
                    <Text style={styles.productPrice}>{formatPrice(item.price)}</Text>
                    {item.originalPrice > item.price && (
                        <Text style={styles.originalPrice}>{formatPrice(item.originalPrice)}</Text>
                    )}
                </View>
                <View style={styles.productActions}>
                    <TouchableOpacity style={styles.addToCartButton} onPress={() => handleAddToCart(item)}>
                        <Text style={styles.addToCartText}>Mua ngay</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.wishlistButton} onPress={() => handleAddToWishlist(item)}>
                        {/* <Ionicons
                            name={isInWishlist(item.id) ? "heart" : "heart-outline"}
                            size={20}
                            color={isInWishlist(item.id) ? "#e30019" : "#666"}
                        /> */}
                        <Ionicons
                            name={isInWishlist(item.productId) ? "heart" : "heart-outline"} // Use productId
                            size={20}
                            color={isInWishlist(item.productId) ? "#e30019" : "#666"}
                        />
                    </TouchableOpacity>
                </View>
            </TouchableOpacity>
        )
    }

    const renderSaleProductItem = ({ item }) => {
        if (!item) return null
        console.log("sản phẩm", item)

        return (
            <TouchableOpacity style={styles.saleProductItem} onPress={() => navigateToProductDetail(item)}>
                <View style={styles.saleProductImageContainer}>
                    <Image source={{ uri: item.image }} style={styles.saleProductImage} resizeMode="contain" />
                    <View style={styles.saleProductBadge}>
                        <Text style={styles.saleProductBadgeText}>SALE</Text>
                    </View>
                </View>
                <View style={styles.saleProductInfo}>
                    <Text style={styles.saleProductName} numberOfLines={2}>
                        {item.name}
                    </Text>
                    <View style={styles.saleProductPrices}>
                        <Text style={styles.saleProductPrice}>{formatPrice(item.price)}</Text>
                        <Text style={styles.saleProductOriginalPrice}>{formatPrice(item.originalPrice)}</Text>
                    </View>
                    <View style={styles.saleProductProgress}>
                        <View
                            style={[styles.saleProductProgressBar, { width: `${(item.sold / item.stock) * 100}%` }]}
                        />
                        <Text style={styles.saleProductProgressText}>
                            Đã bán {item.sold}/{item.stock}
                        </Text>
                    </View>
                    {/* <View style={styles.saleProductCountdown}>
                        <Text style={styles.saleProductCountdownLabel}>Kết thúc sau:</Text>
                        <Text style={styles.saleProductCountdownLabel}>{item.saleEndDate}</Text>
                    </View> */}
                </View>
            </TouchableOpacity>
        )
    }

    const renderBanner = ({ item }) => (
        <TouchableOpacity onPress={() => console.log("Banner clicked:", item.link)}>
            <Image source={{ uri: item.imageUrl }} style={styles.bannerImage} resizeMode="cover" />
        </TouchableOpacity>
    )

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
            <View style={styles.header}>
                <Image
                    source={{ uri: "https://minhtuanmobile.com/assets/front/img/logo.png?2504191754" }}
                    style={styles.logo}
                    resizeMode="contain"
                />
                <View style={styles.searchContainer}>
                    <TouchableOpacity style={styles.searchInputContainer} onPress={() => navigation.navigate("Search")}>
                        <Ionicons name="search-outline" size={20} color="#999" style={styles.searchIcon} />
                        <TextInput
                            style={styles.searchInput}
                            placeholder="Bạn cần tìm gì?"
                            placeholderTextColor="#999"
                            value={searchQuery}
                            onChangeText={setSearchQuery}
                            onSubmitEditing={handleSearch}
                            returnKeyType="search"
                        />
                    </TouchableOpacity>
                </View>
                <TouchableOpacity style={styles.cartButton} onPress={() => navigation.navigate("Cart")}>
                    <Ionicons name="cart-outline" size={24} color="#e30019" />
                    {getTotalItems() > 0 && (
                        <View style={styles.cartBadge}>
                            <Text style={styles.cartBadgeText}>{getTotalItems()}</Text>
                        </View>
                    )}
                </TouchableOpacity>
            </View>

            <ScrollView
                showsVerticalScrollIndicator={false}
                refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} colors={["#e30019"]} />}
            >
                <View style={styles.categoriesContainer}>
                    <FlatList
                        data={categories}
                        renderItem={renderCategoryItem}
                        keyExtractor={(item) => item.id.toString()}
                        horizontal
                        showsHorizontalScrollIndicator={false}
                    />
                </View>

                <View style={styles.bannersContainer}>
                    <FlatList
                        data={banners}
                        renderItem={renderBanner}
                        keyExtractor={(item) => item.id.toString()}
                        horizontal
                        pagingEnabled
                        showsHorizontalScrollIndicator={false}
                    />
                </View>

                {saleProducts.length > 0 && (
                    <View style={styles.saleSection}>
                        <View style={styles.saleSectionHeader}>
                            <View style={styles.saleSectionTitleContainer}>
                                <Ionicons name="flash" size={24} color="#fff" />
                                <Text style={styles.saleSectionTitle}>FLASH SALE</Text>
                            </View>
                            <TouchableOpacity
                                onPress={() => navigation.navigate("ProductList", { isSale: true, title: "Flash Sale" })}
                            >
                                <Text style={styles.sectionViewAll}>Xem tất cả</Text>
                            </TouchableOpacity>
                        </View>
                        <FlatList
                            data={saleProducts}
                            renderItem={renderSaleProductItem}
                            keyExtractor={(item) => item.id.toString()}
                            horizontal
                            showsHorizontalScrollIndicator={false}
                        />
                    </View>
                )}

                <View style={styles.productsSection}>
                    <View style={styles.sectionHeader}>
                        <Text style={styles.sectionTitle}>Sản phẩm bán chạy</Text>
                        <TouchableOpacity
                            onPress={() => navigation.navigate("ProductList", { isHot: true, title: "Sản phẩm nổi bật" })}
                        >
                            <Text style={styles.sectionViewAll}>Xem tất cả</Text>
                        </TouchableOpacity>
                    </View>
                    <FlatList
                        data={hotProducts}
                        renderItem={renderProductItem}
                        keyExtractor={(item) => item.id.toString()}
                        horizontal
                        showsHorizontalScrollIndicator={false}
                    />
                </View>

                {/* <View style={styles.productsSection}>
                    <View style={styles.sectionHeader}>
                        <Text style={styles.sectionTitle}>Sản phẩm mới</Text>
                        <TouchableOpacity
                            onPress={() => navigation.navigate("ProductList", { isNew: true, title: "Sản phẩm mới" })}
                        >
                            <Text style={styles.sectionViewAll}>Xem tất cả</Text>
                        </TouchableOpacity>
                    </View>
                    <FlatList
                        data={newProducts}
                        renderItem={renderProductItem}
                        keyExtractor={(item) => item.id.toString()}
                        horizontal
                        showsHorizontalScrollIndicator={false}
                    />
                </View> */}

                <View style={styles.productsSection}>
                    <View style={styles.sectionHeader}>
                        <Text style={styles.sectionTitle}>Tất cả sản phẩm</Text>
                        <TouchableOpacity
                            onPress={() => navigation.navigate("ProductList", { title: "Tất cả sản phẩm" })}
                        >
                            <Text style={styles.sectionViewAll}>Xem tất cả</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.productsGrid}>
                        {products.slice(0, 8).map((product) => (
                            <View key={product.id} style={styles.productGridItem}>
                                {renderProductItem({ item: product })}
                            </View>
                        ))}
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

export default HomeScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#f5f5f5",
    },
    loadingContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#f5f5f5",
    },
    loadingText: {
        marginTop: 10,
        fontSize: 16,
        color: "#666",
    },
    header: {
        flexDirection: "row",
        alignItems: "center",
        padding: 10,
        backgroundColor: "#fff",
        borderBottomWidth: 1,
        borderBottomColor: "#eee",
    },
    logo: {
        width: 100,
        height: 30,
    },
    searchContainer: {
        flex: 1,
        marginHorizontal: 10,
    },
    searchInputContainer: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#f5f5f5",
        borderRadius: 5,
        paddingHorizontal: 10,
    },
    searchIcon: {
        marginRight: 5,
    },
    searchInput: {
        flex: 1,
        height: 36,
        fontSize: 14,
    },
    cartButton: {
        position: "relative",
        padding: 5,
    },
    cartBadge: {
        position: "absolute",
        top: 0,
        right: 0,
        backgroundColor: "#e30019",
        borderRadius: 10,
        width: 16,
        height: 16,
        justifyContent: "center",
        alignItems: "center",
    },
    cartBadgeText: {
        color: "#fff",
        fontSize: 10,
        fontWeight: "bold",
    },
    categoriesContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 5,
        backgroundColor: "#d70018",
        flex: 1
    },
    categoryItem: {
        marginRight: 40,
        paddingTop: 5,
        paddingBottom: 5,
        width: 60,
        height: 40,
        flexDirection: 'row',
        alignItems: 'center',
    },
    categoryImage: {
        width: '100%',
        height: '100%',
        opacity: 0.5,
    },
    categoryName: {
        fontSize: 12,
        fontWeight: 'bold',
        color: '#FFF',
    },
    bannersContainer: {
        height: 150,
    },
    bannerImage: {
        width: width,
        height: 150,
    },
    saleSection: {
        backgroundColor: "#e30019",
        marginTop: 10,
        paddingBottom: 15,
    },
    saleSectionHeader: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        padding: 10,
    },
    saleSectionTitleContainer: {
        flexDirection: "row",
        alignItems: "center",
    },
    saleSectionTitle: {
        color: "#fff",
        fontSize: 18,
        fontWeight: "bold",
        marginLeft: 5,
    },
    saleProductItem: {
        backgroundColor: "#fff",
        borderRadius: 10,
        width: 200,
        marginLeft: 10,
        marginRight: 5,
        overflow: "hidden",
    },
    saleProductImageContainer: {
        position: "relative",
        height: 150,
        backgroundColor: "#f9f9f9",
    },
    saleProductImage: {
        width: "100%",
        height: "100%",
    },
    saleProductBadge: {
        position: "absolute",
        top: 10,
        left: 10,
        backgroundColor: "#e30019",
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 3,
    },
    saleProductBadgeText: {
        color: "#fff",
        fontWeight: "bold",
        fontSize: 12,
    },
    saleProductInfo: {
        padding: 10,
    },
    saleProductName: {
        fontSize: 14,
        fontWeight: "bold",
        marginBottom: 5,
        height: 40,
    },
    saleProductPrices: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 5,
    },
    saleProductPrice: {
        fontSize: 14,
        fontWeight: "bold",
        color: "#e30019",
        marginRight: 5,
    },
    saleProductOriginalPrice: {
        fontSize: 12,
        color: "#999",
        textDecorationLine: "line-through",
    },
    saleProductProgress: {
        height: 15,
        backgroundColor: "rgba(0, 0, 0, 0.1)",
        borderRadius: 7.5,
        marginBottom: 5,
        overflow: "hidden",
        position: "relative",
    },
    saleProductProgressBar: {
        position: "absolute",
        top: 0,
        left: 0,
        height: "100%",
        backgroundColor: "#ffcc00",
    },
    saleProductProgressText: {
        position: "absolute",
        width: "100%",
        textAlign: "center",
        fontSize: 10,
        fontWeight: "bold",
        color: "#000",
        lineHeight: 15,
    },
    saleProductCountdown: {
        marginTop: 5,
    },
    saleProductCountdownLabel: {
        fontSize: 12,
        color: "#666",
        marginBottom: 2,
    },
    productsSection: {
        marginTop: 15,
        backgroundColor: "#fff",
        padding: 10,
    },
    sectionHeader: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 10,
    },
    sectionTitle: {
        fontSize: 16,
        fontWeight: "bold",
    },
    sectionViewAll: {
        color: "#e30019",
        fontSize: 14,
    },
    productItem: {
        width: 180,
        overflow: 'hidden',
        backgroundColor: "#fff",
        borderRadius: 10,
        padding: 10,
        marginRight: 10,
        borderWidth: 1,
        borderColor: "#eee",
    },
    productImage: {
        width: "100%",
        height: 120,
        marginBottom: 10,
    },
    hotBadge: {
        position: "absolute",
        top: 5,
        right: 5,
        backgroundColor: "#e30019",
        borderRadius: 10,
        width: 20,
        height: 20,
        justifyContent: "center",
        alignItems: "center",
    },
    newBadge: {
        backgroundColor: "#00a65a",
        width: "auto",
        paddingHorizontal: 5,
    },
    newBadgeText: {
        color: "#fff",
        fontSize: 10,
        fontWeight: "bold",
    },
    discountBadge: {
        position: "absolute",
        top: 5,
        left: 5,
        backgroundColor: "#ff9800",
        borderRadius: 10,
        paddingHorizontal: 5,
        height: 20,
        justifyContent: "center",
        alignItems: "center",
    },
    discountText: {
        color: "#fff",
        fontSize: 10,
        fontWeight: "bold",
    },
    productName: {
        fontSize: 14,
        fontWeight: "bold",
        marginBottom: 5,
        height: 40,
    },
    priceContainer: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 5,
    },
    productPrice: {
        fontSize: 14,
        color: "#e30019",
        fontWeight: "bold",
        marginRight: 5,
    },
    originalPrice: {
        fontSize: 12,
        color: "#999",
        textDecorationLine: "line-through",
    },
    productActions: {
        flexDirection: "row",
        alignItems: "center",
    },
    addToCartButton: {
        flex: 1,
        backgroundColor: "#e30019",
        borderRadius: 5,
        padding: 5,
        alignItems: "center",
        marginRight: 5,
    },
    addToCartText: {
        color: "#fff",
        fontSize: 12,
        fontWeight: "bold",
    },
    wishlistButton: {
        width: 30,
        height: 30,
        justifyContent: "center",
        alignItems: "center",
        borderWidth: 1,
        borderColor: "#eee",
        borderRadius: 15,
    },
    productsGrid: {
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "space-between",
    },
    productGridItem: {
        width: "50%",
        marginBottom: 10,
    },
})