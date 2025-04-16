import { StyleSheet } from "react-native"

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#f5f5f5",
    },
    scrollContainer: {
        flex: 1,
        padding: 15,
    },
    section: {
        backgroundColor: "#fff",
        borderRadius: 10,
        padding: 15,
        marginBottom: 15,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    sectionHeader: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 15,
    },
    sectionTitle: {
        fontSize: 16,
        fontWeight: "bold",
        color: "#333",
        marginBottom: 15,
    },
    addButton: {
        flexDirection: "row",
        alignItems: "center",
    },
    addButtonText: {
        color: "#e30019",
        marginLeft: 5,
    },
    emptyCartContainer: {
        alignItems: "center",
        justifyContent: "center",
        paddingVertical: 30,
    },
    emptyCartText: {
        fontSize: 14,
        color: "#666",
        marginTop: 10,
        marginBottom: 15,
    },
    addProductButton: {
        backgroundColor: "#e30019",
        paddingHorizontal: 15,
        paddingVertical: 8,
        borderRadius: 5,
    },
    addProductButtonText: {
        color: "#fff",
        fontWeight: "bold",
    },
    noteInput: {
        borderWidth: 1,
        borderColor: "#ddd",
        borderRadius: 8,
        padding: 10,
        height: 80,
        textAlignVertical: "top",
    },
    createOrderButton: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#e30019",
        borderRadius: 8,
        paddingVertical: 15,
        marginBottom: 30,
    },
    createOrderButtonText: {
        color: "#fff",
        fontWeight: "bold",
        fontSize: 16,
        marginLeft: 8,
    },
    disabledButton: {
        opacity: 0.7,
    },
})

export default styles