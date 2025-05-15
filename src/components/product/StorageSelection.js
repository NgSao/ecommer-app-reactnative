import { View, Text, TouchableOpacity, StyleSheet } from "react-native"

const StorageSelection = ({
    availableStorageOptions,
    selectedStorage,
    handleStorageSelect,
    isVariantInStock,
    selectedColor,
}) => {
    if (selectedStorage === null) return null;
    return (
        <View style={styles.selectionContainer}>
            <Text style={styles.selectionTitle}>Dung lượng</Text>
            <View style={styles.optionsContainer}>
                {availableStorageOptions.map((storage) => (
                    <TouchableOpacity
                        key={storage}
                        style={[
                            styles.storageOption,
                            selectedStorage === storage && styles.selectedOption,
                            !isVariantInStock(selectedColor, storage) && styles.outOfStockOption,
                        ]}
                        onPress={() => handleStorageSelect(storage)}
                    >
                        <Text
                            style={[
                                selectedStorage === storage ? styles.selectedOptionText : styles.optionText,
                                !isVariantInStock(selectedColor, storage) && styles.outOfStockOptionText,
                            ]}
                        >
                            {storage}
                        </Text>
                        {!isVariantInStock(selectedColor, storage) && <Text style={styles.outOfStockLabel}>Hết hàng</Text>}
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
    storageOption: {
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

export default StorageSelection