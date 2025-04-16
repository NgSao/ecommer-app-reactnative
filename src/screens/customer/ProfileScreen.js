import { useState } from "react"
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, Modal } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { Ionicons } from "@expo/vector-icons"
import { useNavigation } from "@react-navigation/native"
import { useAuth } from "@contexts/AuthContext"

export default function ProfileScreen() {
    const navigation = useNavigation()
    const { user, logout, isLoggedIn } = useAuth()
    const [showLogoutConfirm, setShowLogoutConfirm] = useState(false)

    const menuItems = [
        {
            id: "1",
            title: "Đơn hàng của tôi",
            icon: "receipt-outline",
            requiresAuth: true,
            onPress: () => navigation.navigate("OrderHistory"),
        },
        {
            id: "2",
            title: "Sản phẩm yêu thích",
            icon: "heart-outline",
            requiresAuth: true,
            onPress: () => navigation.navigate("Wishlist"),
        },
        {
            id: "3",
            title: "Địa chỉ giao hàng",
            icon: "location-outline",
            requiresAuth: true,
            onPress: () => navigation.navigate("ShippingAddresses"),
        },
        {
            id: "4",
            title: "Phương thức thanh toán",
            icon: "card-outline",
            requiresAuth: true,
            onPress: () => navigation.navigate("PaymentMethods"),
        },

        {
            id: "6",
            title: "Trung tâm hỗ trợ",
            icon: "help-circle-outline",
            requiresAuth: false,
            onPress: () => navigation.navigate("HelpCenter"),
        },
        {
            id: "7",
            title: "Hỗ trợ trực tuyến",
            icon: "chatbubble-outline",
            requiresAuth: false,
            onPress: () => navigation.navigate("Chat"),
        },
        {
            id: "8",
            title: "Về Minh Tuấn Mobile",
            icon: "information-circle-outline",
            requiresAuth: false,
            onPress: () => navigation.navigate("AboutUs"),
        },
        {
            id: "9",
            title: "Cài đặt",
            icon: "settings-outline",
            requiresAuth: false,
            onPress: () => navigation.navigate("Settings"),
        },
    ]

    const handleLogout = () => {
        setShowLogoutConfirm(true)
    }

    const confirmLogout = () => {
        setShowLogoutConfirm(false)
        logout()
    }

    const renderMenuItem = (item) => {
        if (!isLoggedIn && item.requiresAuth) {
            return null
        }

        return (
            <TouchableOpacity key={item.id} style={styles.menuItem} onPress={item.onPress}>
                <View style={styles.menuItemContent}>
                    <Ionicons name={item.icon} size={24} color="#333" style={styles.menuItemIcon} />
                    <Text style={styles.menuItemTitle}>{item.title}</Text>
                </View>
                <Ionicons name="chevron-forward" size={20} color="#999" />
            </TouchableOpacity>
        )
    }

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerTitle}>Tài khoản</Text>
            </View>

            <ScrollView>
                {isLoggedIn ? (
                    <View style={styles.profileContainer}>
                        <Image source={{ uri: user.avatar || "https://placeholder.com/150x150" }} style={styles.profileImage} />
                        <View style={styles.profileInfo}>
                            <Text style={styles.profileName}>{user.name}</Text>
                            <Text style={styles.profileEmail}>{user.email}</Text>
                            <Text style={styles.profilePhone}>{user.phone}</Text>
                        </View>
                        <TouchableOpacity style={styles.editProfileButton} onPress={() => navigation.navigate("EditProfile")}>
                            <Ionicons name="create-outline" size={20} color="#e30019" />
                        </TouchableOpacity>
                    </View>
                ) : (
                    <View style={styles.loginContainer}>
                        <Text style={styles.loginTitle}>Chào mừng bạn đến với Minh Tuấn Mobile</Text>
                        <Text style={styles.loginSubtitle}>Đăng nhập để theo dõi đơn hàng và nhận nhiều ưu đãi hơn</Text>
                        <View style={styles.loginButtons}>
                            <TouchableOpacity style={styles.loginButton} onPress={() => navigation.navigate("Login")}>
                                <Text style={styles.loginButtonText}>Đăng nhập</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.registerButton} onPress={() => navigation.navigate("Register")}>
                                <Text style={styles.registerButtonText}>Đăng ký</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                )}

                <View style={styles.menuContainer}>{menuItems.map(renderMenuItem)}</View>

                {isLoggedIn && (
                    <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
                        <Ionicons name="log-out-outline" size={24} color="#e30019" style={styles.logoutIcon} />
                        <Text style={styles.logoutText}>Đăng xuất</Text>
                    </TouchableOpacity>
                )}

                <View style={styles.versionContainer}>
                    <Text style={styles.versionText}>Phiên bản 1.0.0</Text>
                </View>
            </ScrollView>

            {/* Logout Confirmation Modal */}
            <Modal
                visible={showLogoutConfirm}
                transparent={true}
                animationType="fade"
                onRequestClose={() => setShowLogoutConfirm(false)}
            >
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContainer}>
                        <Text style={styles.modalTitle}>Đăng xuất</Text>
                        <Text style={styles.modalMessage}>Bạn có chắc chắn muốn đăng xuất?</Text>
                        <View style={styles.modalButtons}>
                            <TouchableOpacity
                                style={[styles.modalButton, styles.cancelButton]}
                                onPress={() => setShowLogoutConfirm(false)}
                            >
                                <Text style={styles.cancelButtonText}>Hủy</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={[styles.modalButton, styles.confirmButton]} onPress={confirmLogout}>
                                <Text style={styles.confirmButtonText}>Đăng xuất</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#f5f5f5",
    },
    header: {
        backgroundColor: "#fff",
        padding: 15,
        borderBottomWidth: 1,
        borderBottomColor: "#eee",
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: "bold",
    },
    profileContainer: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#fff",
        padding: 20,
        marginBottom: 10,
    },
    profileImage: {
        width: 60,
        height: 60,
        borderRadius: 30,
    },
    profileInfo: {
        flex: 1,
        marginLeft: 15,
    },
    profileName: {
        fontSize: 18,
        fontWeight: "bold",
        marginBottom: 5,
    },
    profileEmail: {
        fontSize: 14,
        color: "#666",
        marginBottom: 3,
    },
    profilePhone: {
        fontSize: 14,
        color: "#666",
    },
    editProfileButton: {
        padding: 10,
    },
    loginContainer: {
        backgroundColor: "#fff",
        padding: 20,
        alignItems: "center",
        marginBottom: 10,
    },
    loginTitle: {
        fontSize: 18,
        fontWeight: "bold",
        marginBottom: 10,
        textAlign: "center",
    },
    loginSubtitle: {
        fontSize: 14,
        color: "#666",
        textAlign: "center",
        marginBottom: 20,
    },
    loginButtons: {
        flexDirection: "row",
        width: "100%",
    },
    loginButton: {
        flex: 1,
        backgroundColor: "#e30019",
        paddingVertical: 12,
        borderRadius: 5,
        marginRight: 5,
        alignItems: "center",
    },
    loginButtonText: {
        color: "#fff",
        fontWeight: "bold",
    },
    registerButton: {
        flex: 1,
        backgroundColor: "#fff",
        paddingVertical: 12,
        borderRadius: 5,
        marginLeft: 5,
        alignItems: "center",
        borderWidth: 1,
        borderColor: "#e30019",
    },
    registerButtonText: {
        color: "#e30019",
        fontWeight: "bold",
    },
    menuContainer: {
        backgroundColor: "#fff",
        marginBottom: 10,
    },
    menuItem: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingVertical: 15,
        paddingHorizontal: 20,
        borderBottomWidth: 1,
        borderBottomColor: "#eee",
    },
    menuItemContent: {
        flexDirection: "row",
        alignItems: "center",
    },
    menuItemIcon: {
        marginRight: 15,
    },
    menuItemTitle: {
        fontSize: 16,
    },
    logoutButton: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#fff",
        paddingVertical: 15,
        marginBottom: 10,
    },
    logoutIcon: {
        marginRight: 10,
    },
    logoutText: {
        fontSize: 16,
        color: "#e30019",
        fontWeight: "bold",
    },
    versionContainer: {
        alignItems: "center",
        padding: 20,
    },
    versionText: {
        fontSize: 14,
        color: "#999",
    },
    modalOverlay: {
        flex: 1,
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        justifyContent: "center",
        alignItems: "center",
    },
    modalContainer: {
        width: "80%",
        backgroundColor: "#fff",
        borderRadius: 10,
        padding: 20,
    },
    modalTitle: {
        fontSize: 18,
        fontWeight: "bold",
        marginBottom: 10,
    },
    modalMessage: {
        fontSize: 16,
        marginBottom: 20,
    },
    modalButtons: {
        flexDirection: "row",
        justifyContent: "space-between",
    },
    modalButton: {
        flex: 1,
        paddingVertical: 12,
        borderRadius: 5,
        alignItems: "center",
    },
    cancelButton: {
        backgroundColor: "#f5f5f5",
        marginRight: 10,
    },
    cancelButtonText: {
        color: "#666",
    },
    confirmButton: {
        backgroundColor: "#e30019",
    },
    confirmButtonText: {
        color: "#fff",
        fontWeight: "bold",
    },
})

