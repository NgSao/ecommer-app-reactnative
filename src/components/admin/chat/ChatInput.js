import { View, TextInput, TouchableOpacity, Image, KeyboardAvoidingView, Platform, StyleSheet } from "react-native"
import { Ionicons } from "@expo/vector-icons"

const ChatInput = ({ messageText, setMessageText, selectedImage, setSelectedImage, handleSendMessage, pickImage, sending }) => {
    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            keyboardVerticalOffset={Platform.OS === "ios" ? 90 : 0}
            style={styles.inputContainer}
        >
            {selectedImage && (
                <View style={styles.selectedImageContainer}>
                    <Image source={{ uri: selectedImage }} style={styles.selectedImage} />
                    <TouchableOpacity style={styles.removeImageButton} onPress={() => setSelectedImage(null)}>
                        <Ionicons name="close-circle" size={20} color="#fff" />
                    </TouchableOpacity>
                </View>
            )}

            <View style={styles.inputRow}>
                <TouchableOpacity style={styles.attachButton} onPress={pickImage}>
                    <Ionicons name="image-outline" size={24} color="#666" />
                </TouchableOpacity>

                <TextInput
                    style={styles.input}
                    placeholder="Nhập tin nhắn..."
                    value={messageText}
                    onChangeText={setMessageText}
                    multiline
                />

                <TouchableOpacity
                    style={[styles.sendButton, !messageText.trim() && !selectedImage ? styles.sendButtonDisabled : null]}
                    onPress={handleSendMessage}
                    disabled={(!messageText.trim() && !selectedImage) || sending}
                >
                    {sending ? (
                        <Ionicons name="send" size={20} color="#ccc" />
                    ) : (
                        <Ionicons name="send" size={20} color="#fff" />
                    )}
                </TouchableOpacity>
            </View>
        </KeyboardAvoidingView>
    )
}

const styles = StyleSheet.create({
    inputContainer: {
        backgroundColor: "#fff",
        borderTopWidth: 1,
        borderTopColor: "#eee",
        padding: 8,
    },
    selectedImageContainer: {
        position: "relative",
        width: 80,
        height: 80,
        marginBottom: 8,
        marginLeft: 8,
    },
    selectedImage: {
        width: 80,
        height: 80,
        borderRadius: 8,
    },
    removeImageButton: {
        position: "absolute",
        top: -8,
        right: -8,
        backgroundColor: "rgba(0, 0, 0, 0.6)",
        borderRadius: 12,
    },
    inputRow: {
        flexDirection: "row",
        alignItems: "center",
    },
    attachButton: {
        padding: 8,
    },
    input: {
        flex: 1,
        backgroundColor: "#f0f0f0",
        borderRadius: 20,
        paddingHorizontal: 16,
        paddingVertical: 8,
        maxHeight: 100,
        fontSize: 15,
    },
    sendButton: {
        backgroundColor: "#e30019",
        width: 40,
        height: 40,
        borderRadius: 20,
        justifyContent: "center",
        alignItems: "center",
        marginLeft: 8,
    },
    sendButtonDisabled: {
        backgroundColor: "#ccc",
    },
})

export default ChatInput