import { SafeAreaView, ScrollView, View, Text } from 'react-native'
import React from 'react'
import CategorySidebar from '@components/category/CategorySidebar'
import DeviceModelsSection from '@components/category/DeviceModelsSection'
import PriceRangesSection from '@components/category/PriceRangesSection'
import styles from "../../styles/CategoryStyles"
import useCategory from '@hooks/useCategory'
import { ActivityIndicator } from 'react-native';

const CategoryScreen = () => {
    const {
        categories,
        selectedCategory,
        loading,
        refreshing,
        setSelectedCategory,
        navigateToProductList,

    } = useCategory()
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

