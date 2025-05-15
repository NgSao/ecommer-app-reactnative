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
import { useState, useEffect } from "react"

import { Ionicons } from "@expo/vector-icons"
import styles from "../../styles/AdminCategoriesManagementStyles"
import { useNavigation } from "@react-navigation/native";
import * as ImagePicker from "expo-image-picker";
import { ADMIN_DELETE_ID, ADMIN_GET_ALL, ADMIN_POST_ADD, ADMIN_POST_UPLOAD, ADMIN_PUT_ID } from "api/apiService"
import { SafeAreaView } from 'react-native-safe-area-context';

const AdminBrandManagement = () => {
    const navigation = useNavigation();
    const [brands, setBrands] = useState([]);
    const [loading, setLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const [filteredBrands, setFilteredBrands] = useState([]);
    const [modalVisible, setModalVisible] = useState(false);
    const [editingBrand, setEditingBrand] = useState(null);
    const [brandName, setBrandName] = useState("");
    const [brandImage, setBrandImage] = useState(null);
    const [savingBrand, setSavingBrand] = useState(false);

    useEffect(() => {
        fetchBrands();
    }, []);

    useEffect(() => {
        if (searchQuery.trim() === "") {
            setFilteredBrands(brands);
        } else {
            const filtered = brands.filter((brand) =>
                brand.name.toLowerCase().includes(searchQuery.toLowerCase())
            );
            setFilteredBrands(filtered);
        }
    }, [searchQuery, brands]);

    const fetchBrands = async () => {
        setLoading(true);
        try {
            const response = await ADMIN_GET_ALL("brands")
            if (response.status === 200) {
                setBrands(response.data.data)
                setFilteredBrands(response.data.data)
            }


        } catch (error) {
            console.error("Error fetching categories:", error)
            Alert.alert("Lỗi", "Đã xảy ra lỗi khi tải danh sách thương hiệu")
        } finally {
            setLoading(false)
            setRefreshing(false)
        }
    };
    const onRefresh = () => {
        setRefreshing(true);
        fetchBrands();
    };

    const handleAddBrand = () => {
        setEditingBrand(null);
        setBrandName("");
        setBrandImage(null);
        setModalVisible(true);
    };

    const handleEditBrand = (brand) => {
        setEditingBrand(brand);
        setBrandName(brand.name);
        setBrandImage(brand.image);
        setModalVisible(true);
    };


    const handleDeleteBrand = (brandId) => {
        Alert.alert(
            "Xác nhận xóa",
            "Bạn có chắc muốn xóa thương hiệu không?",
            [
                { text: "Hủy", style: "cancel" },
                {
                    text: "Xóa",
                    style: "destructive",
                    onPress: async () => {
                        try {
                            const response = await ADMIN_DELETE_ID("brands/delete", brandId);

                            if (response.status === 200) {
                                const updatedBrand = brands.filter((brand) => brand.id !== brandId)
                                setBrands(updatedBrand)
                                setFilteredBrands(updatedBrand)
                                Alert.alert("Thành công", "Đã xóa thương hiệu")
                            } else {
                                Alert.alert("Lỗi", response.error || "Không thể xóa thương hiệu")
                            }
                        } catch (error) {
                            console.error("Error deleting category:", error)
                            Alert.alert("Lỗi", "Đã xảy ra lỗi khi xóa thương hiệu")
                        }
                    },
                },
            ],
            { cancelable: true }
        );
    };

    const pickImage = async () => {
        Alert.alert(
            "Chọn hình ảnh",
            "Bạn muốn chụp ảnh mới hay chọn từ thư viện?",
            [
                {
                    text: "Chụp ảnh",
                    onPress: async () => {
                        try {
                            const cameraPermission = await ImagePicker.requestCameraPermissionsAsync();
                            if (!cameraPermission.granted) {
                                Alert.alert("Lỗi", "Bạn cần cấp quyền truy cập camera để chụp ảnh.");
                                return;
                            }

                            const result = await ImagePicker.launchCameraAsync({
                                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                                allowsEditing: true,
                                quality: 0.8,
                                allowsEditing: false,
                            });

                            if (!result.canceled) {
                                setBrandImage(result.assets[0].uri);
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
                                quality: 0.8,
                                allowsEditing: false,
                            });

                            if (!result.canceled) {
                                setBrandImage(result.assets[0].uri);
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

    const saveBrand = async () => {
        if (!brandName.trim()) {
            Alert.alert("Lỗi", "Vui lòng nhập tên thương hiệu")
            return;
        }
        setSavingBrand(true);
        try {
            let brandResponse;
            const brandData = {
                name: brandName,
                displayOrder: 0
            };
            console.log("bradd", brandData);

            if (editingBrand) {
                brandResponse = await ADMIN_PUT_ID("brands/updated", editingBrand.id,
                    brandData
                );
            } else {
                brandResponse = await ADMIN_POST_ADD("brands/create",
                    brandData
                );
            }

            if (brandResponse.status === 200) {
                const savedBrand = brandResponse.data.data;
                if (brandImage && brandImage !== editingBrand?.imageUrl) {
                    const formData = new FormData();
                    formData.append('file', {
                        uri: brandImage,
                        name: `brand_${savedBrand.id}.jpg`,
                        type: 'image/jpeg',
                    });
                    const uploadResponse = await ADMIN_POST_UPLOAD(
                        "upload/brands", savedBrand.id,
                        formData,
                        {
                            headers: {
                                'Content-Type': 'multipart/form-data',
                            },
                        }
                    );



                    if (uploadResponse.status === 200) {
                        const updatedResponse = brands.map((cat) =>
                            cat.id === savedBrand.id ? { ...cat, imageUrl: uploadResponse.data.data.imageUrl } : cat
                        );
                        setBrands(updatedResponse);
                        setFilteredBrands(updatedResponse);
                    } else {
                        Alert.alert("Cảnh báo", "Thương hiệu đã được lưu nhưng upload ảnh thất bại: " + (uploadResponse.data.message || "Lỗi không xác định"));
                    }
                }

                setModalVisible(false)
                fetchBrands()
                Alert.alert("Thành công", editingBrand ? "Đã cập nhật thương hiệu" : "Đã thêm thương hiệu mới")
            } else {
                Alert.alert("Lỗi", brandResponse.data.message || "Không thể lưu thương hiệu")
            }
        } catch (error) {
            console.error("Error saving category:", error)
            Alert.alert("Thông báo", "Tên thương hiệu đã có")
        } finally {
            setSavingBrand(false)
        }
    }


    const renderItem = ({ item }) => (
        <View style={styles.categoryItem}>
            <Image
                source={{ uri: item.image || "https://placeholder.com/100x100?text=No+Image" }}
                style={styles.categoryImage}
            />
            <View style={styles.categoryInfo}>
                <Text style={styles.categoryName}>{item.name}</Text>
                <Text style={styles.productCount}>{item.productCount} sản phẩm</Text>
            </View>
            <View style={styles.categoryActions}>
                <TouchableOpacity style={styles.actionButton} onPress={() => handleEditBrand(item)}>
                    <Ionicons name="create-outline" size={20} color="#0066cc" />
                </TouchableOpacity>
                <TouchableOpacity style={styles.actionButton} onPress={() => handleDeleteBrand(item.id)}>
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
                <Text style={styles.headerTitle}>Quản lý thương hiệu</Text>
                <TouchableOpacity style={styles.addButton} onPress={handleAddBrand}>
                    <Ionicons name="add" size={24} color="#fff" />
                </TouchableOpacity>
            </View>

            <View style={styles.searchContainer}>
                <Ionicons name="search-outline" size={20} color="#666" style={styles.searchIcon} />
                <TextInput
                    style={styles.searchInput}
                    placeholder="Tìm kiếm thương hiệu..."
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
                    <Text style={styles.loadingText}>Đang tải thương hiệu...</Text>
                </View>
            ) : (
                <>
                    {filteredBrands.length === 0 ? (
                        <View style={styles.emptyContainer}>
                            <Ionicons name="grid-outline" size={60} color="#ccc" />
                            <Text style={styles.emptyText}>
                                {searchQuery.length > 0 ? "Không tìm thấy thương hiệu phù hợp" : "Chưa có thương hiệu nào trong hệ thống"}
                            </Text>
                            {searchQuery.length === 0 && (
                                <TouchableOpacity style={styles.addFirstButton} onPress={handleAddBrand}>
                                    <Text style={styles.addFirstButtonText}>Thêm thương hiệu đầu tiên</Text>
                                </TouchableOpacity>
                            )}
                        </View>) : (
                        <FlatList
                            data={filteredBrands}
                            renderItem={renderItem}
                            keyExtractor={(item) => item.id.toString()}
                            contentContainerStyle={styles.listContainer}
                            refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
                        />
                    )}
                </>
            )}

            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => setModalVisible(false)}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <View style={styles.modalHeader}>
                            <Text style={styles.modalTitle}>{editingBrand ? "Sửa thương hiệu" : "Thêm thương hiệu mới"}</Text>
                            <TouchableOpacity style={styles.closeButton} onPress={() => setModalVisible(false)}>
                                <Ionicons name="close" size={24} color="#333" />
                            </TouchableOpacity>
                        </View>

                        <View style={styles.formGroup}>
                            <Text style={styles.label}>Tên thương hiệu</Text>
                            <TextInput
                                style={styles.input}
                                placeholder="Nhập tên thương hiệu"
                                value={brandName}
                                onChangeText={setBrandName}
                            />
                        </View>

                        <View style={styles.formGroup}>
                            <Text style={styles.label}>Hình ảnh</Text>
                            <TouchableOpacity style={styles.imagePicker} onPress={pickImage}>
                                {brandImage ? (
                                    <Image source={{ uri: brandImage }} style={styles.previewImage} />
                                ) : (
                                    <View style={styles.placeholderImage}>
                                        <Ionicons name="image-outline" size={40} color="#ccc" />
                                        <Text style={styles.placeholderText}>Chọn hình ảnh</Text>
                                    </View>
                                )}
                            </TouchableOpacity>
                        </View>
                        <View style={styles.buttonContainer}>
                            <TouchableOpacity style={[styles.cancelButton]} onPress={() => setModalVisible(false)}>
                                <Text style={styles.cancelButtonText}>Hủy</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={[styles.saveButton, savingBrand && styles.disabledButton]}
                                onPress={saveBrand}
                                disabled={savingBrand}
                            >
                                {savingBrand ? (
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

export default AdminBrandManagement