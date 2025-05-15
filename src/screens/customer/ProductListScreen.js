
import { View, FlatList, ActivityIndicator, RefreshControl, Text, TouchableOpacity } from "react-native";
import styles from "../../styles/ProductListStyles";
import FilterBar from "@components/list/FilterBar";
import FiltersContainer from "@components/list/FiltersContainer";
import GridItem from "@components/list/GridItem";
import ListItem from "@components/list/ListItem";
import EmptyState from "@components/list/EmptyState";
import { useState, useEffect } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useActionSheet } from "@expo/react-native-action-sheet";
import { useWishlist } from "@contexts/WishlistContext";
import { useCart } from "@contexts/CartContext";
import { SafeAreaView } from "react-native-safe-area-context";
import { GET_ALL, GET_ALL_PAGE } from 'api/apiService';

export default function ProductListScreen() {
    const navigation = useNavigation();
    const route = useRoute();
    const { addToCart } = useCart();
    const { addToWishlist, isInWishlist } = useWishlist();
    const { showActionSheetWithOptions } = useActionSheet();
    const { subcategory, isHot, isNew } = route.params || {};

    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [brands, setBrands] = useState([]);
    const [loading, setLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);
    const [sortBy, setSortBy] = useState("default");
    const [showFilters, setShowFilters] = useState(false);
    const [priceRange, setPriceRange] = useState({ min: 0, max: 50000000 });
    const [selectedPriceRange, setSelectedPriceRange] = useState(null);
    const [selectedBrands, setSelectedBrands] = useState([]);
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [viewMode, setViewMode] = useState("grid");
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [limit, setLimit] = useState(6);

    useEffect(() => {
        fetchProducts(page);
    }, [page, limit, subcategory, isHot, isNew]);

    const fetchProducts = async (pageNumber) => {
        try {
            setLoading(true);
            const params = { page: pageNumber, limit };

            const categoriesResponse = await GET_ALL("categories");
            if (categoriesResponse.status === 200) {
                setCategories(categoriesResponse.data.data);
            }

            const brandsResponse = await GET_ALL("brands");
            if (brandsResponse.status === 200) {
                setBrands(brandsResponse.data.data);
            }

            // Fetch products from /public/products/colors
            const response = await GET_ALL_PAGE("products/colors", params);

            if (response.status === 200) {
                const { content, pageNumber, pageSize, totalPages, totalElements } = response.data.data;
                const formattedProducts = content.map(product => ({
                    id: product.colorId, // Use variantId (colorId) as the id
                    productId: product.productId,
                    variantId: product.colorId,
                    name: `${product.name} ${product.storage || ""} ${product.color || ""}`.trim(),
                    price: product.price === 0 ? product.originalPrice : product.price,
                    originalPrice: product.originalPrice,
                    image: product.image || (product.images.find(img => img !== "string") || "https://via.placeholder.com/120"),
                    stock: product.stock,
                    discount: product.discount === 100 ? null : product.discount,
                    brand: product.brand,
                    categories: product.categories,
                    color: product.color,
                    storage: product.storage,
                    maxQuantity: product.stock
                }));
                setProducts(formattedProducts);
                setPage(pageNumber);
                setTotalPages(totalPages);
                setLimit(pageSize); // Update limit based on API response
            }
        } catch (error) {
            console.error("Error fetching products:", error);
        } finally {
            setLoading(false);
            setRefreshing(false);
        }
    };

    const onRefresh = () => {
        setRefreshing(true);
        setPage(1);
        fetchProducts(1);
    };

    const openSortOptions = () => {
        const options = ["Mặc định", "Giá tăng dần", "Giá giảm dần", "Tên A-Z", "Tên Z-A", "Hủy"];
        const cancelButtonIndex = 5;
        showActionSheetWithOptions(
            { options, cancelButtonIndex },
            (buttonIndex) => {
                if (buttonIndex === cancelButtonIndex) return;
                let sortType;
                switch (buttonIndex) {
                    case 0: sortType = "default"; break;
                    case 1: sortType = "price-asc"; break;
                    case 2: sortType = "price-desc"; break;
                    case 3: sortType = "name-asc"; break;
                    case 4: sortType = "name-desc"; break;
                    default: sortType = "default";
                }
                setSortBy(sortType);
            }
        );
    };

    const sortProducts = (products) => {
        switch (sortBy) {
            case "price-asc":
                return [...products].sort((a, b) => a.price - b.price);
            case "price-desc":
                return [...products].sort((a, b) => b.price - a.price);
            case "name-asc":
                return [...products].sort((a, b) => a.name.localeCompare(b.name));
            case "name-desc":
                return [...products].sort((a, b) => b.name.localeCompare(a.name));
            default:
                return products;
        }
    };

    const filterProducts = (products) => {
        return products.filter((product) => {
            const isPriceInRange = product.price >= priceRange.min && product.price <= priceRange.max;
            const isBrandSelected =
                selectedBrands.length === 0 || selectedBrands.includes(product.brand?.name);
            const isCategorySelected =
                selectedCategories.length === 0 ||
                product.categories.some((cat) => selectedCategories.includes(cat.name));
            return isPriceInRange && isBrandSelected && isCategorySelected;
        });
    };

    const getFilteredAndSortedProducts = () => {
        const filtered = filterProducts(products);
        return sortProducts(filtered);
    };

    const navigateToProductDetail = (product) => {
        navigation.navigate("ProductDetail", {
            productId: product.productId,
            variantId: product.variantId,
        });
    };

    const formatPrice = (price) => {
        return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".") + "đ";
    };

    const goToPreviousPage = () => {
        if (page > 1) {
            setPage(page - 1);
        }
    };

    const goToNextPage = () => {
        if (page < totalPages) {
            setPage(page + 1);
        }
    };

    const changeLimit = (newLimit) => {
        setLimit(newLimit);
        setPage(1);
    };

    if (loading && !refreshing) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#e30019" />
                <Text style={styles.loadingText}>Đang tải sản phẩm...</Text>
            </View>
        );
    }

    return (
        <SafeAreaView style={styles.container}>
            <FilterBar
                showFilters={showFilters}
                setShowFilters={setShowFilters}
                sortBy={sortBy}
                openSortOptions={openSortOptions}
                viewMode={viewMode}
                setViewMode={setViewMode}
            />
            <FiltersContainer
                showFilters={showFilters}
                setShowFilters={setShowFilters}
                priceRange={priceRange}
                setPriceRange={setPriceRange}
                selectedPriceRange={selectedPriceRange}
                setSelectedPriceRange={setSelectedPriceRange}
                selectedBrands={selectedBrands}
                setSelectedBrands={setSelectedBrands}
                selectedCategories={selectedCategories}
                setSelectedCategories={setSelectedCategories}
                categories={categories}
                brands={brands}
            />
            <View style={styles.limitSelector}>
                <Text style={styles.limitLabel}>Số sản phẩm mỗi trang:</Text>
                {[6, 10, 20].map((value) => (
                    <TouchableOpacity
                        key={value}
                        style={[styles.limitButton, limit === value && styles.activeLimitButton]}
                        onPress={() => changeLimit(value)}
                    >
                        <Text style={styles.limitText}>{value}</Text>
                    </TouchableOpacity>
                ))}
            </View>
            <FlatList
                data={getFilteredAndSortedProducts()}
                renderItem={({ item }) =>
                    viewMode === "grid" ? (
                        <GridItem
                            item={item}
                            navigateToProductDetail={navigateToProductDetail}
                            formatPrice={formatPrice}
                            addToCart={addToCart}
                            addToWishlist={addToWishlist}
                            isInWishlist={isInWishlist}
                        />
                    ) : (
                        <ListItem
                            item={item}
                            navigateToProductDetail={navigateToProductDetail}
                            formatPrice={formatPrice}
                            addToCart={addToCart}
                            addToWishlist={addToWishlist}
                            isInWishlist={isInWishlist}
                        />
                    )
                }
                keyExtractor={(item) => item.id}
                numColumns={viewMode === "grid" ? 2 : 1}
                key={viewMode}
                contentContainerStyle={styles.productsList}
                ListEmptyComponent={<EmptyState />}
                refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} colors={["#e30019"]} />}
            />
            <View style={styles.paginationContainer}>
                <TouchableOpacity
                    style={[styles.paginationButton, page === 1 && styles.disabledButton]}
                    onPress={goToPreviousPage}
                    disabled={page === 1}
                >
                    <Text style={styles.paginationText}>Trang trước</Text>
                </TouchableOpacity>
                <Text style={styles.pageInfo}>Trang {page} / {totalPages}</Text>
                <TouchableOpacity
                    style={[styles.paginationButton, page === totalPages && styles.disabledButton]}
                    onPress={goToNextPage}
                    disabled={page === totalPages}
                >
                    <Text style={styles.paginationText}>Trang sau</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}