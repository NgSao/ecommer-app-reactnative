// import { View, Text, TextInput, TouchableOpacity, Image, ScrollView, StyleSheet, FlatList } from "react-native"
// import { Ionicons } from "@expo/vector-icons"
// import * as ImagePicker from "expo-image-picker"

// const ProductForm = ({
//     productData,
//     categories,
//     onChangeField,
//     onPickImage,
//     imageUri,
//     onSubmit,
//     submitLabel,
//     submitLoading,
//     variants,
//     onChangeVariantField,
//     onAddVariant,
//     onRemoveVariant,
//     onPickVariantImage,
// }) => {
//     const renderVariantItem = ({ item, index }) => (
//         <View style={styles.variantItem}>
//             <View style={styles.variantHeader}>
//                 <Text style={styles.variantTitle}>Biến thể {index + 1}</Text>
//                 <TouchableOpacity onPress={() => onRemoveVariant(index)}>
//                     <Ionicons name="trash-outline" size={20} color="#e30019" />
//                 </TouchableOpacity>
//             </View>
//             <View style={styles.variantField}>
//                 <Text style={styles.label}>Màu sắc</Text>
//                 <TextInput
//                     style={styles.input}
//                     placeholder="Nhập màu sắc..."
//                     value={item.color}
//                     onChangeText={(text) => onChangeVariantField(index, "color", text)}
//                 />
//             </View>
//             <View style={styles.variantField}>
//                 <Text style={styles.label}>Dung lượng</Text>
//                 <TextInput
//                     style={styles.input}
//                     placeholder="Nhập dung lượng (VD: 128GB)..."
//                     value={item.storage}
//                     onChangeText={(text) => onChangeVariantField(index, "storage", text)}
//                 />
//             </View>
//             <View style={styles.variantField}>
//                 <Text style={styles.label}>Giá</Text>
//                 <TextInput
//                     style={styles.input}
//                     placeholder="Nhập giá biến thể..."
//                     value={item.price.toString()}
//                     onChangeText={(text) => onChangeVariantField(index, "price", text.replace(/[^0-9]/g, ""))}
//                     keyboardType="numeric"
//                 />
//             </View>
//             <View style={styles.variantField}>
//                 <Text style={styles.label}>Giá gốc</Text>
//                 <TextInput
//                     style={styles.input}
//                     placeholder="Nhập giá gốc (nếu có)..."
//                     value={item.originalPrice.toString()}
//                     onChangeText={(text) => onChangeVariantField(index, "originalPrice", text.replace(/[^0-9]/g, ""))}
//                     keyboardType="numeric"
//                 />
//             </View>
//             <View style={styles.variantField}>
//                 <Text style={styles.label}>Số lượng tồn kho</Text>
//                 <TextInput
//                     style={styles.input}
//                     placeholder="Nhập số lượng tồn kho..."
//                     value={item.stock.toString()}
//                     onChangeText={(text) => onChangeVariantField(index, "stock", text.replace(/[^0-9]/g, ""))}
//                     keyboardType="numeric"
//                 />
//             </View>
//             <View style={styles.variantField}>
//                 <Text style={styles.label}>Hình ảnh biến thể</Text>
//                 <TouchableOpacity
//                     style={styles.imagePickerButton}
//                     onPress={() => onPickVariantImage(index)}
//                 >
//                     <Ionicons name="image-outline" size={24} color="#666" />
//                     <Text style={styles.imagePickerText}>
//                         {item.image ? "Thay đổi hình ảnh" : "Chọn hình ảnh"}
//                     </Text>
//                 </TouchableOpacity>
//                 {item.image && (
//                     <Image source={{ uri: item.image }} style={styles.previewImage} />
//                 )}
//             </View>
//         </View>
//     )

//     return (
//         <ScrollView style={styles.formContainer}>
//             <View style={styles.fieldContainer}>
//                 <Text style={styles.label}>Tên sản phẩm</Text>
//                 <TextInput
//                     style={styles.input}
//                     placeholder="Nhập tên sản phẩm..."
//                     value={productData.name}
//                     onChangeText={(text) => onChangeField("name", text)}
//                 />
//             </View>

