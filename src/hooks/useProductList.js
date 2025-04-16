import { useState, useEffect } from "react"
import { useNavigation, useRoute } from "@react-navigation/native"
import { useActionSheet } from "@expo/react-native-action-sheet"
import { api } from '@service/api';
import { useWishlist } from "@contexts/WishlistContext";
import { useCart } from "@contexts/CartContext";

const useProductList = () => {
    const navigation = useNavigation()
    const route = useRoute()
    const { addToCart } = useCart()
    const { addToWishlist, isInWishlist } = useWishlist()
    const { showActionSheetWithOptions } = useActionSheet()

    const { category, subcategory, isHot, isNew } = route.params || {}

    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(true)
    const [refreshing, setRefreshing] = useState(false)
    const [sortBy, setSortBy] = useState("default")
    const [showFilters, setShowFilters] = useState(false)
    const [priceRange, setPriceRange] = useState({ min: 0, max: 50000000 })
    const [selectedPriceRange, setSelectedPriceRange] = useState(null)
    const [selectedBrands, setSelectedBrands] = useState([])
    const [viewMode, setViewMode] = useState("grid")

    useEffect(() => {
        fetchProducts()
    }, [category, subcategory, isHot, isNew])

    const fetchProducts = async () => {
        try {
            setLoading(true)
            let response
            if (category) {
                response = await api.getProductsByCategory(category, subcategory)
            } else {
                response = await api.getProducts()
                if (response.success) {
                    let filteredProducts = response.data
                    if (isHot) {
                        filteredProducts = filteredProducts.filter((p) => p.isHot)
                    }
                    if (isNew) {
                        filteredProducts = filteredProducts.filter((p) => p.isNew)
                    }
                    response.data = filteredProducts
                }
            }
            if (response.success) {
                setProducts(response.data)
            }
        } catch (error) {
            console.error("Error fetching products:", error)
        } finally {
            setLoading(false)
            setRefreshing(false)
        }
    }

    const onRefresh = () => {
        setRefreshing(true)
        fetchProducts()
    }

    const openSortOptions = () => {
        const options = ["Mặc định", "Giá tăng dần", "Giá giảm dần", "Tên A-Z", "Tên Z-A", "Hủy"]
        const cancelButtonIndex = 5
        showActionSheetWithOptions(
            { options, cancelButtonIndex },
            (buttonIndex) => {
                if (buttonIndex === cancelButtonIndex) return
                let sortType
                switch (buttonIndex) {
                    case 0:
                        sortType = "default"
                        break
                    case 1:
                        sortType = "price-asc"
                        break
                    case 2:
                        sortType = "price-desc"
                        break
                    case 3:
                        sortType = "name-asc"
                        break
                    case 4:
                        sortType = "name-desc"
                        break
                    default:
                        sortType = "default"
                }
                setSortBy(sortType)
            }
        )
    }

    const sortProducts = (products) => {
        switch (sortBy) {
            case "price-asc":
                return [...products].sort((a, b) => a.price - b.price)
            case "price-desc":
                return [...products].sort((a, b) => b.price - a.price)
            case "name-asc":
                return [...products].sort((a, b) => a.name.localeCompare(b.name))
            case "name-desc":
                return [...products].sort((a, b) => b.name.localeCompare(a.name))
            default:
                return products
        }
    }

    const filterProducts = (products) => {
        return products.filter((product) => {
            const isPriceInRange = product.price >= priceRange.min && product.price <= priceRange.max
            const isBrandSelected = selectedBrands.length === 0 || selectedBrands.includes(product.brand)
            return isPriceInRange && isBrandSelected
        })
    }

    const getFilteredAndSortedProducts = () => {
        const filtered = filterProducts(products)
        return sortProducts(filtered)
    }

    const navigateToProductDetail = (product) => {
        navigation.navigate("ProductDetail", { productId: product.id })
    }

    const formatPrice = (price) => {
        return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".") + "đ"
    }

    return {
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
    }
}

export default useProductList