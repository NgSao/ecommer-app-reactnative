// import { useState, useEffect } from "react"
// import { useNavigation, useRoute } from "@react-navigation/native"
// import { Alert } from "react-native"
// import * as ImagePicker from "expo-image-picker"
// import { api } from "@service/apiAdmin"

// const useEditProduct = () => {
//     const navigation = useNavigation()
//     const route = useRoute()
//     const { productId } = route.params
//     const [productData, setProductData] = useState({
//         name: "",
//         description: "",
//         category: "",
//     })
//     const [categories, setCategories] = useState([])
//     const [imageUri, setImageUri] = useState(null)
//     const [variants, setVariants] = useState([])
//     const [loading, setLoading] = useState(false)
//     const [fetching, setFetching] = useState(true)

//     useEffect(() => {
//         fetchProductDetails()
//         fetchCategories()
//     }, [])

//     const fetchProductDetails = async () => {
//         setFetching(true)
//         try {
//             const response = await api.admin.getProductById(productId)
//             if (response.success) {
//                 const { name, description, category, image, variants } = response.data
//                 setProductData({
//                     name,
//                     description,
//                     category,
//                 })
//                 setImageUri(image)
//                 setVariants(
//                     variants.map((variant) => ({
//                         id: variant.id,
//                         color: variant.color,
//                         storage: variant.storage,
//                         price: variant.price.toString(),
//                         originalPrice: variant.originalPrice.toString(),
//                         stock: variant.stock.toString(),
//                         image: variant.image,
//                         images: variant.images,
//                     })),
//                 )
//             } else {
//                 Alert.alert("Lỗi", "Không thể tải thông tin sản phẩm")
//             }
//         } catch (error) {
//             console.error("Error fetching product details:", error)
//             Alert.alert("Lỗi", "Đã xảy ra lỗi khi tải thông tin sản phẩm")
//         } finally {
//             setFetching(false)
//         }
//     }

//     const fetchCategories = async () => {
//         try {
//             const response = await api.admin.getCategories()
//             if (response.success) {
//                 setCategories(response.data)
//             } else {
//                 Alert.alert("Lỗi", "Không thể tải danh sách danh mục")
//             }
//         } catch (error) {
//             console.error("Error fetching categories:", error)
//             Alert.alert("Lỗi", "Đã xảy ra lỗi khi tải danh sách danh mục")
//         }
//     }

//     const onChangeField = (field, value) => {
//         setProductData((prev) => ({ ...prev, [field]: value }))
//     }

//     const onPickImage = async () => {
//         const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync()
//         if (!permissionResult.granted) {
//             Alert.alert("Quyền truy cập bị từ chối", "Ứng dụng cần quyền truy cập vào thư viện ảnh để chọn hình ảnh.")
//             return
//         }

//         const result = await ImagePicker.launchImageLibraryAsync({
//             mediaTypes: ImagePicker.MediaTypeOptions.Images,
//             allowsEditing: true,
//             aspect: [4, 3],
//             quality: 1,
//         })

//         if (!result.canceled) {
//             setImageUri(result.assets[0].uri)
//         }
//     }

//     const onChangeVariantField = (index, field, value) => {
//         setVariants((prev) => {
//             const updatedVariants = [...prev]
//             updatedVariants[index] = { ...updatedVariants[index], [field]: value }
//             return updatedVariants
//         })
//     }

//     const onAddVariant = () => {
//         setVariants((prev) => [
//             ...prev,
//             {
//                 id: `new-${prev.length}`,
//                 color: "",
//                 storage: "",
//                 price: "",
//                 originalPrice: "",
//                 stock: "",
//                 image: null,
//                 images: [],
//             },
//         ])
//     }

//     const onRemoveVariant = (index) => {
//         setVariants((prev) => prev.filter((_, i) => i !== index))
//     }

//     const onPickVariantImage = async (index) => {
//         const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync()
//         if (!permissionResult.granted) {
//             Alert.alert("Quyền truy cập bị từ chối", "Ứng dụng cần quyền truy cập vào thư viện ảnh để chọn hình ảnh.")
//             return
//         }

//         const result = await ImagePicker.launchImageLibraryAsync({
//             mediaTypes: ImagePicker.MediaTypeOptions.Images,
//             allowsEditing: true,
//             aspect: [4, 3],
//             quality: 1,
//         })

//         if (!result.canceled) {
//             setVariants((prev) => {
//                 const updatedVariants = [...prev]
//                 updatedVariants[index] = {
//                     ...updatedVariants[index],
//                     image: result.assets[0].uri,
//                     images: [result.assets[0].uri],
//                 }
//                 return updatedVariants
//             })
//         }
//     }

