import { View, TouchableOpacity, Text, StyleSheet } from "react-native"

const SortOptions = ({ sortOption, setSortOption }) => (
    <View style={styles.sortOptions}>
        <Text style={styles.sortLabel}>Sắp xếp theo:</Text>
        <TouchableOpacity
            style={[styles.sortButton, sortOption === "newest" && styles.activeSortButton]}
            onPress={() => setSortOption("newest")}
        >
            <Text style={styles.sortButtonText}>Mới nhất</Text>
        </TouchableOpacity>
        <TouchableOpacity
            style={[styles.sortButton, sortOption === "highest" && styles.activeSortButton]}
            onPress={() => setSortOption("highest")}
        >
            <Text style={styles.sortButtonText}>Đánh giá cao nhất</Text>
        </TouchableOpacity>
    </View>
)

const styles = StyleSheet.create({
    sortOptions: {
        flexDirection: "row",
        alignItems: "center",
        paddingVertical: 10,
        borderBottomWidth: 1,
        borderBottomColor: "#eee",
        marginBottom: 15,
    },
    sortLabel: {
        marginRight: 10,
        color: "#666",
    },
    sortButton: {
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 16,
        backgroundColor: "#f5f5f5",
        marginRight: 8,
    },
    activeSortButton: {
        backgroundColor: "#ddd",
    },
    sortButtonText: {
        fontSize: 13,
    },
})

export default SortOptions