import { View, FlatList, ActivityIndicator, Text, Alert } from "react-native";
import styles from "../../styles/SearchStyles";
import SearchBar from "@components/search/SearchBar";
import ProductItem from "@components/search/ProductItem";
import RecentSearches from "@components/search/RecentSearches";
import { useState, useEffect, useCallback } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useCart } from "@contexts/CartContext";
import { GET_SEARCH } from "api/apiService";
import { SafeAreaView } from "react-native-safe-area-context"

export default function SearchScreen() {
    const navigation = useNavigation();
    const route = useRoute();
    const { addToCart } = useCart();

    const [searchQuery, setSearchQuery] = useState(route.params?.query || "");
    const [searchResults, setSearchResults] = useState([]);
    const [loading, setLoading] = useState(false);
    const [recentSearches, setRecentSearches] = useState([]);
    const [errorMessage, setErrorMessage] = useState(null);

    useEffect(() => {
        if (route.params?.query) {
            setSearchQuery(route.params.query);
            handleSearch(route.params.query);
        }
    }, [route.params?.query]);

    const flattenProductVariants = (products) => {
        return products.flatMap((product) =>
            product.variants?.length > 0
                ? product.variants.map((variant) => ({
                    id: `${product.id}${variant.id}`,
                    productId: product.id,
                    variantId: variant.id,
                    name: `${product.name}${variant?.storage ? " " + variant.storage : ""}`,
                    price: variant.price === 0 ? variant.originalPrice : variant.price,
                    originalPrice: variant.originalPrice,
                    image: variant.image || (product.images && product.images.length > 0 ? product.images[0] : null),
                    stock: variant.stock,
                    variant: variant,
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
                }]
        );
    };



    const handleSearch = async (query = searchQuery) => {
        if (!query.trim()) return;

        try {
            setLoading(true);
            setErrorMessage(null);
            const response = await GET_SEARCH("products/search", { query: query });
            if (response.status === 200 && response.data.data) {

                const flattenedResults = flattenProductVariants(response.data.data);
                setSearchResults(flattenedResults);
                if (!recentSearches.includes(query)) {
                    setRecentSearches((prev) => [query, ...prev].slice(0, 5));
                }
            } else if (!response.data.data) {
                setSearchResults([]);
                setErrorMessage("No results found");
            }
        } catch (error) {
            setSearchResults([]);
        } finally {
            setLoading(false);
        }
    };

    const clearSearch = () => {
        setSearchQuery("");
        setSearchResults([]);
        setErrorMessage(null);
    };

    const useRecentSearch = useCallback(
        (query) => {
            setSearchQuery(query);
            handleSearch(query);
        },
        []
    );

    const clearRecentSearches = () => {
        setRecentSearches([]);
    };

    const navigateToProductDetail = (product) => {
        navigation.navigate("ProductDetail", { productId: product.productId });
    };

    const formatPrice = (price) => {
        return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".") + "đ";
    };
    return (
        <SafeAreaView style={styles.container}>
            <SearchBar
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
                handleSearch={() => handleSearch(searchQuery)}
                clearSearch={clearSearch}
            />
            {loading ? (
                <View style={styles.loadingContainer}>
                    <ActivityIndicator size="large" color="#e30019" />
                    <Text style={styles.loadingText}>Đang tìm kiếm...</Text>
                </View>
            ) : errorMessage ? (
                <View style={styles.errorContainer}>
                    <Text style={styles.errorText}>{errorMessage}</Text>
                </View>
            ) : searchResults.length > 0 ? (
                <FlatList
                    data={searchResults}
                    renderItem={({ item }) => (
                        <ProductItem
                            item={item}
                            navigateToProductDetail={navigateToProductDetail}
                            formatPrice={formatPrice}
                            addToCart={addToCart}
                        />
                    )}
                    keyExtractor={(item) => item.id}
                    contentContainerStyle={styles.searchResultsContainer}
                />
            ) : (
                <>
                    <RecentSearches
                        recentSearches={recentSearches}
                        useRecentSearch={useRecentSearch}
                        clearRecentSearches={clearRecentSearches}
                    />
                    <View style={styles.noResultsContainer}>

                        <Text style={styles.errorText}>Không có kết quả tìm kiếm</Text>
                    </View>
                </>
            )}
        </SafeAreaView>
    )
}