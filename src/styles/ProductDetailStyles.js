import { StyleSheet } from "react-native"

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#f5f5f5",
    },
    loadingContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#f5f5f5",
    },
    loadingText: {
        marginTop: 10,
        fontSize: 16,
        color: "#666",
    },
    errorContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#f5f5f5",
        padding: 20,
    },
    errorText: {
        marginTop: 10,
        fontSize: 16,
        color: "#666",
        marginBottom: 20,
    },
    backButton: {
        backgroundColor: "#e30019",
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
    },
    backButtonText: {
        color: "#fff",
        fontWeight: "bold",
    },
})

export default styles