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
    },
    loadingText: {
        marginTop: 12,
        fontSize: 16,
        color: "#666",
    },
    aiSuggestionsContainer: {
        padding: 10,
        backgroundColor: '#f0f0f0',
        borderTopWidth: 1,
        borderTopColor: '#ddd',
    },
    aiSuggestion: {
        padding: 10,
        backgroundColor: '#fff',
        borderRadius: 5,
        marginBottom: 5,
        color: '#333',
        fontSize: 14,
    },
})

export default styles