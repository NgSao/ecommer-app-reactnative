import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native"

const AdminInfoCard = ({ user, navigation }) => {
    return (
        <View style={styles.adminInfoCard}>
            <Image
                source={{ uri: user?.avatar || "https://ui-avatars.com/api/?name=Admin" }}
                style={styles.adminAvatar}
            />
            <View style={styles.adminInfo}>
                <Text style={styles.adminName}>{user?.name || "Admin"}</Text>
                <Text style={styles.adminEmail}>{user?.email || "admin@example.com"}</Text>
            </View>
            <TouchableOpacity
                style={styles.editProfileButton}
                onPress={() => navigation.navigate("AdminEditProfile")}
            >
                <Text style={styles.editProfileButtonText}>Sửa</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    adminInfoCard: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#fff",
        borderRadius: 10,
        padding: 15,
        marginBottom: 20,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    adminAvatar: {
        width: 60,
        height: 60,
        borderRadius: 30,
        marginRight: 15,
    },
    adminInfo: {
        flex: 1,
    },
    adminName: {
        fontSize: 18,
        fontWeight: "bold",
        color: "#333",
        marginBottom: 5,
    },
    adminEmail: {
        fontSize: 14,
        color: "#666",
    },
    editProfileButton: {
        backgroundColor: "#e30019",
        paddingHorizontal: 15,
        paddingVertical: 8,
        borderRadius: 5,
    },
    editProfileButtonText: {
        color: "#fff",
        fontWeight: "bold",
    },
})

export default AdminInfoCard