import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native"
import { Ionicons } from "@expo/vector-icons"

const DashboardHeader = ({ user, onNavigateToUserApp, onNavigateToSettings, onLogout }) => (
    <View style={styles.header}>
        <View style={styles.headerLeft}>
            <Image source={{ uri: user?.avatar || "https://ui-avatars.com/api/?name=Admin" }} style={styles.avatar} />
            <View>
                <Text style={styles.welcomeText}>Xin chào,</Text>
                <Text style={styles.userName}>{user?.name || "Admin"}</Text>
            </View>
        </View>
        <View style={styles.headerRight}>
            <TouchableOpacity style={styles.iconButton} onPress={onNavigateToUserApp}>
                <Ionicons name="phone-portrait-outline" size={24} color="#333" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.iconButton} onPress={onNavigateToSettings}>
                <Ionicons name="settings-outline" size={24} color="#333" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.iconButton} onPress={onLogout}>
                <Ionicons name="log-out-outline" size={24} color="#e30019" />
            </TouchableOpacity>
        </View>
    </View>
)

const styles = StyleSheet.create({
    header: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        backgroundColor: "#fff",
        paddingHorizontal: 15,
        paddingVertical: 15,
        borderBottomWidth: 1,
        borderBottomColor: "#eee",
    },
    headerLeft: {
        flexDirection: "row",
        alignItems: "center",
    },
    avatar: {
        width: 40,
        height: 40,
        borderRadius: 20,
        marginRight: 10,
    },
    welcomeText: {
        fontSize: 14,
        color: "#666",
    },
    userName: {
        fontSize: 16,
        fontWeight: "bold",
        color: "#333",
    },
    headerRight: {
        flexDirection: "row",
        alignItems: "center",
    },
    iconButton: {
        padding: 8,
        marginLeft: 5,
    },
})

export default DashboardHeader