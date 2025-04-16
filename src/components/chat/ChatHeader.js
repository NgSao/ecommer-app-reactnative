import { View, Text, TouchableOpacity, Image, StyleSheet } from "react-native"
import { Ionicons } from "@expo/vector-icons"

const ChatHeader = ({ navigation }) => (
    <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back" size={24} color="#333" />
        </TouchableOpacity>
        <View style={styles.headerInfo}>
            <Image
                source={{ uri: "https://ui-avatars.com/api/?name=Admin&background=e30019&color=fff" }}
                style={styles.headerAvatar}
            />
            <View>
                <Text style={styles.headerTitle}>Hỗ trợ khách hàng</Text>
                <Text style={styles.headerSubtitle}>Minh Tuấn Mobile</Text>
            </View>
        </View>
    </View>
)

const styles = StyleSheet.create({
    header: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#fff",
        paddingVertical: 12,
        paddingHorizontal: 16,
        borderBottomWidth: 1,
        borderBottomColor: "#eee",
    },
    backButton: {
        marginRight: 12,
    },
    headerInfo: {
        flexDirection: "row",
        alignItems: "center",
    },
    headerAvatar: {
        width: 40,
        height: 40,
        borderRadius: 20,
        marginRight: 12,
    },
    headerTitle: {
        fontSize: 16,
        fontWeight: "bold",
        color: "#333",
    },
    headerSubtitle: {
        fontSize: 12,
        color: "#666",
    },
})

export default ChatHeader