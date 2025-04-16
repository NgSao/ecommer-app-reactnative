import { View, Text, TouchableOpacity, StyleSheet } from "react-native"
import { Ionicons } from "@expo/vector-icons"

const LoginPrompt = ({ onLogin }) => (
    <View style={styles.loginPromptContainer}>
        <Ionicons name="lock-closed-outline" size={60} color="#ddd" />
        <Text style={styles.loginPromptTitle}>Đăng nhập để xem danh sách yêu thích</Text>
        <Text style={styles.loginPromptText}>
            Đăng nhập để lưu và đồng bộ danh sách yêu thích của bạn trên tất cả các thiết bị
        </Text>
        <TouchableOpacity style={styles.loginButton} onPress={onLogin}>
            <Text style={styles.loginButtonText}>Đăng nhập</Text>
        </TouchableOpacity>
    </View>
)

const styles = StyleSheet.create({
    loginPromptContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: 20,
    },
    loginPromptTitle: {
        fontSize: 18,
        fontWeight: "bold",
        marginTop: 10,
        marginBottom: 10,
        textAlign: "center",
    },
    loginPromptText: {
        fontSize: 14,
        color: "#666",
        textAlign: "center",
        marginBottom: 20,
    },
    loginButton: {
        backgroundColor: "#e30019",
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
    },
    loginButtonText: {
        color: "#fff",
        fontWeight: "bold",
    },
})

export default LoginPrompt