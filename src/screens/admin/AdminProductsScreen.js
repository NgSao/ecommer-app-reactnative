import { View, Text, FlatList, ActivityIndicator, RefreshControl, SafeAreaView } from "react-native"

import styles from "../../styles/AdminProductsStyles"
import useProductsManagement from "@hooks/useProductsManagement"
import ProductsHeader from "@components/admin/product/ProductsHeader"
import SearchBar from "@components/admin/product/SearchBar"
import StatsSection from "@components/admin/product/StatsSection"
import EmptyState from "@components/admin/product/EmptyState"
import ProductItem from "@components/admin/product/ProductItem"

const AdminProductsScreen = () => {
    const {
        products,
        loading,
        refreshing,
        searchQuery,
        filteredProducts,
        importLoading,
        setSearchQuery,
        onRefresh,
        handleDeleteProduct,
        handleImportProducts,
        navigateToEditProduct,
        navigateToAddProduct,
        navigateBack,
    } = useProductsManagement()

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
            <ProductsHeader
                onBack={navigateBack}
                onImport={handleImportProducts}
                onAddProduct={navigateToAddProduct}
                importLoading={importLoading}
            />
            <SearchBar
                searchQuery={searchQuery}
                onSearchChange={setSearchQuery}
                onClear={() => setSearchQuery("")}
            />
            <StatsSection
                totalProducts={products.length}
                lowStockCount={products.filter((product) => product.totalStock < 5).length}
                outOfStockCount={products.filter((product) => product.totalStock === 0).length}
            />
            {filteredProducts.length === 0 ? (
                <EmptyState hasSearchQuery={searchQuery.length > 0} onAddProduct={navigateToAddProduct} />
            ) : (
                <FlatList
                    data={filteredProducts}
                    renderItem={({ item }) => (
                        <ProductItem
                            product={item}
                            onEdit={navigateToEditProduct}
                            onDelete={handleDeleteProduct}
                        />
                    )}
                    keyExtractor={(item) => item.id.toString()}
                    contentContainerStyle={styles.listContainer}
                    refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
                />
            )}
        </SafeAreaView>
    )
}


export default AdminProductsScreen

