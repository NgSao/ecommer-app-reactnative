import { Modal, View, Text, TouchableOpacity, FlatList, TextInput, Image, StyleSheet } from "react-native"
import { Ionicons } from "@expo/vector-icons"
import { formatPrice } from '@utils/formatUtils';

const ProductSelector = ({
    showProductModal,
    setShowProductModal,
    productSearchQuery,
    setProductSearchQuery,
    products,
    loadingProducts,
    selectedProduct,
    setSelectedProduct,
    selectedVariant,
    setSelectedVariant,
    quantity,
    setQuantity,
    fetchProducts,
    addToCart,
}) => {
    return (
        <Modal
            visible={showProductModal}
            animationType="slide"
            transparent={true}
            onRequestClose={() => {
                setShowProductModal(false)
                setSelectedProduct(null)
                setSelectedVariant(null)
                setQuantity("1")
            }}
        >
            <View style={styles.modalContainer}>
                <View style={styles.modalContent}>
                    <View style={styles.modalHeader}>
                        <Text style={styles.modalTitle}>{selectedProduct ? "Chọn phiên bản" : "Chọn sản phẩm"}</Text>
                        <TouchableOpacity
                            onPress={() => {
                                setShowProductModal(false)
                                setSelectedProduct(null)
                                setSelectedVariant(null)
                                setQuantity("1")
                            }}
                        >
                            <Ionicons name="close" size={24} color="#333" />
                        </TouchableOpacity>
                    </View>

                    {!selectedProduct ? (
                        <>
                            <View style={styles.searchContainer}>
                                <Ionicons name="search" size={20} color="#666" style={styles.searchIcon} />
                                <TextInput
                                    style={styles.searchInput}
                                    placeholder="Tìm kiếm sản phẩm..."
                                    value={productSearchQuery}
                                    onChangeText={(text) => {
                                        setProductSearchQuery(text)
                                        fetchProducts(text)
                                    }}
                                />
                                {productSearchQuery.length > 0 && (
                                    <TouchableOpacity
                                        style={styles.clearButton}
                                        onPress={() => {
                                            setProductSearchQuery("")
                                            fetchProducts("")
                                        }}
                                    >
                                        <Ionicons name="close-circle" size={20} color="#666" />
                                    </TouchableOpacity>
                                )}
                            </View>

                            {loadingProducts ? (
                                <View style={styles.loadingContainer}>
                                    <Text style={styles.loadingText}>Đang tải danh sách sản phẩm...</Text>
                                </View>
                            ) : (
                                <FlatList
                                    data={products}
                                    keyExtractor={(item) => item.id}
                                    renderItem={({ item }) => (
                                        <TouchableOpacity
                                            style={styles.productItem}
                                            onPress={() => {
                                                setSelectedProduct(item)
                                                if (item.variants && item.variants.length > 0) {
                                                } else {
                                                    setSelectedVariant(null)
                                                }
                                            }}
                                        >
                                            <Image source={{ uri: item.image }} style={styles.productImage} />
                                            <View style={styles.productInfo}>
                                                <Text style={styles.productName}>{item.name}</Text>
                                                {item.salePrice && item.salePrice < item.originalPrice ? (
                                                    <View style={styles.priceContainer}>
                                                        <Text style={styles.productPrice}>{formatPrice(item.salePrice)}</Text>
                                                        <Text style={styles.productOriginalPrice}>{formatPrice(item.originalPrice)}</Text>
                                                    </View>
                                                ) : (
                                                    <Text style={styles.productPrice}>{formatPrice(item.originalPrice)}</Text>
                                                )}

                                                {item.variants && item.variants.length > 0 ? (
                                                    <Text style={styles.variantCount}>{item.variants.length} phiên bản</Text>
                                                ) : (
                                                    <Text style={styles.stockCount}>Còn {item.stock} sản phẩm</Text>
                                                )}
                                            </View>
                                            <Ionicons name="chevron-forward" size={20} color="#666" />
                                        </TouchableOpacity>
                                    )}
                                    ListEmptyComponent={
                                        <View style={styles.emptyContainer}>
                                            <Ionicons name="cube-outline" size={40} color="#ccc" />
                                            <Text style={styles.emptyText}>Không tìm thấy sản phẩm</Text>
                                        </View>
                                    }
                                />
                            )}
                        </>
                    ) : selectedProduct.variants && selectedProduct.variants.length > 0 ? (
                        <>
                            <View style={styles.selectedProductHeader}>
                                <Image source={{ uri: selectedProduct.image }} style={styles.selectedProductImage} />
                                <View style={styles.selectedProductInfo}>
                                    <Text style={styles.selectedProductName}>{selectedProduct.name}</Text>
                                    {selectedProduct.salePrice && selectedProduct.salePrice < selectedProduct.originalPrice ? (
                                        <View style={styles.priceContainer}>
                                            <Text style={styles.productPrice}>{formatPrice(selectedProduct.salePrice)}</Text>
                                            <Text style={styles.productOriginalPrice}>{formatPrice(selectedProduct.originalPrice)}</Text>
                                        </View>
                                    ) : (
                                        <Text style={styles.productPrice}>{formatPrice(selectedProduct.originalPrice)}</Text>
                                    )}
                                </View>
                            </View>

                            <Text style={styles.sectionTitle}>Chọn phiên bản:</Text>

                            <FlatList
                                data={selectedProduct.variants}
                                keyExtractor={(item) => item.id}
                                renderItem={({ item }) => (
                                    <TouchableOpacity
                                        style={[
                                            styles.variantItem,
                                            selectedVariant && selectedVariant.id === item.id && styles.selectedVariantItem,
                                        ]}
                                        onPress={() => setSelectedVariant(item)}
                                    >
                                        <Image source={{ uri: item.image }} style={styles.variantImage} />

                                        <View style={styles.variantInfo}>
                                            <Text style={styles.variantName}>{item.name}</Text>

                                            {item.salePrice && item.salePrice < item.originalPrice ? (
                                                <View style={styles.priceContainer}>
                                                    <Text style={styles.variantPrice}>{formatPrice(item.salePrice)}</Text>
                                                    <Text style={styles.productOriginalPrice}>{formatPrice(item.originalPrice)}</Text>
                                                </View>
                                            ) : (
                                                <Text style={styles.variantPrice}>{formatPrice(item.originalPrice)}</Text>
                                            )}

                                        </View>
                                        <Text style={styles.variantStock}>Còn {item.stock}</Text>
                                        {selectedVariant && selectedVariant.id === item.id && (
                                            <Ionicons name="checkmark-circle" size={20} color="#e30019" />
                                        )}
                                    </TouchableOpacity>
                                )}
                            />
                            <View style={styles.quantityContainer}>
                                <Text style={styles.quantityLabel}>Số lượng:</Text>
                                <View style={styles.quantityControls}>
                                    <TouchableOpacity
                                        style={styles.quantityButton}
                                        onPress={() => setQuantity((prevQuantity) => Math.max(1, prevQuantity - 1))}
                                    >
                                        <Ionicons name="remove" size={20} color="#333" />
                                    </TouchableOpacity>
                                    <TextInput
                                        style={styles.quantityInput}
                                        value={String(quantity)}
                                        onChangeText={(text) => {
                                            const newValue = text.replace(/[^0-9]/g, "");
                                            setQuantity(newValue === "" ? 1 : Math.max(1, parseInt(newValue, 10)));
                                        }}
                                        keyboardType="number-pad"
                                    />
                                    <TouchableOpacity
                                        style={styles.quantityButton}
                                        onPress={() => setQuantity((prevQuantity) => prevQuantity + 1)}
                                    >
                                        <Ionicons name="add" size={20} color="#333" />
                                    </TouchableOpacity>
                                </View>
                            </View>


                            <TouchableOpacity
                                style={[styles.addToCartButton, !selectedVariant && styles.disabledButton]}
                                onPress={addToCart}
                                disabled={!selectedVariant}
                            >
                                <Ionicons name="cart-outline" size={20} color="#fff" />
                                <Text style={styles.addToCartButtonText}>Thêm vào đơn hàng</Text>
                            </TouchableOpacity>
                        </>
                    ) : (
                        <>
                            <View style={styles.selectedProductHeader}>
                                <Image source={{ uri: selectedProduct.image }} style={styles.selectedProductImage} />
                                <View style={styles.selectedProductInfo}>
                                    <Text style={styles.selectedProductName}>{selectedProduct.name}</Text>

                                    {selectedProduct.salePrice && selectedProduct.salePrice < selectedProduct.originalPrice ? (
                                        <View style={styles.priceContainer}>
                                            <Text style={styles.productPrice}>{formatPrice(selectedProduct.salePrice)}</Text>
                                            <Text style={styles.productOriginalPrice}>{formatPrice(selectedProduct.originalPrice)}</Text>
                                        </View>
                                    ) : (
                                        <Text style={styles.productPrice}>{formatPrice(selectedProduct.originalPrice)}</Text>
                                    )}


                                    <Text style={styles.stockCount}>Còn {selectedProduct.stock} sản phẩm</Text>
                                </View>
                            </View>

                            <View style={styles.quantityContainer}>
                                <Text style={styles.quantityLabel}>Số lượng:</Text>
                                <View style={styles.quantityControls}>
                                    <TouchableOpacity
                                        style={styles.quantityButton}
                                        onPress={() => setQuantity(Math.max(1, Number.parseInt(quantity) - 1))}
                                    >
                                        <Ionicons name="remove" size={20} color="#333" />
                                    </TouchableOpacity>
                                    <TextInput
                                        style={styles.quantityInput}
                                        value={quantity}
                                        onChangeText={(text) => {
                                            const value = text.replace(/[^0-9]/g, "")
                                            setQuantity(value === "" ? "1" : value)
                                        }}
                                        keyboardType="number-pad"
                                    />
                                    <TouchableOpacity
                                        style={styles.quantityButton}
                                        onPress={() => setQuantity((Number.parseInt() + 1))}
                                    >
                                        <Ionicons name="add" size={20} color="#333" />
                                    </TouchableOpacity>
                                </View>
                            </View>

                            <TouchableOpacity style={styles.addToCartButton} onPress={addToCart}>
                                <Ionicons name="cart-outline" size={20} color="#fff" />
                                <Text style={styles.addToCartButtonText}>Thêm vào đơn hàng</Text>
                            </TouchableOpacity>
                        </>
                    )}
                </View>
            </View>
        </Modal>
    )
}

