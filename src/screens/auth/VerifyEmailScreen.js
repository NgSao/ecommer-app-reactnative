
import { useState, useEffect, useRef } from "react"
import {
    View,
    Text,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    Image,
    ActivityIndicator,
    KeyboardAvoidingView,
    Platform,
    Alert,
} from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { Ionicons } from "@expo/vector-icons"
import { useNavigation, useRoute } from "@react-navigation/native"
import { useAuth } from '@contexts/AuthContext';

export default function VerifyEmailScreen() {
    const navigation = useNavigation()
    const route = useRoute()
    const { verifyEmail, loading } = useAuth()

    const { email, flag } = route.params || {}

    const [verificationCode, setVerificationCode] = useState(["", "", "", "", "", ""])
    const [timer, setTimer] = useState(180)
    const [canResend, setCanResend] = useState(false)
    const [attemptsLeft, setAttemptsLeft] = useState(3)

    const inputRefs = useRef([])

    useEffect(() => {
        const interval = setInterval(() => {
            setTimer((prevTimer) => {
                if (prevTimer <= 1) {
                    clearInterval(interval)
                    setCanResend(true)
                    return 0
                }
                return prevTimer - 1
            })
        }, 1000)

        return () => clearInterval(interval)
    }, [])

    // Handle input change
    const handleInputChange = (text, index) => {
        if (text.length > 1) {
            const digits = text.split("").slice(0, 6)
            const newVerificationCode = [...verificationCode]

            digits.forEach((digit, i) => {
                if (index + i < 6) {
                    newVerificationCode[index + i] = digit
                }
            })

            setVerificationCode(newVerificationCode)

            const nextIndex = Math.min(index + digits.length, 5)
            if (inputRefs.current[nextIndex]) {
                inputRefs.current[nextIndex].focus()
            }
        } else {
            const newVerificationCode = [...verificationCode]
            newVerificationCode[index] = text
            setVerificationCode(newVerificationCode)

            if (text !== "" && index < 5) {
                inputRefs.current[index + 1].focus()
            }
        }
    }

    const handleKeyPress = (e, index) => {
        if (e.nativeEvent.key === "Backspace" && index > 0 && verificationCode[index] === "") {
            inputRefs.current[index - 1].focus()
        }
    }

    const handleVerify = async () => {
        const code = verificationCode.join("")

        if (code.length !== 6) {
            Alert.alert("Lỗi", "Vui lòng nhập đủ 6 chữ số mã xác thực")
            return
        }
        const success = await verifyEmail(email, code, flag)

        if (success) {
            if (flag) {
                Alert.alert("Thành công", "Xác thực email thành công. Vui lòng đăng nhập để tiếp tục.", [
                    { text: "OK", onPress: () => navigation.navigate("Login") },
                ])
            } else {
                Alert.alert("Thành công", "Xác thực thành công! Vui lòng kiểm tra email để nhận mật khẩu mới", [
                    { text: "OK", onPress: () => navigation.replace("AppTab") },
                ])
            }
        } else {
            if (attemptsLeft > 1) {
                setAttemptsLeft(attemptsLeft - 1)
                Alert.alert("Sai mã", `Mã xác thực không đúng. Bạn còn ${attemptsLeft - 1} lần thử.`)
            } else {
                Alert.alert("Thông báo", "Bạn đã nhập sai quá 3 lần. Vui lòng gửi lại mã xác thực.", [
                    {
                        text: "OK",
                        onPress: () => navigation.replace("AppTab"),
                    },
                ])
            }
        }


    }

    // Handle resend code
    const handleResendCode = () => {
        if (!canResend) return

        // Reset timer and disable resend button
        setTimer(60)
        setCanResend(false)

        // In a real app, this would call an API to resend the verification code
        Alert.alert("Thông báo", "Mã xác thực mới đã được gửi đến email của bạn")

        // Start countdown again
        const interval = setInterval(() => {
            setTimer((prevTimer) => {
                if (prevTimer <= 1) {
                    clearInterval(interval)
                    setCanResend(true)
                    return 0
                }
                return prevTimer - 1
            })
        }, 1000)
    }

    return (
        <SafeAreaView style={styles.container}>
            <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={styles.keyboardAvoidingView}>
                <View style={styles.content}>
                    <View style={styles.logoContainer}>
                        <Image source={{ uri: "https://static.minhtuanmobile.com/assets/front/img/khthanthiet-no-user-tuoi-20.png" }} style={styles.logo} resizeMode="contain" />
                    </View>

                    <Text style={styles.title}>Xác thực email</Text>
                    <Text style={styles.subtitle}>Vui lòng nhập mã xác thực 6 chữ số đã được gửi đến email {email}</Text>

                    <View style={styles.codeContainer}>
                        {verificationCode.map((digit, index) => (
                            <TextInput
                                key={index}
                                ref={(ref) => (inputRefs.current[index] = ref)}
                                style={styles.codeInput}
                                value={digit}
                                onChangeText={(text) => handleInputChange(text, index)}
                                onKeyPress={(e) => handleKeyPress(e, index)}
                                keyboardType="number-pad"
                                maxLength={6} // Allow pasting full code
                                selectTextOnFocus
                            />
                        ))}
                    </View>

                    <TouchableOpacity
                        style={[styles.verifyButton, loading && styles.disabledButton]}
                        onPress={handleVerify}
                        disabled={loading || verificationCode.join("").length !== 6}
                    >
                        {loading ? (
                            <ActivityIndicator size="small" color="#fff" />
                        ) : (
                            <Text style={styles.verifyButtonText}>Xác thực</Text>
                        )}
                    </TouchableOpacity>

                    <View style={styles.resendContainer}>
                        <Text style={styles.resendText}>Không nhận được mã? </Text>
                        {canResend ? (
                            <TouchableOpacity onPress={handleResendCode}>
                                <Text style={styles.resendLink}>Gửi lại mã</Text>
                            </TouchableOpacity>
                        ) : (
                            <Text style={styles.timerText}>Gửi lại sau {timer}s</Text>
                        )}
                    </View>

                    <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
                        <Ionicons name="arrow-back" size={20} color="#e30019" />
                        <Text style={styles.backButtonText}>Quay lại</Text>
                    </TouchableOpacity>
                </View>
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
    content: {
        flex: 1,
        padding: 20,
        alignItems: "center",
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
        textAlign: "center",
    },
    subtitle: {
        fontSize: 16,
        color: "#666",
        marginBottom: 30,
        textAlign: "center",
    },
    codeContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        width: "100%",
        marginBottom: 30,
    },
    codeInput: {
        width: 45,
        height: 55,
        borderWidth: 1,
        borderColor: "#ddd",
        borderRadius: 5,
        textAlign: "center",
        fontSize: 24,
        fontWeight: "bold",
    },
    verifyButton: {
        backgroundColor: "#e30019",
        borderRadius: 5,
        height: 50,
        width: "100%",
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 20,
    },
    disabledButton: {
        backgroundColor: "#f5a5a5",
    },
    verifyButtonText: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "bold",
    },
    resendContainer: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 30,
    },
    resendText: {
        fontSize: 14,
        color: "#666",
    },
    resendLink: {
        fontSize: 14,
        color: "#e30019",
        fontWeight: "bold",
    },
    timerText: {
        fontSize: 14,
        color: "#999",
    },
    backButton: {
        flexDirection: "row",
        alignItems: "center",
    },
    backButtonText: {
        fontSize: 14,
        color: "#e30019",
        marginLeft: 5,
    },
})

