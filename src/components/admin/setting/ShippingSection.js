import { View, Text, TextInput, Switch, StyleSheet } from "react-native"
import { Ionicons } from "@expo/vector-icons"

const ShippingSection = ({
    shippingMethods,
    freeShippingThreshold,
    setFreeShippingThreshold,
    toggleShippingMethod,
    updateShippingPrice,
}) => {
    return (
        <View style={styles.section}>
            <View style={styles.sectionHeader}>
                <Ionicons name="car-outline" size={22} color="#333" />
                <Text style={styles.sectionTitle}>Cài đặt vận chuyển</Text>
            </View>

            <View style={styles.formGroup}>
                <Text style={styles.label}>Miễn phí vận chuyển cho đơn hàng từ (VNĐ)</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Nhập giá trị đơn hàng tối thiểu"
                    value={freeShippingThreshold}
                    onChangeText={setFreeShippingThreshold}
                    keyboardType="numeric"
                />
            </View>

            <Text style={styles.subSectionTitle}>Phương thức vận chuyển</Text>

            {shippingMethods.map((method) => (
                <View key={method.id} style={styles.methodItem}>
                    <View style={styles.methodHeader}>
                        <View style={styles.methodTitleContainer}>
                            <Switch
                                value={method.enabled}
                                onValueChange={() => toggleShippingMethod(method.id)}
                                trackColor={{ false: "#ccc", true: "#e30019" }}
                                thumbColor="#fff"
                            />
                            <Text style={[styles.methodTitle, !method.enabled && styles.disabledText]}>{method.name}</Text>
                        </View>
                    </View>
                    <View style={styles.methodPriceContainer}>
                        <Text style={[styles.methodPriceLabel, !method.enabled && styles.disabledText]}>Phí vận chuyển:</Text>
                        <TextInput
                            style={[styles.methodPriceInput, !method.enabled && styles.disabledInput]}
                            value={method.price.toString()}
                            onChangeText={(text) => updateShippingPrice(method.id, text)}
                            keyboardType="numeric"
                            editable={method.enabled}
                        />
                        <Text style={[styles.methodPriceCurrency, !method.enabled && styles.disabledText]}>VNĐ</Text>
                    </View>
                </View>
            ))}
        </View>
    )
}

const styles = StyleSheet.create({
    section: {
        backgroundColor: "#fff",
        borderRadius: 10,
        padding: 15,
        marginBottom: 20,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    sectionHeader: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 15,
        paddingBottom: 10,
        borderBottomWidth: 1,
        borderBottomColor: "#eee",
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: "bold",
        color: "#333",
        marginLeft: 10,
    },
    formGroup: {
        marginBottom: 15,
    },
    label: {
        fontSize: 16,
        color: "#333",
        marginBottom: 8,
    },
    input: {
        borderWidth: 1,
        borderColor: "#ddd",
        borderRadius: 8,
        paddingHorizontal: 15,
        paddingVertical: 10,
        fontSize: 16,
    },
    subSectionTitle: {
        fontSize: 16,
        fontWeight: "bold",
        color: "#333",
        marginTop: 10,
        marginBottom: 15,
    },
    methodItem: {
        backgroundColor: "#f9f9f9",
        borderRadius: 8,
        padding: 12,
        marginBottom: 10,
    },
    methodHeader: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 10,
    },
    methodTitleContainer: {
        flexDirection: "row",
        alignItems: "center",
    },
    methodTitle: {
        fontSize: 16,
        fontWeight: "bold",
        color: "#333",
        marginLeft: 10,
    },
    methodPriceContainer: {
        flexDirection: "row",
        alignItems: "center",
        marginLeft: 35,
    },
    methodPriceLabel: {
        fontSize: 14,
        color: "#666",
        marginRight: 10,
    },
    methodPriceInput: {
        borderWidth: 1,
        borderColor: "#ddd",
        borderRadius: 5,
        paddingHorizontal: 10,
        paddingVertical: 5,
        width: 100,
        fontSize: 14,
    },
    methodPriceCurrency: {
        fontSize: 14,
        color: "#666",
        marginLeft: 5,
    },
    disabledText: {
        color: "#aaa",
    },
    disabledInput: {
        borderColor: "#eee",
        backgroundColor: "#f5f5f5",
        color: "#aaa",
    },
})

export default ShippingSection