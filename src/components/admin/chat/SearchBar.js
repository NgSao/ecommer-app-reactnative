import { View, TextInput, TouchableOpacity, StyleSheet } from "react-native"
import { Ionicons } from "@expo/vector-icons"

const SearchBar = ({ searchQuery, setSearchQuery }) => {
    return (
        <View style={styles.searchContainer}>
            <Ionicons name="search" size={20} color="#666" style={styles.searchIcon} />
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
    )
}

const styles = StyleSheet.create({
    searchContainer: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#fff",
        borderRadius: 8,
        margin: 16,
        paddingHorizontal: 12,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        elevation: 2,
    },
    searchIcon: {
        marginRight: 8,
    },
    searchInput: {
        flex: 1,
        height: 48,
        fontSize: 16,
    },
    clearButton: {
        padding: 4,
    },
})

export default SearchBar