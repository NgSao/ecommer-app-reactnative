import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { formatDate } from "@utils/formatUtils";

const BrandItem = ({ item, onEdit, onDelete }) => {
    return (
        <View style={styles.categoryItem}>
            <Image
                source={{ uri: item.imageUrl || "Chưa có ảnh" }}
                style={styles.categoryImage}
            />
            <View style={styles.categoryInfo}>
                <Text style={styles.categoryName}>{item.name}</Text>
                <Text style={styles.slugName}>{item.slug}</Text>
                <Text style={styles.productCount}>Sản phẩm: {item.totalProduct}</Text>
                <Text style={styles.createdInfo}>
                    Created by: {item.createdBy} on{" "}
                    {formatDate(item.createdDate)}
                </Text>
                {item.updatedBy && item.updatedDate && (
                    <Text style={styles.createdInfo}>
                        Updated by: {item.updatedBy} on{" "}
                        {new Date(item.updatedDate).toLocaleDateString()}
                    </Text>
                )}
            </View>
            <View style={styles.categoryActions}>
                <TouchableOpacity
                    style={styles.actionButton}
                    onPress={() => onEdit(item)}
                >
                    <Ionicons name="create-outline" size={20} color="#0066cc" />
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.actionButton}
                    onPress={() => onDelete(item.id)}
                >
                    <Ionicons name="trash-outline" size={20} color="#e30019" />
                </TouchableOpacity>
            </View>
        </View>
    );
};

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
        alignItems: "center",
    },
    categoryImage: {
        width: 60,
        height: 60,
        borderRadius: 8,
        marginRight: 15,
        backgroundColor: "#f0f0f0",
    },
    categoryInfo: {
        flex: 1,
        justifyContent: "center",
    },
    categoryName: {
        fontSize: 18,
        fontWeight: "bold",
        color: "#333",
        marginBottom: 4,
    },
    slugName: {
        fontSize: 14,
        color: "#555",
        marginBottom: 4,
    },
    productCount: {
        fontSize: 14,
        color: "#0066cc",
        marginBottom: 4,
    },
    createdInfo: {
        fontSize: 12,
        color: "#666",
        marginBottom: 2,
    },
    categoryActions: {
        flexDirection: "row",
        alignItems: "center",
        paddingLeft: 10,
    },
    actionButton: {
        padding: 8,
        marginLeft: 8,
    },
});

export default BrandItem;