//     const validateForm = () => {
//         if (!productData.name.trim()) {
//             Alert.alert("Lỗi", "Vui lòng nhập tên sản phẩm")
//             return false
//         }
//         if (!productData.category) {
//             Alert.alert("Lỗi", "Vui lòng chọn danh mục")
//             return false
//         }
//         if (!imageUri) {
//             Alert.alert("Lỗi", "Vui lòng chọn hình ảnh chính")
//             return false
//         }
//         if (variants.length === 0) {
//             Alert.alert("Lỗi", "Vui lòng thêm ít nhất một biến thể")
//             return false
//         }
//         for (let i = 0; i < variants.length; i++) {
//             const variant = variants[i]
//             if (!variant.color.trim()) {
//                 Alert.alert("Lỗi", `Vui lòng nhập màu sắc cho biến thể ${i + 1}`)
//                 return false
//             }
//             if (!variant.storage.trim()) {
//                 Alert.alert("Lỗi", `Vui lòng nhập dung lượng cho biến thể ${i + 1}`)
//                 return false
//             }
//             if (!variant.price.trim()) {
//                 Alert.alert("Lỗi", `Vui lòng nhập giá cho biến thể ${i + 1}`)
//                 return false
//             }
//             if (!variant.stock.trim()) {
//                 Alert.alert("Lỗi", `Vui lòng nhập số lượng tồn kho cho biến thể ${i + 1}`)
//                 return false
//             }
//             if (!variant.image) {
//                 Alert.alert("Lỗi", `Vui lòng chọn hình ảnh cho biến thể ${i + 1}`)
//                 return false
//             }
//         }
//         return true
//     }

//     const onSubmit = async () => {
//         if (!validateForm()) return

//         setLoading(true)
//         try {
//             const formData = {
//                 ...productData,
//                 image: imageUri,
//                 price: Math.min(...variants.map((v) => parseFloat(v.price) || 0)),
//                 originalPrice: Math.min(...variants.map((v) => parseFloat(v.originalPrice) || 0)),
//                 variants: variants.map((variant, index) => ({
//                     id: variant.id || `new-${index}`,
//                     color: variant.color,
//                     storage: variant.storage,
//                     price: parseFloat(variant.price) || 0,
//                     originalPrice: parseFloat(variant.originalPrice) || 0,
//                     stock: parseInt(variant.stock, 10) || 0,
//                     image: variant.image,
//                     images: variant.images,
//                 })),
//             }

//             const response = await api.admin.updateProduct(productId, formData)
//             if (response.success) {
//                 Alert.alert("Thành công", "Sản phẩm đã được cập nhật thành công", [
//                     { text: "OK", onPress: () => navigation.goBack() },
//                 ])
//             } else {
//                 Alert.alert("Lỗi", response.error || "Không thể cập nhật sản phẩm")
//             }
//         } catch (error) {
//             console.error("Error updating product:", error)
//             Alert.alert("Lỗi", "Đã xảy ra lỗi khi cập nhật sản phẩm")
//         } finally {
//             setLoading(false)
//         }
//     }

//     const navigateBack = () => {
//         navigation.goBack()
//     }

//     return {
//         productData,
//         categories,
//         imageUri,
//         variants,
//         loading,
//         fetching,
//         onChangeField,
//         onPickImage,
//         onChangeVariantField,
//         onAddVariant,
//         onRemoveVariant,
//         onPickVariantImage,
//         onSubmit,
//         navigateBack,
//     }
// }

// export default useEditProduct


import { useState, useEffect } from "react"
import { useNavigation, useRoute } from "@react-navigation/native"
import { Alert } from "react-native"
import * as ImagePicker from "expo-image-picker"
import { api } from '@service/apiAdmin';

const colors = ["Đen", "Trắng", "Xanh", "Vàng"]
const storages = ["128GB", "256GB", "512GB", "1TB"]

