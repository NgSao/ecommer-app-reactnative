import { View, TouchableOpacity, Image, Text, StyleSheet } from "react-native"

const DeviceModelsSection = ({ selectedCategory, navigateToProductList }) => (
    <View style={styles.subcategorySection}>
        <Text style={styles.sectionTitle}>Dòng máy</Text>
        <View style={styles.deviceModelsGrid}>
            {selectedCategory.children.map((subcat) => (
                <TouchableOpacity
                    key={subcat.id}
                    style={styles.deviceModelItem}
                    onPress={() => navigateToProductList(selectedCategory, subcat)}
                >
                    <Image source={{ uri: subcat.imageUrl }} style={styles.deviceModelImage} resizeMode="contain" />
                    <Text style={styles.deviceModelName}>{subcat.name}</Text>
                </TouchableOpacity>
            ))}
        </View>
    </View>
)

const styles = StyleSheet.create({
    subcategorySection: {
        marginBottom: 20,
    },
    sectionTitle: {
        fontSize: 16,
        fontWeight: "bold",
        marginBottom: 15,
    },
    deviceModelsGrid: {
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "space-between",
    },
    deviceModelItem: {
        width: "30%",
        marginBottom: 15,
        alignItems: "center",
    },
    deviceModelImage: {
        width: 70,
        height: 70,
        marginBottom: 5,
    },
    deviceModelName: {
        fontSize: 12,
        textAlign: "center",
    },
})

export default DeviceModelsSection