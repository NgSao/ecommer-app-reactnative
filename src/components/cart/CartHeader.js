import { View, Text, StyleSheet } from "react-native"

const CartHeader = () => (
    <View style={styles.header}>
        <Text style={styles.headerTitle}>Giỏ hàng</Text>
    </View>
)

const styles = StyleSheet.create({
    header: {
        backgroundColor: "#fff",
        padding: 15,
        borderBottomWidth: 1,
        borderBottomColor: "#eee",
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: "bold",
    },
})

export default CartHeader