const useEditProduct = () => {
    const navigation = useNavigation()
    const route = useRoute()
    const { productId } = route.params
    const [productData, setProductData] = useState({
        name: "",
        description: "",
        category: "",
    })
    const [categories, setCategories] = useState([])
    const [imageUri, setImageUri] = useState(null)
    const [variants, setVariants] = useState([])
    const [loading, setLoading] = useState(false)
    const [fetching, setFetching] = useState(true)

    useEffect(() => {
        fetchProductDetails()
        fetchCategories()
    }, [])

    const fetchProductDetails = async () => {
        setFetching(true)
        try {
            const response = await api.admin.getProductById(productId)
            if (response.success) {
                const { name, description, category, image, variants } = response.data
                setProductData({
                    name,
                    description,
                    category,
                })
                setImageUri(image)
                setVariants(
                    variants.map((variant) => ({
                        id: variant.id,
                        color: variant.color,
                        storage: variant.storage,
                        price: variant.price.toString(),
                        originalPrice: variant.originalPrice.toString(),
                        stock: variant.stock.toString(),
                        image: variant.image,
                        images: variant.images,
                    })),
                )
            } else {
                Alert.alert("Lỗi", "Không thể tải thông tin sản phẩm")
            }
        } catch (error) {
            console.error("Error fetching product details:", error)
            Alert.alert("Lỗi", "Đã xảy ra lỗi khi tải thông tin sản phẩm")
        } finally {
            setFetching(false)
        }
    }

    const fetchCategories = async () => {
        try {
            const response = await api.admin.getCategories()
            if (response.success) {
                setCategories(response.data)
            } else {
                Alert.alert("Lỗi", "Không thể tải danh sách danh mục")
            }
        } catch (error) {
            console.error("Error fetching categories:", error)
            Alert.alert("Lỗi", "Đã xảy ra lỗi khi tải danh sách danh mục")
        }
    }

    const onChangeField = (field, value) => {
        setProductData((prev) => ({ ...prev, [field]: value }))
    }

    const onPickImage = async () => {
        const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync()
        if (!permissionResult.granted) {
            Alert.alert("Quyền truy cập bị từ chối", "Ứng dụng cần quyền truy cập vào thư viện ảnh để chọn hình ảnh.")
            return
        }

        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        })

        if (!result.canceled) {
            setImageUri(result.assets[0].uri)
        }
    }

    const onChangeVariantField = (index, field, value) => {
        setVariants((prev) => {
            const updatedVariants = [...prev]
            updatedVariants[index] = { ...updatedVariants[index], [field]: value }
            return updatedVariants
        })
    }

    const onAddVariant = () => {
        setVariants((prev) => [
            ...prev,
            {
                id: `new-${prev.length}`,
                color: "",
                storage: "",
                price: "",
                originalPrice: "",
                stock: "",
                image: null,
                images: [],
            },
        ])
    }

    const onRemoveVariant = (index) => {
        setVariants((prev) => prev.filter((_, i) => i !== index))
    }

    const onPickVariantImage = async (index) => {
        const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync()
        if (!permissionResult.granted) {
            Alert.alert("Quyền truy cập bị từ chối", "Ứng dụng cần quyền truy cập vào thư viện ảnh để chọn hình ảnh.")
            return
        }

        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        })

        if (!result.canceled) {
            setVariants((prev) => {
                const updatedVariants = [...prev]
                updatedVariants[index] = {
                    ...updatedVariants[index],
                    image: result.assets[0].uri,
                    images: [result.assets[0].uri],
                }
                return updatedVariants
            })
        }
    }

    const validateForm = () => {
        if (!productData.name.trim()) {
            Alert.alert("Lỗi", "Vui lòng nhập tên sản phẩm")
            return false
        }
        if (!productData.category) {
            Alert.alert("Lỗi", "Vui lòng chọn danh mục")
            return false
        }
        if (!imageUri) {
            Alert.alert("Lỗi", "Vui lòng chọn hình ảnh chính")
            return false
        }
        if (variants.length === 0) {
            Alert.alert("Lỗi", "Vui lòng thêm ít nhất một biến thể")
            return false
        }
        for (let i = 0; i < variants.length; i++) {
            const variant = variants[i]
            if (!variant.color) {
                Alert.alert("Lỗi", `Vui lòng chọn màu sắc cho biến thể ${i + 1}`)
                return false
            }
            if (!variant.storage) {
                Alert.alert("Lỗi", `Vui lòng chọn dung lượng cho biến thể ${i + 1}`)
                return false
            }
            if (!variant.price.trim()) {
                Alert.alert("Lỗi", `Vui lòng nhập giá cho biến thể ${i + 1}`)
                return false
            }
            if (!variant.stock.trim()) {
                Alert.alert("Lỗi", `Vui lòng nhập số lượng tồn kho cho biến thể ${i + 1}`)
                return false
            }
            if (!variant.image) {
                Alert.alert("Lỗi", `Vui lòng chọn hình ảnh cho biến thể ${i + 1}`)
                return false
            }
        }
        return true
    }

    const onSubmit = async () => {
        if (!validateForm()) return

        setLoading(true)
        try {
            const formData = {
                ...productData,
                image: imageUri,
                price: Math.min(...variants.map((v) => parseFloat(v.price) || 0)),
                originalPrice: Math.min(...variants.map((v) => parseFloat(v.originalPrice) || 0)),
                variants: variants.map((variant, index) => ({
                    id: variant.id || `new-${index}`,
                    color: variant.color,
                    storage: variant.storage,
                    price: parseFloat(variant.price) || 0,
                    originalPrice: parseFloat(variant.originalPrice) || 0,
                    stock: parseInt(variant.stock, 10) || 0,
                    image: variant.image,
                    images: variant.images,
                })),
            }

            const response = await api.admin.updateProduct(productId, formData)
            if (response.success) {
                Alert.alert("Thành công", "Sản phẩm đã được cập nhật thành công", [
                    { text: "OK", onPress: () => navigation.goBack() },
                ])
            } else {
                Alert.alert("Lỗi", response.error || "Không thể cập nhật sản phẩm")
            }
        } catch (error) {
            console.error("Error updating product:", error)
            Alert.alert("Lỗi", "Đã xảy ra lỗi khi cập nhật sản phẩm")
        } finally {
            setLoading(false)
        }
    }

    const navigateBack = () => {
        navigation.goBack()
    }

    return {
        productData,
        categories,
        imageUri,
        variants,
        loading,
        fetching,
        colors,
        storages,
        onChangeField,
        onPickImage,
        onChangeVariantField,
        onAddVariant,
        onRemoveVariant,
        onPickVariantImage,
        onSubmit,
        navigateBack,
    }
}

export default useEditProduct