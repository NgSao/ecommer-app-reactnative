import { View, FlatList, ActivityIndicator, Text, SafeAreaView } from "react-native"

import styles from "../../styles/SearchStyles"
import useSearch from "@hooks/useSearch"
import SearchBar from "@components/search/SearchBar"
import ProductItem from "@components/search/ProductItem"
import RecentSearches from "@components/search/RecentSearches"
import PopularSearches from './../../components/search/PopularSearches';

export default function SearchScreen() {
    const {
        searchQuery,
        setSearchQuery,
        searchResults,
        loading,
        recentSearches,
        handleSearch,
        clearSearch,
        useRecentSearch,
        clearRecentSearches,
        navigateToProductDetail,
        formatPrice,
        addToCart,
    } = useSearch()

    return (
        <SafeAreaView style={styles.container}>
            <SearchBar
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
                handleSearch={handleSearch}
                clearSearch={clearSearch}
            />
            {loading ? (
                <View style={styles.loadingContainer}>
                    <ActivityIndicator size="large" color="#e30019" />
                    <Text style={styles.loadingText}>Đang tìm kiếm...</Text>
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
                    <PopularSearches useRecentSearch={useRecentSearch} />
                </>
            )}
        </SafeAreaView>
    )
}