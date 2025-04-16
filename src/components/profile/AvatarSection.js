import { View, Image, TouchableOpacity, StyleSheet } from "react-native"
import { Ionicons } from "@expo/vector-icons"

const AvatarSection = ({ avatar, onChangeAvatar }) => (
    <View style={styles.avatarContainer}>
        <Image source={{ uri: avatar || "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRGWc1CKtez48RNxNVLfcM_unNsyMAKBwUDgA&s" }} style={styles.avatar} />
        <TouchableOpacity style={styles.changeAvatarButton} onPress={onChangeAvatar}>
            <Ionicons name="camera" size={20} color="#fff" />
        </TouchableOpacity>
    </View>
)

const styles = StyleSheet.create({
    avatarContainer: {
        alignItems: "center",
        marginBottom: 30,
        position: "relative",
    },
    avatar: {
        width: 100,
        height: 100,
        borderRadius: 50,
    },
    changeAvatarButton: {
        position: "absolute",
        bottom: 0,
        right: "35%",
        backgroundColor: "#e30019",
        width: 36,
        height: 36,
        borderRadius: 18,
        justifyContent: "center",
        alignItems: "center",
        borderWidth: 2,
        borderColor: "#fff",
    },
})

export default AvatarSection