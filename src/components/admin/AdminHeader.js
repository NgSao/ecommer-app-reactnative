
import { View, Text, StyleSheet, TouchableOpacity } from "react-native"
import { Ionicons } from "@expo/vector-icons"
import { useNavigation } from "@react-navigation/native"
import { useAuth } from '@contexts/AuthContext';

const AdminHeader = ({ title, showBackButton = true }) => {
    const navigation = useNavigation()
    const { logout } = useAuth()

    const handleLogout = () => {
        logout()
        navigation.navigate("Login")
    }

    return (
        <View style={styles.header}>
            {showBackButton && (
                <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
                    <Ionicons name="arrow-back" size={24} color="#333" />
                </TouchableOpacity>
            )}
            <Text style={styles.headerTitle}>{title}</Text>
            <View style={styles.rightButtons}>
                <TouchableOpacity style={styles.iconButton} onPress={() => navigation.navigate("Main")}>
                    <Ionicons name="home-outline" size={24} color="#333" />
                </TouchableOpacity>
                <TouchableOpacity style={styles.iconButton} onPress={handleLogout}>
                    <Ionicons name="log-out-outline" size={24} color="#333" />
                </TouchableOpacity>
            </View>
        </View>
    )
}

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
    backButton: {
        padding: 5,
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: "bold",
        color: "#333",
        flex: 1,
        textAlign: "center",
    },
    rightButtons: {
        flexDirection: "row",
    },
    iconButton: {
        padding: 5,
        marginLeft: 10,
    },
})

export default AdminHeader

