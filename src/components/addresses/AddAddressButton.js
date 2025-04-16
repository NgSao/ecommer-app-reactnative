import { TouchableOpacity, Text, StyleSheet } from "react-native"
import { Ionicons } from "@expo/vector-icons"

const AddAddressButton = ({ onPress }) => (
    <TouchableOpacity style={styles.addButton} onPress={onPress}>
        <Ionicons name="add" size={24} color="#fff" />
        <Text style={styles.addButtonText}>Thêm địa chỉ mới</Text>
    </TouchableOpacity>
)

const styles = StyleSheet.create({
    addButton: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#e30019",
        padding: 15,
        margin: 15,
        borderRadius: 5,
    },
    addButtonText: {
        color: "#fff",
        fontWeight: "bold",
        fontSize: 16,
        marginLeft: 10,
    },
})

export default AddAddressButton