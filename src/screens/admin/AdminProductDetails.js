import { View, Text, ScrollView, StyleSheet, Image, FlatList } from "react-native";
import { formatCurrency } from "@utils/formatUtils";
import { useRoute } from "@react-navigation/native";
import { SafeAreaView } from 'react-native-safe-area-context';

const ProductDetailsScreen = () => {
    const route = useRoute();
    const { product } = route.params;

    // Format date using native JavaScript
    const formatDate = (dateString) => {
        if (!dateString) return "N/A";
        const date = new Date(dateString);
        const day = String(date.getDate()).padStart(2, "0");
        const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are 0-based
        const year = date.getFullYear();
        const hours = String(date.getHours()).padStart(2, "0");
        const minutes = String(date.getMinutes()).padStart(2, "0");
        return `${day}/${month}/${year} ${hours}:${minutes}`;
    };

    // Filter valid image URLs for main product or variant
    const filterValidImages = (images) => {
        if (!images) return [];
        // Handle single image (string) or array of images
        const imageArray = Array.isArray(images) ? images : [images];
        return imageArray.filter((image) => image && image !== "string" && image.startsWith("http"));
    };

    // Valid images for main product
    const validProductImages = filterValidImages(product.images);

    // Determine creator/updater and timestamps
    const isUpdated = product.updatedBy && product.updatedAt;
    const responsiblePerson = isUpdated ? product.updatedBy : product.createdBy;
    const timestamp = isUpdated ? product.updatedAt : product.createdAt;
    const formattedDate = formatDate(timestamp);

    const totalStock = product.variants && product.variants.length > 0
        ? product.variants.reduce((sum, variant) => sum + (variant.stock || 0), 0)
        : product.stock || 0;

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollContainer}>
                <Text style={styles.title}>{product.name}</Text>

                {/* Product Images Section */}
                <Text style={styles.sectionTitle}>Hình ảnh sản phẩm</Text>
                {validProductImages.length === 0 ? (
                    <Text style={styles.noImagesText}>Không có hình ảnh nào</Text>
                ) : (
                    <FlatList
                        data={validProductImages}
                        horizontal
                        keyExtractor={(item, index) => `product-${index}`}
                        renderItem={({ item }) => (
                            <Image
                                source={{ uri: item }}
                                style={styles.productImage}
                                resizeMode="contain"
                                onError={() => console.log(`Failed to load product image: ${item}`)}
                            />
                        )}
                        showsHorizontalScrollIndicator={false}
                        contentContainerStyle={styles.imageList}
                    />
                )}

                <Text style={styles.sectionTitle}>Thông tin chung</Text>
                <View style={styles.infoContainer}>
                    <Text style={styles.label}>SKU:</Text>
                    <Text style={styles.value}>{product.sku}</Text>
                </View>
                <View style={styles.infoContainer}>
                    <Text style={styles.label}>Danh mục:</Text>
                    <Text style={styles.value}>{product.categories?.[0]?.name || "No Category"}</Text>
                </View>
                <View style={styles.infoContainer}>
                    <Text style={styles.label}>Thương hiệu:</Text>
                    <Text style={styles.value}>{product.brand?.name || "No Brand"}</Text>
                </View>
                <View style={styles.infoContainer}>
                    <Text style={styles.label}>Giá:</Text>
                    <Text style={styles.value}>{formatCurrency(product.price)}</Text>
                </View>
                {product.originalPrice > product.price && (
                    <View style={styles.infoContainer}>
                        <Text style={styles.label}>Giá gốc:</Text>
                        <Text style={styles.value}>{formatCurrency(product.originalPrice)}</Text>
                    </View>
                )}
                <View style={styles.infoContainer}>
                    <Text style={styles.label}>Tồn kho:</Text>
                    <Text style={styles.value}>
                        {totalStock} sản phẩm
                    </Text>
                </View>
                <View style={styles.infoContainer}>
                    <Text style={styles.label}>Số biến thể:</Text>
                    <Text style={styles.value}>{product.variants.length}</Text>
                </View>

                <Text style={styles.sectionTitle}>Thông tin cập nhật</Text>
                <View style={styles.infoContainer}>
                    <Text style={styles.label}>{isUpdated ? "Người cập nhật" : "Người tạo"}:</Text>
                    <Text style={styles.value}>{responsiblePerson}</Text>
                </View>
                <View style={styles.infoContainer}>
                    <Text style={styles.label}>{isUpdated ? "Thời gian cập nhật" : "Thời gian tạo"}:</Text>
                    <Text style={styles.value}>{formattedDate}</Text>
                </View>

                {/* Variants Section */}
                <Text style={styles.sectionTitle}>Biến thể sản phẩm</Text>
                {product.variants.length === 0 ? (
                    <Text style={styles.noVariantsText}>Không có biến thể nào</Text>
                ) : (
                    product.variants.map((variant) => {
                        // Handle single image or array of images for variant
                        const validVariantImages = filterValidImages(variant.images || variant.image);
                        return (
                            <View key={variant.id} style={styles.variantContainer}>
                                <View style={styles.variantInfo}>
                                    <Text style={styles.variantLabel}>Màu sắc:</Text>
                                    <Text style={styles.variantValue}>{variant.color}</Text>
                                </View>
                                <View style={styles.variantInfo}>
                                    <Text style={styles.variantLabel}>Dung lượng:</Text>
                                    <Text style={styles.variantValue}>{variant.storage}</Text>
                                </View>
                                <View style={styles.variantInfo}>
                                    <Text style={styles.variantLabel}>SKU:</Text>
                                    <Text style={styles.variantValue}>{variant.sku}</Text>
                                </View>
                                <View style={styles.variantInfo}>
                                    <Text style={styles.variantLabel}>Giá:</Text>
                                    <Text style={styles.variantValue}>
                                        {formatCurrency(variant.price || variant.originalPrice)}
                                    </Text>
                                </View>
                                {variant.price > 0 && variant.originalPrice > variant.price && (
                                    <View style={styles.variantInfo}>
                                        <Text style={styles.variantLabel}>Giá gốc:</Text>
                                        <Text style={styles.variantValue}>
                                            {formatCurrency(variant.originalPrice)}
                                        </Text>
                                    </View>
                                )}
                                <View style={styles.variantInfo}>
                                    <Text style={styles.variantLabel}>Tồn kho:</Text>
                                    <Text style={styles.variantValue}>{variant.stock} sản phẩm</Text>
                                </View>
                                {validVariantImages.length > 0 ? (
                                    <View style={styles.variantInfo}>
                                        <Text style={styles.variantLabel}>Hình ảnh:</Text>
                                        <FlatList
                                            data={validVariantImages}
                                            horizontal
                                            keyExtractor={(item, index) => `variant-${variant.id}-${index}`}
                                            renderItem={({ item }) => (
                                                <Image
                                                    source={{ uri: item }}
                                                    style={styles.variantImage}
                                                    resizeMode="contain"
                                                    on LOI onError={() => console.log(`Failed to load variant image: ${item}`)}
                                                />
                                            )}
                                            showsHorizontalScrollIndicator={false}
                                            contentContainerStyle={styles.imageList}
                                        />
                                    </View>
                                ) : (
                                    <View style={styles.variantInfo}>
                                        <Text style={styles.variantLabel}>Hình ảnh:</Text>
                                        <Text style={styles.noImagesText}>Không có hình ảnh</Text>
                                    </View>
                                )}
                            </View>
                        );
                    })
                )}

                <Text style={styles.sectionTitle}>Mô tả</Text>
                <Text style={styles.description}>{product.description}</Text>

                <Text style={styles.sectionTitle}>Thông số kỹ thuật</Text>
                <Text style={styles.description}>{product.specification}</Text>
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
    },
    scrollContainer: {
        padding: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        color: "#333",
        marginBottom: 20,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: "600",
        color: "#333",
        marginTop: 20,
        marginBottom: 10,
    },
    infoContainer: {
        flexDirection: "row",
        marginBottom: 10,
    },
    label: {
        fontSize: 16,
        fontWeight: "500",
        color: "#666",
        width: 150,
    },
    value: {
        fontSize: 16,
        color: "#333",
        flex: 1,
    },
    description: {
        fontSize: 14,
        color: "#333",
        lineHeight: 22,
    },
    // Styles for product images
    productImage: {
        width: 120,
        height: 120,
        borderRadius: 8,
        marginRight: 10,
    },
    // Styles for variant images
    variantImage: {
        width: 80,
        height: 80,
        borderRadius: 8,
        marginRight: 10,
    },
    imageList: {
        paddingVertical: 10,
    },
    noImagesText: {
        fontSize: 14,
        color: "#666",
        fontStyle: "italic",
        marginBottom: 15,
    },
    // Styles for variants
    variantContainer: {
        backgroundColor: "#f9f9f9",
        borderRadius: 8,
        padding: 15,
        marginBottom: 15,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        elevation: 2,
    },
    variantInfo: {
        flexDirection: "row",
        marginBottom: 8,
        alignItems: "center",
    },
    variantLabel: {
        fontSize: 14,
        fontWeight: "500",
        color: "#666",
        width: 120,
    },
    variantValue: {
        fontSize: 14,
        color: "#333",
        flex: 1,
    },
    noVariantsText: {
        fontSize: 14,
        color: "#666",
        fontStyle: "italic",
        marginBottom: 15,
    },
});

export default ProductDetailsScreen;