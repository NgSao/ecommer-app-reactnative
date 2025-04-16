import { View, Text, TouchableOpacity, StyleSheet } from "react-native"
import { Ionicons } from "@expo/vector-icons"

const FormatOption = ({ exportFormat, setExportFormat }) => {
    const options = [
        { id: "pdf", title: "PDF", icon: "document-text-outline" },
        { id: "xlsx", title: "Excel", icon: "grid-outline" },
        { id: "csv", title: "CSV", icon: "list-outline" },
    ]

    return (
        <View style={styles.formatContainer}>
            {options.map((option) => (
                <TouchableOpacity
                    key={option.id}
                    style={[styles.formatOption, exportFormat === option.id && styles.selectedFormatOption]}
                    onPress={() => setExportFormat(option.id)}
                >
                    <Ionicons name={option.icon} size={24} color={exportFormat === option.id ? "#fff" : "#333"} />
                    <Text style={[styles.formatText, exportFormat === option.id && styles.selectedFormatText]}>
                        {option.title}
                    </Text>
                </TouchableOpacity>
            ))}
        </View>
    )
}

const styles = StyleSheet.create({
    formatContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
    },
    formatOption: {
        flex: 1,
        alignItems: "center",
        padding: 15,
        borderRadius: 8,
        backgroundColor: "#f9f9f9",
        marginHorizontal: 5,
        borderWidth: 1,
        borderColor: "#eee",
    },
    selectedFormatOption: {
        backgroundColor: "#e30019",
        borderColor: "#e30019",
    },
    formatText: {
        fontSize: 14,
        color: "#333",
        marginTop: 5,
    },
    selectedFormatText: {
        color: "#fff",
        fontWeight: "500",
    },
})

export default FormatOption