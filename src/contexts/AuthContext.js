import { createContext, useState, useContext, useEffect } from "react"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { api, showError, showSuccess } from '../service/api';
import { useNavigation } from "@react-navigation/native";
// Tạo context xác thực
const AuthContext = createContext()

// Lưu trữ mã xác minh và mật khẩu tạm thời
const verificationCodes = {}

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)
    const [token, setToken] = useState(null)
    // Check token on app start
    useEffect(() => {
        const loadStoredToken = async () => {
            try {
                const storedToken = await AsyncStorage.getItem("userToken")
                if (storedToken) {
                    setToken(storedToken)
                    const response = await api.getUserProfile(storedToken)
                    if (response.success) {
                        setUser(response.data)
                    } else {
                        await AsyncStorage.removeItem("userToken")
                        setUser(null)
                    }
                }
            } catch (error) {
                console.error("Error loading auth state:", error)
            } finally {
                setLoading(false)
            }
        }

        loadStoredToken()
    }, [])

    // Login function
    // Hàm đăng nhập với tham số navigation
    const login = async (email, password, navigation) => {
        try {
            setLoading(true);
            const response = await api.login(email, password);
            if (response.success) {
                const { user, token } = response.data;
                setUser(user);
                setToken(token);
                await AsyncStorage.setItem('userToken', token);

                // Chuyển hướng dựa trên role
                if (user.role === 'ADMIN') {
                    navigation.reset({
                        index: 0,
                        routes: [{ name: 'AdminDashboard' }],
                    });
                } else {
                    navigation.reset({
                        index: 0,
                        routes: [{ name: 'AppTab' }],
                    });
                }
                return true;
            } else {
                showError(response.error);
                return false;
            }
        } catch (error) {
            console.error('Lỗi đăng nhập:', error);
            showError('Đăng nhập thất bại. Vui lòng thử lại sau.');
            return false;
        } finally {
            setLoading(false);
        }
    };

    // Register function
    const register = async (userData) => {
        try {
            setLoading(true)
            const response = await api.register(userData)
            if (response.success) {
                const verificationCode = Math.floor(100000 + Math.random() * 900000).toString()
                verificationCodes[userData.email] = { code: verificationCode, type: "register", data: userData }
                showSuccess(`Mã xác thực của bạn là: ${verificationCode}`)
                return true
            } else {
                showError(response.error)
                return false
            }
        } catch (error) {
            console.error("Registration error:", error)
            showError("Đăng ký thất bại. Vui lòng thử lại sau.")
            return false
        } finally {
            setLoading(false)
        }
    }

    // Verify email function
    const verifyEmail = async (email, code, isPasswordChange, newPassword) => {
        try {
            setLoading(true)
            const storedData = verificationCodes[email]
            if (storedData && storedData.code === code) {
                if (isPasswordChange) {
                    // Update password after email verification
                    const response = await api.updatePassword(token, newPassword)
                    if (response.success) {
                        delete verificationCodes[email]
                        showSuccess("Đổi mật khẩu thành công!")
                        return true
                    } else {
                        showError(response.error)
                        return false
                    }
                } else {
                    // Complete registration process
                    const response = await api.completeRegistration(storedData.data)
                    if (response.success) {
                        delete verificationCodes[email]
                        showSuccess("Xác thực email thành công!")
                        return true
                    } else {
                        showError(response.error)
                        return false
                    }
                }
            } else {
                showError("Mã xác thực không đúng. Vui lòng thử lại.")
                return false
            }
        } catch (error) {
            console.error("Email verification error:", error)
            showError("Xác thực email thất bại. Vui lòng thử lại sau.")
            return false
        } finally {
            setLoading(false)
        }
    }

    // Logout function
    const logout = async () => {
        try {
            setUser(null)
            setToken(null)
            await AsyncStorage.removeItem("userToken")
        } catch (error) {
            console.error("Logout error:", error)
        }
    }

    // Update user profile
    const updateProfile = async (userData) => {
        try {
            setLoading(true)
            if (!token) {
                showError("Bạn cần đăng nhập để thực hiện chức năng này")
                return false
            }
            const response = await api.updateUserProfile(token, userData)
            if (response.success) {
                setUser((prev) => ({ ...prev, ...userData }))
                return true
            } else {
                showError(response.error)
                return false
            }
        } catch (error) {
            console.error("Update profile error:", error)
            showError("Cập nhật thông tin thất bại. Vui lòng thử lại sau.")
            return false
        } finally {
            setLoading(false)
        }
    }

    // Change password function
    const changePassword = async (currentPassword, newPassword) => {
        try {
            setLoading(true)
            if (!token) {
                showError("Bạn cần đăng nhập để thực hiện chức năng này")
                return false
            }
            const response = await api.verifyCurrentPassword(token, currentPassword)
            if (response.success) {
                const verificationCode = Math.floor(100000 + Math.random() * 900000).toString()
                verificationCodes[user.email] = { code: verificationCode, type: "passwordChange", newPassword }
                showSuccess(`Mã xác thực của bạn là: ${verificationCode}`)
                return true
            } else {
                showError(response.error || "Mật khẩu hiện tại không đúng")
                return false
            }
        } catch (error) {
            console.error("Change password error:", error)
            showError("Xác minh mật khẩu thất bại. Vui lòng thử lại sau.")
            return false
        } finally {
            setLoading(false)
        }
    }

    return (
        <AuthContext.Provider
            value={{
                user,
                token,
                loading,
                login,
                register,
                verifyEmail,
                logout,
                updateProfile,
                changePassword,
                isLoggedIn: !!user,
            }}
        >
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => {
    const context = useContext(AuthContext)
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider")
    }
    return context
}