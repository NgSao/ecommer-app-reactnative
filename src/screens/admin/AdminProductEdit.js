import { View, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import styles from "../../styles/AdminAddProductStyles";
import ProductForm from "@components/admin/product/ProductForm";
import { useState, useEffect } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Alert } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { ADMIN_DELETE_ID, ADMIN_POST_ADD, ADMIN_POST_UPLOAD, ADMIN_PUT_ID, GET_ALL, GET_ID } from "api/apiService";
import { SafeAreaView } from "react-native-safe-area-context";

const AdminEditProduct = () => {
    const colors = ["Đen", "Trắng", "Xanh", "Vàng"];
    const storages = ["128GB", "256GB", "512GB", "1TB"];
    const navigation = useNavigation();
    const route = useRoute();
    const { productId } = route.params;
    const [productData, setProductData] = useState({
        name: "",
        specification: "",
        description: "",
        promotions: "",
        brandId: null,
        stock: "",
        salePrice: "",
        originalPrice: "",
        categoryId: [],
    });
    const [categories, setCategories] = useState([]);
    const [brands, setBrands] = useState([]);
    const [imageUris, setImageUris] = useState([]);
    const [existingImageUrls, setExistingImageUrls] = useState([]);
    const [variants, setVariants] = useState([]);
    const [loading, setLoading] = useState(true);
    const [submitLoading, setSubmitLoading] = useState(false);
    const [hasVariants, setHasVariants] = useState(true);

    useEffect(() => {
        fetchProduct();
        fetchCategories();
        fetchBrands();
    }, []);

    const fetchProduct = async () => {
        try {
            const response = await GET_ID("products", productId);
            if (response.status === 200) {
                const product = response.data.data;
                setProductData({
                    name: product.name || "",
                    specification: product.specification || "",
                    description: product.description || "",
                    promotions: product.promotions || "",
                    brandId: product.brand?.id || null,
                    stock: product.stock?.toString() || "",
                    salePrice: product.price?.toString() || "",
                    originalPrice: product.originalPrice?.toString() || "",
                    categoryId: product.categories?.map((cat) => cat.id) || [],
                });
                setExistingImageUrls(
                    product.images?.filter((img) => img && typeof img === "string" && img.startsWith("http")) || []
                );
                setImageUris([]);
                setHasVariants(product.variants && product.variants.length > 0);
                setVariants(
                    product.variants?.map((variant, index) => ({
                        id: variant.id,
                        color: variant.color || "",
                        size: variant.storage || "",
                        salePrice: variant.price?.toString() || "0",
                        originalPrice: variant.originalPrice?.toString() || "",
                        stock: variant.stock?.toString() || "",
                        image: variant.image || null,
                        images: variant.image ? [variant.image] : [],
                        displayOrder: variant.displayOrder || index,
                    })) || []
                );
            } else {
                Alert.alert("Lỗi", "Không thể tải thông tin sản phẩm");
            }
        } catch (error) {
            console.error("Error fetching product:", error);
            Alert.alert("Lỗi", "Đã xảy ra lỗi khi tải thông tin sản phẩm");
        } finally {
            setLoading(false);
        }
    };

    const fetchCategories = async () => {
        try {
            const response = await GET_ALL("categories");
            if (response.status === 200) {
                setCategories(response.data.data);
            } else {
                Alert.alert("Lỗi", "Không thể tải danh sách danh mục");
            }
        } catch (error) {
            console.error("Error fetching categories:", error);
            Alert.alert("Lỗi", "Đã xảy ra lỗi khi tải danh sách danh mục");
        }
    };

    const fetchBrands = async () => {
        try {
            const response = await GET_ALL("brands");
            if (response.status === 200) {
                setBrands(response.data.data);
            } else {
                Alert.alert("Lỗi", "Không thể tải danh sách thương hiệu");
            }
        } catch (error) {
            console.error("Error fetching brands:", error);
            Alert.alert("Lỗi", "Đã xảy ra lỗi khi tải danh sách thương hiệu");
        }
    };

    const onChangeField = (field, value) => {
        setProductData((prev) => ({ ...prev, [field]: value }));
    };

    const onPickImage = async () => {
        const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (!permissionResult.granted) {
            Alert.alert("Quyền truy cập bị từ chối", "Ứng dụng cần quyền truy cập vào thư viện ảnh để chọn hình ảnh.");
            return;
        }

        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsMultipleSelection: true,
            allowsEditing: false,
            quality: 1,
        });

        if (!result.canceled) {
            const newUris = result.assets.map((asset) => asset.uri);
            setImageUris((prev) => [...prev, ...newUris]);
        }
    };

    const onRemoveImage = (index) => {
        setImageUris((prev) => prev.filter((_, i) => i !== index));
    };

    const onRemoveExistingImage = (index) => {
        setExistingImageUrls((prev) => prev.filter((_, i) => i !== index));
    };

    const onChangeVariantField = (index, field, value) => {
        setVariants((prev) => {
            const updatedVariants = [...prev];
            updatedVariants[index] = { ...updatedVariants[index], [field]: value };
            return updatedVariants;
        });
    };

    const onAddVariant = () => {
        setVariants((prev) => [
            ...prev,
            {
                id: `new-${prev.length}`,
                color: "",
                size: "",
                salePrice: "",
                originalPrice: "",
                stock: "",
                image: null,
                images: [],
                displayOrder: prev.length + 1,
            },
        ]);
    };


    const onRemoveVariant = (index) => {
        const variant = variants[index];
        Alert.alert(
            "Xác nhận xóa",
            "Bạn có muốn xóa biến thể này không?",
            [
                { text: "Hủy", style: "cancel" },
                {
                    text: "Xóa",
                    style: "destructive",
                    onPress: async () => {
                        if (isNaN(Number(variant.id))) {
                            console.log("variant", variant.id);
                            setVariants((prev) => prev.filter((_, i) => i !== index));
                            return;
                        }
                        try {
                            const response = await ADMIN_DELETE_ID("variants/delete", variant.id);
                            if (response.status === 200) {
                                Alert.alert("Thành công", "Đã xóa biến thể");
                                fetchProduct();
                                return;
                            }
                        } catch (error) {
                            console.error("Error deleting variant:", error);
                            Alert.alert("Lỗi", "Đã xảy ra lỗi khi xóa biến thể");
                            return;
                        }
                        setVariants((prev) => prev.filter((_, i) => i !== index));
                    },
                },
            ],
            { cancelable: true }
        );
    };

    const onPickVariantImage = async (index) => {
        const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (!permissionResult.granted) {
            Alert.alert("Quyền truy cập bị từ chối", "Ứng dụng cần quyền truy cập vào thư viện ảnh để chọn hình ảnh.");
            return;
        }

        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        if (!result.canceled) {
            setVariants((prev) => {
                const updatedVariants = [...prev];
                updatedVariants[index] = {
                    ...updatedVariants[index],
                    image: result.assets[0].uri,
                    images: [result.assets[0].uri],
                };
                return updatedVariants;
            });
        }
    };

    const validateForm = () => {
        if (!productData.name.trim()) {
            Alert.alert("Lỗi", "Vui lòng nhập tên sản phẩm");
            return false;
        }
        if (!productData.brandId) {
            Alert.alert("Lỗi", "Vui lòng chọn thương hiệu");
            return false;
        }
        if (productData.categoryId.length === 0) {
            Alert.alert("Lỗi", "Vui lòng chọn ít nhất một danh mục");
            return false;
        }
        if (imageUris.length === 0 && existingImageUrls.length === 0) {
            Alert.alert("Lỗi", "Vui lòng chọn ít nhất một hình ảnh chính");
            return false;
        }
        if (!hasVariants && (!productData.stock || parseInt(productData.stock) <= 0)) {
            Alert.alert("Lỗi", "Số lượng tồn kho phải lớn hơn 0 khi không có biến thể");
            return false;
        }
        if (!hasVariants && (!productData.salePrice || parseFloat(productData.salePrice) <= 0)) {
            Alert.alert("Lỗi", "Giá bán phải lớn hơn 0 khi không có biến thể");
            return false;
        }
        if (!hasVariants && productData.originalPrice && parseFloat(productData.originalPrice) < parseFloat(productData.salePrice)) {
            Alert.alert("Lỗi", "Giá gốc phải lớn hơn hoặc bằng giá bán");
            return false;
        }
        if (hasVariants && variants.length === 0) {
            Alert.alert("Lỗi", "Vui lòng thêm ít nhất một biến thể khi chọn có biến thể");
            return false;
        }
        for (let i = 0; i < variants.length; i++) {
            const variant = variants[i];
            if (!variant.color) {
                Alert.alert("Lỗi", `Vui lòng nhập/chọn màu sắc cho biến thể ${i + 1}`);
                return false;
            }
            if (!variant.size) {
                Alert.alert("Lỗi", `Vui lòng nhập/chọn dung lượng cho biến thể ${i + 1}`);
                return false;
            }
            if (!variant.salePrice || parseFloat(variant.salePrice) <= 0) {
                Alert.alert("Lỗi", `Vui lòng nhập giá bán hợp lệ cho biến thể ${i + 1}`);
                return false;
            }
            if (variant.originalPrice && parseFloat(variant.originalPrice) < parseFloat(variant.salePrice)) {
                Alert.alert("Lỗi", `Giá gốc phải lớn hơn hoặc bằng giá bán cho biến thể ${i + 1}`);
                return false;
            }
            if (!variant.stock || parseInt(variant.stock) <= 0) {
                Alert.alert("Lỗi", `Vui lòng nhập số lượng tồn kho hợp lệ cho biến thể ${i + 1}`);
                return false;
            }
            if (!variant.image) {
                Alert.alert("Lỗi", `Vui lòng chọn hình ảnh cho biến thể ${i + 1}`);
                return false;
            }
        }
        return true;
    };

    const onSubmit = async () => {
        if (!validateForm()) return;

        setSubmitLoading(true);
        try {
            const productPayload = {
                name: productData.name,
                specification: productData.specification,
                description: productData.description,
                promotions: productData.promotions,
                brandId: productData.brandId,
                categoryId: productData.categoryId,
                images: existingImageUrls.map((url) => ({ imageUrl: url })),
                ...(hasVariants
                    ? {
                        salePrice: Math.min(...variants.map((v) => parseFloat(v.salePrice) || Infinity)),
                        originalPrice: Math.min(...variants.map((v) => parseFloat(v.originalPrice) || Infinity)),
                        variants: variants
                            .filter((variant) => typeof variant.id === 'number')
                            .map((variant) => ({
                                id: variant.id,
                                color: variant.color,
                                size: variant.size,
                                salePrice: parseFloat(variant.salePrice),
                                originalPrice: parseFloat(variant.originalPrice || variant.salePrice),
                                stock: parseInt(variant.stock, 10),
                                displayOrder: variant.displayOrder,
                                imageUrl: null,
                            })),
                    }
                    : {
                        stock: parseInt(productData.stock),
                        salePrice: parseFloat(productData.salePrice),
                        originalPrice: parseFloat(productData.originalPrice || productData.salePrice),
                        variants: [],
                    }),
            };

            const variantPayload = variants
                .filter((variant) => typeof variant.id !== 'number')
                .map((variant) => ({
                    productId: productId,
                    color: variant.color,
                    size: variant.size,
                    salePrice: parseFloat(variant.salePrice),
                    originalPrice: parseFloat(variant.originalPrice || variant.salePrice),
                    stock: parseInt(variant.stock, 10),
                    displayOrder: variant.displayOrder,
                    imageUrl: null,
                }));



            const response = await ADMIN_PUT_ID("products/updated", productId, productPayload);
            console.log("ookeee,updated" + response.status);
            console.log("asss", productPayload)

            if (response.status === 200) {
                if (imageUris.length > 0) {
                    const formData = new FormData();
                    imageUris.forEach((uri, index) => {
                        formData.append("file", {
                            uri,
                            name: `product_image_${index}.jpg`,
                            type: "image/jpeg",
                        });
                    });
                    const imageResponse = await ADMIN_POST_UPLOAD("upload/products", productId, formData, {
                        headers: {
                            "Content-Type": "multipart/form-data",
                        },
                    });

                    if (imageResponse.status !== 200) {
                        throw new Error("Không thể tải lên hình ảnh sản phẩm");
                    }
                }
                if (hasVariants && response.data.data.variants) {
                    for (let i = 0; i < variants.length; i++) {
                        const variant = variants[i];
                        const variantId = variant.id;
                        if (Number.isInteger(Number(variantId)) && variant.image) {
                            const variantFormData = new FormData();
                            variantFormData.append("file", {
                                uri: variant.image,
                                name: `variant_image_${variantId}.jpg`,
                                type: "image/jpeg",
                            });
                            const variantImageResponse = await ADMIN_POST_UPLOAD("upload/variants", variantId, variantFormData, {
                                headers: {
                                    "Content-Type": "multipart/form-data",
                                },
                            });

                            if (variantImageResponse.status !== 200) {
                                throw new Error(`Không thể tải lên hình ảnh cho biến thể ${i + 1}`);
                            }
                        }
                    }
                }




                Alert.alert("Thành công", "Sản phẩm đã được cập nhật thành công", [
                    { text: "OK", onPress: () => navigation.goBack() },
                ]);
            } else {
                Alert.alert("Lỗi", response.error || "Không thể cập nhật sản phẩm");
            }

            const responseVariants = await ADMIN_POST_ADD("variants/create", variantPayload);
            if (responseVariants.status === 200) {
                const variantId = response.data.data.id;
                if (imageUris.length > 0) {
                    for (let i = 0; i < imageUris.length; i++) {
                        const formData = new FormData();
                        formData.append("file", {
                            uri: imageUris[i],
                            name: `variant_image_${variantId}_${i}.jpg`,
                            type: "image/jpeg",
                        });
                        const imageVanResponse = await ADMIN_POST_UPLOAD("upload/variants", variantId, formData, {
                            headers: {
                                "Content-Type": "multipart/form-data",
                            },
                        });

                        if (imageVanResponse.status !== 200) {
                            throw new Error("Không thể tải lên hình ảnh sản phẩm");
                        }
                    }
                }
            }


        } catch (error) {
            console.error("Error updating product:", error);
            Alert.alert("Lỗi", error.message || "Đã xảy ra lỗi khi cập nhật sản phẩm");
        } finally {
            setSubmitLoading(false);
        }
    };

    const navigateBack = () => {
        navigation.goBack();
    };

    if (loading) {
        return (
            <View style={styles.loadingContainer}>
                <Ionicons name="refresh-circle" size={24} color="#e30019" />
                <Text style={styles.loadingText}>Đang tải sản phẩm...</Text>
            </View>
        );
    }

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity style={styles.backButton} onPress={navigateBack}>
                    <Ionicons name="arrow-back" size={24} color="#333" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Sửa sản phẩm</Text>
            </View>
            <ProductForm
                productData={productData}
                categories={categories}
                brands={brands}
                onChangeField={onChangeField}
                onPickImage={onPickImage}
                imageUris={imageUris}
                existingImageUrls={existingImageUrls}
                onRemoveImage={onRemoveImage}
                onRemoveExistingImage={onRemoveExistingImage}
                variants={variants}
                onChangeVariantField={onChangeVariantField}
                onAddVariant={onAddVariant}
                onRemoveVariant={onRemoveVariant}
                onPickVariantImage={onPickVariantImage}
                onSubmit={onSubmit}
                submitLabel="Cập nhật sản phẩm"
                submitLoading={submitLoading}
                colors={colors}
                storages={storages}
                hasVariants={hasVariants}
                setHasVariants={setHasVariants}
            />
        </SafeAreaView>
    );
};

export default AdminEditProduct;