const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        justifyContent: "flex-end",
    },
    modalContent: {
        backgroundColor: "#fff",
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15,
        paddingHorizontal: 15,
        paddingBottom: 30,
        maxHeight: "80%",
    },
    modalHeader: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingVertical: 15,
        borderBottomWidth: 1,
        borderBottomColor: "#eee",
    },
    modalTitle: {
        fontSize: 18,
        fontWeight: "bold",
        color: "#333",
    },
    searchContainer: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#f0f0f0",
        borderRadius: 8,
        paddingHorizontal: 10,
        marginVertical: 15,
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
        alignItems: "center",
        justifyContent: "center",
        padding: 30,
    },
    loadingText: {
        fontSize: 14,
        color: "#666",
        marginTop: 10,
    },
    emptyContainer: {
        alignItems: "center",
        justifyContent: "center",
        padding: 30,
    },
    emptyText: {
        fontSize: 14,
        color: "#666",
        marginTop: 10,
    },
    productItem: {
        flexDirection: "row",
        alignItems: "center",
        padding: 12,
        borderBottomWidth: 1,
        borderBottomColor: "#eee",
    },
    productImage: {
        width: 50,
        height: 50,
        borderRadius: 5,
        marginRight: 10,
    },
    productInfo: {
        flex: 1,
    },
    productName: {
        fontSize: 14,
        fontWeight: "bold",
        color: "#333",
        marginBottom: 3,
    },

    variantCount: {
        fontSize: 12,
        color: "#3498db",
    },
    stockCount: {
        fontSize: 12,
        color: "#2ecc71",
    },
    selectedProductHeader: {
        flexDirection: "row",
        alignItems: "center",
        padding: 15,
        borderBottomWidth: 1,
        borderBottomColor: "#eee",
    },
    selectedProductImage: {
        width: 60,
        height: 60,
        borderRadius: 5,
        marginRight: 15,
    },
    selectedProductInfo: {
        flex: 1,
    },
    selectedProductName: {
        fontSize: 16,
        fontWeight: "bold",
        color: "#333",
        marginBottom: 5,
    },
    selectedProductPrice: {
        fontSize: 14,
        color: "#e30019",
        marginBottom: 3,
    },
    sectionTitle: {
        fontSize: 16,
        fontWeight: "bold",
        color: "#333",
        marginBottom: 15,
    },
    variantItem: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        padding: 12,
        borderBottomWidth: 1,
        borderBottomColor: "#eee",
    },
    variantImage: {
        width: 60,
        height: 60,
        borderRadius: 8,
        marginRight: 10,
    },
    selectedVariantItem: {
        backgroundColor: "#fff3f3",
    },
    variantInfo: {
        flex: 1,
    },
    variantName: {
        fontSize: 14,
        color: "#333",
        marginBottom: 3,
    },
    variantPrice: {
        fontSize: 13,
        color: "#e30019",
    },
    variantStock: {
        fontSize: 13,
        color: "#2ecc71",
        marginRight: 10,
    },
    quantityContainer: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginVertical: 15,
    },
    quantityLabel: {
        fontSize: 14,
        color: "#333",
    },
    quantityControls: {
        flexDirection: "row",
        alignItems: "center",
    },
    quantityButton: {
        padding: 5,
        borderWidth: 1,
        borderColor: "#ddd",
    },
    quantityInput: {
        borderWidth: 1,
        borderColor: "#ddd",
        width: 50,
        height: 35,
        textAlign: "center",
        marginHorizontal: 5,
    },
    addToCartButton: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#e30019",
        borderRadius: 8,
        paddingVertical: 12,
    },
    addToCartButtonText: {
        color: "#fff",
        fontWeight: "bold",
        marginLeft: 8,
    },
    disabledButton: {
        opacity: 0.7,
    },
    priceContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 5,
    },
    productSalePrice: {
        color: '#e30019',
        fontWeight: 'bold',
        marginRight: 8,
    },
    productOriginalPrice: {
        color: '#999',
        textDecorationLine: 'line-through',
        marginLeft: 8,
    },
    productPrice: {
        color: '#e30019',
        marginRight: 8,
    },

})

export default ProductSelector