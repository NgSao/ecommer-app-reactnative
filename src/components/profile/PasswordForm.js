import { View, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native"
import { Ionicons } from "@expo/vector-icons"

const PasswordForm = ({
    currentPassword,
    newPassword,
    confirmPassword,
    showCurrentPassword,
    showNewPassword,
    showConfirmPassword,
    setCurrentPassword,
    setNewPassword,
    setConfirmPassword,
    toggleShowCurrentPassword,
    toggleShowNewPassword,
    toggleShowConfirmPassword,
    validateCurrentPassword,
    validateNewPassword,
    validateConfirmPassword,
    currentPasswordError,
    newPasswordError,
    confirmPasswordError,
}) => (
    <View style={styles.formContainer}>
        <Text style={styles.label}>Mật khẩu hiện tại</Text>
        <View style={styles.inputContainer}>
            <Ionicons name="lock-closed-outline" size={20} color="#999" style={styles.inputIcon} />
            <TextInput
                style={styles.input}
                placeholder="Mật khẩu hiện tại"
                placeholderTextColor="#999"
                secureTextEntry={!showCurrentPassword}
                value={currentPassword}
                onChangeText={setCurrentPassword}
                onBlur={validateCurrentPassword}
            />
            <TouchableOpacity style={styles.passwordToggle} onPress={toggleShowCurrentPassword}>
                <Ionicons name={showCurrentPassword ? "eye-off-outline" : "eye-outline"} size={20} color="#999" />
            </TouchableOpacity>
        </View>
        {currentPasswordError ? <Text style={styles.errorText}>{currentPasswordError}</Text> : null}

        <Text style={styles.label}>Mật khẩu mới</Text>
        <View style={styles.inputContainer}>
            <Ionicons name="lock-closed-outline" size={20} color="#999" style={styles.inputIcon} />
            <TextInput
                style={styles.input}
                placeholder="Mật khẩu mới"
                placeholderTextColor="#999"
                secureTextEntry={!showNewPassword}
                value={newPassword}
                onChangeText={setNewPassword}
                onBlur={validateNewPassword}
            />
            <TouchableOpacity style={styles.passwordToggle} onPress={toggleShowNewPassword}>
                <Ionicons name={showNewPassword ? "eye-off-outline" : "eye-outline"} size={20} color="#999" />
            </TouchableOpacity>
        </View>
        {newPasswordError ? <Text style={styles.errorText}>{newPasswordError}</Text> : null}

        <Text style={styles.label}>Xác nhận mật khẩu mới</Text>
        <View style={styles.inputContainer}>
            <Ionicons name="lock-closed-outline" size={20} color="#999" style={styles.inputIcon} />
            <TextInput
                style={styles.input}
                placeholder="Xác nhận mật khẩu mới"
                placeholderTextColor="#999"
                secureTextEntry={!showConfirmPassword}
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                onBlur={validateConfirmPassword}
            />
            <TouchableOpacity style={styles.passwordToggle} onPress={toggleShowConfirmPassword}>
                <Ionicons name={showConfirmPassword ? "eye-off-outline" : "eye-outline"} size={20} color="#999" />
            </TouchableOpacity>
        </View>
        {confirmPasswordError ? <Text style={styles.errorText}>{confirmPasswordError}</Text> : null}

        <Text style={styles.noteText}>
            {/* Sau khi nhập mật khẩu mới, bạn sẽ nhận được mã xác thực qua email để hoàn tất việc đổi mật khẩu. */}
            Sau khi nhập mật khẩu mới, bạn sẽ nhận được thông báo về việc đổi mật khẩu.

        </Text>
    </View>
)

const styles = StyleSheet.create({
    formContainer: {
        marginBottom: 20,
    },
    label: {
        fontSize: 16,
        fontWeight: "500",
        marginBottom: 5,
    },
    inputContainer: {
        flexDirection: "row",
        alignItems: "center",
        borderWidth: 1,
        borderColor: "#ddd",
        borderRadius: 5,
        paddingHorizontal: 10,
        marginBottom: 5,
    },
    inputIcon: {
        marginRight: 10,
    },
    input: {
        flex: 1,
        height: 50,
        fontSize: 16,
    },
    passwordToggle: {
        padding: 10,
    },
    errorText: {
        color: "#e30019",
        fontSize: 12,
        marginBottom: 10,
        marginLeft: 5,
    },
    noteText: {
        color: "#666",
        fontSize: 14,
        marginTop: 15,
        marginBottom: 20,
        lineHeight: 20,
    },
})

export default PasswordForm