import { View, Text, TouchableOpacity, TextInput, Image, StyleSheet, Modal } from "react-native"
import { Ionicons } from "@expo/vector-icons"

const WriteReviewModal = ({
    reviewModalVisible,
    setReviewModalVisible,
    userReview,
    setUserReview,
    selectedImages,
    pickImages,
    removeImage,
    submitReview,
    loading,
}) => (
    <Modal
        animationType="slide"
        transparent={true}
        visible={reviewModalVisible}
        onRequestClose={() => setReviewModalVisible(false)}
    >
        <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
                <View style={styles.modalHeader}>
                    <Text style={styles.modalTitle}>Viết đánh giá</Text>
                    <TouchableOpacity onPress={() => setReviewModalVisible(false)}>
                        <Ionicons name="close" size={24} color="#333" />
                    </TouchableOpacity>
                </View>
                <View style={styles.reviewForm}>
                    <Text style={styles.ratingLabel}>Đánh giá của bạn:</Text>
                    <View style={styles.ratingSelection}>
                        {[1, 2, 3, 4, 5].map((star) => (
                            <TouchableOpacity
                                key={star}
                                onPress={() => setUserReview({ ...userReview, rating: star })}
                            >
                                <Ionicons
                                    name={star <= userReview.rating ? "star" : "star-outline"}
                                    size={32}
                                    color="#FFD700"
                                    style={styles.ratingStar}
                                />
                            </TouchableOpacity>
                        ))}
                    </View>
                    <Text style={styles.commentLabel}>Nhận xét của bạn:</Text>
                    <TextInput
                        style={styles.commentInput}
                        multiline
                        numberOfLines={5}
                        placeholder="Chia sẻ trải nghiệm của bạn với sản phẩm này..."
                        value={userReview.comment}
                        onChangeText={(text) => setUserReview({ ...userReview, comment: text })}
                    />
                    <Text style={styles.imagesLabel}>Thêm hình ảnh (tối đa 5 ảnh):</Text>
                    <View style={styles.selectedImagesContainer}>
                        {selectedImages.map((uri, index) => (
                            <View key={index} style={styles.selectedImageContainer}>
                                <Image source={{ uri }} style={styles.selectedImage} />
                                <TouchableOpacity
                                    style={styles.removeImageButton}
                                    onPress={() => removeImage(index)}
                                >
                                    <Ionicons name="close-circle" size={20} color="#e30019" />
                                </TouchableOpacity>
                            </View>
                        ))}
                        {selectedImages.length < 5 && (
                            <TouchableOpacity style={styles.addImageButton} onPress={pickImages}>
                                <Ionicons name="camera-outline" size={24} color="#666" />
                                <Text style={styles.addImageText}>Thêm ảnh</Text>
                            </TouchableOpacity>
                        )}
                    </View>
                    <TouchableOpacity style={styles.submitButton} onPress={submitReview} disabled={loading}>
                        {loading ? (
                            <Text style={styles.submitButtonText}>Đang gửi...</Text>
                        ) : (
                            <Text style={styles.submitButtonText}>Gửi đánh giá</Text>
                        )}
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    </Modal>
)

const styles = StyleSheet.create({
    modalOverlay: {
        flex: 1,
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        justifyContent: "center",
        alignItems: "center",
    },
    modalContent: {
        width: "90%",
        backgroundColor: "#fff",
        borderRadius: 10,
        padding: 20,
        maxHeight: "80%",
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
    },
    reviewForm: {
        width: "100%",
    },
    ratingLabel: {
        fontSize: 16,
        marginBottom: 10,
    },
    ratingSelection: {
        flexDirection: "row",
        justifyContent: "center",
        marginBottom: 20,
    },
    ratingStar: {
        marginHorizontal: 5,
    },
    commentLabel: {
        fontSize: 16,
        marginBottom: 10,
    },
    commentInput: {
        borderWidth: 1,
        borderColor: "#ddd",
        borderRadius: 5,
        padding: 10,
        textAlignVertical: "top",
        marginBottom: 20,
        height: 100,
    },
    imagesLabel: {
        fontSize: 16,
        marginBottom: 10,
    },
    selectedImagesContainer: {
        flexDirection: "row",
        flexWrap: "wrap",
        marginBottom: 20,
    },
    selectedImageContainer: {
        position: "relative",
        marginRight: 10,
        marginBottom: 10,
    },
    selectedImage: {
        width: 80,
        height: 80,
        borderRadius: 5,
    },
    removeImageButton: {
        position: "absolute",
        top: -8,
        right: -8,
        backgroundColor: "#fff",
        borderRadius: 12,
    },
    addImageButton: {
        width: 80,
        height: 80,
        borderWidth: 1,
        borderColor: "#ddd",
        borderRadius: 5,
        borderStyle: "dashed",
        justifyContent: "center",
        alignItems: "center",
    },
    addImageText: {
        color: "#666",
        fontSize: 12,
        marginTop: 5,
    },
    submitButton: {
        backgroundColor: "#e30019",
        paddingVertical: 12,
        borderRadius: 5,
        alignItems: "center",
    },
    submitButtonText: {
        color: "#fff",
        fontWeight: "bold",
        fontSize: 16,
    },
})

export default WriteReviewModal