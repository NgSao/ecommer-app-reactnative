import { StyleSheet } from "react-native"

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#f5f5f5",
    },
    scrollContainer: {
        flex: 1,
        padding: 16,
    },
    formRow: {
        flexDirection: "row",
        justifyContent: "space-between",
    },
    createButton: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#e30019",
        borderRadius: 8,
        paddingVertical: 14,
        marginBottom: 32,
    },
    createButtonText: {
        color: "#fff",
        fontSize: 18,
        fontWeight: "bold",
        marginLeft: 8,
    },
    disabledButton: {
        opacity: 0.7,
    },
})

export default styles