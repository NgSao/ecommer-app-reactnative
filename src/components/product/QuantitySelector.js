// import { View, Text, TouchableOpacity, StyleSheet } from "react-native"
// import { Ionicons } from "@expo/vector-icons"

// const QuantitySelector = ({ quantity, incrementQuantity, decrementQuantity, selectedVariant, product }) => (
//     <View style={styles.selectionContainer}>
//         <Text style={styles.selectionTitle}>Số lượng</Text>
//         <View style={styles.quantityContainer}>
//             <TouchableOpacity
//                 style={[styles.quantityButton, quantity <= 1 && styles.disabledButton]}
//                 onPress={decrementQuantity}
//                 disabled={quantity <= 1}
//             >
//                 <Ionicons name="remove" size={20} color={quantity <= 1 ? "#ccc" : "#333"} />
//             </TouchableOpacity>
//             <Text style={styles.quantityText}>{quantity}</Text>
//             <TouchableOpacity
//                 style={[
//                     styles.quantityButton,
//                     (!selectedVariant || quantity >= selectedVariant.stock) && styles.disabledButton,
//                 ]}
//                 onPress={incrementQuantity}
//                 // disabled={!selectedVariant || quantity >= selectedVariant.stock}
//                 disabled={selectedVariant
//                     ? quantity >= selectedVariant.stock
//                     : !product || quantity >= (product.stock || 0)}
//             >
//                 <Ionicons
//                     name="add"
//                     size={20}
//                     color={!selectedVariant || quantity >= selectedVariant.stock ? "#ccc" : "#333"}

//                 />
//             </TouchableOpacity>
//         </View>
//     </View>
// )

// const styles = StyleSheet.create({
//     selectionContainer: {
//         backgroundColor: "#fff",
//         padding: 15,
//         marginTop: 10,
//     },
//     selectionTitle: {
//         fontSize: 16,
//         fontWeight: "bold",
//         marginBottom: 10,
//     },
//     quantityContainer: {
//         flexDirection: "row",
//         alignItems: "center",
//     },
//     quantityButton: {
//         borderWidth: 1,
//         borderColor: "#ddd",
//         width: 36,
//         height: 36,
//         justifyContent: "center",
//         alignItems: "center",
//         borderRadius: 5,
//     },
//     disabledButton: {
//         backgroundColor: "#f5f5f5",
//         borderColor: "#eee",
//     },
//     quantityText: {
//         paddingHorizontal: 20,
//         fontSize: 16,
//     },
// })

// export default QuantitySelector

import { View, Text, TouchableOpacity, StyleSheet } from "react-native"
import { Ionicons } from "@expo/vector-icons"

const QuantitySelector = ({ quantity, incrementQuantity, decrementQuantity, selectedVariant, product }) => (
    <View style={styles.selectionContainer}>
        <Text style={styles.selectionTitle}>Số lượng</Text>
        <View style={styles.quantityContainer}>
            <TouchableOpacity
                style={[styles.quantityButton, quantity <= 1 && styles.disabledButton]}
                onPress={decrementQuantity}
                disabled={quantity <= 1}
            >
                <Ionicons name="remove" size={20} color={quantity <= 1 ? "#ccc" : "#333"} />
            </TouchableOpacity>
            <Text style={styles.quantityText}>{quantity}</Text>
            <TouchableOpacity
                style={[
                    styles.quantityButton,
                    (selectedVariant
                        ? quantity >= selectedVariant.stock
                        : !product || quantity >= (product.stock || 0)) && styles.disabledButton,
                ]}
                onPress={incrementQuantity}
                disabled={selectedVariant
                    ? quantity >= selectedVariant.stock
                    : !product || quantity >= (product.stock || 0)}
            >
                <Ionicons
                    name="add"
                    size={20}
                    color={
                        selectedVariant
                            ? quantity >= selectedVariant.stock ? "#ccc" : "#333"
                            : !product || quantity >= (product.stock || 0) ? "#ccc" : "#333"
                    }
                />
            </TouchableOpacity>
        </View>
    </View>
)

const styles = StyleSheet.create({
    selectionContainer: {
        backgroundColor: "#fff",
        padding: 15,
        marginTop: 10,
    },
    selectionTitle: {
        fontSize: 16,
        fontWeight: "bold",
        marginBottom: 10,
    },
    quantityContainer: {
        flexDirection: "row",
        alignItems: "center",
    },
    quantityButton: {
        borderWidth: 1,
        borderColor: "#ddd",
        width: 36,
        height: 36,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 5,
    },
    disabledButton: {
        backgroundColor: "#f5f5f5",
        borderColor: "#eee",
    },
    quantityText: {
        paddingHorizontal: 20,
        fontSize: 16,
    },
})

export default QuantitySelector