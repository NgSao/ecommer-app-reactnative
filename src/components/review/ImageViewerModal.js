import { View, TouchableOpacity, Image, StyleSheet, Modal } from "react-native"
import { Ionicons } from "@expo/vector-icons"

const ImageViewerModal = ({ imageViewerVisible, setImageViewerVisible, selectedViewImage }) => {

    return (
        <Modal
            animationType="fade"
            transparent={true}
            visible={imageViewerVisible}
            onRequestClose={() => setImageViewerVisible(false)}
        >
            <View style={styles.imageViewerOverlay}>
                <TouchableOpacity style={styles.closeImageButton} onPress={() => setImageViewerVisible(false)}>
                    <Ionicons name="close" size={24} color="#fff" />
                </TouchableOpacity>
                {selectedViewImage && (
                    <Image source={{ uri: selectedViewImage }} style={styles.fullScreenImage} resizeMode="contain" />
                )}
            </View>
        </Modal>
    )
}

const styles = StyleSheet.create({
    imageViewerOverlay: {
        flex: 1,
        backgroundColor: "rgba(0, 0, 0, 0.9)",
        justifyContent: "center",
        alignItems: "center",
    },
    closeImageButton: {
        position: "absolute",
        top: 40,
        right: 20,
        zIndex: 10,
    },
    fullScreenImage: {
        width: "100%",
        height: "80%",
    },
})

export default ImageViewerModal