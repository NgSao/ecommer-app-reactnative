import { TouchableOpacity, Text, StyleSheet } from "react-native"
import { Ionicons } from "@expo/vector-icons"

const ChangePasswordButton = ({ onPress }) => (
    <TouchableOpacity style={styles.changePasswordButton} onPress={onPress}>
        <Ionicons name="lock-closed-outline" size={20} color="#e30019" style={styles.buttonIcon} />
        <Text style={styles.changePasswordText}>Đổi mật khẩu</Text>
    </TouchableOpacity>
)

const styles = StyleSheet.create({
    changePasswordButton: {
        flexDirection: "row",
        alignItems: "center",
        marginTop: 10,
        marginBottom: 30,
    },
    buttonIcon: {
        marginRight: 10,
    },
    changePasswordText: {
        color: "#e30019",
        fontSize: 16,
        fontWeight: "500",
    },
})

export default ChangePasswordButton