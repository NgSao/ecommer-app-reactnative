import { View, Text, TouchableOpacity, ActivityIndicator, SafeAreaView } from "react-native"
import { Ionicons } from "@expo/vector-icons"
import styles from "../../styles/AdminEditProductStyles"
import useEditProduct from "@hooks/useEditProduct"
import ProductForm from "@components/admin/product/ProductForm"

// const AdminProductEdit = () => {
//     const {
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
//     } = useEditProduct()

//     if (fetching) {
//         return (
//             <View style={styles.loadingContainer}>
//                 <ActivityIndicator size="large" color="#e30019" />
//                 <Text style={styles.loadingText}>Đang tải thông tin sản phẩm...</Text>
//             </View>
//         )
//     }

//     return (
//         <SafeAreaView style={styles.container}>
//             <View style={styles.header}>
//                 <TouchableOpacity style={styles.backButton} onPress={navigateBack}>
//                     <Ionicons name="arrow-back" size={24} color="#333" />
//                 </TouchableOpacity>
//                 <Text style={styles.headerTitle}>Chỉnh sửa sản phẩm</Text>
//             </View>
//             <ProductForm
//                 productData={productData}
//                 categories={categories}
//                 onChangeField={onChangeField}
//                 onPickImage={onPickImage}
//                 imageUri={imageUri}
//                 variants={variants}
//                 onChangeVariantField={onChangeVariantField}
//                 onAddVariant={onAddVariant}
//                 onRemoveVariant={onRemoveVariant}
//                 onPickVariantImage={onPickVariantImage}
//                 onSubmit={onSubmit}
//                 submitLabel="Cập nhật sản phẩm"
//                 submitLoading={loading}
//             />
//         </SafeAreaView>
//     )
// }

// export default AdminProductEdit

const AdminEditProduct = () => {
    const {
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
    } = useEditProduct()

    if (fetching) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#e30019" />
                <Text style={styles.loadingText}>Đang tải thông tin sản phẩm...</Text>
            </View>
        )
    }

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity style={styles.backButton} onPress={navigateBack}>
                    <Ionicons name="arrow-back" size={24} color="#333" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Chỉnh sửa sản phẩm</Text>
            </View>
            <ProductForm
                productData={productData}
                categories={categories}
                onChangeField={onChangeField}
                onPickImage={onPickImage}
                imageUri={imageUri}
                variants={variants}
                onChangeVariantField={onChangeVariantField}
                onAddVariant={onAddVariant}
                onRemoveVariant={onRemoveVariant}
                onPickVariantImage={onPickVariantImage}
                onSubmit={onSubmit}
                submitLabel="Cập nhật sản phẩm"
                submitLoading={loading}
                colors={colors}
                storages={storages}
            />
        </View>
    )
}

export default AdminEditProduct