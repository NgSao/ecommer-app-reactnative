import { View, Text, TouchableOpacity, Modal, StyleSheet } from "react-native"

const DeleteConfirmModal = ({ visible, onClose, onConfirm }) => (
    <Modal
        visible={visible}
        transparent={true}
        animationType="fade"
        onRequestClose={onClose}
    >
        <View style={styles.modalOverlay}>
            <View style={styles.modalContainer}>
                <Text style={styles.modalTitle}>Xóa địa chỉ</Text>
                <Text style={styles.modalMessage}>Bạn có chắc chắn muốn xóa địa chỉ này?</Text>
                <View style={styles.modalButtons}>
                    <TouchableOpacity
                        style={[styles.modalButton, styles.cancelButton]}
                        onPress={onClose}
                    >
                        <Text style={styles.cancelButtonText}>Hủy</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[styles.modalButton, styles.confirmButton]}
                        onPress={onConfirm}
                    >
                        <Text style={styles.confirmButtonText}>Xóa</Text>
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
    modalContainer: {
        width: "80%",
        backgroundColor: "#fff",
        borderRadius: 10,
        padding: 20,
    },
    modalTitle: {
        fontSize: 18,
        fontWeight: "bold",
        marginBottom: 10,
    },
    modalMessage: {
        fontSize: 16,
        marginBottom: 20,
    },
    modalButtons: {
        flexDirection: "row",
        justifyContent: "space-between",
    },
    modalButton: {
        flex: 1,
        paddingVertical: 12,
        borderRadius: 5,
        alignItems: "center",
    },
    cancelButton: {
        backgroundColor: "#f5f5f5",
        marginRight: 10,
    },
    cancelButtonText: {
        color: "#666",
    },
    confirmButton: {
        backgroundColor: "#e30019",
    },
    confirmButtonText: {
        color: "#fff",
        fontWeight: "bold",
    },
})

export default DeleteConfirmModal