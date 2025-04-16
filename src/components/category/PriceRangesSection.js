import { View, TouchableOpacity, Text, StyleSheet } from "react-native"

const PriceRangesSection = ({ selectedCategory, navigateToProductList }) => {
    if (!selectedCategory.priceRanges || selectedCategory.priceRanges.length === 0) return null

    return (
        <View style={styles.subcategorySection}>
            <Text style={styles.sectionTitle}>Mức giá {selectedCategory.name}</Text>
            <View style={styles.priceRangesGrid}>
                {selectedCategory.priceRanges.map((range) => (
                    <TouchableOpacity
                        key={range.id}
                        style={styles.priceRangeItem}
                        onPress={() => navigateToProductList(selectedCategory, null, range)}
                    >
                        <Text style={styles.priceRangeName}>{range.name}</Text>
                    </TouchableOpacity>
                ))}
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    subcategorySection: {
        marginBottom: 20,
    },
    sectionTitle: {
        fontSize: 16,
        fontWeight: "bold",
        marginBottom: 15,
    },
    priceRangesGrid: {
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "space-between",
    },
    priceRangeItem: {
        width: "48%",
        backgroundColor: "#f5f5f5",
        padding: 10,
        borderRadius: 5,
        marginBottom: 10,
    },
    priceRangeName: {
        fontSize: 12,
        textAlign: "center",
    },
})

export default PriceRangesSection