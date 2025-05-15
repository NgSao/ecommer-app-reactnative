import { View, Text, FlatList, ActivityIndicator, RefreshControl } from "react-native";
import styles from "../../styles/AdminProductsStyles";
import ProductsHeader from "@components/admin/product/ProductsHeader";
import SearchBar from "@components/admin/product/SearchBar";
import StatsSection from "@components/admin/product/StatsSection";
import EmptyState from "@components/admin/product/EmptyState";
import ProductItem from "@components/admin/product/ProductItem";
import { useState, useEffect } from "react";
import { Alert } from "react-native";
import * as DocumentPicker from "expo-document-picker";
import { ADMIN_DELETE_ID, DELETE_ID, GET_ALL } from "api/apiService";
import { SafeAreaView } from "react-native-safe-area-context";
import { useCallback } from "react";
import { useNavigation, useFocusEffect } from "@react-navigation/native";

const AdminProductsScreen = () => {
    const navigation = useNavigation();
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [dataLoading, setDataLoading] = useState(false);
    const [refreshing, setRefreshing] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const [filteredProducts, setFilteredProducts] = useState([]);
    useFocusEffect(
        useCallback(() => {
            fetchProducts();
        }, [])
    );
    useEffect(() => {
        if (searchQuery.trim() === "") {
            setFilteredProducts(products);
        } else {
            const filtered = products.filter((product) => {
                const name = product.name ? product.name.toLowerCase() : "";
                const category = product.categories?.[0]?.name
                    ? product.categories[0].name.toLowerCase()
                    : "";
                const id = product.id?.toString() || "";

                return (
                    name.includes(searchQuery.toLowerCase()) ||
                    id.includes(searchQuery) ||
                    category.includes(searchQuery.toLowerCase())
                );
            });
            setFilteredProducts(filtered);
        }
    }, [searchQuery, products]);

    const fetchProducts = async () => {
        setLoading(true);
        try {
            const response = await GET_ALL("products");
            if (response.status === 200) {
                const productsWithTotalStock = response.data.data.map((product) => {
                    const validImages = product.images?.filter(
                        (img) => img && typeof img === "string" && img.startsWith("http")
                    ) || [];
                    let totalStock;
                    if (product.variants && product.variants.length > 0) {
                        totalStock = product.variants.reduce(
                            (sum, variant) => sum + (variant.stock || 0),
                            0
                        );
                    } else {
                        totalStock = product.stock || 0;
                    }
                    return { ...product, totalStock, images: validImages };
                });
                setProducts(productsWithTotalStock);
                setFilteredProducts(productsWithTotalStock);
            } else {
                Alert.alert("Lỗi", "Không thể tải danh sách sản phẩm");
            }
        } catch (error) {
            console.error("Error fetching products:", error);
            Alert.alert("Lỗi", "Đã xảy ra lỗi khi tải danh sách sản phẩm");
        } finally {
            setLoading(false);
            setRefreshing(false);
            setDataLoading(false);
        }
    };

    const onRefresh = () => {
        setRefreshing(true);
        fetchProducts();
    };

    const handleDeleteProduct = (productId) => {
        Alert.alert(
            "Xác nhận xóa",
            "Bạn có chắc chắn muốn xóa sản phẩm này không?",
            [
                { text: "Hủy", style: "cancel" },
                {
                    text: "Xóa",
                    style: "destructive",
                    onPress: async () => {
                        setDataLoading(true);
                        try {
                            const response = await ADMIN_DELETE_ID("products/delete", productId);
                            if (response.status === 200) {
                                await fetchProducts(); // Callback to refresh data
                                Alert.alert("Thành công", "Đã xóa sản phẩm");
                            } else {
                                Alert.alert("Lỗi", response.error || "Không thể xóa sản phẩm");
                            }
                        } catch (error) {
                            console.error("Error deleting product:", error);
                            Alert.alert("Lỗi", "Đã xảy ra lỗi khi xóa sản phẩm");
                        } finally {
                            setDataLoading(false);
                        }
                    },
                },
            ],
            { cancelable: true }
        );
    };

    const handleImportProducts = async () => {
        try {
            setDataLoading(true);
            const result = await DocumentPicker.getDocumentAsync({
                type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
                copyToCacheDirectory: true,
            });

            if (result.canceled) {
                setDataLoading(false);
                return;
            }

            const fileUri = result.assets[0].uri;
            // const response = await api.admin.importProductsFromExcel(fileUri);

            if (response.success) {
                await fetchProducts(); // Callback to refresh data
                Alert.alert(
                    "Thành công",
                    `Đã nhập ${response.data.importedCount} sản phẩm thành công`
                );
            } else {
                Alert.alert("Lỗi", response.error || "Không thể nhập sản phẩm từ file Excel");
            }
        } catch (error) {
            console.error("Error importing products:", error);
            Alert.alert("Lỗi", "Đã xảy ra lỗi khi nhập sản phẩm từ file Excel");
        } finally {
            setDataLoading(false);
        }
    };

    const navigateToEditProduct = (productId) => {
        navigation.navigate("AdminEditProduct", { productId });
    };

    const navigateToAddProduct = () => {
        navigation.navigate("AdminAddProduct");
    };

    const navigateBack = () => {
        navigation.goBack();
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
            {dataLoading && (
                <View style={styles.loadingOverlay}>
                    <ActivityIndicator size="large" color="#e30019" />
                    <Text style={styles.loadingOverlayText}>Đang xử lý...</Text>
                </View>
            )}
            <ProductsHeader
                onBack={navigateBack}
                onImport={handleImportProducts}
                onAddProduct={navigateToAddProduct}
                importLoading={dataLoading}
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
                <EmptyState
                    hasSearchQuery={searchQuery.length > 0}
                    onAddProduct={navigateToAddProduct}
                />
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
    );
};

export default AdminProductsScreen;