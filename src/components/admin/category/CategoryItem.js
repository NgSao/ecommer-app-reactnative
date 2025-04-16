import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native"
import { Ionicons } from "@expo/vector-icons"

const CategoryItem = ({ item, onEdit, onDelete, onViewProducts }) => {
    return (
        <View style={styles.categoryItem}>
            <Image
                source={{ uri: item.image || "https://placeholder.com/100x100?text=No+Image" }}
                style={styles.categoryImage}
            />
            <View style={styles.categoryInfo}>
                <Text style={styles.categoryName}>{item.name}</Text>
                {item.parentName && (
                    <Text style={styles.parentCategory}>Thuộc: {item.parentName}</Text>
                )}
                <Text style={styles.productCount}>{item.productCount} sản phẩm</Text>
            </View>
            <View style={styles.categoryActions}>
                <TouchableOpacity style={styles.actionButton} onPress={() => onViewProducts(item.id)}>
                    <Ionicons name="eye-outline" size={20} color="#0066cc" />
                </TouchableOpacity>
                <TouchableOpacity style={styles.actionButton} onPress={() => onEdit(item)}>
                    <Ionicons name="create-outline" size={20} color="#0066cc" />
                </TouchableOpacity>
                <TouchableOpacity style={styles.actionButton} onPress={() => onDelete(item.id)}>
                    <Ionicons name="trash-outline" size={20} color="#e30019" />
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    categoryItem: {
        flexDirection: "row",
        backgroundColor: "#fff",
        borderRadius: 10,
        padding: 15,
        marginBottom: 15,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    categoryImage: {
        width: 60,
        height: 60,
        borderRadius: 8,
        marginRight: 15,
    },
    categoryInfo: {
        flex: 1,
    },
    categoryName: {
        fontSize: 16,
        fontWeight: "bold",
        color: "#333",
        marginBottom: 5,
    },
    parentCategory: {
        fontSize: 14,
        color: "#666",
        marginBottom: 5,
    },
    productCount: {
        fontSize: 14,
        color: "#0066cc",
    },
    categoryActions: {
        flexDirection: "row",
        justifyContent: "space-around",
        paddingLeft: 10,
    },
    actionButton: {
        padding: 8,
    },
})

export default CategoryItem