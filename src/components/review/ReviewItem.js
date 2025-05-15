import { View, Text, TouchableOpacity, Image, StyleSheet } from "react-native"
import { formatDateNotification } from "@utils/formatUtils"

const ReviewItem = ({ item, renderRatingStars, setSelectedViewImage, setImageViewerVisible }) => (
    <View style={styles.reviewItem}>
        <View style={styles.reviewHeader}>
            <View style={styles.reviewUser}>

                <View style={styles.userAvatar}>
                    {item.avatarUrl ? (
                        <Image
                            source={{ uri: item.avatarUrl }}
                            style={styles.avatarImage}
                        />
                    ) : (
                        <Image
                            source={{ uri: `https://ui-avatars.com/api/?name=${encodeURIComponent(item.fullName)}&background=random&size=50` }}
                            style={styles.avatarImage}
                        />
                    )}
                </View>
                <View>
                    <Text style={styles.userName}>{item.fullName}</Text>
                    <Text style={styles.reviewDate}>{formatDateNotification(item.createAt)}</Text>
                </View>
            </View>
            <View style={styles.reviewRating}>{renderRatingStars(item?.rating || 0)}</View>
        </View>
        <Text style={styles.reviewComment}>{item.comment}</Text>
        {item.images && item.images.length > 0 && (
            <View style={styles.reviewImages}>
                {item.images.map((image, index) => (
                    <TouchableOpacity
                        key={index}
                        onPress={() => {
                            setSelectedViewImage(image)
                            setImageViewerVisible(true)
                        }}
                    >
                        <Image source={{ uri: image }} style={styles.reviewImage} />
                    </TouchableOpacity>
                ))}
            </View>
        )}
        {item.replies && item.replies.length > 0 && (
            <View style={styles.replyContainer}>
                <Text style={styles.replyTitle}>Phản hồi</Text>
                <View style={styles.replyHeader}>
                    <Image
                        source={{
                            uri:
                                item.replies[0]?.adminAvatarUrl ||
                                'https://ui-avatars.com/api/?name=Admin&background=F44336&color=fff&size=64',
                        }}
                        style={styles.replyAvatar}
                    />
                    <View style={styles.replyInfo}>
                        <Text style={styles.replyAdminName}>Quản Trị Viên</Text>
                        <Text style={styles.replyDate}>
                            {formatDateNotification(item.replies[0]?.createdAt)}
                        </Text>
                    </View>
                </View>
                <Text style={styles.replyText}>{item.replies[0]?.reply}</Text>
            </View>
        )}


    </View>
)

const styles = StyleSheet.create({
    reviewItem: {
        marginBottom: 20,
        paddingBottom: 20,
        borderBottomWidth: 1,
        borderBottomColor: "#eee",
    },
    reviewHeader: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 10,
    },
    reviewUser: {
        flexDirection: "row",
        alignItems: "center",
    },
    userAvatar: {
        width: 36,
        height: 36,
        overflow: 'hidden',
        borderRadius: 18,
        justifyContent: "center",
        alignItems: "center",
        marginRight: 10,
    },
    avatarImage: {
        width: 40,
        height: 40,
        borderRadius: 20,
    },
    avatarText: {
        fontWeight: "bold",
        color: "#333",
    },
    userName: {
        fontWeight: "600",
    },
    reviewDate: {
        color: "#999",
        fontSize: 12,
    },
    reviewRating: {
        flexDirection: "row",
    },
    reviewComment: {
        lineHeight: 20,
        marginBottom: 10,
    },
    reviewImages: {
        flexDirection: "row",
        flexWrap: "wrap",
    },
    reviewImage: {
        width: 80,
        height: 80,
        borderRadius: 4,
        marginRight: 8,
        marginBottom: 8,
    },
    replyContainer: {
        borderLeftWidth: 3,
        borderLeftColor: 'red',
        paddingLeft: 10,
        backgroundColor: '#fff',
        padding: 12,
        marginTop: 15,
        borderRadius: 6,
        shadowColor: '#000',
        shadowOpacity: 0.05,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 4,
        elevation: 1,
    },
    replyTitle: {
        color: 'red',
        fontWeight: 'bold',
        marginBottom: 8,
    },
    replyHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 8,
    },
    replyAvatar: {
        width: 40,
        height: 40,
        borderRadius: 20,
        marginRight: 10,
    },
    replyInfo: {
        flexDirection: 'column',
    },
    replyAdminName: {
        fontWeight: 'bold',
        fontSize: 14,
        color: '#d32f2f', // red tone
    },
    replyDate: {
        fontSize: 12,
        color: '#999',
    },
    replyText: {
        fontSize: 14,
        lineHeight: 20,
        color: '#333',
    },

})

export default ReviewItem