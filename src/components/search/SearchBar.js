import { View, TextInput, TouchableOpacity, Text, StyleSheet } from "react-native"
import { Ionicons } from "@expo/vector-icons"

const SearchBar = ({ searchQuery, setSearchQuery, handleSearch, clearSearch }) => (
    <View style={styles.searchContainer}>
        <View style={styles.searchInputContainer}>
            <Ionicons name="search-outline" size={20} color="#999" style={styles.searchIcon} />
            <TextInput
                style={styles.searchInput}
                placeholder="Tìm kiếm sản phẩm"
                placeholderTextColor="#999"
                value={searchQuery}
                onChangeText={setSearchQuery}
                onSubmitEditing={handleSearch}
                returnKeyType="search"
                autoFocus
            />
            {searchQuery ? (
                <TouchableOpacity onPress={clearSearch}>
                    <Ionicons name="close-circle" size={20} color="#999" />
                </TouchableOpacity>
            ) : null}
        </View>
        <TouchableOpacity style={styles.searchButton} onPress={handleSearch}>
            <Text style={styles.searchButtonText}>Tìm</Text>
        </TouchableOpacity>
    </View>
)

const styles = StyleSheet.create({
    searchContainer: {
        flexDirection: "row",
        alignItems: "center",
        padding: 10,
        backgroundColor: "#fff",
        borderBottomWidth: 1,
        borderBottomColor: "#eee",
    },
    searchInputContainer: {
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#f5f5f5",
        borderRadius: 5,
        paddingHorizontal: 10,
        height: 40,
    },
    searchIcon: {
        marginRight: 5,
    },
    searchInput: {
        flex: 1,
        height: 40,
        fontSize: 14,
    },
    searchButton: {
        backgroundColor: "#e30019",
        paddingHorizontal: 15,
        paddingVertical: 10,
        borderRadius: 5,
        marginLeft: 10,
    },
    searchButtonText: {
        color: "#fff",
        fontWeight: "bold",
    },
})

export default SearchBar