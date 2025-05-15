import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native"
import { Ionicons } from "@expo/vector-icons"
import { formatDateNotification } from '@utils/formatUtils';
const ReviewItem = ({ item, navigation, renderRatingStars, handleViewReviewDetail, handleReplyReview, deleteReview }) => {
    return (
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
                <View style={styles.reviewRating}>{renderRatingStars(item.rating)}</View>
            </View>

            <TouchableOpacity
                style={styles.productInfo}
                onPress={() => navigation.navigate("AdminProductDetail", { productId: item.productId })}
            >
                <Image source={{ uri: item.productImage }} style={styles.productImage} />
                <Text style={styles.productName} numberOfLines={1}>
                    {item.productName}
                </Text>
            </TouchableOpacity>

            <Text style={styles.reviewComment} numberOfLines={2}>
                {item.comment}
            </Text>

            {item.images && item.images.length > 0 && (
                <View style={styles.reviewImageIndicator}>
                    <Ionicons name="images-outline" size={16} color="#666" />
                    <Text style={styles.imageCount}>{item.images.length} ảnh</Text>
                </View>
            )}

            {item.replies && item.replies.length > 0 ? (
                <View style={styles.replyContainer}>
                    <Text style={styles.replyLabel}>Phản hồi của bạn:</Text>
                    <Text style={styles.replyText} numberOfLines={2}>
                        {item.replies[0]?.reply}
                    </Text>
                </View>
            ) : null}

            <View style={styles.reviewActions}>
                <TouchableOpacity style={[styles.actionButton, styles.viewButton]} onPress={() => handleViewReviewDetail(item)}>
                    <Text style={styles.actionButtonText}>Chi tiết</Text>
                </TouchableOpacity>

                <TouchableOpacity style={[styles.actionButton, styles.replyButton]} onPress={() => handleReplyReview(item)}>
                    <Text style={styles.actionButtonText}>{item.reply ? "Sửa phản hồi" : "Phản hồi"}</Text>
                </TouchableOpacity>

                <TouchableOpacity style={[styles.actionButton, styles.deleteButton]} onPress={() => deleteReview(item.id)}>
                    <Text style={styles.actionButtonText}>Xóa</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    reviewItem: {
        backgroundColor: "#fff",
        borderRadius: 8,
        padding: 16,
        marginBottom: 12,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        elevation: 2,
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
        fontSize: 14,
    },
    reviewDate: {
        color: "#999",
        fontSize: 12,
    },
    reviewRating: {
        flexDirection: "row",
    },
    productInfo: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#f9f9f9",
        padding: 8,
        borderRadius: 6,
        marginBottom: 10,
    },
    productImage: {
        width: 40,
        height: 40,
        borderRadius: 4,
        marginRight: 8,
    },
    productName: {
        flex: 1,
        fontSize: 14,
        color: "#333",
    },
    reviewComment: {
        fontSize: 14,
        lineHeight: 20,
        color: "#333",
        marginBottom: 10,
    },
    reviewImageIndicator: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 10,
    },
    imageCount: {
        fontSize: 12,
        color: "#666",
        marginLeft: 4,
    },
    replyContainer: {
        backgroundColor: "#f9f9f9",
        padding: 10,
        borderRadius: 6,
        marginBottom: 10,
        borderLeftWidth: 3,
        borderLeftColor: "#e30019",
    },
    replyLabel: {
        fontWeight: "bold",
        fontSize: 12,
        marginBottom: 4,
        color: "#666",
    },
    replyText: {
        fontSize: 14,
        color: "#333",
    },
    reviewActions: {
        flexDirection: "row",
        justifyContent: "flex-end",
    },
    actionButton: {
        paddingVertical: 6,
        paddingHorizontal: 12,
        borderRadius: 4,
        marginLeft: 8,
    },
    viewButton: {
        backgroundColor: "#3498db",
    },
    replyButton: {
        backgroundColor: "#2ecc71",
    },
    deleteButton: {
        backgroundColor: "#e74c3c",
    },
    actionButtonText: {
        color: "#fff",
        fontSize: 12,
        fontWeight: "bold",
    },
})

export default ReviewItem