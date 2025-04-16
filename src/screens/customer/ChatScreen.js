import { SafeAreaView, View, ActivityIndicator, Text } from "react-native"
import useChat from "../../hooks/useChat"
import styles from "../../styles/ChatStyles"
import ChatHeader from "@components/chat/ChatHeader"
import ChatMessages from "@components/chat/ChatMessages"
import ChatInput from "@components/chat/ChatInput"

const ChatScreen = () => {
    const {
        navigation,
        flatListRef,
        loading,
        messages,
        messageText,
        setMessageText,
        selectedImage,
        setSelectedImage,
        sending,
        handleSendMessage,
        pickImage,
        formatTime,
    } = useChat()

    if (loading) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#e30019" />
                <Text style={styles.loadingText}>Đang tải cuộc trò chuyện...</Text>
            </View>
        )
    }

    return (
        <SafeAreaView style={styles.container}>
            <ChatHeader navigation={navigation} />
            <ChatMessages messages={messages} flatListRef={flatListRef} formatTime={formatTime} />
            <ChatInput
                messageText={messageText}
                setMessageText={setMessageText}
                selectedImage={selectedImage}
                setSelectedImage={setSelectedImage}
                sending={sending}
                handleSendMessage={handleSendMessage}
                pickImage={pickImage}
            />
        </SafeAreaView>
    )
}

export default ChatScreen