import { TouchableOpacity, Text, ActivityIndicator, StyleSheet } from "react-native"

const ContinueButton = ({ onPress, disabled, loading }) => (
    <TouchableOpacity
        style={[styles.changeButton, (disabled || loading) && styles.disabledButton]}
        onPress={onPress}
        disabled={disabled || loading}
    >
        {loading ? (
            <ActivityIndicator size="small" color="#fff" />
        ) : (
            <Text style={styles.changeButtonText}>Tiếp tục</Text>
        )}
    </TouchableOpacity>
)

const styles = StyleSheet.create({
    changeButton: {
        backgroundColor: "#e30019",
        borderRadius: 5,
        height: 50,
        justifyContent: "center",
        alignItems: "center",
    },
    disabledButton: {
        backgroundColor: "#f5a5a5",
    },
    changeButtonText: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "bold",
    },
})

export default ContinueButton