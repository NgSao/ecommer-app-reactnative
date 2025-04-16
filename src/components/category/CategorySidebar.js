import { FlatList, TouchableOpacity, Text, View, StyleSheet } from "react-native"
import { Ionicons } from "@expo/vector-icons"

const CategorySidebar = ({ categories, selectedCategory, setSelectedCategory }) => {
    const renderCategoryItem = ({ item }) => (
        <TouchableOpacity
            style={[
                styles.categoryItem,
                { backgroundColor: item.color },
                selectedCategory.id === item.id && styles.selectedCategoryItem,
            ]}
            onPress={() => setSelectedCategory(item)}
        >
            <Ionicons name={item.icon} size={24} color={selectedCategory.id === item.id ? "#e30019" : "#333"} />
            <Text style={[styles.categoryName, selectedCategory.id === item.id && styles.selectedCategoryName]}>
                {item.name}
            </Text>
        </TouchableOpacity>
    )

    return (
        <View style={styles.categoriesSidebar}>
            <FlatList
                data={categories}
                renderItem={renderCategoryItem}
                keyExtractor={(item) => item.id}
                showsVerticalScrollIndicator={false}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    categoriesSidebar: {
        width: 80,
        backgroundColor: "#f5f5f5",
        paddingBottom: 50,
    },
    categoryItem: {
        alignItems: "center",
        paddingVertical: 15,
        paddingHorizontal: 5,
        borderBottomWidth: 1,
        borderBottomColor: "#eee",
    },
    selectedCategoryItem: {
        backgroundColor: "#fff",
        borderLeftWidth: 3,
        borderLeftColor: "#e30019",
    },
    categoryName: {
        fontSize: 12,
        textAlign: "center",
        marginTop: 5,
    },
    selectedCategoryName: {
        color: "#e30019",
        fontWeight: "bold",
    },
})

export default CategorySidebar