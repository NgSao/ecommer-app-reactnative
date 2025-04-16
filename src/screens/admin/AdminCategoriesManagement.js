import { View, TouchableOpacity, Text, FlatList, ActivityIndicator, RefreshControl, SafeAreaView } from "react-native"
import { Ionicons } from "@expo/vector-icons"

import styles from "../../styles/AdminCategoriesManagementStyles"
import useCategoriesManagement from "@hooks/useCategoriesManagement"
import EmptyState from "@components/admin/category/EmptyState"
import CategoryItem from "@components/admin/category/CategoryItem"
import CategoryModal from "@components/admin/category/CategoryModal"
import SearchBar from "@components/admin/category/SearchBar"



const AdminCategoriesManagement = () => {
    const {
        navigation,
        categories,
        loading,
        refreshing,
        searchQuery,
        setSearchQuery,
        filteredCategories,
        modalVisible,
        setModalVisible,
        editingCategory,
        categoryName,
        setCategoryName,
        categoryImage,
        setCategoryImage,
        categoryParent,
        setCategoryParent,
        savingCategory,
        onRefresh,
        loadMore,
        hasMore,
        sortBy,
        sortOrder,
        handleSort,
        handleAddCategory,
        handleEditCategory,
        handleDeleteCategory,
        handleViewProducts,
        pickImage,
        saveCategory,
        handleSelectParentCategory,
    } = useCategoriesManagement()

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
                    <Ionicons name="arrow-back" size={24} color="#333" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Quản lý danh mục</Text>
                <TouchableOpacity style={styles.addButton} onPress={handleAddCategory}>
                    <Ionicons name="add" size={24} color="#fff" />
                </TouchableOpacity>
            </View>

            <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />

            <View style={styles.sortContainer}>
                <TouchableOpacity onPress={() => handleSort("name")}>
                    <Text style={styles.sortButton}>Sort theo tên ({sortOrder})</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => handleSort("productCount")}>
                    <Text style={styles.sortButton}>Sort theo sản phẩm ({sortOrder})</Text>
                </TouchableOpacity>
            </View>

            {loading && !refreshing ? (
                <View style={styles.loadingContainer}>
                    <ActivityIndicator size="large" color="#e30019" />
                    <Text style={styles.loadingText}>Đang tải danh mục...</Text>
                </View>
            ) : (
                <>
                    {filteredCategories.length === 0 ? (
                        <EmptyState searchQuery={searchQuery} onAdd={handleAddCategory} />
                    ) : (
                        <FlatList
                            data={filteredCategories}
                            renderItem={({ item }) => (
                                <CategoryItem
                                    item={item}
                                    onEdit={handleEditCategory}
                                    onDelete={handleDeleteCategory}
                                    onViewProducts={handleViewProducts}
                                />
                            )}
                            keyExtractor={(item) => item.id.toString()}
                            contentContainerStyle={styles.listContainer}
                            refreshControl={
                                <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                            }
                            onEndReached={loadMore}
                            onEndReachedThreshold={0.5}
                            ListFooterComponent={
                                loading && hasMore ? (
                                    <ActivityIndicator size="small" color="#e30019" />
                                ) : null
                            }
                        />
                    )}
                </>
            )}

            <CategoryModal
                visible={modalVisible}
                onClose={() => setModalVisible(false)}
                editingCategory={editingCategory}
                categoryName={categoryName}
                setCategoryName={setCategoryName}
                categoryImage={categoryImage}
                pickImage={pickImage}
                categoryParent={categoryParent}
                categories={categories}
                handleSelectParentCategory={handleSelectParentCategory}
                saveCategory={saveCategory}
                savingCategory={savingCategory}
            />
        </SafeAreaView>
    )
}

export default AdminCategoriesManagement