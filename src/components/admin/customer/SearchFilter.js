import { View, TextInput, TouchableOpacity, ScrollView, Text, StyleSheet } from "react-native"
import { Ionicons } from "@expo/vector-icons"

const SearchFilter = ({ searchQuery, setSearchQuery, statusFilter, setStatusFilter, statusOptions }) => {
    const getStatusColor = (status) => {
        switch (status) {
            case "active":
                return "#2ecc71"
            case "inactive":
                return "#e74c3c"
            case "new":
                return "#3498db"
            default:
                return "#7f8c8d"
        }
    }

    return (
        <>
            <View style={styles.searchContainer}>
                <Ionicons name="search-outline" size={20} color="#666" style={styles.searchIcon} />
                <TextInput
                    style={styles.searchInput}
                    placeholder="Tìm kiếm khách hàng..."
                    value={searchQuery}
                    onChangeText={setSearchQuery}
                />
                {searchQuery.length > 0 && (
                    <TouchableOpacity style={styles.clearButton} onPress={() => setSearchQuery("")}>
                        <Ionicons name="close-circle" size={20} color="#666" />
                    </TouchableOpacity>
                )}
            </View>

            <View style={styles.filterContainer}>
                <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                    {statusOptions.map((option) => (
                        <TouchableOpacity
                            key={option.id}
                            style={[
                                styles.filterButton,
                                statusFilter === option.id && { backgroundColor: getStatusColor(option.id) || "#e30019" },
                            ]}
                            onPress={() => setStatusFilter(option.id)}
                        >
                            <Text style={[styles.filterButtonText, statusFilter === option.id && { color: "#fff" }]}>
                                {option.label}
                            </Text>
                        </TouchableOpacity>
                    ))}
                </ScrollView>
            </View>
        </>
    )
}

const styles = StyleSheet.create({
    searchContainer: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#fff",
        paddingHorizontal: 15,
        paddingVertical: 10,
        borderBottomWidth: 1,
        borderBottomColor: "#eee",
    },
    searchIcon: {
        marginRight: 10,
    },
    searchInput: {
        flex: 1,
        height: 40,
        fontSize: 16,
    },
    clearButton: {
        padding: 5,
    },
    filterContainer: {
        backgroundColor: "#fff",
        paddingVertical: 10,
        paddingHorizontal: 5,
        borderBottomWidth: 1,
        borderBottomColor: "#eee",
    },
    filterButton: {
        paddingHorizontal: 15,
        paddingVertical: 8,
        borderRadius: 20,
        backgroundColor: "#f0f0f0",
        marginHorizontal: 5,
    },
    filterButtonText: {
        fontSize: 14,
        color: "#333",
    },
})

export default SearchFilter