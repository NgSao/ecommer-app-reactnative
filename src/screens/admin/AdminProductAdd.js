import { View, Text, TouchableOpacity, SafeAreaView } from "react-native"
import { Ionicons } from "@expo/vector-icons"
import styles from "../../styles/AdminAddProductStyles"
import useAddProduct from "@hooks/useAddProduct"
import ProductForm from "@components/admin/product/ProductForm"

// const AdminProductAdd = () => {
//   const {
//     productData,
//     categories,
//     imageUri,
//     variants,
//     loading,
//     onChangeField,
//     onPickImage,
//     onChangeVariantField,
//     onAddVariant,
//     onRemoveVariant,
//     onPickVariantImage,
//     onSubmit,
//     navigateBack,
//   } = useAddProduct()

//   return (
//     <SafeAreaView style={styles.container}>
//       <View style={styles.header}>
//         <TouchableOpacity style={styles.backButton} onPress={navigateBack}>
//           <Ionicons name="arrow-back" size={24} color="#333" />
//         </TouchableOpacity>
//         <Text style={styles.headerTitle}>Thêm sản phẩm mới</Text>
//       </View>
//       <ProductForm
//         productData={productData}
//         categories={categories}
//         onChangeField={onChangeField}
//         onPickImage={onPickImage}
//         imageUri={imageUri}
//         variants={variants}
//         onChangeVariantField={onChangeVariantField}
//         onAddVariant={onAddVariant}
//         onRemoveVariant={onRemoveVariant}
//         onPickVariantImage={onPickVariantImage}
//         onSubmit={onSubmit}
//         submitLabel="Thêm sản phẩm"
//         submitLoading={loading}
//       />
//     </SafeAreaView>
//   )
// }

// export default AdminProductAdd

const AdminAddProduct = () => {
  const {
    productData,
    categories,
    imageUri,
    variants,
    loading,
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
  } = useAddProduct()

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={navigateBack}>
          <Ionicons name="arrow-back" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Thêm sản phẩm mới</Text>
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
        submitLabel="Thêm sản phẩm"
        submitLoading={loading}
        colors={colors}
        storages={storages}
      />
    </View>
  )
}

export default AdminAddProduct