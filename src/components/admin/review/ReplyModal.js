import { Modal, View, Text, TextInput, TouchableOpacity, ScrollView, Image, StyleSheet, KeyboardAvoidingView, Platform } from "react-native"
import { Ionicons } from "@expo/vector-icons"
import { formatDate, formatDateNotification } from '@utils/formatUtils';

const ReplyModal = ({
    replyModalVisible,
    setReplyModalVisible,
    selectedReview,
    renderRatingStars,
    replyText,
    setReplyText,
    submitReply,
    submittingReply,
    setImageViewerVisible,
    setSelectedViewImage,
}) => {

    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={replyModalVisible}
            onRequestClose={() => setReplyModalVisible(false)}
        >
            <View style={styles.modalOverlay}>
                <View style={styles.modalContent}>
                    <View style={styles.modalHeader}>
                        <Text style={styles.modalTitle}>
                            {selectedReview?.replies[0]?.reply ? "Sửa phản hồi đánh giá" : "Phản hồi đánh giá"}
                        </Text>
                        <TouchableOpacity onPress={() => setReplyModalVisible(false)}>
                            <Ionicons name="close" size={24} color="#333" />
                        </TouchableOpacity>
                    </View>

                    {selectedReview && (
                        <ScrollView>
                            <View style={styles.reviewDetail}>
                                <View style={styles.reviewDetailHeader}>
                                    <View style={styles.reviewUser}>
                                        <View style={styles.userAvatar}>
                                            {selectedReview.avatarUrl ? (
                                                <Image
                                                    source={{ uri: selectedReview.avatarUrl }}
                                                    style={styles.avatarImage}
                                                />
                                            ) : (
                                                <Image
                                                    source={{ uri: `https://ui-avatars.com/api/?name=${encodeURIComponent(selectedReview.fullName)}&background=random&size=50` }}
                                                    style={styles.avatarImage}
                                                />
                                            )}
                                        </View>
                                        <View>
                                            <Text style={styles.userName}>{selectedReview.fullName}</Text>
                                            <Text style={styles.reviewDate}>{formatDateNotification(selectedReview.createAt)}</Text>
                                        </View>
                                    </View>
                                    <View style={styles.reviewRating}>{renderRatingStars(selectedReview.rating)}</View>
                                </View>

                                <View style={styles.productInfoDetail}>
                                    <Image source={{ uri: selectedReview.productImage }} style={styles.productImageDetail} />
                                    <Text style={styles.productNameDetail}>{selectedReview.productName}</Text>
                                </View>
                                <Text style={styles.reviewCommentDetail}>{selectedReview.comment}</Text>



                                {selectedReview.images && selectedReview.images.length > 0 && (
                                    <View style={styles.reviewImagesDetail}>
                                        {selectedReview.images.map((image, index) => (
                                            <TouchableOpacity
                                                key={index}
                                                onPress={() => {
                                                    setSelectedViewImage(image)
                                                    setReplyModalVisible(false)
                                                    setImageViewerVisible(true)
                                                }}
                                            >
                                                <Image source={{ uri: image }} style={styles.reviewImageDetail} />
                                            </TouchableOpacity>
                                        ))}
                                    </View>
                                )}
                            </View>

                            <KeyboardAvoidingView
                                behavior={Platform.OS === "ios" ? "padding" : "height"}
                                keyboardVerticalOffset={Platform.OS === "ios" ? 10 : 0}
                            >
                                <View style={styles.replyForm}>
                                    <Text style={styles.replyInputLabel}>Phản hồi của bạn:</Text>

                                    <TextInput
                                        style={styles.replyInput}
                                        multiline
                                        numberOfLines={5}
                                        placeholder="Nhập phản hồi của bạn..."
                                        value={replyText}
                                        onChangeText={setReplyText}
                                    />

                                    <TouchableOpacity style={styles.submitButton} onPress={submitReply} disabled={submittingReply}>
                                        <Text style={styles.submitButtonText}>Gửi phản hồi</Text>
                                    </TouchableOpacity>
                                </View>
                            </KeyboardAvoidingView>

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
        margin: 5
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
    replyForm: {
        marginTop: 10,
    },
    replyInputLabel: {
        fontSize: 16,
        fontWeight: "500",
        marginBottom: 10,
        color: "#333",
    },
    replyInput: {
        borderWidth: 1,
        borderColor: "#ddd",
        borderRadius: 8,
        padding: 12,
        fontSize: 15,
        minHeight: 120,
        textAlignVertical: "top",
        marginBottom: 20,
    },
    submitButton: {
        backgroundColor: "#e30019",
        paddingVertical: 12,
        borderRadius: 8,
        alignItems: "center",
        marginBottom: 10,
    },
    submitButtonText: {
        color: "#fff",
        fontWeight: "bold",
        fontSize: 16,
    },
})

export default ReplyModal