//             <View style={styles.fieldContainer}>
//                 <Text style={styles.label}>Mô tả</Text>
//                 <TextInput
//                     style={[styles.input, styles.textArea]}
//                     placeholder="Nhập mô tả sản phẩm..."
//                     value={productData.description}
//                     onChangeText={(text) => onChangeField("description", text)}
//                     multiline
//                     numberOfLines={4}
//                 />
//             </View>

//             <View style={styles.fieldContainer}>
//                 <Text style={styles.label}>Danh mục</Text>
//                 <View style={styles.categoryContainer}>
//                     {categories.map((category) => (
//                         <TouchableOpacity
//                             key={category.id}
//                             style={[
//                                 styles.categoryButton,
//                                 productData.category === category.name && styles.selectedCategory,
//                             ]}
//                             onPress={() => onChangeField("category", category.name)}
//                         >
//                             <Text
//                                 style={[
//                                     styles.categoryText,
//                                     productData.category === category.name && styles.selectedCategoryText,
//                                 ]}
//                             >
//                                 {category.name}
//                             </Text>
//                         </TouchableOpacity>
//                     ))}
//                 </View>
//             </View>

//             <View style={styles.fieldContainer}>
//                 <Text style={styles.label}>Hình ảnh chính</Text>
//                 <TouchableOpacity style={styles.imagePickerButton} onPress={onPickImage}>
//                     <Ionicons name="image-outline" size={24} color="#666" />
//                     <Text style={styles.imagePickerText}>
//                         {imageUri ? "Thay đổi hình ảnh" : "Chọn hình ảnh"}
//                     </Text>
//                 </TouchableOpacity>
//                 {imageUri && (
//                     <Image source={{ uri: imageUri }} style={styles.previewImage} />
//                 )}
//             </View>

//             <View style={styles.fieldContainer}>
//                 <View style={styles.variantHeader}>
//                     <Text style={styles.label}>Biến thể</Text>
//                     <TouchableOpacity style={styles.addVariantButton} onPress={onAddVariant}>
//                         <Ionicons name="add-circle-outline" size={24} color="#e30019" />
//                         <Text style={styles.addVariantText}>Thêm biến thể</Text>
//                     </TouchableOpacity>
//                 </View>
//                 {variants.length > 0 ? (
//                     <FlatList
//                         data={variants}
//                         renderItem={renderVariantItem}
//                         keyExtractor={(item, index) => `variant-${index}`}
//                         style={styles.variantList}
//                     />
//                 ) : (
//                     <Text style={styles.noVariantsText}>Chưa có biến thể nào. Nhấn "Thêm biến thể" để bắt đầu.</Text>
//                 )}
//             </View>

//             <TouchableOpacity
//                 style={[styles.submitButton, submitLoading && styles.disabledButton]}
//                 onPress={onSubmit}
//                 disabled={submitLoading}
//             >
//                 {submitLoading ? (
//                     <Ionicons name="loading" size={24} color="#fff" />
//                 ) : (
//                     <Text style={styles.submitButtonText}>{submitLabel}</Text>
//                 )}
//             </TouchableOpacity>
//         </ScrollView>
//     )
// }

