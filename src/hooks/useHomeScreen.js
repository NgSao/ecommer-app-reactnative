import { useState, useEffect } from "react"
import { useNavigation } from "@react-navigation/native"
import { useCart } from "@contexts/CartContext"
import { useWishlist } from "@contexts/WishlistContext"
import { api } from "@service/api"

const useHomeScreen = () => {
    const navigation = useNavigation()
    const { addToCart } = useCart()
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

    const fetchData = async () => {
        try {
            setLoading(true)

            // Fetch categories
            const categoriesResponse = await api.getCategories()
            if (categoriesResponse.success) {
                setCategories(categoriesResponse.data)
            }

            // Fetch products
            const productsResponse = await api.getProducts()
            if (productsResponse.success) {
                setProducts(productsResponse.data)
                setHotProducts(productsResponse.data.filter((p) => p.isHot))
                setNewProducts(productsResponse.data.filter((p) => p.isNew))
            }

            // Fetch sale products
            const saleResponse = await api.getSaleProducts()
            if (saleResponse.success) {
                setSaleProducts(saleResponse.data)
            }

            // Fetch flash sale products
            const flashSaleResponse = await api.getFlashSaleProducts()
            if (flashSaleResponse.success) {
                setSaleProducts((prev) => [...prev, ...flashSaleResponse.data])
            }

            // Fetch banners
            const bannersResponse = await api.getBanners()
            if (bannersResponse.success) {
                setBanners(bannersResponse.data)
            }
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

    const navigateToProductDetail = (product) => {
        navigation.navigate("ProductDetail", { productId: product.id })
    }

    const navigateToCategory = (category) => {
        navigation.navigate("ProductList", {
            category: category.name,
            title: category.name,
        })
    }

    const handleAddToCart = (product) => {
        if (product.variants && product.variants.length > 0) {
            navigateToProductDetail(product)
            return
        }
        addToCart(product, 1)
    }

    const handleAddToWishlist = (product) => {
        addToWishlist(product)
    }

    const formatPrice = (price) => {
        return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".") + "đ"
    }

    return {
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
    }
}

export default useHomeScreen