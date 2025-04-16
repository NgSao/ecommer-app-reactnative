import { View, Text, TouchableOpacity, StyleSheet, Alert } from "react-native"

const WishlistHeader = ({ wishlistItems, clearAllWishlist }) => (
    <View style={styles.header}>
        <Text style={styles.headerTitle}>Sản phẩm yêu thích</Text>
        {wishlistItems.length > 0 && (
            <TouchableOpacity
                onPress={() => {
                    Alert.alert("Xóa tất cả", "Bạn có chắc chắn muốn xóa tất cả sản phẩm khỏi danh sách yêu thích?", [
                        {
                            text: "Hủy",
                            style: "cancel",
                        },
                        {
                            text: "Xóa tất cả",
                            onPress: clearAllWishlist,
                            style: "destructive",
                        },
                    ])
                }}
            >
                <Text style={styles.clearAllText}>Xóa tất cả</Text>
            </TouchableOpacity>
        )}
    </View>
)

const styles = StyleSheet.create({
    header: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        padding: 15,
        backgroundColor: "#fff",
        borderBottomWidth: 1,
        borderBottomColor: "#eee",
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: "bold",
    },
    clearAllText: {
        color: "#e30019",
        fontSize: 14,
    },
})

export default WishlistHeader