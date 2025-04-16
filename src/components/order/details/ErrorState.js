import { View, Text, TouchableOpacity, StyleSheet } from "react-native"
import { Ionicons } from "@expo/vector-icons"

const ErrorState = ({ onBack }) => (
    <View style={styles.errorContainer}>
        <Ionicons name="alert-circle-outline" size={60} color="#e30019" />
        <Text style={styles.errorText}>Không tìm thấy thông tin đơn hàng</Text>
        <TouchableOpacity style={styles.backButton} onPress={onBack}>
            <Text style={styles.backButtonText}>Quay lại</Text>
        </TouchableOpacity>
    </View>
)

const styles = StyleSheet.create({
    errorContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: 20,
    },
    errorText: {
        fontSize: 16,
        color: "#666",
        marginTop: 10,
        marginBottom: 20,
    },
    backButton: {
        backgroundColor: "#e30019",
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
    },
    backButtonText: {
        color: "#fff",
        fontWeight: "bold",
    },
})

export default ErrorState