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
} from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { Ionicons } from "@expo/vector-icons"
import { useNavigation } from "@react-navigation/native"
import { useAuth } from '@contexts/AuthContext';

export default function RegisterScreen() {
    const navigation = useNavigation()
    const { register, loading } = useAuth()

    const [fullName, setName] = useState("")
    const [email, setEmail] = useState("")
    const [phone, setPhone] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [showPassword, setShowPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)

    const [nameError, setNameError] = useState("")
    const [emailError, setEmailError] = useState("")
    const [phoneError, setPhoneError] = useState("")
    const [passwordError, setPasswordError] = useState("")
    const [confirmPasswordError, setConfirmPasswordError] = useState("")





    // Validate name
    const validateName = () => {
        if (!fullName) {
            setNameError("Vui lòng nhập họ tên")
            return false
        } else {
            setNameError("")
            return true
        }
    }

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

    // Validate phone
    const validatePhone = () => {
        const phoneRegex = /^[0-9]{10}$/
        if (!phone) {
            setPhoneError("Vui lòng nhập số điện thoại")
            return false
        } else if (!phoneRegex.test(phone)) {
            setPhoneError("Số điện thoại không hợp lệ")
            return false
        } else {
            setPhoneError("")
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
        }
        else if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/.test(password)) {
            setPasswordError("Mật khẩu phải có ít nhất một chữ cái viết hoa, một chữ cái viết thường, một chữ số và một ký tự đặc biệt");
            return false;
        }
        else {
            setPasswordError("")
            return true
        }
    }

    // Validate confirm password
    const validateConfirmPassword = () => {
        if (!confirmPassword) {
            setConfirmPasswordError("Vui lòng xác nhận mật khẩu")
            return false
        } else if (confirmPassword !== password) {
            setConfirmPasswordError("Mật khẩu xác nhận không khớp")
            return false
        } else {
            setConfirmPasswordError("")
            return true
        }
    }

    // Handle register
    const handleRegister = async () => {
        const isNameValid = validateName()
        const isEmailValid = validateEmail()
        const isPhoneValid = validatePhone()
        const isPasswordValid = validatePassword()
        const isConfirmPasswordValid = validateConfirmPassword()

        if (isNameValid && isEmailValid && isPhoneValid && isPasswordValid && isConfirmPasswordValid) {
            const userData = {
                fullName,
                email,
                phone,
                password,
            }

            const success = await register(userData)
            let flag = true;
            if (success) {
                navigation.navigate("VerifyEmail", { email, flag })
            }
        }
    }

    return (
        <SafeAreaView style={styles.container}>
            <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={styles.keyboardAvoidingView}>
                <ScrollView contentContainerStyle={styles.scrollContainer}>
                    <View style={styles.logoContainer}>
                        <Image source={{ uri: "https://static.minhtuanmobile.com/assets/front/img/khthanthiet-no-user-tuoi-20.png" }} style={styles.logo} resizeMode="contain" />
                    </View>

                    <Text style={styles.title}>Đăng ký tài khoản</Text>
                    <Text style={styles.subtitle}>Tạo tài khoản để mua sắm dễ dàng hơn</Text>

                    <View style={styles.formContainer}>
                        <View style={styles.inputContainer}>
                            <Ionicons name="person-outline" size={20} color="#999" style={styles.inputIcon} />
                            <TextInput
                                style={styles.input}
                                placeholder="Họ tên"
                                placeholderTextColor="#999"
                                value={fullName}
                                onChangeText={setName}
                                onBlur={validateName}
                            />
                        </View>
                        {nameError ? <Text style={styles.errorText}>{nameError}</Text> : null}

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
                            <Ionicons name="call-outline" size={20} color="#999" style={styles.inputIcon} />
                            <TextInput
                                style={styles.input}
                                placeholder="Số điện thoại"
                                placeholderTextColor="#999"
                                keyboardType="phone-pad"
                                value={phone}
                                onChangeText={setPhone}
                                onBlur={validatePhone}
                            />
                        </View>
                        {phoneError ? <Text style={styles.errorText}>{phoneError}</Text> : null}

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

                        <View style={styles.inputContainer}>
                            <Ionicons name="lock-closed-outline" size={20} color="#999" style={styles.inputIcon} />
                            <TextInput
                                style={styles.input}
                                placeholder="Xác nhận mật khẩu"
                                placeholderTextColor="#999"
                                secureTextEntry={!showConfirmPassword}
                                value={confirmPassword}
                                onChangeText={setConfirmPassword}
                                onBlur={validateConfirmPassword}
                            />
                            <TouchableOpacity
                                style={styles.passwordToggle}
                                onPress={() => setShowConfirmPassword(!showConfirmPassword)}
                            >
                                <Ionicons name={showConfirmPassword ? "eye-off-outline" : "eye-outline"} size={20} color="#999" />
                            </TouchableOpacity>
                        </View>
                        {confirmPasswordError ? <Text style={styles.errorText}>{confirmPasswordError}</Text> : null}

                        <TouchableOpacity
                            style={[
                                styles.registerButton,
                                (loading || !fullName || !email || !phone || !password || !confirmPassword) && styles.disabledButton,
                            ]}
                            onPress={handleRegister}
                            disabled={loading || !fullName || !email || !phone || !password || !confirmPassword}
                        >
                            {loading ? (
                                <ActivityIndicator size="small" color="#fff" />
                            ) : (
                                <Text style={styles.registerButtonText}>Đăng ký</Text>
                            )}
                        </TouchableOpacity>
                    </View>

                    <View style={styles.loginContainer}>
                        <Text style={styles.loginText}>Đã có tài khoản? </Text>
                        <TouchableOpacity onPress={() => navigation.navigate("Login")}>
                            <Text style={styles.loginLink}>Đăng nhập</Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        </SafeAreaView>
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
        marginVertical: 20,
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
        marginBottom: 20,
    },
    formContainer: {
        marginBottom: 20,
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
    registerButton: {
        backgroundColor: "#e30019",
        borderRadius: 5,
        height: 50,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 10,
    },
    disabledButton: {
        backgroundColor: "#f5a5a5",
    },
    registerButtonText: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "bold",
    },
    loginContainer: {
        flexDirection: "row",
        justifyContent: "center",
        marginTop: 20,
    },
    loginText: {
        fontSize: 14,
        color: "#666",
    },
    loginLink: {
        fontSize: 14,
        color: "#e30019",
        fontWeight: "bold",
    },
})

