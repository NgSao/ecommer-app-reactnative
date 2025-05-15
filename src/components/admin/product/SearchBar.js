import { View, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const SearchBar = ({ searchQuery, setSearchQuery }) => (
    <View style={styles.searchContainer}>
        <Ionicons name="search-outline" size={20} color="#666" style={styles.searchIcon} />
        <TextInput
            style={styles.searchInput}
            placeholder="Tìm kiếm theo tên người dùng, bình luận, sản phẩm..."
            value={searchQuery}
            onChangeText={setSearchQuery}
        />
        {searchQuery.length > 0 && (
            <TouchableOpacity
                style={styles.clearButton}
                onPress={() => setSearchQuery("")}
            >
                <Ionicons name="close-circle" size={20} color="#666" />
            </TouchableOpacity>
        )}
    </View>
);

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
});

export default SearchBar;