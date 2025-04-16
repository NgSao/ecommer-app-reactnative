import { View, Text, TouchableOpacity, Image, StyleSheet } from "react-native"
import { Ionicons } from "@expo/vector-icons"

const ReviewItem = ({ item, renderRatingStars, formatDate, setSelectedViewImage, setImageViewerVisible }) => (
    <View style={styles.reviewItem}>
        <View style={styles.reviewHeader}>
            <View style={styles.reviewUser}>
                <View style={styles.userAvatar}>
                    <Text style={styles.avatarText}>{item.userName.charAt(0).toUpperCase()}</Text>
                </View>
                <View>
                    <Text style={styles.userName}>{item.userName}</Text>
                    <Text style={styles.reviewDate}>{formatDate(item.date)}</Text>
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
        {item.reply && (
            <View style={styles.replyContainer}>
                <Text style={styles.replyLabel}>Phản hồi từ Minh Tuấn Mobile:</Text>
                <Text style={styles.replyText}>{item.reply}</Text>
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
        borderRadius: 18,
        backgroundColor: "#e0e0e0",
        justifyContent: "center",
        alignItems: "center",
        marginRight: 10,
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
        backgroundColor: "#f9f9f9",
        padding: 10,
        borderRadius: 5,
        marginTop: 10,
    },
    replyLabel: {
        fontWeight: "bold",
        marginBottom: 5,
    },
    replyText: {
        color: "#333",
    },
})

export default ReviewItem