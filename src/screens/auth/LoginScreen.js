
import { useState } from "react"
import {
    View,
    Text,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    Image,
    ActivityIndicator,
    ScrollView,
    KeyboardAvoidingView,
    Platform,
    Alert,
} from "react-native"
import { Ionicons } from "@expo/vector-icons"
import { useNavigation } from "@react-navigation/native"
import { useAuth } from "@contexts/AuthContext"

export default function LoginScreen() {
    const navigation = useNavigation()
    const { login, loading } = useAuth()
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [showPassword, setShowPassword] = useState(false)
    const [emailError, setEmailError] = useState("")
    const [passwordError, setPasswordError] = useState("")

    // Validate email
    const validateEmail = () => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        if (!email) {
            setEmailError("Vui lòng nhập email")
            return false
        } else if (!emailRegex.test(email)) {
            setEmailError("Email không hợp lệ")
            return false
        } else {
            setEmailError("")
            return true
        }
    }

    // Validate password
    const validatePassword = () => {
        if (!password) {
            setPasswordError("Vui lòng nhập mật khẩu")
            return false
        } else if (password.length < 6) {
            setPasswordError("Mật khẩu phải có ít nhất 6 ký tự")
            return false
        } else {
            setPasswordError("")
            return true
        }
    }

    // Handle login
    const handleLogin = async () => {
        const isEmailValid = validateEmail()
        const isPasswordValid = validatePassword()

        if (isEmailValid && isPasswordValid) {
            const success = await login(email, password, navigation)
            if (!success) {
                Alert.alert("Đăng nhập thất bại", "Email hoặc mật khẩu không đúng")
            }


        }
    }

    // Handle forgot password
    const handleForgotPassword = () => {
        Alert.alert("Quên mật khẩu", "Vui lòng nhập email để nhận hướng dẫn đặt lại mật khẩu", [
            {
                text: "Hủy",
                style: "cancel",
            },
            {
                text: "Gửi",
                onPress: () => console.log("Forgot password for:", email),
            },
        ])
    }

    return (
        <View style={styles.container}>
            <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={styles.keyboardAvoidingView}>
                <ScrollView contentContainerStyle={styles.scrollContainer}>
                    <View style={styles.logoContainer}>
                        <Image source={{ uri: "https://placeholder.com/200x100" }} style={styles.logo} resizeMode="contain" />
                    </View>

                    <Text style={styles.title}>Đăng nhập</Text>
                    <Text style={styles.subtitle}>Đăng nhập để tiếp tục mua sắm</Text>

                    <View style={styles.formContainer}>
                        <View style={styles.inputContainer}>
                            <Ionicons name="mail-outline" size={20} color="#999" style={styles.inputIcon} />
                            <TextInput
                                style={styles.input}
                                placeholder="Email"
                                placeholderTextColor="#999"
                                keyboardType="email-address"
                                autoCapitalize="none"
                                value={email}
                                onChangeText={setEmail}
                                onBlur={validateEmail}
                            />
                        </View>
                        {emailError ? <Text style={styles.errorText}>{emailError}</Text> : null}

                        <View style={styles.inputContainer}>
                            <Ionicons name="lock-closed-outline" size={20} color="#999" style={styles.inputIcon} />
                            <TextInput
                                style={styles.input}
                                placeholder="Mật khẩu"
                                placeholderTextColor="#999"
                                secureTextEntry={!showPassword}
                                value={password}
                                onChangeText={setPassword}
                                onBlur={validatePassword}
                            />
                            <TouchableOpacity style={styles.passwordToggle} onPress={() => setShowPassword(!showPassword)}>
                                <Ionicons name={showPassword ? "eye-off-outline" : "eye-outline"} size={20} color="#999" />
                            </TouchableOpacity>
                        </View>
                        {passwordError ? <Text style={styles.errorText}>{passwordError}</Text> : null}

                        <TouchableOpacity style={styles.forgotPasswordButton} onPress={handleForgotPassword}>
                            <Text style={styles.forgotPasswordText}>Quên mật khẩu?</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={[styles.loginButton, (loading || !email || !password) && styles.disabledButton]}
                            onPress={handleLogin}
                            disabled={loading || !email || !password}
                        >
                            {loading ? (
                                <ActivityIndicator size="small" color="#fff" />
                            ) : (
                                <Text style={styles.loginButtonText}>Đăng nhập</Text>
                            )}
                        </TouchableOpacity>

                        <View style={styles.orContainer}>
                            <View style={styles.orLine} />
                            <Text style={styles.orText}>HOẶC</Text>
                            <View style={styles.orLine} />
                        </View>

                        <View style={styles.socialLoginContainer}>
                            <TouchableOpacity style={styles.socialButton}>
                                <Ionicons name="logo-google" size={20} color="#DB4437" />
                                <Text style={styles.socialButtonText}>Google</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.socialButton}>
                                <Ionicons name="logo-facebook" size={20} color="#4267B2" />
                                <Text style={styles.socialButtonText}>Facebook</Text>
                            </TouchableOpacity>
                        </View>
                    </View>

                    <View style={styles.registerContainer}>
                        <Text style={styles.registerText}>Chưa có tài khoản? </Text>
                        <TouchableOpacity onPress={() => navigation.navigate("Register")}>
                            <Text style={styles.registerLink}>Đăng ký ngay</Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
    },
    keyboardAvoidingView: {
        flex: 1,
    },
    scrollContainer: {
        flexGrow: 1,
        padding: 20,
    },
    logoContainer: {
        alignItems: "center",
        marginVertical: 30,
    },
    logo: {
        width: 200,
        height: 80,
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 10,
    },
    subtitle: {
        fontSize: 16,
        color: "#666",
        marginBottom: 30,
    },
    formContainer: {
        marginBottom: 30,
    },
    inputContainer: {
        flexDirection: "row",
        alignItems: "center",
        borderWidth: 1,
        borderColor: "#ddd",
        borderRadius: 5,
        paddingHorizontal: 10,
        marginBottom: 10,
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
    forgotPasswordButton: {
        alignSelf: "flex-end",
        marginBottom: 20,
    },
    forgotPasswordText: {
        color: "#e30019",
        fontSize: 14,
    },
    loginButton: {
        backgroundColor: "#e30019",
        borderRadius: 5,
        height: 50,
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 20,
    },
    disabledButton: {
        backgroundColor: "#f5a5a5",
    },
    loginButtonText: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "bold",
    },
    orContainer: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 20,
    },
    orLine: {
        flex: 1,
        height: 1,
        backgroundColor: "#ddd",
    },
    orText: {
        marginHorizontal: 10,
        color: "#999",
        fontSize: 14,
    },
    socialLoginContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
    },
    socialButton: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        borderWidth: 1,
        borderColor: "#ddd",
        borderRadius: 5,
        paddingVertical: 12,
        paddingHorizontal: 20,
        width: "48%",
    },
    socialButtonText: {
        marginLeft: 10,
        fontSize: 14,
    },
    registerContainer: {
        flexDirection: "row",
        justifyContent: "center",
        marginTop: 20,
    },
    registerText: {
        fontSize: 14,
        color: "#666",
    },
    registerLink: {
        fontSize: 14,
        color: "#e30019",
        fontWeight: "bold",
    },
})

