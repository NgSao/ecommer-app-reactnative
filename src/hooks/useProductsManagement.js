import { useState, useEffect } from "react"
import { useNavigation } from "@react-navigation/native"
import { Alert } from "react-native"
import * as DocumentPicker from "expo-document-picker"
import { api } from "@service/apiAdmin"

const useProductsManagement = () => {
    const navigation = useNavigation()
    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(true)
    const [refreshing, setRefreshing] = useState(false)
    const [searchQuery, setSearchQuery] = useState("")
    const [filteredProducts, setFilteredProducts] = useState([])
    const [importLoading, setImportLoading] = useState(false)

    useEffect(() => {
        fetchProducts()
    }, [])

    useEffect(() => {
        if (searchQuery.trim() === "") {
            setFilteredProducts(products)
        } else {
            const filtered = products.filter((product) => {
                const name = product.name ? product.name.toLowerCase() : ""
                const category = product.category ? product.category.toLowerCase() : ""
                const id = product.id?.toString() || ""

                return (
                    name.includes(searchQuery.toLowerCase()) ||
                    id.includes(searchQuery) ||
                    category.includes(searchQuery.toLowerCase())
                )
            })
            setFilteredProducts(filtered)
        }
    }, [searchQuery, products])

    const fetchProducts = async () => {
        setLoading(true)
        try {
            const response = await api.admin.getProducts()
            if (response.success) {
                setProducts(response.data)
                setFilteredProducts(response.data)
            } else {
                Alert.alert("Lỗi", "Không thể tải danh sách sản phẩm")
            }
        } catch (error) {
            console.error("Error fetching products:", error)
            Alert.alert("Lỗi", "Đã xảy ra lỗi khi tải danh sách sản phẩm")
        } finally {
            setLoading(false)
            setRefreshing(false)
        }
    }

    const onRefresh = () => {
        setRefreshing(true)
        fetchProducts()
    }

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
                        try {
                            const response = await api.admin.deleteProduct(productId)
                            if (response.success) {
                                const updatedProducts = products.filter((product) => product.id !== productId)
                                setProducts(updatedProducts)
                                setFilteredProducts(updatedProducts)
                                Alert.alert("Thành công", "Đã xóa sản phẩm")
                            } else {
                                Alert.alert("Lỗi", response.error || "Không thể xóa sản phẩm")
                            }
                        } catch (error) {
                            console.error("Error deleting product:", error)
                            Alert.alert("Lỗi", "Đã xảy ra lỗi khi xóa sản phẩm")
                        }
                    },
                },
            ],
            { cancelable: true },
        )
    }

    const handleImportProducts = async () => {
        try {
            setImportLoading(true)
            const result = await DocumentPicker.getDocumentAsync({
                type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
                copyToCacheDirectory: true,
            })

            if (result.canceled) {
                setImportLoading(false)
                return
            }

            const fileUri = result.assets[0].uri
            const response = await api.admin.importProductsFromExcel(fileUri)

            if (response.success) {
                Alert.alert("Thành công", `Đã nhập ${response.data.importedCount} sản phẩm thành công`)
                fetchProducts()
            } else {
                Alert.alert("Lỗi", response.error || "Không thể nhập sản phẩm từ file Excel")
            }
        } catch (error) {
            console.error("Error importing products:", error)
            Alert.alert("Lỗi", "Đã xảy ra lỗi khi nhập sản phẩm từ file Excel")
        } finally {
            setImportLoading(false)
        }
    }

    const navigateToEditProduct = (productId) => {
        navigation.navigate("AdminEditProduct", { productId })
    }

    const navigateToAddProduct = () => {
        navigation.navigate("AdminAddProduct")
    }

    const navigateBack = () => {
        navigation.goBack()
    }

    return {
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
    }
}

export default useProductsManagement