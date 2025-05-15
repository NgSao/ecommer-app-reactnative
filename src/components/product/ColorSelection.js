import { View, Text, TouchableOpacity, StyleSheet } from "react-native"

const ColorSelection = ({ availableColors, selectedColor, handleColorSelect, isVariantInStock, selectedStorage }) => {
    if (selectedColor === null) return null;

    return (
        <View style={styles.selectionContainer}>
            <Text style={styles.selectionTitle}>Màu sắc</Text>
            <View style={styles.optionsContainer}>
                {availableColors.map((color) => (
                    <TouchableOpacity
                        key={color}
                        style={[
                            styles.colorOption,
                            selectedColor === color && styles.selectedOption,
                            !isVariantInStock(color, selectedStorage) && styles.outOfStockOption,
                        ]}
                        onPress={() => handleColorSelect(color)}
                    >
                        <Text
                            style={[
                                selectedColor === color ? styles.selectedOptionText : styles.optionText,
                                !isVariantInStock(color, selectedStorage) && styles.outOfStockOptionText,
                            ]}
                        >
                            {color}
                        </Text>
                        {!isVariantInStock(color, selectedStorage) && <Text style={styles.outOfStockLabel}>Hết hàng</Text>}
                    </TouchableOpacity>
                ))}
            </View>
        </View>
    )
}

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
    optionsContainer: {
        flexDirection: "row",
        flexWrap: "wrap",
    },
    colorOption: {
        borderWidth: 1,
        borderColor: "#ddd",
        borderRadius: 5,
        paddingVertical: 8,
        paddingHorizontal: 15,
        marginRight: 10,
        marginBottom: 10,
        position: "relative",
    },
    selectedOption: {
        borderColor: "#e30019",
        backgroundColor: "#FFF0F0",
    },
    outOfStockOption: {
        borderColor: "#ddd",
        backgroundColor: "#f5f5f5",
    },
    optionText: {
        color: "#333",
    },
    selectedOptionText: {
        color: "#e30019",
        fontWeight: "bold",
    },
    outOfStockOptionText: {
        color: "#999",
    },
    outOfStockLabel: {
        position: "absolute",
        bottom: -6,
        right: 0,
        left: 0,
        backgroundColor: "#f5f5f5",
        color: "#999",
        fontSize: 10,
        textAlign: "center",
        paddingVertical: 2,
    },
})

export default ColorSelection