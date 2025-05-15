
import { createContext, useState, useContext, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { GET_TOKEN, POST_ADD, POST_TOKEN, showError, showSuccess, USER_POST_UPLOAD } from "api/apiService";

const AuthContext = createContext();


const TEMP_USER_KEY = 'TEMP_USER_DATA';
const EXPIRY_TIME = 2 * 60 * 60 * 1000; // 2 hours expiry

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [token, setToken] = useState(null);
    const [tempUser, setTempUser] = useState(null);
    const [currentUser, setCurrentUser] = useState(null)

    const generateRandomUserId = () => {
        return 'guest_' + Math.floor(Math.random() * 1000000);
    };

    const loadOrGenerateTempUser = async () => {
        try {
            const stored = await AsyncStorage.getItem(TEMP_USER_KEY);
            if (stored) {
                const parsed = JSON.parse(stored);
                const now = Date.now();

                if (now - parsed.timestamp < EXPIRY_TIME) {
                    // Còn hiệu lực
                    setTempUser(parsed.user);
                    return parsed.user;
                } else {
                    // Hết hạn, xóa đi
                    await AsyncStorage.removeItem(TEMP_USER_KEY);
                }
            }

            const randomId = generateRandomUserId();
            const newUser = {
                id: randomId,
                fullName: 'Khách hàng ' + randomId.slice(-4),
                profileImageUrl: null,
            };

            setTempUser(newUser);
            await AsyncStorage.setItem(
                TEMP_USER_KEY,
                JSON.stringify({ user: newUser, timestamp: Date.now() })
            );
            return newUser;
        } catch (err) {
            console.error('Lỗi khi xử lý tempUser:', err);
            return null;
        }
    };

    // Check token on app start
    useEffect(() => {
        const loadStoredToken = async () => {
            try {
                const storedToken = await AsyncStorage.getItem("_tk");
                if (storedToken) {
                    setToken(storedToken);
                    await fetchUser(storedToken);
                } else {
                    await loadOrGenerateTempUser();
                }
            } catch (error) {
                console.error("Error loading auth state:", error);
            } finally {
                setLoading(false);
            }
        };

        loadStoredToken();
    }, []);

    useEffect(() => {
        if (user?.id) {
            setTempUser(null);
            AsyncStorage.removeItem(TEMP_USER_KEY);
        }
    }, [user]);

    // Fetch user data
    const fetchUser = async (authToken) => {
        try {
            const response = await GET_TOKEN("customer", authToken || token);
            if (response.status === 200) {
                setUser(response.data.data);
                return response.data.data;
            } else {
                await AsyncStorage.removeItem("_tk");
                setUser(null);
                setToken(null);
                showError("Phiên đăng nhập không hợp lệ. Vui lòng đăng nhập lại.");
            }
        } catch (error) {
            console.error("Error fetching user:", error);
            await AsyncStorage.removeItem("_tk");
            setUser(null);
            setToken(null);
            showError("Không thể tải thông tin người dùng.");
        }
    };

    // Update user state directly
    const updateUser = (updatedUser) => {
        setUser(updatedUser);
    };

    const login = async (email, password, navigation) => {
        const formData = {
            email: email,
            password: password,
        };
        try {
            setLoading(true);
            const response = await POST_ADD("auth/login", formData);
            if (response.status === 200) {
                const { access_token } = response.data.data;
                const token = access_token;

                await AsyncStorage.setItem('_tk', token);
                setToken(token);
                const userData = await fetchUser(token);

                // Chuyển hướng dựa trên role
                if (userData.role === 'ADMIN') {
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
                showError(response.error || "Đăng nhập thất bại.");
                return false;
            }
        } catch (error) {
            showError("Đăng nhập thất bại. Vui lòng kiểm tra email hoặc mật khẩu.");
            return false;
        } finally {
            setLoading(false);
        }
    };

    // Register function
    const register = async (userData) => {
        try {
            setLoading(true);
            const response = await POST_ADD("auth/register", userData);
            if (response.status === 200) {
                showSuccess(`Đăng ký thành công! Mã xác thực đã được gửi đến email ${userData.email}`);
                return true;
            } else {
                showError(response.error || "Đăng ký thất bại.");
                return false;
            }
        } catch (error) {
            console.error("Registration error:", error);
            showError("Đăng ký thất bại. Vui lòng thử lại sau.");
            return false;
        } finally {
            setLoading(false);
        }
    };

    // Verify email function
    const verifyEmail = async (email, code, flag) => {
        const formData = {
            email: email,
            otp: code,
        };

        try {
            setLoading(true);
            const endpoint = flag ? "auth/verify" : "auth/forgot-password";
            const response = await POST_ADD(endpoint, formData);
            if (response.status === 200) {
                return true;
            } else {
                showError(response.error || "Xác minh thất bại.");
                return false;
            }
        } catch (error) {
            showError("Xác minh thất bại. Vui lòng thử lại.");
            return false;
        } finally {
            setLoading(false);
        }
    };

    const logout = async () => {
        try {
            setLoading(true);
            await POST_TOKEN("auth/logout", token);
            await AsyncStorage.removeItem("_tk");
            setToken(null);
            setUser(null);
        } catch (error) {
            console.error("Logout error:", error);
            showError("Đăng xuất thất bại. Vui lòng thử lại.");
        } finally {
            setLoading(false);
        }
    };

    const updateProfile = async (userData, avatar) => {
        try {
            setLoading(true);
            if (!token) {
                showError("Bạn cần đăng nhập để thực hiện chức năng này");
                navigation.navigate("Login");
                return false;
            }
            if (avatar) {
                const formData = new FormData();
                formData.append('file', {
                    uri: avatar,
                    name: `avatar_${user?.id || 'user'}.jpg`,
                    type: 'image/jpeg',
                });
                await USER_POST_UPLOAD(
                    "upload/avatar",
                    formData,
                    {
                        headers: {
                            'Content-Type': 'multipart/form-data',
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );
            }

            const response = await POST_TOKEN("customer/updated", token, userData);
            if (response.status === 200) {
                await fetchUser(); // Refresh user data
                showSuccess("Cập nhật thông tin thành công.");
                return true;
            } else {
                showError(response.error || "Cập nhật thông tin thất bại.");
                return false;
            }
        } catch (error) {
            console.error("Update profile error:", error);
            if (error.message.includes("JWT")) {
                showError("Phiên đăng nhập không hợp lệ. Vui lòng đăng nhập lại.");
                navigation.navigate("Login");
            } else {
                showError("Cập nhật thông tin thất bại. Vui lòng thử lại sau.");
            }
            return false;
        } finally {
            setLoading(false);
        }
    };

    // Change password function
    const changePassword = async (currentPassword, newPassword) => {
        try {
            setLoading(true);
            if (!token) {
                showError("Bạn cần đăng nhập để thực hiện chức năng này");
                navigation.navigate("Login");
                return false;
            }
            const formData = {
                oldPassword: currentPassword,
                newPassword: newPassword,
                confirmNewPassword: newPassword,
            };

            const response = await POST_TOKEN("customer/reset-password", token, formData);
            if (response.status === 200) {
                showSuccess("Đổi mật khẩu thành công.");
                return true;
            } else {
                showError(response.error || "Mật khẩu hiện tại không đúng.");
                return false;
            }
        } catch (error) {
            if (error.message.includes("JWT")) {
                showError("Phiên đăng nhập không hợp lệ. Vui lòng đăng nhập lại.");
                navigation.navigate("Login");
            } else {
                showError("Mật khẩu hiện tại không đúng.");
            }
            return false;
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        setCurrentUser(user || tempUser);
    }, [user, tempUser]);
    const userId = currentUser?.id;
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
                fetchUser,
                updateUser,
                isLoggedIn: !!user,
                currentUser,
                userId
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
};
