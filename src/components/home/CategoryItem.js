import { TouchableOpacity, View, Text, StyleSheet } from "react-native"
import { Ionicons } from "@expo/vector-icons"

const CategoryItem = ({ item, onPress }) => (
    <TouchableOpacity style={styles.categoryItem} onPress={() => onPress(item)}>
        <View style={styles.categoryIconContainer}>
            <Ionicons name={item.icon} size={24} color="#e30019" />
        </View>
        <Text style={styles.categoryName}>{item.name}</Text>
    </TouchableOpacity>
)

const styles = StyleSheet.create({
    categoryItem: {
        alignItems: "center",
        marginHorizontal: 10,
        width: 70,
    },
    categoryIconContainer: {
        width: 50,
        height: 50,
        borderRadius: 25,
        backgroundColor: "#f5f5f5",
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 5,
    },
    categoryName: {
        fontSize: 12,
        textAlign: "center",
    },
})

export default CategoryItem