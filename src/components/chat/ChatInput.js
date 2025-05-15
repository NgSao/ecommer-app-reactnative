
import { View, TextInput, TouchableOpacity, Image, KeyboardAvoidingView, Platform, ActivityIndicator, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { Menu, Divider, Text } from 'react-native-paper';
import { useState } from 'react';

const ChatInput = ({
    messageText,
    setMessageText,
    selectedImage,
    setSelectedImage,
    selectedAudio,
    setSelectedAudio,
    sending,
    handleSendMessage,
    pickImage,
    startAudioRecording,
    stopAudioRecording,
    isRecordingAudio,
    toggleChatMode,
    toggleTextToSpeech,
    isChatbotEnabled,
    isTextToSpeechEnabled,
}) => {
    const [menuVisible, setMenuVisible] = useState(false);

    const openMenu = () => {
        setMenuVisible(true);
    };

    const closeMenu = () => {
        setMenuVisible(false);
    };

    const handleTextToSpeechToggle = () => {
        toggleTextToSpeech();
        closeMenu();
    };

    const handleChatModeToggle = () => {
        toggleChatMode();
        closeMenu();
    };

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 0}
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
            {selectedAudio && (
                <View style={styles.selectedAudioContainer}>
                    <Text style={styles.selectedAudioText}>Âm thanh đã ghi</Text>
                    <TouchableOpacity style={styles.removeAudioButton} onPress={() => setSelectedAudio(null)}>
                        <Ionicons name="close-circle" size={20} color="#fff" />
                    </TouchableOpacity>
                </View>
            )}
            <View style={styles.inputRow}>
                <TouchableOpacity style={styles.attachButton} onPress={pickImage}>
                    <Ionicons name="image-outline" size={24} color="#666" />
                </TouchableOpacity>
                <TouchableOpacity
                    style={[styles.audioButton, isRecordingAudio ? styles.audioButtonRecording : null]}
                    onPress={isRecordingAudio ? stopAudioRecording : startAudioRecording}
                >
                    <Ionicons name={isRecordingAudio ? 'mic-circle' : 'mic-circle-outline'} size={24} color={isRecordingAudio ? '#e30019' : '#666'} />
                </TouchableOpacity>
                <Menu
                    visible={menuVisible}
                    onDismiss={closeMenu}
                    anchor={
                        <TouchableOpacity style={styles.optionsButton} onPress={openMenu}>
                            <Ionicons name="ellipsis-horizontal" size={24} color="#666" />
                        </TouchableOpacity>
                    }
                    style={styles.menuContainer}
                >
                    <Menu.Item
                        onPress={handleTextToSpeechToggle}
                        title={isTextToSpeechEnabled ? 'Tắt đọc tin nhắn' : 'Bật đọc tin nhắn'}
                        leadingIcon={() => <Ionicons name="volume-high" size={20} color="#e30019" />}
                        titleStyle={styles.menuOptionText}
                    />
                    <Divider />
                    <Menu.Item
                        onPress={handleChatModeToggle}
                        title={isChatbotEnabled ? 'Chuyển sang hỗ trợ nhân viên' : 'Chuyển sang chatbot'}
                        leadingIcon={() => <MaterialIcons name="support-agent" size={20} color="#e30019" />}
                        titleStyle={styles.menuOptionText}
                    />
                </Menu>
                <TextInput
                    style={styles.input}
                    placeholder="Nhập tin nhắn..."
                    value={messageText}
                    onChangeText={setMessageText}
                    multiline
                />
                <TouchableOpacity
                    style={[styles.sendButton, (!messageText.trim() && !selectedImage && !selectedAudio) ? styles.sendButtonDisabled : null]}
                    onPress={handleSendMessage}
                    disabled={(!messageText.trim() && !selectedImage && !selectedAudio) || sending}
                >
                    {sending ? (
                        <ActivityIndicator size="small" color="#fff" />
                    ) : (
                        <Ionicons name="send" size={20} color="#fff" />
                    )}
                </TouchableOpacity>
            </View>
        </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({
    inputContainer: {
        backgroundColor: '#fff',
        borderTopWidth: 1,
        borderTopColor: '#eee',
        padding: 8,
    },
    selectedImageContainer: {
        position: 'relative',
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
        position: 'absolute',
        top: -8,
        right: -8,
        backgroundColor: 'rgba(0, 0, 0, 0.6)',
        borderRadius: 12,
    },
    selectedAudioContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#f0f0f0',
        padding: 8,
        borderRadius: 8,
        marginBottom: 8,
        marginLeft: 8,
    },
    selectedAudioText: {
        color: '#333',
        fontSize: 14,
    },
    removeAudioButton: {
        marginLeft: 8,
        backgroundColor: 'rgba(0, 0, 0, 0.6)',
        borderRadius: 12,
    },
    inputRow: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    attachButton: {
        padding: 8,
    },
    audioButton: {
        padding: 8,
    },
    audioButtonRecording: {
        backgroundColor: '#ffe6e6',
        borderRadius: 20,
    },
    optionsButton: {
        padding: 8,
    },
    input: {
        flex: 1,
        backgroundColor: '#f0f0f0',
        borderRadius: 20,
        paddingHorizontal: 16,
        paddingVertical: 8,
        maxHeight: 100,
        fontSize: 15,
    },
    sendButton: {
        backgroundColor: '#e30019',
        width: 40,
        height: 40,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 8,
    },
    sendButtonDisabled: {
        backgroundColor: '#ccc',
    },
    menuContainer: {
        // marginTop: -150, // Position above the input row
        // marginLeft: -200, // Align to the left of the trigger
        // backgroundColor: '#333', // Dark background like in the image
        borderRadius: 10,
        marginTop: -50,
    },
    menuOptionText: {
        color: '#fff', // White text to contrast with dark background
        fontSize: 16,
    },
});

export default ChatInput;