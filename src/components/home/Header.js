import { View, Image, TouchableOpacity, TextInput, StyleSheet, Text } from "react-native"
import { Ionicons } from "@expo/vector-icons"
import { useNavigation } from "@react-navigation/native"
import { useCart } from "@contexts/CartContext"

const Header = ({ searchQuery, setSearchQuery, handleSearch }) => {
    const navigation = useNavigation()
    const { getTotalItems } = useCart()

    return (
        <View style={styles.header}>
            <Image
                source={{ uri: "https://minhtuanmobile.com/assets/front/img/logo.png?2504122218" }}
                style={styles.logo}
                resizeMode="contain"
            />
            <View style={styles.searchContainer}>
                <TouchableOpacity
                    style={styles.searchInputContainer}
                    onPress={() => navigation.navigate("Search")}
                >
                    <Ionicons name="search-outline" size={20} color="#999" style={styles.searchIcon} />
                    <TextInput
                        style={styles.searchInput}
                        placeholder="Bạn cần tìm gì?"
                        placeholderTextColor="#999"
                        value={searchQuery}
                        onChangeText={setSearchQuery}
                        onSubmitEditing={handleSearch}
                        returnKeyType="search"
                    />
                </TouchableOpacity>
            </View>
            <TouchableOpacity style={styles.cartButton} onPress={() => navigation.navigate("Cart")}>
                <Ionicons name="cart-outline" size={24} color="#e30019" />
                {getTotalItems() > 0 && (
                    <View style={styles.cartBadge}>
                        <Text style={styles.cartBadgeText}>{getTotalItems()}</Text>
                    </View>
                )}
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    header: {
        flexDirection: "row",
        alignItems: "center",
        padding: 10,
        backgroundColor: "#fff",
        borderBottomWidth: 1,
        borderBottomColor: "#eee",
    },
    logo: {
        width: 100,
        height: 30,
    },
    searchContainer: {
        flex: 1,
        marginHorizontal: 10,
    },
    searchInputContainer: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#f5f5f5",
        borderRadius: 5,
        paddingHorizontal: 10,
    },
    searchIcon: {
        marginRight: 5,
    },
    searchInput: {
        flex: 1,
        height: 36,
        fontSize: 14,
    },
    cartButton: {
        position: "relative",
        padding: 5,
    },
    cartBadge: {
        position: "absolute",
        top: 0,
        right: 0,
        backgroundColor: "#e30019",
        borderRadius: 10,
        width: 16,
        height: 16,
        justifyContent: "center",
        alignItems: "center",
    },
    cartBadgeText: {
        color: "#fff",
        fontSize: 10,
        fontWeight: "bold",
    },
})

export default Header