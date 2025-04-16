import { View, TouchableOpacity, StyleSheet } from "react-native"
import { Ionicons } from "@expo/vector-icons"
import { useNavigation } from "@react-navigation/native"

const ProductDetailHeader = () => {
    const navigation = useNavigation()

    return (
        <View style={styles.header}>
            <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
                <Ionicons name="arrow-back" size={24} color="#333" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.shareButton}>
                <Ionicons name="share-social-outline" size={24} color="#333" />
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    header: {
        flexDirection: "row",
        justifyContent: "space-between",
        padding: 15,
        backgroundColor: "#fff",
    },
    backButton: {
        padding: 5,
    },
    shareButton: {
        padding: 5,
    },
})

export default ProductDetailHeader