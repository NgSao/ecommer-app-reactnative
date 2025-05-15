import { View, TouchableOpacity, Text, StyleSheet } from "react-native";

const FiltersContainer = ({
    showFilters,
    setShowFilters,
    priceRange,
    setPriceRange,
    selectedPriceRange,
    setSelectedPriceRange,
    selectedBrands,
    setSelectedBrands,
    selectedCategories,
    setSelectedCategories,
    categories,
    brands,
}) => {
    if (!showFilters) return null;

    return (
        <View style={styles.filtersContainer}>
            <Text style={styles.filterTitle}>Danh mục</Text>
            <View style={styles.categoryContainer}>
                {categories.map((category) => (
                    <TouchableOpacity
                        key={category.id}
                        style={[
                            styles.categoryButton,
                            selectedCategories.includes(category.name) && styles.activeCategory,
                        ]}
                        onPress={() => {
                            setSelectedCategories((prev) =>
                                prev.includes(category.name)
                                    ? prev.filter((c) => c !== category.name)
                                    : [...prev, category.name]
                            );
                        }}
                    >
                        <Text style={styles.categoryText}>{category.name}</Text>
                    </TouchableOpacity>
                ))}
            </View>

            <Text style={styles.filterTitle}>Thương hiệu</Text>
            <View style={styles.brandContainer}>
                {brands.map((brand) => (
                    <TouchableOpacity
                        key={brand.id}
                        style={[
                            styles.brandButton,
                            selectedBrands.includes(brand.name) && styles.activeBrand,
                        ]}
                        onPress={() => {
                            setSelectedBrands((prev) =>
                                prev.includes(brand.name)
                                    ? prev.filter((b) => b !== brand.name)
                                    : [...prev, brand.name]
                            );
                        }}
                    >
                        <Text style={styles.brandText}>{brand.name}</Text>
                    </TouchableOpacity>
                ))}
            </View>

            <Text style={styles.filterTitle}>Khoảng giá</Text>
            <View style={styles.priceRangeContainer}>
                <TouchableOpacity
                    style={[
                        styles.priceRangeButton,
                        selectedPriceRange === "under5" && styles.activePriceRange,
                    ]}
                    onPress={() => {
                        if (selectedPriceRange === "under5") {
                            setSelectedPriceRange(null);
                            setPriceRange({ min: 0, max: 50000000 });
                        } else {
                            setSelectedPriceRange("under5");
                            setPriceRange({ min: 0, max: 5000000 });
                        }
                    }}
                >
                    <Text style={styles.priceRangeText}>Dưới 5 triệu</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[
                        styles.priceRangeButton,
                        selectedPriceRange === "5to10" && styles.activePriceRange,
                    ]}
                    onPress={() => {
                        if (selectedPriceRange === "5to10") {
                            setSelectedPriceRange(null);
                            setPriceRange({ min: 0, max: 50000000 });
                        } else {
                            setSelectedPriceRange("5to10");
                            setPriceRange({ min: 5000000, max: 10000000 });
                        }
                    }}
                >
                    <Text style={styles.priceRangeText}>5 - 10 triệu</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[
                        styles.priceRangeButton,
                        selectedPriceRange === "10to20" && styles.activePriceRange,
                    ]}
                    onPress={() => {
                        if (selectedPriceRange === "10to20") {
                            setSelectedPriceRange(null);
                            setPriceRange({ min: 0, max: 50000000 });
                        } else {
                            setSelectedPriceRange("10to20");
                            setPriceRange({ min: 10000000, max: 20000000 });
                        }
                    }}
                >
                    <Text style={styles.priceRangeText}>10 - 20 triệu</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[
                        styles.priceRangeButton,
                        selectedPriceRange === "above20" && styles.activePriceRange,
                    ]}
                    onPress={() => {
                        if (selectedPriceRange === "above20") {
                            setSelectedPriceRange(null);
                            setPriceRange({ min: 0, max: 50000000 });
                        } else {
                            setSelectedPriceRange("above20");
                            setPriceRange({ min: 20000000, max: 50000000 });
                        }
                    }}
                >
                    <Text style={styles.priceRangeText}>Trên 20 triệu</Text>
                </TouchableOpacity>
            </View>
            <TouchableOpacity style={styles.applyFilterButton} onPress={() => setShowFilters(false)}>
                <Text style={styles.applyFilterText}>Áp dụng</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    filtersContainer: {
        backgroundColor: "#fff",
        padding: 15,
        borderBottomWidth: 1,
        borderBottomColor: "#eee",
    },
    filterTitle: {
        fontSize: 16,
        fontWeight: "bold",
        marginBottom: 10,
    },
    categoryContainer: {
        flexDirection: "row",
        flexWrap: "wrap",
        marginBottom: 15,
    },
    categoryButton: {
        paddingVertical: 8,
        paddingHorizontal: 12,
        borderWidth: 1,
        borderColor: "#ddd",
        borderRadius: 5,
        marginRight: 10,
        marginBottom: 10,
    },
    activeCategory: {
        borderColor: "#e30019",
        backgroundColor: "#fff0f0",
    },
    categoryText: {
        fontSize: 14,
        color: "#666",
    },
    brandContainer: {
        flexDirection: "row",
        flexWrap: "wrap",
        marginBottom: 15,
    },
    brandButton: {
        paddingVertical: 8,
        paddingHorizontal: 12,
        borderWidth: 1,
        borderColor: "#ddd",
        borderRadius: 5,
        marginRight: 10,
        marginBottom: 10,
    },
    activeBrand: {
        borderColor: "#e30019",
        backgroundColor: "#fff0f0",
    },
    brandText: {
        fontSize: 14,
        color: "#666",
    },
    priceRangeContainer: {
        flexDirection: "row",
        flexWrap: "wrap",
        marginBottom: 15,
    },
    priceRangeButton: {
        paddingVertical: 8,
        paddingHorizontal: 12,
        borderWidth: 1,
        borderColor: "#ddd",
        borderRadius: 5,
        marginRight: 10,
        marginBottom: 10,
    },
    activePriceRange: {
        borderColor: "#e30019",
        backgroundColor: "#fff0f0",
    },
    priceRangeText: {
        fontSize: 14,
        color: "#666",
    },
    applyFilterButton: {
        backgroundColor: "#e30019",
        paddingVertical: 10,
        borderRadius: 5,
        alignItems: "center",
    },
    applyFilterText: {
        color: "#fff",
        fontSize: 14,
        fontWeight: "bold",
    },
});

export default FiltersContainer;