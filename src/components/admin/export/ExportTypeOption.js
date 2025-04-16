import { View, Text, TouchableOpacity, StyleSheet } from "react-native"
import { Ionicons } from "@expo/vector-icons"

const ExportTypeOption = ({ exportType, setExportType }) => {
    const options = [
        { id: "sales", title: "Báo cáo doanh số", icon: "cash-outline" },
        { id: "inventory", title: "Báo cáo tồn kho", icon: "cube-outline" },
        { id: "customers", title: "Báo cáo khách hàng", icon: "people-outline" },
        { id: "orders", title: "Báo cáo đơn hàng", icon: "cart-outline" },
        { id: "products", title: "Báo cáo sản phẩm", icon: "phone-portrait-outline" },
    ]

    return (
        <View style={styles.optionsContainer}>
            {options.map((option) => (
                <TouchableOpacity
                    key={option.id}
                    style={[styles.optionCard, exportType === option.id && styles.selectedOptionCard]}
                    onPress={() => setExportType(option.id)}
                >
                    <Ionicons name={option.icon} size={24} color={exportType === option.id ? "#fff" : "#e30019"} />
                    <Text style={[styles.optionTitle, exportType === option.id && styles.selectedOptionTitle]}>
                        {option.title}
                    </Text>
                    {exportType === option.id && (
                        <Ionicons name="checkmark-circle" size={20} color="#fff" style={styles.checkIcon} />
                    )}
                </TouchableOpacity>
            ))}
        </View>
    )
}

const styles = StyleSheet.create({
    optionsContainer: {
        flexDirection: "column",
        gap: 10,
    },
    optionCard: {
        flexDirection: "row",
        alignItems: "center",
        padding: 15,
        borderRadius: 8,
        backgroundColor: "#f9f9f9",
        borderWidth: 1,
        borderColor: "#eee",
    },
    selectedOptionCard: {
        backgroundColor: "#e30019",
        borderColor: "#e30019",
    },
    optionTitle: {
        fontSize: 14,
        color: "#333",
        marginLeft: 10,
        flex: 1,
    },
    selectedOptionTitle: {
        color: "#fff",
        fontWeight: "500",
    },
    checkIcon: {
        marginLeft: 10,
    },
})

export default ExportTypeOption