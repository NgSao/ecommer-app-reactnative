import { TouchableOpacity, Text, StyleSheet } from "react-native"

const SaveButton = ({ onPress, disabled }) => (
    <TouchableOpacity
        style={[styles.saveButton, disabled && styles.saveButtonDisabled]}
        onPress={onPress}
        disabled={disabled}
    >
        <Text style={styles.saveButtonText}>Lưu địa chỉ</Text>
    </TouchableOpacity>
)

const styles = StyleSheet.create({
    saveButton: {
        backgroundColor: "#e30019",
        padding: 15,
        margin: 15,
        borderRadius: 5,
        alignItems: "center",
    },
    saveButtonDisabled: {
        backgroundColor: "#ccc",
    },
    saveButtonText: {
        color: "#fff",
        fontWeight: "bold",
        fontSize: 16,
    },
})

export default SaveButton