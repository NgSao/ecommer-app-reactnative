import { View, Text, TouchableOpacity, ActivityIndicator, StyleSheet } from "react-native"
import { Ionicons } from "@expo/vector-icons"

const ProductsHeader = ({ onBack, onImport, onAddProduct, importLoading }) => (
    <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={onBack}>
            <Ionicons name="arrow-back" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Quản lý sản phẩm</Text>
        <View style={styles.headerActions}>
            <TouchableOpacity
                style={[styles.importButton, importLoading && styles.disabledButton]}
                onPress={onImport}
                disabled={importLoading}
            >
                {importLoading ? (
                    <ActivityIndicator size="small" color="#fff" />
                ) : (
                    <>
                        <Ionicons name="cloud-upload-outline" size={20} color="#fff" />
                        <Text style={styles.importButtonText}>Nhập Excel</Text>
                    </>
                )}
            </TouchableOpacity>
            <TouchableOpacity style={styles.addButton} onPress={onAddProduct}>
                <Ionicons name="add" size={24} color="#fff" />
            </TouchableOpacity>
        </View>
    </View>
)

const styles = StyleSheet.create({
    header: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        backgroundColor: "#fff",
        paddingHorizontal: 15,
        paddingVertical: 15,
        borderBottomWidth: 1,
        borderBottomColor: "#eee",
    },
    backButton: {
        padding: 5,
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: "bold",
        color: "#333",
    },
    headerActions: {
        flexDirection: "row",
        alignItems: "center",
    },
    importButton: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#0066cc",
        paddingHorizontal: 12,
        paddingVertical: 8,
        borderRadius: 8,
        marginRight: 10,
    },
    importButtonText: {
        color: "#fff",
        marginLeft: 5,
        fontSize: 14,
    },
    disabledButton: {
        opacity: 0.7,
    },
    addButton: {
        backgroundColor: "#e30019",
        width: 40,
        height: 40,
        borderRadius: 20,
        justifyContent: "center",
        alignItems: "center",
    },
})

export default ProductsHeader