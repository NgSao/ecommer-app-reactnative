import { View, FlatList, ActivityIndicator, RefreshControl, Text, SafeAreaView } from "react-native"

import styles from "../../styles/ProductListStyles"
import useProductList from "@hooks/useProductList"
import FilterBar from "@components/list/FilterBar"
import FiltersContainer from "@components/list/FiltersContainer"
import GridItem from "@components/list/GridItem"
import ListItem from "@components/list/ListItem"
import EmptyState from "@components/list/EmptyState"

export default function ProductListScreen() {
    const {
        products,
        loading,
        refreshing,
        sortBy,
        showFilters,
        setShowFilters,
        priceRange,
        setPriceRange,
        selectedPriceRange,
        setSelectedPriceRange,
        selectedBrands,
        setSelectedBrands,
        viewMode,
        setViewMode,
        onRefresh,
        openSortOptions,
        getFilteredAndSortedProducts,
        navigateToProductDetail,
        formatPrice,
        addToCart,
        addToWishlist,
        isInWishlist,
    } = useProductList()

    if (loading && !refreshing) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#e30019" />
                <Text style={styles.loadingText}>Đang tải sản phẩm...</Text>
            </View>
        )
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
            />
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
        </SafeAreaView>
    )
}