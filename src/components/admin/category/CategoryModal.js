import { Modal, View, Text, TextInput, TouchableOpacity, Image, ActivityIndicator, StyleSheet } from "react-native"
import { Ionicons } from "@expo/vector-icons"

const CategoryModal = ({
    visible,
    onClose,
    editingCategory,
    categoryName,
    setCategoryName,
    categoryImage,
    pickImage,
    categoryParent,
    categories,
    handleSelectParentCategory,
    saveCategory,
    savingCategory,
}) => {
    return (
        <Modal animationType="slide" transparent={true} visible={visible} onRequestClose={onClose}>
            <View style={styles.modalContainer}>
                <View style={styles.modalContent}>
                    <View style={styles.modalHeader}>
                        <Text style={styles.modalTitle}>
                            {editingCategory ? "Sửa danh mục" : "Thêm danh mục mới"}
                        </Text>
                        <TouchableOpacity style={styles.closeButton} onPress={onClose}>
                            <Ionicons name="close" size={24} color="#333" />
                        </TouchableOpacity>
                    </View>

                    <View style={styles.formGroup}>
                        <Text style={styles.label}>Tên danh mục</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Nhập tên danh mục"
                            value={categoryName}
                            onChangeText={setCategoryName}
                        />
                    </View>

                    <View style={styles.formGroup}>
                        <Text style={styles.label}>Hình ảnh</Text>
                        <TouchableOpacity style={styles.imagePicker} onPress={pickImage}>
                            {categoryImage ? (
                                <Image source={{ uri: categoryImage }} style={styles.previewImage} />
                            ) : (
                                <View style={styles.placeholderImage}>
                                    <Ionicons name="image-outline" size={40} color="#ccc" />
                                    <Text style={styles.placeholderText}>Chọn hình ảnh</Text>
                                </View>
                            )}
                        </TouchableOpacity>
                    </View>

                    <View style={styles.formGroup}>
                        <Text style={styles.label}>Danh mục cha (tùy chọn)</Text>
                        <TouchableOpacity style={styles.dropdownButton} onPress={handleSelectParentCategory}>
                            <Text style={styles.dropdownText}>
                                {categoryParent
                                    ? categories.find((c) => c.id === categoryParent)?.name || "Chọn danh mục cha"
                                    : "Chọn danh mục cha"}
                            </Text>
                            <Ionicons name="chevron-down" size={20} color="#666" />
                        </TouchableOpacity>
                    </View>

                    <View style={styles.buttonContainer}>
                        <TouchableOpacity style={styles.cancelButton} onPress={onClose}>
                            <Text style={styles.cancelButtonText}>Hủy</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={[styles.saveButton, savingCategory && styles.disabledButton]}
                            onPress={saveCategory}
                            disabled={savingCategory}
                        >
                            {savingCategory ? (
                                <ActivityIndicator size="small" color="#fff" />
                            ) : (
                                <Text style={styles.saveButtonText}>Lưu</Text>
                            )}
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal>
    )
}

const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        justifyContent: "center",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        padding: 20,
    },
    modalContent: {
        backgroundColor: "#fff",
        borderRadius: 10,
        padding: 20,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
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
    closeButton: {
        padding: 5,
    },
    formGroup: {
        marginBottom: 20,
    },
    label: {
        fontSize: 16,
        color: "#333",
        marginBottom: 8,
    },
    input: {
        borderWidth: 1,
        borderColor: "#ddd",
        borderRadius: 8,
        paddingHorizontal: 15,
        paddingVertical: 10,
        fontSize: 16,
    },
    imagePicker: {
        borderWidth: 1,
        borderColor: "#ddd",
        borderRadius: 8,
        overflow: "hidden",
    },
    previewImage: {
        width: "100%",
        height: 150,
        resizeMode: "cover",
    },
    placeholderImage: {
        width: "100%",
        height: 150,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#f9f9f9",
    },
    placeholderText: {
        marginTop: 10,
        color: "#666",
    },
    dropdownButton: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        borderWidth: 1,
        borderColor: "#ddd",
        borderRadius: 8,
        paddingHorizontal: 15,
        paddingVertical: 12,
    },
    dropdownText: {
        fontSize: 16,
        color: "#333",
    },
    buttonContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 10,
    },
    cancelButton: {
        flex: 1,
        backgroundColor: "#f0f0f0",
        paddingVertical: 12,
        borderRadius: 8,
        marginRight: 10,
        alignItems: "center",
    },
    cancelButtonText: {
        fontSize: 16,
        color: "#333",
        fontWeight: "bold",
    },
    saveButton: {
        flex: 1,
        backgroundColor: "#e30019",
        paddingVertical: 12,
        borderRadius: 8,
        alignItems: "center",
    },
    saveButtonText: {
        fontSize: 16,
        color: "#fff",
        fontWeight: "bold",
    },
    disabledButton: {
        opacity: 0.7,
    },
})

export default CategoryModal