
import { useState, useEffect } from "react"
import { View, Text, StyleSheet, Switch, TouchableOpacity, ScrollView, Alert } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { Ionicons } from "@expo/vector-icons"
import { useNavigation } from "@react-navigation/native"
import AsyncStorage from "@react-native-async-storage/async-storage"

export default function SettingsScreen() {
    const navigation = useNavigation()

    const [pushNotifications, setPushNotifications] = useState(true)
    const [emailNotifications, setEmailNotifications] = useState(true)
    const [orderUpdates, setOrderUpdates] = useState(true)
    const [promotions, setPromotions] = useState(true)
    const [darkMode, setDarkMode] = useState(false)
    const [biometricLogin, setBiometricLogin] = useState(false)
    const [language, setLanguage] = useState("Tiếng Việt")

    useEffect(() => {
        loadSettings()
    }, [])

    const loadSettings = async () => {
        try {
            const settings = await AsyncStorage.getItem("userSettings")
            if (settings) {
                const parsedSettings = JSON.parse(settings)
                setPushNotifications(parsedSettings.pushNotifications)
                setEmailNotifications(parsedSettings.emailNotifications)
                setOrderUpdates(parsedSettings.orderUpdates)
                setPromotions(parsedSettings.promotions)
                setDarkMode(parsedSettings.darkMode)
                setBiometricLogin(parsedSettings.biometricLogin)
                setLanguage(parsedSettings.language || "Tiếng Việt")
            }
        } catch (error) {
            console.error("Error loading settings:", error)
        }
    }

    // Save settings to AsyncStorage
    const saveSettings = async () => {
        try {
            const settings = {
                pushNotifications,
                emailNotifications,
                orderUpdates,
                promotions,
                darkMode,
                biometricLogin,
                language,
            }

            await AsyncStorage.setItem("userSettings", JSON.stringify(settings))
            Alert.alert("Thành công", "Đã lưu cài đặt của bạn")
        } catch (error) {
            console.error("Error saving settings:", error)
            Alert.alert("Lỗi", "Không thể lưu cài đặt. Vui lòng thử lại sau.")
        }
    }

    // Toggle push notifications
    const togglePushNotifications = () => {
        setPushNotifications(!pushNotifications)
    }

    // Toggle email notifications
    const toggleEmailNotifications = () => {
        setEmailNotifications(!emailNotifications)
    }

    // Toggle order updates
    const toggleOrderUpdates = () => {
        setOrderUpdates(!orderUpdates)
    }

    // Toggle promotions
    const togglePromotions = () => {
        setPromotions(!promotions)
    }

    // Toggle dark mode
    const toggleDarkMode = () => {
        setDarkMode(!darkMode)
        // In a real app, this would also update the app's theme
    }

    // Toggle biometric login
    const toggleBiometricLogin = () => {
        setBiometricLogin(!biometricLogin)
        // In a real app, this would also check if biometric authentication is available
    }

    // Show language selection
    const showLanguageSelection = () => {
        Alert.alert("Chọn ngôn ngữ", "Chọn ngôn ngữ hiển thị cho ứng dụng", [
            {
                text: "Tiếng Việt",
                onPress: () => setLanguage("Tiếng Việt"),
            },
            {
                text: "English",
                onPress: () => setLanguage("English"),
            },
            {
                text: "Hủy",
                style: "cancel",
            },
        ])
    }

    // Clear cache
    const clearCache = () => {
        Alert.alert("Xóa bộ nhớ đệm", "Bạn có chắc chắn muốn xóa bộ nhớ đệm của ứng dụng?", [
            {
                text: "Hủy",
                style: "cancel",
            },
            {
                text: "Xóa",
                onPress: () => {
                    // In a real app, this would clear the app's cache
                    Alert.alert("Thành công", "Đã xóa bộ nhớ đệm")
                },
                style: "destructive",
            },
        ])
    }

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
                    <Ionicons name="arrow-back" size={24} color="#333" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Cài đặt</Text>
                <View style={styles.placeholder} />
            </View>

            <ScrollView contentContainerStyle={styles.content}>
                {/* Notifications Section */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Thông báo</Text>

                    <View style={styles.settingItem}>
                        <View style={styles.settingInfo}>
                            <Text style={styles.settingTitle}>Thông báo đẩy</Text>
                            <Text style={styles.settingDescription}>Nhận thông báo trên thiết bị</Text>
                        </View>
                        <Switch
                            value={pushNotifications}
                            onValueChange={togglePushNotifications}
                            trackColor={{ false: "#d9d9d9", true: "#e30019" }}
                            thumbColor="#fff"
                        />
                    </View>

                    <View style={styles.settingItem}>
                        <View style={styles.settingInfo}>
                            <Text style={styles.settingTitle}>Thông báo qua email</Text>
                            <Text style={styles.settingDescription}>Nhận thông báo qua email</Text>
                        </View>
                        <Switch
                            value={emailNotifications}
                            onValueChange={toggleEmailNotifications}
                            trackColor={{ false: "#d9d9d9", true: "#e30019" }}
                            thumbColor="#fff"
                        />
                    </View>

                    <View style={styles.settingItem}>
                        <View style={styles.settingInfo}>
                            <Text style={styles.settingTitle}>Cập nhật đơn hàng</Text>
                            <Text style={styles.settingDescription}>Nhận thông báo về trạng thái đơn hàng</Text>
                        </View>
                        <Switch
                            value={orderUpdates}
                            onValueChange={toggleOrderUpdates}
                            trackColor={{ false: "#d9d9d9", true: "#e30019" }}
                            thumbColor="#fff"
                        />
                    </View>

                    <View style={styles.settingItem}>
                        <View style={styles.settingInfo}>
                            <Text style={styles.settingTitle}>Khuyến mãi & Ưu đãi</Text>
                            <Text style={styles.settingDescription}>Nhận thông báo về khuyến mãi và ưu đãi</Text>
                        </View>
                        <Switch
                            value={promotions}
                            onValueChange={togglePromotions}
                            trackColor={{ false: "#d9d9d9", true: "#e30019" }}
                            thumbColor="#fff"
                        />
                    </View>
                </View>

                {/* Appearance Section */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Giao diện</Text>

                    <View style={styles.settingItem}>
                        <View style={styles.settingInfo}>
                            <Text style={styles.settingTitle}>Chế độ tối</Text>
                            <Text style={styles.settingDescription}>Sử dụng giao diện tối cho ứng dụng</Text>
                        </View>
                        <Switch
                            value={darkMode}
                            onValueChange={toggleDarkMode}
                            trackColor={{ false: "#d9d9d9", true: "#e30019" }}
                            thumbColor="#fff"
                        />
                    </View>

                    <TouchableOpacity style={styles.settingItemButton} onPress={showLanguageSelection}>
                        <View style={styles.settingInfo}>
                            <Text style={styles.settingTitle}>Ngôn ngữ</Text>
                            <Text style={styles.settingDescription}>Chọn ngôn ngữ hiển thị</Text>
                        </View>
                        <View style={styles.settingAction}>
                            <Text style={styles.settingValue}>{language}</Text>
                            <Ionicons name="chevron-forward" size={20} color="#999" />
                        </View>
                    </TouchableOpacity>
                </View>

                {/* Security Section */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Bảo mật</Text>

                    <View style={styles.settingItem}>
                        <View style={styles.settingInfo}>
                            <Text style={styles.settingTitle}>Đăng nhập sinh trắc học</Text>
                            <Text style={styles.settingDescription}>Sử dụng vân tay hoặc Face ID để đăng nhập</Text>
                        </View>
                        <Switch
                            value={biometricLogin}
                            onValueChange={toggleBiometricLogin}
                            trackColor={{ false: "#d9d9d9", true: "#e30019" }}
                            thumbColor="#fff"
                        />
                    </View>

                    <TouchableOpacity style={styles.settingItemButton} onPress={() => navigation.navigate("ChangePassword")}>
                        <View style={styles.settingInfo}>
                            <Text style={styles.settingTitle}>Đổi mật khẩu</Text>
                            <Text style={styles.settingDescription}>Thay đổi mật khẩu đăng nhập</Text>
                        </View>
                        <Ionicons name="chevron-forward" size={20} color="#999" />
                    </TouchableOpacity>
                </View>

                {/* Other Section */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Khác</Text>

                    <TouchableOpacity style={styles.settingItemButton} onPress={clearCache}>
                        <View style={styles.settingInfo}>
                            <Text style={styles.settingTitle}>Xóa bộ nhớ đệm</Text>
                            <Text style={styles.settingDescription}>Xóa dữ liệu tạm thời của ứng dụng</Text>
                        </View>
                        <Ionicons name="chevron-forward" size={20} color="#999" />
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.settingItemButton} onPress={() => navigation.navigate("AboutUs")}>
                        <View style={styles.settingInfo}>
                            <Text style={styles.settingTitle}>Về Minh Tuấn Mobile</Text>
                            <Text style={styles.settingDescription}>Thông tin về ứng dụng và công ty</Text>
                        </View>
                        <Ionicons name="chevron-forward" size={20} color="#999" />
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.settingItemButton} onPress={() => navigation.navigate("PrivacyPolicy")}>
                        <View style={styles.settingInfo}>
                            <Text style={styles.settingTitle}>Chính sách bảo mật</Text>
                            <Text style={styles.settingDescription}>Xem chính sách bảo mật của chúng tôi</Text>
                        </View>
                        <Ionicons name="chevron-forward" size={20} color="#999" />
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.settingItemButton} onPress={() => navigation.navigate("TermsOfService")}>
                        <View style={styles.settingInfo}>
                            <Text style={styles.settingTitle}>Điều khoản sử dụng</Text>
                            <Text style={styles.settingDescription}>Xem điều khoản sử dụng của chúng tôi</Text>
                        </View>
                        <Ionicons name="chevron-forward" size={20} color="#999" />
                    </TouchableOpacity>
                </View>

                {/* Save Button */}
                <TouchableOpacity style={styles.saveButton} onPress={saveSettings}>
                    <Text style={styles.saveButtonText}>Lưu cài đặt</Text>
                </TouchableOpacity>
            </ScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#f5f5f5",
    },
    header: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        padding: 15,
        backgroundColor: "#fff",
        borderBottomWidth: 1,
        borderBottomColor: "#eee",
    },
    backButton: {
        padding: 5,
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: "bold",
    },
    placeholder: {
        width: 34, // Same width as backButton for centering
    },
    content: {
        padding: 15,
    },
    section: {
        backgroundColor: "#fff",
        borderRadius: 10,
        padding: 15,
        marginBottom: 20,
        borderWidth: 1,
        borderColor: "#eee",
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: "bold",
        marginBottom: 15,
        color: "#333",
    },
    settingItem: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingVertical: 12,
        borderBottomWidth: 1,
        borderBottomColor: "#eee",
    },
    settingItemButton: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingVertical: 12,
        borderBottomWidth: 1,
        borderBottomColor: "#eee",
    },
    settingInfo: {
        flex: 1,
    },
    settingTitle: {
        fontSize: 16,
        fontWeight: "500",
        marginBottom: 3,
    },
    settingDescription: {
        fontSize: 14,
        color: "#666",
    },
    settingAction: {
        flexDirection: "row",
        alignItems: "center",
    },
    settingValue: {
        fontSize: 14,
        color: "#666",
        marginRight: 5,
    },
    saveButton: {
        backgroundColor: "#e30019",
        borderRadius: 5,
        padding: 15,
        alignItems: "center",
        marginBottom: 30,
    },
    saveButtonText: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "bold",
    },
})

