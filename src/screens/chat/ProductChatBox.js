import { View, Text, Image, StyleSheet } from "react-native";

const ProductChatBox = ({ product }) => {
    const price = product.price === 0 ? product.originalPrice : product.price;
    const discount = product.discount === 100 ? null : product.discount;

    return (
        <View style={styles.container}>
            <Image source={{ uri: product.imageUrl }} style={styles.productImage} />
            <Text style={styles.productName}>{product.name}</Text>
            <Text style={styles.productDetails}>Màu sắc: {product.color}</Text>
            <Text style={styles.productDetails}>Dung lượng: {product.storage}</Text>
            <Text style={styles.productPrice}>Giá: {price.toLocaleString()}₫</Text>
            {discount && <Text style={styles.productDiscount}>Giảm giá: {discount}%</Text>}
            <Text style={styles.productStock}>Kho còn lại: {product.stock} đơn vị</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 10,
        backgroundColor: "#fff",
        borderRadius: 8,
        borderWidth: 1,
        borderColor: "#ddd",
    },
    productImage: {
        width: 200,
        height: 200,
        borderRadius: 8,
        marginBottom: 10,
    },
    productName: {
        fontSize: 18,
        fontWeight: "bold",
    },
    productDetails: {
        fontSize: 14,
        marginVertical: 2,
    },
    productPrice: {
        fontSize: 16,
        fontWeight: "bold",
        color: "#e30019",
    },
    productDiscount: {
        fontSize: 14,
        color: "#ff6347",
    },
    productStock: {
        fontSize: 14,
        color: "#555",
    },
});

export default ProductChatBox;
