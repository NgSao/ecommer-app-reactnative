import { View, TouchableOpacity, Text, StyleSheet } from "react-native"
import { Ionicons } from "@expo/vector-icons"

const FilterBar = ({ showFilters, setShowFilters, sortBy, openSortOptions, viewMode, setViewMode }) => (
    <View style={styles.filterBar}>
        <TouchableOpacity style={styles.filterButton} onPress={() => setShowFilters(!showFilters)}>
            <Ionicons name="filter-outline" size={20} color="#666" />
            <Text style={styles.filterButtonText}>Lọc</Text>
        </TouchableOpacity>
        <View style={styles.sortContainer}>
            <Text style={styles.sortLabel}>Sắp xếp:</Text>
            <TouchableOpacity style={styles.sortButton} onPress={openSortOptions}>
                <Text style={styles.sortButtonText}>
                    {sortBy === "default"
                        ? "Mặc định"
                        : sortBy === "price-asc"
                            ? "Giá tăng dần"
                            : sortBy === "price-desc"
                                ? "Giá giảm dần"
                                : sortBy === "name-asc"
                                    ? "Tên A-Z"
                                    : "Tên Z-A"}
                </Text>
                <Ionicons name="chevron-down-outline" size={16} color="#666" />
            </TouchableOpacity>
        </View>
        <TouchableOpacity
            style={styles.viewModeButton}
            onPress={() => setViewMode(viewMode === "grid" ? "list" : "grid")}
        >
            <Ionicons name={viewMode === "grid" ? "list-outline" : "grid-outline"} size={20} color="#666" />
        </TouchableOpacity>
    </View>
)

const styles = StyleSheet.create({
    filterBar: {
        flexDirection: "row",
        alignItems: "center",
        padding: 10,
        backgroundColor: "#fff",
        borderBottomWidth: 1,
        borderBottomColor: "#eee",
    },
    filterButton: {
        flexDirection: "row",
        alignItems: "center",
        paddingVertical: 5,
        paddingHorizontal: 10,
        borderWidth: 1,
        borderColor: "#ddd",
        borderRadius: 5,
    },
    filterButtonText: {
        marginLeft: 5,
        fontSize: 14,
        color: "#666",
    },
    sortContainer: {
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
    },
    sortLabel: {
        fontSize: 14,
        color: "#666",
        marginRight: 5,
    },
    sortButton: {
        flexDirection: "row",
        alignItems: "center",
    },
    sortButtonText: {
        fontSize: 14,
        color: "#666",
        marginRight: 5,
    },
    viewModeButton: {
        padding: 5,
    },
})

export default FilterBar