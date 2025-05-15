import { View, Text, Image, StyleSheet, ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { formatDateFull } from '@utils/formatUtils';
import { useState } from 'react';
import ProductChatBox from '@screens/chat/ProductChatBox';

const MessageItem = ({ item, currentUser }) => {
    const isUser = item.senderId === currentUser.id;
    const isBot = item.role === 'bot';
    const [isAvatarLoading, setIsAvatarLoading] = useState(true);

    const getAvatarSource = () => {
        if (isBot) {
            return { uri: 'https://raw.githubusercontent.com/NgSao/images/main/springboot/1746811120670_z6586030832364_534fe2e35146e65a7be79e2898a283d4.jpg' }; // Replace with your stable URL or local asset
        }
        if (!isUser) {
            return { uri: 'https://ui-avatars.com/api/?name=Admin&background=e30019&color=fff' };
        }
        return null;
    };

    return (
        <View style={[styles.messageContainer, isUser ? styles.userMessage : styles.adminMessage]}>
            {!isUser && getAvatarSource() && (
                <View style={styles.adminAvatar}>
                    {isAvatarLoading && <ActivityIndicator size="small" color="#e30019" />}
                    <Image
                        source={getAvatarSource()}
                        style={[styles.avatarImage, { opacity: isAvatarLoading ? 0 : 1 }]}
                        onLoad={() => setIsAvatarLoading(false)}
                        onError={() => setIsAvatarLoading(false)}
                    />
                </View>
            )}
            <View style={[styles.messageBubble, isUser ? styles.userBubble : styles.adminBubble]}>
                {item.image && <Image source={{ uri: item.image }} style={styles.messageImage} />}
                {item.content.trim() !== '' && (
                    <Text style={[styles.messageText, isUser ? styles.userMessageText : styles.adminMessageText]}>
                        {item.content}
                    </Text>
                )}
                {isBot && item.products && item.products.length > 0 && (
                    <View style={styles.productsWrapper}>
                        {item.products.map((product) => (
                            <ProductChatBox key={product.id} product={product} />
                        ))}
                    </View>
                )}

                <Text style={[styles.messageTime, isUser ? styles.userMessageTime : styles.adminMessageTime]}>
                    {item.timestamp ? formatDateFull(item.timestamp) : formatDateFull(new Date())}
                </Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    messageContainer: {
        flexDirection: 'row',
        marginBottom: 16,
        maxWidth: '80%',
    },
    userMessage: {
        alignSelf: 'flex-end',
    },
    adminMessage: {
        alignSelf: 'flex-start',
    },
    adminAvatar: {
        marginRight: 8,
        alignSelf: 'flex-end',
    },
    avatarImage: {
        width: 30,
        height: 30,
        borderRadius: 15,
    },
    messageBubble: {
        padding: 12,
        borderRadius: 16,
        maxWidth: '100%',
    },
    userBubble: {
        backgroundColor: '#e30019',
        borderBottomRightRadius: 4,
    },
    adminBubble: {
        backgroundColor: '#fff',
        borderBottomLeftRadius: 4,
        borderWidth: 1,
        borderColor: '#eee',
    },
    messageText: {
        fontSize: 15,
        lineHeight: 20,
    },
    userMessageText: {
        color: '#fff',
    },
    adminMessageText: {
        color: '#333',
    },
    messageImage: {
        width: 200,
        height: 150,
        borderRadius: 8,
        marginBottom: 8,
    },
    messageTime: {
        fontSize: 11,
        marginTop: 4,
        alignSelf: 'flex-end',
    },
    userMessageTime: {
        color: 'rgba(255, 255, 255, 0.7)',
    },
    adminMessageTime: {
        color: '#999',
    },
});

export default MessageItem;