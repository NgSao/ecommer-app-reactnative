
import { useState, useEffect } from "react"
import {
    View,
    Text,
    StyleSheet,
    FlatList,
    TouchableOpacity,
    TextInput,
    ActivityIndicator,
    Alert,
    RefreshControl,
    Image,
    Modal,
} from "react-native"
import { Ionicons } from "@expo/vector-icons"
import { useNavigation } from "@react-navigation/native"
import * as ImagePicker from "expo-image-picker"
import { ADMIN_DELETE_ID, ADMIN_GET_ALL, ADMIN_POST_ADD, ADMIN_POST_UPLOAD, ADMIN_PUT_ID, PUT_ID } from "api/apiService"
import { SafeAreaView } from "react-native-safe-area-context"
const AdminCategoriesManagement = () => {
    const navigation = useNavigation()
    const [categories, setCategories] = useState([])
    const [loading, setLoading] = useState(true)
    const [refreshing, setRefreshing] = useState(false)
    const [searchQuery, setSearchQuery] = useState("")
    const [filteredCategories, setFilteredCategories] = useState([])

    const [modalVisible, setModalVisible] = useState(false)
    const [editingCategory, setEditingCategory] = useState(null)
    const [categoryName, setCategoryName] = useState("")
    const [categoryImage, setCategoryImage] = useState(null)
    const [categoryParent, setCategoryParent] = useState(null)
    const [savingCategory, setSavingCategory] = useState(false)

    useEffect(() => {
        fetchCategories()
    }, [])

    useEffect(() => {
        if (searchQuery.trim() === "") {
            setFilteredCategories(categories)
        } else {
            const filtered = categories.filter((category) => category.name.toLowerCase().includes(searchQuery.toLowerCase()))
            setFilteredCategories(filtered)
        }
    }, [searchQuery, categories])

    const fetchCategories = async () => {
        setLoading(true)
        try {
            const categoriesResponse = await ADMIN_GET_ALL("categories")
            if (categoriesResponse.status === 200) {
                setCategories(categoriesResponse.data.data)
                setFilteredCategories(categoriesResponse.data.data)
            }


        } catch (error) {
            console.error("Error fetching categories:", error)
            Alert.alert("Lỗi", "Đã xảy ra lỗi khi tải danh sách danh mục")
        } finally {
            setLoading(false)
            setRefreshing(false)
        }
    }

    const onRefresh = () => {
        setRefreshing(true)
        fetchCategories()
    }

    const handleAddCategory = () => {
        setEditingCategory(null)
        setCategoryName("")
        setCategoryImage(null)
        setCategoryParent(null)
        setModalVisible(true)
    }

    const handleEditCategory = (category) => {
        setEditingCategory(category)
        setCategoryName(category.name)
        setCategoryImage(category.image)
        setCategoryParent(category.parentId)
        setModalVisible(true)
    }

    const handleDeleteCategory = (categoryId) => {
        Alert.alert(
            "Xác nhận xóa",
            "Bạn có chắc chắn muốn xóa danh mục này không?",
            [
                { text: "Hủy", style: "cancel" },
                {
                    text: "Xóa",
                    style: "destructive",
                    onPress: async () => {
                        try {
                            const response = await ADMIN_DELETE_ID("categories/delete", categoryId);

                            if (response.status === 200) {
                                // Cập nhật danh sách danh mục sau khi xóa
                                const updatedCategories = categories.filter((category) => category.id !== categoryId)
                                setCategories(updatedCategories)
                                setFilteredCategories(updatedCategories)
                                Alert.alert("Thành công", "Đã xóa danh mục")
                            } else {
                                Alert.alert("Lỗi", response.error || "Không thể xóa danh mục")
                            }
                        } catch (error) {
                            console.error("Error deleting category:", error)
                            Alert.alert("Lỗi", "Đã xảy ra lỗi khi xóa danh mục")
                        }
                    },
                },
            ],
            { cancelable: true },
        )
    }

    const pickImage = async () => {
        Alert.alert(
            "Chọn hình ảnh",
            "Bạn muốn chụp ảnh mới hay chọn từ thư viện?",
            [
                {
                    text: "Chụp ảnh",
                    onPress: async () => {
                        try {
                            // Request camera permissions
                            const cameraPermission = await ImagePicker.requestCameraPermissionsAsync();
                            if (!cameraPermission.granted) {
                                Alert.alert("Lỗi", "Bạn cần cấp quyền truy cập camera để chụp ảnh.");
                                return;
                            }

                            const result = await ImagePicker.launchCameraAsync({
                                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                                allowsEditing: true,
                                // aspect: [4, 3],
                                quality: 0.8,
                                allowsEditing: false,
                            });

                            if (!result.canceled) {
                                setCategoryImage(result.assets[0].uri);
                            }
                        } catch (error) {
                            console.error("Error capturing photo:", error);
                            Alert.alert("Lỗi", "Không thể chụp ảnh. Vui lòng thử lại.");
                        }
                    },
                },
                {
                    text: "Chọn từ thư viện",
                    onPress: async () => {
                        try {
                            // Request media library permissions
                            const libraryPermission = await ImagePicker.requestMediaLibraryPermissionsAsync();
                            if (!libraryPermission.granted) {
                                Alert.alert("Lỗi", "Bạn cần cấp quyền truy cập thư viện ảnh.");
                                return;
                            }

                            const result = await ImagePicker.launchImageLibraryAsync({
                                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                                allowsEditing: true,
                                // aspect: [4, 3],
                                quality: 0.8,
                                allowsEditing: false,
                            });

                            if (!result.canceled) {
                                setCategoryImage(result.assets[0].uri);
                            }
                        } catch (error) {
                            console.error("Error selecting image:", error);
                            Alert.alert("Lỗi", "Không thể chọn hình ảnh. Vui lòng thử lại.");
                        }
                    },
                },
                { text: "Hủy", style: "cancel" },
            ],
            { cancelable: true }
        );
    };

    const saveCategory = async () => {
        if (!categoryName.trim()) {
            Alert.alert("Lỗi", "Vui lòng nhập tên danh mục")
            return
        }

        setSavingCategory(true)
        try {
            let categoryResponse;
            const categoryData = {
                name: categoryName,
                parentId: categoryParent,
                displayOrder: 0
            };

            if (editingCategory) {
                categoryResponse = await ADMIN_PUT_ID("categories/updated", editingCategory.id,
                    categoryData
                );
            } else {
                categoryResponse = await ADMIN_POST_ADD("categories/create",
                    categoryData
                );


            }

            if (categoryResponse.status === 200) {
                const savedCategory = categoryResponse.data.data;
                if (categoryImage && categoryImage !== editingCategory?.imageUrl) {
                    const formData = new FormData();
                    formData.append('file', {
                        uri: categoryImage,
                        name: `category_${savedCategory.id}.jpg`,
                        type: 'image/jpeg',
                    });
                    const uploadResponse = await ADMIN_POST_UPLOAD(
                        "upload/categories", savedCategory.id,
                        formData,
                        {
                            headers: {
                                'Content-Type': 'multipart/form-data',
                            },
                        }
                    );



                    if (uploadResponse.status === 200) {
                        const updatedCategories = categories.map((cat) =>
                            cat.id === savedCategory.id ? { ...cat, imageUrl: uploadResponse.data.data.imageUrl } : cat
                        );
                        setCategories(updatedCategories);
                        setFilteredCategories(updatedCategories);
                    } else {
                        Alert.alert("Cảnh báo", "Danh mục đã được lưu nhưng upload ảnh thất bại: " + (uploadResponse.data.message || "Lỗi không xác định"));
                    }
                }

                setModalVisible(false)
                fetchCategories()
                Alert.alert("Thành công", editingCategory ? "Đã cập nhật danh mục" : "Đã thêm danh mục mới")
            } else {
                Alert.alert("Lỗi", categoryResponse.data.message || "Không thể lưu danh mục")
            }
        } catch (error) {
            console.error("Error saving category:", error)
            Alert.alert("Thông báo", "Tên danh mục đã có")
        } finally {
            setSavingCategory(false)
        }
    }

    const renderCategoryItem = ({ item }) => (
        <View style={styles.categoryItem}>
            <Image
                source={{ uri: item.image || "https://placeholder.com/100x100?text=No+Image" }}
                style={styles.categoryImage}
            />
            <View style={styles.categoryInfo}>
                <Text style={styles.categoryName}>{item.name}</Text>
                {item.parentName && <Text style={styles.parentCategory}>Thuộc: {item.parentName}</Text>}
                <Text style={styles.productCount}>{item.productCount} sản phẩm</Text>
            </View>
            <View style={styles.categoryActions}>
                <TouchableOpacity style={styles.actionButton} onPress={() => handleEditCategory(item)}>
                    <Ionicons name="create-outline" size={20} color="#0066cc" />
                </TouchableOpacity>
                <TouchableOpacity style={styles.actionButton} onPress={() => handleDeleteCategory(item.id)}>
                    <Ionicons name="trash-outline" size={20} color="#e30019" />
                </TouchableOpacity>
            </View>
        </View>
    )

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
                    <Ionicons name="arrow-back" size={24} color="#333" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Quản lý danh mục</Text>
                <TouchableOpacity style={styles.addButton} onPress={handleAddCategory}>
                    <Ionicons name="add" size={24} color="#fff" />
                </TouchableOpacity>
            </View>

            <View style={styles.searchContainer}>
                <Ionicons name="search-outline" size={20} color="#666" style={styles.searchIcon} />
                <TextInput
                    style={styles.searchInput}
                    placeholder="Tìm kiếm danh mục..."
                    value={searchQuery}
                    onChangeText={setSearchQuery}
                />
                {searchQuery.length > 0 && (
                    <TouchableOpacity style={styles.clearButton} onPress={() => setSearchQuery("")}>
                        <Ionicons name="close-circle" size={20} color="#666" />
                    </TouchableOpacity>
                )}
            </View>

            {loading && !refreshing ? (
                <View style={styles.loadingContainer}>
                    <ActivityIndicator size="large" color="#e30019" />
                    <Text style={styles.loadingText}>Đang tải danh mục...</Text>
                </View>
            ) : (
                <>
                    {filteredCategories.length === 0 ? (
                        <View style={styles.emptyContainer}>
                            <Ionicons name="grid-outline" size={60} color="#ccc" />
                            <Text style={styles.emptyText}>
                                {searchQuery.length > 0 ? "Không tìm thấy danh mục phù hợp" : "Chưa có danh mục nào trong hệ thống"}
                            </Text>
                            {searchQuery.length === 0 && (
                                <TouchableOpacity style={styles.addFirstButton} onPress={handleAddCategory}>
                                    <Text style={styles.addFirstButtonText}>Thêm danh mục đầu tiên</Text>
                                </TouchableOpacity>
                            )}
                        </View>
                    ) : (
                        <FlatList
                            data={filteredCategories}
                            renderItem={renderCategoryItem}
                            keyExtractor={(item) => item.id.toString()}
                            contentContainerStyle={styles.listContainer}
                            refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
                        />
                    )}
                </>
            )}


            {/* Modal thêm/sửa danh mục */}
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => setModalVisible(false)}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <View style={styles.modalHeader}>
                            <Text style={styles.modalTitle}>{editingCategory ? "Sửa danh mục" : "Thêm danh mục mới"}</Text>
                            <TouchableOpacity style={styles.closeButton} onPress={() => setModalVisible(false)}>
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
                            <TouchableOpacity
                                style={styles.dropdownButton}
                                onPress={() => {
                                    // Hiển thị danh sách danh mục cha để chọn
                                    const parentCategories = categories.filter(
                                        (c) => !c.parentId && (!editingCategory || c.id !== editingCategory.id),
                                    )
                                    if (parentCategories.length === 0) {
                                        Alert.alert("Thông báo", "Không có danh mục cha nào khả dụng")
                                        return
                                    }

                                    Alert.alert("Chọn danh mục cha", "Chọn một danh mục hoặc bỏ qua nếu đây là danh mục chính", [
                                        { text: "Bỏ qua", onPress: () => setCategoryParent(null) },
                                        ...parentCategories.map((cat) => ({
                                            text: cat.name,
                                            onPress: () => setCategoryParent(cat.id),
                                        })),
                                    ])
                                }}
                            >
                                <Text style={styles.dropdownText}>
                                    {categoryParent
                                        ? categories.find((c) => c.id === categoryParent)?.name || "Chọn danh mục cha"
                                        : "Chọn danh mục cha"}
                                </Text>
                                <Ionicons name="chevron-down" size={20} color="#666" />
                            </TouchableOpacity>
                        </View>

                        <View style={styles.buttonContainer}>
                            <TouchableOpacity style={[styles.cancelButton]} onPress={() => setModalVisible(false)}>
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
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#f5f5f5",
    },
    header: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        backgroundColor: "#fff",
        paddingHorizontal: 15,
        paddingVertical: 15,
        borderBottomWidth: 1,
        borderBottomColor: "#eee",
    },
    backButton: {
        padding: 5,
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: "bold",
        color: "#333",
    },
    addButton: {
        backgroundColor: "#e30019",
        width: 40,
        height: 40,
        borderRadius: 20,
        justifyContent: "center",
        alignItems: "center",
    },
    searchContainer: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#fff",
        paddingHorizontal: 15,
        paddingVertical: 10,
        borderBottomWidth: 1,
        borderBottomColor: "#eee",
    },
    searchIcon: {
        marginRight: 10,
    },
    searchInput: {
        flex: 1,
        height: 40,
        fontSize: 16,
    },
    clearButton: {
        padding: 5,
    },
    loadingContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    loadingText: {
        marginTop: 10,
        fontSize: 16,
        color: "#666",
    },
    listContainer: {
        padding: 15,
    },
    categoryItem: {
        flexDirection: "row",
        backgroundColor: "#ccc",
        borderRadius: 10,
        padding: 15,
        marginBottom: 15,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    categoryImage: {
        width: 60,
        height: 60,
        borderRadius: 8,
        marginRight: 15,
    },
    categoryInfo: {
        flex: 1,
    },
    categoryName: {
        fontSize: 16,
        fontWeight: "bold",
        color: "#333",
        marginBottom: 5,
    },
    parentCategory: {
        fontSize: 14,
        color: "#666",
        marginBottom: 5,
    },
    productCount: {
        fontSize: 14,
        color: "#0066cc",
    },
    categoryActions: {
        justifyContent: "space-around",
        paddingLeft: 10,
    },
    actionButton: {
        padding: 8,
    },
    emptyContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: 20,
    },
    emptyText: {
        fontSize: 16,
        color: "#666",
        textAlign: "center",
        marginTop: 10,
        marginBottom: 20,
    },
    addFirstButton: {
        backgroundColor: "#e30019",
        paddingHorizontal: 20,
        paddingVertical: 12,
        borderRadius: 8,
    },
    addFirstButtonText: {
        color: "#fff",
        fontWeight: "bold",
        fontSize: 16,
    },
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

export default AdminCategoriesManagement

