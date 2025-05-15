import { Modal, View, Text, ScrollView, Image, TouchableOpacity, StyleSheet } from "react-native"
import { Ionicons } from "@expo/vector-icons"
import { formatDate, formatDateNotification } from '@utils/formatUtils';

const DetailModal = ({
    detailModalVisible,
    setDetailModalVisible,
    selectedDetailReview,
    renderRatingStars,
    handleReplyReview,
    deleteReview,
    setImageViewerVisible,
    setSelectedViewImage,
}) => {
    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={detailModalVisible}
            onRequestClose={() => setDetailModalVisible(false)}
        >
            <View style={styles.modalOverlay}>
                <View style={styles.modalContent}>
                    <View style={styles.modalHeader}>
                        <Text style={styles.modalTitle}>Chi tiết đánh giá</Text>
                        <TouchableOpacity onPress={() => setDetailModalVisible(false)}>
                            <Ionicons name="close" size={24} color="#333" />
                        </TouchableOpacity>
                    </View>

                    {selectedDetailReview && (
                        <ScrollView>
                            <View style={styles.reviewDetail}>
                                <View style={styles.reviewDetailHeader}>
                                    <View style={styles.reviewUser}>
                                        <View style={styles.userAvatar}>
                                            {selectedDetailReview.avatarUrl ? (
                                                <Image
                                                    source={{ uri: selectedDetailReview.avatarUrl }}
                                                    style={styles.avatarImage}
                                                />
                                            ) : (
                                                <Image
                                                    source={{ uri: `https://ui-avatars.com/api/?name=${encodeURIComponent(selectedDetailReview.fullName)}&background=random&size=50` }}
                                                    style={styles.avatarImage}
                                                />
                                            )}
                                        </View>

                                        <View>
                                            <Text style={styles.userName}>{selectedDetailReview.fullName}</Text>
                                            <Text style={styles.reviewDate}>{formatDateNotification(selectedDetailReview.createAt)}</Text>
                                        </View>
                                    </View>
                                    <View style={styles.reviewRating}>{renderRatingStars(selectedDetailReview.rating)}</View>
                                </View>

                                <View style={styles.productInfoDetail}>
                                    <Image source={{ uri: selectedDetailReview.productImage }} style={styles.productImageDetail} />
                                    <Text style={styles.productNameDetail}>{selectedDetailReview.productName}</Text>
                                </View>

                                <Text style={styles.reviewCommentDetail}>{selectedDetailReview.comment}</Text>

                                {selectedDetailReview.images && selectedDetailReview.images.length > 0 && (
                                    <View style={styles.reviewImagesDetail}>
                                        {selectedDetailReview.images.map((image, index) => (
                                            <TouchableOpacity
                                                key={index}
                                                onPress={() => {
                                                    setSelectedViewImage(image)
                                                    setDetailModalVisible(false)
                                                    setImageViewerVisible(true)
                                                }}
                                            >
                                                <Image source={{ uri: image }} style={styles.reviewImageDetail} />
                                            </TouchableOpacity>
                                        ))}
                                    </View>
                                )}

                                {selectedDetailReview.replies && selectedDetailReview.replies.length > 0 ? (
                                    <View style={styles.replyContainerDetail}>
                                        <Text style={styles.replyLabelDetail}>Phản hồi của bạn:</Text>
                                        <Text style={styles.replyTextDetail}>{selectedDetailReview.replies[0]?.reply}</Text>
                                    </View>
                                ) : null}
                            </View>

                            <View style={styles.detailActions}>
                                <TouchableOpacity
                                    style={[styles.detailActionButton, styles.replyButton]}
                                    onPress={() => {
                                        setDetailModalVisible(false)
                                        setTimeout(() => handleReplyReview(selectedDetailReview), 300)
                                    }}
                                >
                                    <Ionicons name="chatbubble-outline" size={20} color="#fff" style={styles.actionIcon} />
                                    <Text style={styles.detailActionButtonText}>
                                        {selectedDetailReview.replies[0]?.reply ? "Sửa phản hồi" : "Phản hồi"}
                                    </Text>
                                </TouchableOpacity>

                                <TouchableOpacity
                                    style={[styles.detailActionButton, styles.deleteButton]}
                                    onPress={() => deleteReview(selectedDetailReview.id)}
                                >
                                    <Ionicons name="trash-outline" size={20} color="#fff" style={styles.actionIcon} />
                                    <Text style={styles.detailActionButtonText}>Xóa đánh giá</Text>
                                </TouchableOpacity>
                            </View>
                        </ScrollView>
                    )}
                </View>
            </View>
        </Modal>
    )
}

const styles = StyleSheet.create({
    modalOverlay: {
        flex: 1,
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        justifyContent: "center",
        alignItems: "center",
        padding: 20,
        zIndex: 1
    },
    modalContent: {
        backgroundColor: "#fff",
        borderRadius: 10,
        width: "100%",
        maxHeight: "80%",
        padding: 20,
    },
    modalHeader: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 20,
    },
    modalTitle: {
        fontSize: 18,
        fontWeight: "bold",
        color: "#333",
    },
    reviewDetail: {
        marginBottom: 20,
        padding: 2
    },
    reviewDetailHeader: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 15,
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
    productInfoDetail: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#f9f9f9",
        padding: 10,
        borderRadius: 8,
        marginBottom: 15,
    },
    productImageDetail: {
        width: 60,
        height: 60,
        borderRadius: 6,
        marginRight: 10,
    },
    productNameDetail: {
        flex: 1,
        fontSize: 16,
        fontWeight: "500",
        color: "#333",
    },
    reviewCommentDetail: {
        fontSize: 15,
        lineHeight: 22,
        color: "#333",
        marginBottom: 15,
    },
    reviewImagesDetail: {
        flexDirection: "row",
        flexWrap: "wrap",
        marginBottom: 15,
    },
    reviewImageDetail: {
        width: 80,
        height: 80,
        borderRadius: 6,
        marginRight: 8,
        marginBottom: 8,
    },
    replyContainerDetail: {
        backgroundColor: "#f9f9f9",
        padding: 15,
        borderRadius: 8,
        marginBottom: 15,
        borderLeftWidth: 3,
        borderLeftColor: "#e30019",
    },
    replyLabelDetail: {
        fontWeight: "bold",
        fontSize: 14,
        marginBottom: 5,
        color: "#333",
    },
    replyTextDetail: {
        fontSize: 15,
        color: "#333",
        lineHeight: 22,
    },
    detailActions: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 10,
        marginBottom: 20,
    },
    detailActionButton: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        paddingVertical: 12,
        borderRadius: 8,
        marginHorizontal: 5,
    },
    replyButton: {
        backgroundColor: "#2ecc71",
    },
    deleteButton: {
        backgroundColor: "#e74c3c",
    },
    actionIcon: {
        marginRight: 8,
    },
    detailActionButtonText: {
        color: "#fff",
        fontWeight: "bold",
        fontSize: 14,
    },
})

export default DetailModal