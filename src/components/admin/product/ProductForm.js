import { View, Text, KeyboardAvoidingView, TouchableOpacity, Image, StyleSheet, FlatList, Platform, ScrollView } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import CustomTextInput from "./CustomTextInput";

const ProductForm = ({
    productData,
    categories,
    brands,
    onChangeField,
    onPickImage,
    imageUris,
    existingImageUrls,
    onRemoveImage,
    onRemoveExistingImage,
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
    hasVariants,
    setHasVariants,
}) => {
    const filterValidVariantImages = (variant) => {
        const images = variant.images || variant.imageUrl || variant.image;
        if (!images) return [];
        const imageArray = Array.isArray(images) ? images : [images];
        return imageArray.filter((image) => image && typeof image === "string" && (image.startsWith("http") || image.startsWith("file://")));
    };

    const renderVariantItem = ({ item, index }) => {
        const validVariantImages = filterValidVariantImages(item);

        return (
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
                                style={[styles.optionButton, item.color === color && styles.selectedOption]}
                                onPress={() => onChangeVariantField(index, "color", color)}
                            >
                                <Text style={[styles.optionText, item.color === color && styles.selectedOptionText]}>
                                    {color}
                                </Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                    <CustomTextInput
                        placeholder="Hoặc nhập màu sắc khác..."
                        value={colors.includes(item.color) ? "" : item.color}
                        onChangeText={(text) => onChangeVariantField(index, "color", text)}
                        onClear={() => onChangeVariantField(index, "color", "")}
                    />
                </View>
                <View style={styles.variantField}>
                    <Text style={styles.label}>Dung lượng</Text>
                    <View style={styles.optionContainer}>
                        {storages.map((storage) => (
                            <TouchableOpacity
                                key={storage}
                                style={[styles.optionButton, item.size === storage && styles.selectedOption]}
                                onPress={() => onChangeVariantField(index, "size", storage)}
                            >
                                <Text style={[styles.optionText, item.size === storage && styles.selectedOptionText]}>
                                    {storage}
                                </Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                    <CustomTextInput
                        placeholder="Hoặc nhập dung lượng khác..."
                        value={storages.includes(item.size) ? "" : item.size}
                        onChangeText={(text) => onChangeVariantField(index, "size", text)}
                        onClear={() => onChangeVariantField(index, "size", "")}
                    />
                </View>
                <View style={styles.variantField}>
                    <Text style={styles.label}>Giá bán</Text>
                    <CustomTextInput
                        placeholder="Nhập giá bán..."
                        value={item.salePrice.toString()}
                        onChangeText={(text) => onChangeVariantField(index, "salePrice", text.replace(/[^0-9]/g, ""))}
                        keyboardType="numeric"
                        iconName="cash-outline"
                        onClear={() => onChangeVariantField(index, "salePrice", "")}
                    />
                </View>
                <View style={styles.variantField}>
                    <Text style={styles.label}>Giá gốc</Text>
                    <CustomTextInput
                        placeholder="Nhập giá gốc (nếu có)..."
                        value={item.originalPrice.toString()}
                        onChangeText={(text) => onChangeVariantField(index, "originalPrice", text.replace(/[^0-9]/g, ""))}
                        keyboardType="numeric"
                        iconName="cash-outline"
                        onClear={() => onChangeVariantField(index, "originalPrice", "")}
                    />
                </View>
                <View style={styles.variantField}>
                    <Text style={styles.label}>Số lượng tồn kho</Text>
                    <CustomTextInput
                        placeholder="Nhập số lượng tồn kho..."
                        value={item.stock.toString()}
                        onChangeText={(text) => onChangeVariantField(index, "stock", text.replace(/[^0-9]/g, ""))}
                        keyboardType="numeric"
                        iconName="cube-outline"
                        onClear={() => onChangeVariantField(index, "stock", "")}
                    />
                </View>
                <View style={styles.variantField}>
                    <Text style={styles.label}>Hình ảnh biến thể</Text>
                    <TouchableOpacity style={styles.imagePickerButton} onPress={() => onPickVariantImage(index)}>
                        <Ionicons name="image-outline" size={24} color="#666" />
                        <Text style={styles.imagePickerText}>
                            {validVariantImages.length > 0 ? "Thay đổi hình ảnh" : "Chọn hình ảnh"}
                        </Text>
                    </TouchableOpacity>
                    {validVariantImages.length > 0 ? (
                        <FlatList
                            data={validVariantImages}
                            renderItem={({ item, index: imgIndex }) => (
                                <View style={styles.imageContainer}>
                                    <Image source={{ uri: item }} style={styles.previewImage} />
                                    <TouchableOpacity
                                        style={styles.removeImageButton}
                                        onPress={() => onChangeVariantField(index, "image", null)} // Clear image for simplicity
                                    >
                                        <Ionicons name="close-circle" size={24} color="#e30019" />
                                    </TouchableOpacity>
                                </View>
                            )}
                            keyExtractor={(item, imgIndex) => `variant-image-${index}-${imgIndex}`}
                            horizontal
                            showsHorizontalScrollIndicator={false}
                            style={styles.imageList}
                        />
                    ) : (
                        <Text style={styles.noImagesText}>Chưa có hình ảnh</Text>
                    )}
                </View>
            </View>
        );
    };

    const renderImageItem = ({ item, index, isExisting }) => (
        <View style={styles.imageContainer}>
            <Image source={{ uri: item }} style={styles.previewImage} />
            <TouchableOpacity
                style={styles.removeImageButton}
                onPress={() => (isExisting ? onRemoveExistingImage?.(index) : onRemoveImage(index))}
            >
                <Ionicons name="close-circle" size={24} color="#e30019" />
            </TouchableOpacity>
        </View>
    );

    return (
        <KeyboardAvoidingView
            style={{ flex: 1 }}
            behavior={Platform.OS === "ios" ? "padding" : undefined}
            keyboardVerticalOffset={Platform.OS === "ios" ? 10 : 0}
        >
            <ScrollView style={styles.formContainer}>
                <View style={styles.fieldContainer}>
                    <Text style={styles.label}>Tên sản phẩm</Text>
                    <CustomTextInput
                        style={styles.input}
                        placeholder="Nhập tên sản phẩm..."
                        value={productData.name}
                        onChangeText={(text) => onChangeField("name", text)}
                        onClear={() => onChangeField("name", "")}
                        autoCapitalize="none"
                        returnKeyType="next"
                    />
                </View>

                <View style={styles.fieldContainer}>
                    <Text style={styles.label}>Thông số kỹ thuật</Text>
                    <CustomTextInput
                        placeholder="Nhập thông số kỹ thuật..."
                        value={productData.specification}
                        onChangeText={(text) => onChangeField("specification", text)}
                        onClear={() => onChangeField("specification", "")}
                        multiline
                        numberOfLines={4}
                        style={styles.textArea}
                    />
                </View>

                <View style={styles.fieldContainer}>
                    <Text style={styles.label}>Mô tả</Text>
                    <CustomTextInput
                        placeholder="Nhập mô tả sản phẩm..."
                        value={productData.description}
                        onChangeText={(text) => onChangeField("description", text)}
                        onClear={() => onChangeField("description", "")}
                        multiline
                        numberOfLines={4}
                        style={styles.textArea}
                    />
                </View>

                <View style={styles.fieldContainer}>
                    <Text style={styles.label}>Khuyến mãi</Text>
                    <CustomTextInput
                        placeholder="Nhập thông tin khuyến mãi..."
                        value={productData.promotions}
                        onChangeText={(text) => onChangeField("promotions", text)}
                        onClear={() => onChangeField("promotions", "")}
                        multiline
                        numberOfLines={2}
                        style={styles.textArea}
                    />
                </View>

                <View style={styles.fieldContainer}>
                    <Text style={styles.label}>Thương hiệu</Text>
                    <View style={styles.categoryContainer}>
                        {brands?.map((brand) => (
                            <TouchableOpacity
                                key={brand.id}
                                style={[styles.categoryButton, productData.brandId === brand.id && styles.selectedCategory]}
                                onPress={() => onChangeField("brandId", brand.id)}
                            >
                                <Text style={[styles.categoryText, productData.brandId === brand.id && styles.selectedCategoryText]}>
                                    {brand.name}
                                </Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                </View>

                <View style={styles.fieldContainer}>
                    <Text style={styles.label}>Danh mục</Text>
                    <View style={styles.categoryContainer}>
                        {categories?.map((category) => (
                            <TouchableOpacity
                                key={category.id}
                                style={[styles.categoryButton, productData.categoryId.includes(category.id) && styles.selectedCategory]}
                                onPress={() =>
                                    onChangeField(
                                        "categoryId",
                                        productData.categoryId.includes(category.id)
                                            ? productData.categoryId.filter((id) => id !== category.id)
                                            : [...productData.categoryId, category.id]
                                    )
                                }
                            >
                                <Text style={[styles.categoryText, productData.categoryId.includes(category.id) && styles.selectedCategoryText]}>
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
                            {(imageUris?.length > 0 || existingImageUrls?.length > 0) ? "Thêm hình ảnh khác" : "Chọn hình ảnh"}
                        </Text>
                    </TouchableOpacity>
                    {(imageUris?.length > 0 || existingImageUrls?.length > 0) && (
                        <FlatList
                            data={[
                                ...(existingImageUrls?.map((url) => ({ uri: url, isExisting: true })) || []),
                                ...(imageUris?.map((uri) => ({ uri, isExisting: false })) || []),
                            ]}
                            renderItem={({ item, index }) => renderImageItem({ item: item.uri, index, isExisting: item.isExisting })}
                            keyExtractor={(item, index) => `image-${item.isExisting ? "existing" : "new"}-${index}`}
                            horizontal
                            showsHorizontalScrollIndicator={false}
                            style={styles.imageList}
                        />
                    )}
                </View>

                <View style={styles.fieldContainer}>
                    <Text style={styles.label}>Có biến thể?</Text>
                    <View style={styles.optionContainer}>
                        <TouchableOpacity
                            style={[styles.optionButton, hasVariants && styles.selectedOption]}
                            onPress={() => setHasVariants(true)}
                        >
                            <Text style={[styles.optionText, hasVariants && styles.selectedOptionText]}>Có</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={[styles.optionButton, !hasVariants && styles.selectedOption]}
                            onPress={() => setHasVariants(false)}
                        >
                            <Text style={[styles.optionText, !hasVariants && styles.selectedOptionText]}>Không</Text>
                        </TouchableOpacity>
                    </View>
                </View>

                {!hasVariants && (
                    <>
                        <View style={styles.fieldContainer}>
                            <Text style={styles.label}>Giá bán</Text>
                            <CustomTextInput
                                placeholder="Nhập giá bán..."
                                value={productData.salePrice}
                                onChangeText={(text) => onChangeField("salePrice", text.replace(/[^0-9]/g, ""))}
                                keyboardType="numeric"
                                iconName="cash-outline"
                                onClear={() => onChangeField("salePrice", "")}
                            />
                        </View>
                        <View style={styles.fieldContainer}>
                            <Text style={styles.label}>Giá gốc</Text>
                            <CustomTextInput
                                placeholder="Nhập giá gốc (nếu có)..."
                                value={productData.originalPrice}
                                onChangeText={(text) => onChangeField("originalPrice", text.replace(/[^0-9]/g, ""))}
                                keyboardType="numeric"
                                iconName="cash-outline"
                                onClear={() => onChangeField("originalPrice", "")}
                            />
                        </View>
                        <View style={styles.fieldContainer}>
                            <Text style={styles.label}>Số lượng tồn kho</Text>
                            <CustomTextInput
                                placeholder="Nhập số lượng tồn kho..."
                                value={productData.stock}
                                onChangeText={(text) => onChangeField("stock", text.replace(/[^0-9]/g, ""))}
                                keyboardType="numeric"
                                iconName="cube-outline"
                                onClear={() => onChangeField("stock", "")}
                            />
                        </View>
                    </>
                )}

                {hasVariants && (
                    <View style={styles.fieldContainer}>
                        <View style={styles.variantHeader}>
                            <Text style={styles.label}>Biến thể</Text>
                            <TouchableOpacity style={styles.addVariantButton} onPress={onAddVariant}>
                                <Ionicons name="add-circle-outline" size={24} color="#e30019" />
                                <Text style={styles.addVariantText}>Thêm biến thể</Text>
                            </TouchableOpacity>
                        </View>
                        {variants?.length > 0 ? (
                            <View style={styles.variantList}>
                                {variants.map((item, index) => (
                                    <View key={`variant-${index}`}>
                                        {renderVariantItem({ item, index })}
                                    </View>
                                ))}
                            </View>
                        ) : (
                            <Text style={styles.noVariantsText}>
                                Chưa có biến thể nào. Nhấn "Thêm biến thể" để bắt đầu.
                            </Text>
                        )}
                    </View>
                )}

                <TouchableOpacity
                    style={[styles.submitButton, submitLoading && styles.disabledButton]}
                    onPress={onSubmit}
                    disabled={submitLoading}
                >
                    {submitLoading ? (
                        <Ionicons name="time-outline" size={24} color="#fff" />
                    ) : (
                        <Text style={styles.submitButtonText}>{submitLabel}</Text>
                    )}
                </TouchableOpacity>
            </ScrollView>
        </KeyboardAvoidingView>
    );
};

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
    textArea: {
        height: 100,
    },
    input: {
        backgroundColor: "#fff",
        borderRadius: 8,
        padding: 12,
        fontSize: 16,
        borderWidth: 1,
        borderColor: "#ddd",
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
    imageContainer: {
        position: "relative",
        marginRight: 10,
    },
    previewImage: {
        width: 100,
        height: 100,
        borderRadius: 8,
    },
    removeImageButton: {
        position: "absolute",
        top: -10,
        right: -10,
    },
    imageList: {
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
        marginBottom: 10,
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
    noImagesText: {
        fontSize: 14,
        color: "#666",
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
});

export default ProductForm;