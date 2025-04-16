import { TouchableOpacity, Text, ActivityIndicator, StyleSheet } from "react-native"

const SaveButton = ({ onPress, disabled, loading }) => (
    <TouchableOpacity
        style={[styles.saveButton, (disabled || loading) && styles.disabledButton]}
        onPress={onPress}
        disabled={disabled || loading}
    >
        {loading ? (
            <ActivityIndicator size="small" color="#fff" />
        ) : (
            <Text style={styles.saveButtonText}>Lưu thông tin</Text>
        )}
    </TouchableOpacity>
)

const styles = StyleSheet.create({
    saveButton: {
        backgroundColor: "#e30019",
        borderRadius: 5,
        height: 50,
        justifyContent: "center",
        alignItems: "center",
    },
    disabledButton: {
        backgroundColor: "#f5a5a5",
    },
    saveButtonText: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "bold",
    },
})

export default SaveButton