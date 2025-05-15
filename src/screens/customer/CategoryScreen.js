import { ScrollView, View, Text } from 'react-native'
import { useEffect, useState } from "react"
import CategorySidebar from '@components/category/CategorySidebar'
import DeviceModelsSection from '@components/category/DeviceModelsSection'
import PriceRangesSection from '@components/category/PriceRangesSection'
import styles from "../../styles/CategoryStyles"
import { ActivityIndicator } from 'react-native';
import { useNavigation } from "@react-navigation/native"
import { GET_ALL } from 'api/apiService'
import { SafeAreaView } from "react-native-safe-area-context"

const CategoryScreen = () => {

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
            // // Fetch categories
            const categoriesResponse = await GET_ALL("categories")
            if (categoriesResponse.status === 200) {
                const priceRanges = [
                    { id: "1", name: "Dưới 10 triệu" },
                    { id: "2", name: "10 - 20 triệu" },
                    { id: "3", name: "Trên 20 triệu" },
                ]
                const updatedCategories = categoriesResponse.data.data.map(category => ({
                    ...category,
                    priceRanges: priceRanges
                }))

                setCategories(updatedCategories)
                setSelectedCategory(updatedCategories[0])
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
            category: category.id,
            title: subcategory
                ? subcategory.id
                : priceRange
                    ? `${category.id} ${priceRange.name}`
                    : category.id,
        }

        if (subcategory) {
            params.subcategory = subcategory.id
        }

        if (priceRange) {
            params.priceRange = priceRange.name
        }

        navigation.navigate("ProductList", params)
    }




    if (loading && !refreshing) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#e30019" />
                <Text style={styles.loadingText}>Đang tải dữ liệu...</Text>
            </View>
        )
    }

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.content}>
                <CategorySidebar
                    categories={categories}
                    selectedCategory={selectedCategory}
                    setSelectedCategory={setSelectedCategory}
                />
                <ScrollView style={styles.subcategoriesContainer}>
                    <DeviceModelsSection
                        selectedCategory={selectedCategory}
                        navigateToProductList={navigateToProductList}
                    />
                    <PriceRangesSection
                        selectedCategory={selectedCategory}
                        navigateToProductList={navigateToProductList}
                    />
                </ScrollView>
            </View>
        </SafeAreaView>
    )


}

export default CategoryScreen

