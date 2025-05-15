import { View, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import styles from "../../styles/AdminAddProductStyles";
import ProductForm from "@components/admin/product/ProductForm";
import { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { Alert } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { ADMIN_POST_ADD, ADMIN_POST_UPLOAD, GET_ALL } from "api/apiService";
import { SafeAreaView } from "react-native-safe-area-context";

const AdminAddProduct = () => {
  const colors = ["Đen", "Trắng", "Xanh", "Vàng"];
  const storages = ["128GB", "256GB", "512GB", "1TB"];
  const navigation = useNavigation();
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
  const [variants, setVariants] = useState([]);
  const [loading, setLoading] = useState(false);
  const [hasVariants, setHasVariants] = useState(true);

  useEffect(() => {
    fetchCategories();
    fetchBrands();
  }, []);

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
    setProductData((prev) => ({
      ...prev,
      [field]: value,
    }));
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
    setVariants((prev) => prev.filter((_, i) => i !== index));
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
    if (imageUris.length === 0) {
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

    setLoading(true);
    try {
      const productPayload = {
        name: productData.name,
        specification: productData.specification,
        description: productData.description,
        promotions: productData.promotions,
        brandId: productData.brandId,
        categoryId: productData.categoryId,
        images: [],
        ...(hasVariants
          ? {
            salePrice: Math.min(...variants.map((v) => parseFloat(v.salePrice) || Infinity)),
            originalPrice: Math.min(...variants.map((v) => parseFloat(v.originalPrice) || Infinity)),
            variants: variants.map((variant) => ({
              color: variant.color,
              size: variant.size,
              salePrice: parseFloat(variant.salePrice),
              originalPrice: parseFloat(variant.originalPrice || variant.salePrice),
              stock: parseInt(variant.stock),
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

      const response = await ADMIN_POST_ADD("products/create", productPayload);
      if (response.status === 200) {
        const productId = response.data.data.id;
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

        // Upload variant images
        if (hasVariants && response.data.data.variants) {
          for (let i = 0; i < variants.length; i++) {
            const variantId = response.data.data.variants[i]?.id;
            if (variantId && variants[i].image) {
              const variantFormData = new FormData();
              variantFormData.append("file", {
                uri: variants[i].image,
                name: `variant_image_${i}.jpg`,
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

        Alert.alert("Thành công", "Sản phẩm đã được thêm thành công", [
          { text: "OK", onPress: () => navigation.goBack() },
        ]);
      } else {
        Alert.alert("Lỗi", response.error || "Không thể thêm sản phẩm");
      }
    } catch (error) {
      console.error("Error adding product:", error);
      Alert.alert("Lỗi", error.message || "Đã xảy ra lỗi khi thêm sản phẩm");
    } finally {
      setLoading(false);
    }
  };

  const navigateBack = () => {
    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={navigateBack}>
          <Ionicons name="arrow-back" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Thêm sản phẩm mới</Text>
      </View>
      <ProductForm
        productData={productData}
        categories={categories}
        brands={brands}
        onChangeField={onChangeField}
        onPickImage={onPickImage}
        imageUris={imageUris}
        onRemoveImage={onRemoveImage}
        variants={variants}
        onChangeVariantField={onChangeVariantField}
        onAddVariant={onAddVariant}
        onRemoveVariant={onRemoveVariant}
        onPickVariantImage={onPickVariantImage}
        onSubmit={onSubmit}
        submitLabel="Thêm sản phẩm"
        submitLoading={loading}
        colors={colors}
        storages={storages}
        hasVariants={hasVariants}
        setHasVariants={setHasVariants}
      />
    </SafeAreaView>
  );
};

export default AdminAddProduct;