// const styles = StyleSheet.create({
//     formContainer: {
//         padding: 15,
//     },
//     fieldContainer: {
//         marginBottom: 20,
//     },
//     label: {
//         fontSize: 16,
//         fontWeight: "bold",
//         color: "#333",
//         marginBottom: 8,
//     },
//     input: {
//         backgroundColor: "#fff",
//         borderRadius: 8,
//         padding: 12,
//         fontSize: 16,
//         borderWidth: 1,
//         borderColor: "#ddd",
//     },
//     textArea: {
//         height: 100,
//         textAlignVertical: "top",
//     },
//     categoryContainer: {
//         flexDirection: "row",
//         flexWrap: "wrap",
//     },
//     categoryButton: {
//         backgroundColor: "#f0f0f0",
//         paddingHorizontal: 15,
//         paddingVertical: 8,
//         borderRadius: 20,
//         marginRight: 10,
//         marginBottom: 10,
//     },
//     selectedCategory: {
//         backgroundColor: "#e30019",
//     },
//     categoryText: {
//         fontSize: 14,
//         color: "#333",
//     },
//     selectedCategoryText: {
//         color: "#fff",
//     },
//     imagePickerButton: {
//         flexDirection: "row",
//         alignItems: "center",
//         backgroundColor: "#f0f0f0",
//         padding: 12,
//         borderRadius: 8,
//         marginBottom: 10,
//     },
//     imagePickerText: {
//         fontSize: 16,
//         color: "#666",
//         marginLeft: 10,
//     },
//     previewImage: {
//         width: "100%",
//         height: 200,
//         borderRadius: 8,
//         marginTop: 10,
//     },
//     variantHeader: {
//         flexDirection: "row",
//         justifyContent: "space-between",
//         alignItems: "center",
//         marginBottom: 10,
//     },
//     addVariantButton: {
//         flexDirection: "row",
//         alignItems: "center",
//     },
//     addVariantText: {
//         fontSize: 14,
//         color: "#e30019",
//         marginLeft: 5,
//     },
//     variantList: {
//         marginTop: 10,
//     },
//     variantItem: {
//         backgroundColor: "#f9f9f9",
//         borderRadius: 8,
//         padding: 15,
//         marginBottom: 15,
//         borderWidth: 1,
//         borderColor: "#eee",
//     },
//     variantTitle: {
//         fontSize: 16,
//         fontWeight: "bold",
//         color: "#333",
//     },
//     variantField: {
//         marginBottom: 10,
//     },
//     noVariantsText: {
//         fontSize: 14,
//         color: "#666",
//         textAlign: "center",
//         marginTop: 10,
//     },
//     submitButton: {
//         backgroundColor: "#e30019",
//         paddingVertical: 15,
//         borderRadius: 8,
//         alignItems: "center",
//         marginVertical: 20,
//     },
//     disabledButton: {
//         opacity: 0.7,
//     },
//     submitButtonText: {
//         fontSize: 16,
//         fontWeight: "bold",
//         color: "#fff",
//     },
// })

// export default ProductForm


import { View, Text, TextInput, TouchableOpacity, Image, ScrollView, StyleSheet, FlatList } from "react-native"
import { Ionicons } from "@expo/vector-icons"
import * as ImagePicker from "expo-image-picker"

