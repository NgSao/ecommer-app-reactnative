import { StyleSheet } from "react-native"

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#f5f5f5",
    },
    statsContainer: {
        paddingHorizontal: 16,
        marginBottom: 8,
    },
    statsText: {
        fontSize: 14,
        color: "#666",
    },
    listContainer: {
        padding: 16,
        paddingTop: 8,
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
    emptyContainer: {
        alignItems: "center",
        justifyContent: "center",
        padding: 40,
    },
    emptyText: {
        fontSize: 16,
        color: "#666",
        marginTop: 12,
    },
})

export default styles