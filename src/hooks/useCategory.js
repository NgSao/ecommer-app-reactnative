import { useEffect, useState } from "react"
import { useNavigation } from "@react-navigation/native"
import { api } from "@service/api"

const useCategory = () => {
    const navigation = useNavigation()
    const [categories, setCategories] = useState([])
    const [selectedCategory, setSelectedCategory] = useState(null)
    const [loading, setLoading] = useState(true)
    const [refreshing, setRefreshing] = useState(false)

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
                setSelectedCategory(categoriesResponse.data[0])
            }

        } catch (error) {
            console.error("Error fetching home data:", error)
        } finally {
            setLoading(false)
            setRefreshing(false)
        }
    }

    const navigateToProductList = (category, subcategory = null, priceRange = null) => {
        const params = {
            category: category.name,
            title: subcategory
                ? subcategory.name
                : priceRange
                    ? `${category.name} ${priceRange.name}`
                    : category.name,
        }

        if (subcategory) {
            params.subcategory = subcategory.name
        }

        if (priceRange) {
            params.priceRange = priceRange.name
        }

        navigation.navigate("ProductList", params)
    }

    return {
        categories,
        selectedCategory,
        loading,
        refreshing,
        setSelectedCategory,
        navigateToProductList,
    }
}

export default useCategory