const ProductForm = ({
    productData,
    categories,
    onChangeField,
    onPickImage,
    imageUri,
    onSubmit,
    submitLabel,
    submitLoading,
    variants,
    onChangeVariantField,
    onAddVariant,
    onRemoveVariant,
    onPickVariantImage,
    colors,
    storages,
}) => {
    const renderVariantItem = ({ item, index }) => (
        <View style={styles.variantItem}>
            <View style={styles.variantHeader}>
                <Text style={styles.variantTitle}>Biến thể {index + 1}</Text>
                <TouchableOpacity onPress={() => onRemoveVariant(index)}>
                    <Ionicons name="trash-outline" size={20} color="#e30019" />
                </TouchableOpacity>
            </View>
            <View style={styles.variantField}>
                <Text style={styles.label}>Màu sắc</Text>
                <View style={styles.optionContainer}>
                    {colors.map((color) => (
                        <TouchableOpacity
                            key={color}
                            style={[
                                styles.optionButton,
                                item.color === color && styles.selectedOption,
                            ]}
                            onPress={() => onChangeVariantField(index, "color", color)}
                        >
                            <Text
                                style={[
                                    styles.optionText,
                                    item.color === color && styles.selectedOptionText,
                                ]}
                            >
                                {color}
                            </Text>
                        </TouchableOpacity>
                    ))}
                </View>
            </View>
            <View style={styles.variantField}>
                <Text style={styles.label}>Dung lượng</Text>
                <View style={styles.optionContainer}>
                    {storages.map((storage) => (
                        <TouchableOpacity
                            key={storage}
                            style={[
                                styles.optionButton,
                                item.storage === storage && styles.selectedOption,
                            ]}
                            onPress={() => onChangeVariantField(index, "storage", storage)}
                        >
                            <Text
                                style={[
                                    styles.optionText,
                                    item.storage === storage && styles.selectedOptionText,
                                ]}
                            >
                                {storage}
                            </Text>
                        </TouchableOpacity>
                    ))}
                </View>
            </View>
            <View style={styles.variantField}>
                <Text style={styles.label}>Giá</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Nhập giá biến thể..."
                    value={item.price.toString()}
                    onChangeText={(text) => onChangeVariantField(index, "price", text.replace(/[^0-9]/g, ""))}
                    keyboardType="numeric"
                />
            </View>
            <View style={styles.variantField}>
                <Text style={styles.label}>Giá gốc</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Nhập giá gốc (nếu có)..."
                    value={item.originalPrice.toString()}
                    onChangeText={(text) => onChangeVariantField(index, "originalPrice", text.replace(/[^0-9]/g, ""))}
                    keyboardType="numeric"
                />
            </View>
            <View style={styles.variantField}>
                <Text style={styles.label}>Số lượng tồn kho</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Nhập số lượng tồn kho..."
                    value={item.stock.toString()}
                    onChangeText={(text) => onChangeVariantField(index, "stock", text.replace(/[^0-9]/g, ""))}
                    keyboardType="numeric"
                />
            </View>
            <View style={styles.variantField}>
                <Text style={styles.label}>Hình ảnh biến thể</Text>
                <TouchableOpacity
                    style={styles.imagePickerButton}
                    onPress={() => onPickVariantImage(index)}
                >
                    <Ionicons name="image-outline" size={24} color="#666" />
                    <Text style={styles.imagePickerText}>
                        {item.image ? "Thay đổi hình ảnh" : "Chọn hình ảnh"}
                    </Text>
                </TouchableOpacity>
                {item.image && (
                    <Image source={{ uri: item.image }} style={styles.previewImage} />
                )}
            </View>
        </View>
    )

    return (
        <ScrollView style={styles.formContainer}>
            <View style={styles.fieldContainer}>
                <Text style={styles.label}>Tên sản phẩm</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Nhập tên sản phẩm..."
                    value={productData.name}
                    onChangeText={(text) => onChangeField("name", text)}
                />
            </View>

            <View style={styles.fieldContainer}>
                <Text style={styles.label}>Mô tả</Text>
                <TextInput
                    style={[styles.input, styles.textArea]}
                    placeholder="Nhập mô tả sản phẩm..."
                    value={productData.description}
                    onChangeText={(text) => onChangeField("description", text)}
                    multiline
                    numberOfLines={4}
                />
            </View>

            <View style={styles.fieldContainer}>
                <Text style={styles.label}>Danh mục</Text>
                <View style={styles.categoryContainer}>
                    {categories.map((category) => (
                        <TouchableOpacity
                            key={category.id}
                            style={[
                                styles.categoryButton,
                                productData.category === category.name && styles.selectedCategory,
                            ]}
                            onPress={() => onChangeField("category", category.name)}
                        >
                            <Text
                                style={[
                                    styles.categoryText,
                                    productData.category === category.name && styles.selectedCategoryText,
                                ]}
                            >
                                {category.name}
                            </Text>
                        </TouchableOpacity>
                    ))}
                </View>
            </View>

            <View style={styles.fieldContainer}>
                <Text style={styles.label}>Hình ảnh chính</Text>
                <TouchableOpacity style={styles.imagePickerButton} onPress={onPickImage}>
                    <Ionicons name="image-outline" size={24} color="#666" />
                    <Text style={styles.imagePickerText}>
                        {imageUri ? "Thay đổi hình ảnh" : "Chọn hình ảnh"}
                    </Text>
                </TouchableOpacity>
                {imageUri && (
                    <Image source={{ uri: imageUri }} style={styles.previewImage} />
                )}
            </View>

            <View style={styles.fieldContainer}>
                <View style={styles.variantHeader}>
                    <Text style={styles.label}>Biến thể</Text>
                    <TouchableOpacity style={styles.addVariantButton} onPress={onAddVariant}>
                        <Ionicons name="add-circle-outline" size={24} color="#e30019" />
                        <Text style={styles.addVariantText}>Thêm biến thể</Text>
                    </TouchableOpacity>
                </View>
                {variants.length > 0 ? (
                    <FlatList
                        data={variants}
                        renderItem={renderVariantItem}
                        keyExtractor={(item, index) => `variant-${index}`}
                        style={styles.variantList}
                    />
                ) : (
                    <Text style={styles.noVariantsText}>Chưa có biến thể nào. Nhấn "Thêm biến thể" để bắt đầu.</Text>
                )}
            </View>

            <TouchableOpacity
                style={[styles.submitButton, submitLoading && styles.disabledButton]}
                onPress={onSubmit}
                disabled={submitLoading}
            >
                {submitLoading ? (
                    <Ionicons name="loading" size={24} color="#fff" />
                ) : (
                    <Text style={styles.submitButtonText}>{submitLabel}</Text>
                )}
            </TouchableOpacity>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    formContainer: {
        padding: 15,
    },
    fieldContainer: {
        marginBottom: 20,
    },
    label: {
        fontSize: 16,
        fontWeight: "bold",
        color: "#333",
        marginBottom: 8,
    },
    input: {
        backgroundColor: "#fff",
        borderRadius: 8,
        padding: 12,
        fontSize: 16,
        borderWidth: 1,
        borderColor: "#ddd",
    },
    textArea: {
        height: 100,
        textAlignVertical: "top",
    },
    categoryContainer: {
        flexDirection: "row",
        flexWrap: "wrap",
    },
    categoryButton: {
        backgroundColor: "#f0f0f0",
        paddingHorizontal: 15,
        paddingVertical: 8,
        borderRadius: 20,
        marginRight: 10,
        marginBottom: 10,
    },
    selectedCategory: {
        backgroundColor: "#e30019",
    },
    categoryText: {
        fontSize: 14,
        color: "#333",
    },
    selectedCategoryText: {
        color: "#fff",
    },
    imagePickerButton: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#f0f0f0",
        padding: 12,
        borderRadius: 8,
        marginBottom: 10,
    },
    imagePickerText: {
        fontSize: 16,
        color: "#666",
        marginLeft: 10,
    },
    previewImage: {
        width: "100%",
        height: 200,
        borderRadius: 8,
        marginTop: 10,
    },
    variantHeader: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 10,
    },
    addVariantButton: {
        flexDirection: "row",
        alignItems: "center",
    },
    addVariantText: {
        fontSize: 14,
        color: "#e30019",
        marginLeft: 5,
    },
    variantList: {
        marginTop: 10,
    },
    variantItem: {
        backgroundColor: "#f9f9f9",
        borderRadius: 8,
        padding: 15,
        marginBottom: 15,
        borderWidth: 1,
        borderColor: "#eee",
    },
    variantTitle: {
        fontSize: 16,
        fontWeight: "bold",
        color: "#333",
    },
    variantField: {
        marginBottom: 10,
    },
    optionContainer: {
        flexDirection: "row",
        flexWrap: "wrap",
    },
    optionButton: {
        backgroundColor: "#f0f0f0",
        paddingHorizontal: 15,
        paddingVertical: 8,
        borderRadius: 20,
        marginRight: 10,
        marginBottom: 10,
    },
    selectedOption: {
        backgroundColor: "#e30019",
    },
    optionText: {
        fontSize: 14,
        color: "#333",
    },
    selectedOptionText: {
        color: "#fff",
    },
    noVariantsText: {
        fontSize: 14,
        color: "#666",
        textAlign: "center",
        marginTop: 10,
    },
    submitButton: {
        backgroundColor: "#e30019",
        paddingVertical: 15,
        borderRadius: 8,
        alignItems: "center",
        marginVertical: 20,
    },
    disabledButton: {
        opacity: 0.7,
    },
    submitButtonText: {
        fontSize: 16,
        fontWeight: "bold",
        color: "#fff",
    },
})

export default ProductForm