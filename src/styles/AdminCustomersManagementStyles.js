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
        marginTop: 10,
        fontSize: 16,
        color: "#666",
    },
    listContainer: {
        padding: 15,
    },
    emptyContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: 20,
    },
    emptyText: {
        fontSize: 16,
        color: "#666",
        textAlign: "center",
        marginTop: 10,
    },
    addButton: {
        position: "absolute",
        bottom: 24,
        right: 24,
        width: 60,
        height: 60,
        borderRadius: 30,
        backgroundColor: "#e30019",
        justifyContent: "center",
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
        elevation: 5,
    },
    sortContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        padding: 10,
        backgroundColor: "#fff",
        borderBottomWidth: 1,
        borderBottomColor: "#eee",
    },
    sortButton: {
        flexDirection: "row",
        alignItems: "center",
        padding: 8,
        borderRadius: 5,
        backgroundColor: "#f0f0f0",
    },
    sortButtonText: {
        fontSize: 14,
        color: "#333",
        marginRight: 5,
    },
    paginationContainer: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        padding: 10,
        backgroundColor: "#fff",
    },
    paginationButton: {
        padding: 10,
        marginHorizontal: 5,
        borderRadius: 5,
        backgroundColor: "#e30019",
    },
    paginationButtonText: {
        color: "#fff",
        fontWeight: "bold",
    },
    pageText: {
        fontSize: 16,
        color: "#333",
    },
})

export default styles