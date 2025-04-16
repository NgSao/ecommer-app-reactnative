import { useState, useEffect, useCallback } from "react"
import { useNavigation, useRoute } from "@react-navigation/native"
import { useCart } from "@contexts/CartContext"
import { api } from "@service/api"
const initialRecentSearches = ["iPhone 16", "MacBook Air", "Apple Watch", "AirPods Pro"]
const useSearch = () => {
    const navigation = useNavigation()
    const route = useRoute()
    const { addToCart } = useCart()

    const [searchQuery, setSearchQuery] = useState(route.params?.query || "")
    const [searchResults, setSearchResults] = useState([])
    const [loading, setLoading] = useState(false)
    const [recentSearches, setRecentSearches] = useState(initialRecentSearches)

    useEffect(() => {
        if (route.params?.query) {
            handleSearch()
        }
    }, [route.params?.query])

    const handleSearch = async () => {
        if (!searchQuery.trim()) return

        try {
            setLoading(true)
            const response = await api.searchProducts(searchQuery)
            if (response.success) {
                setSearchResults(response.data)
                if (!recentSearches.includes(searchQuery)) {
                    setRecentSearches((prev) => [searchQuery, ...prev].slice(0, 5))
                }
            }
        } catch (error) {
            console.error("Search error:", error)
        } finally {
            setLoading(false)
        }
    }

    const clearSearch = () => {
        setSearchQuery("")
        setSearchResults([])
    }

    const useRecentSearch = useCallback(
        (query) => {
            setSearchQuery(query)
            setTimeout(() => handleSearch(), 100)
        },
        [handleSearch],
    )

    const clearRecentSearches = () => {
        setRecentSearches([])
    }

    const navigateToProductDetail = (product) => {
        navigation.navigate("ProductDetail", { productId: product.id })
    }

    const formatPrice = (price) => {
        return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".") + "đ"
    }

    return {
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
    }
}

export default useSearch