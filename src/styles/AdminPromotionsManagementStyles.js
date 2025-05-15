import { StyleSheet } from "react-native";

export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#f5f5f5",
    },
    header: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#fff",
        padding: 15,
        borderBottomWidth: 1,
        borderBottomColor: "#eee",
    },
    backButton: {
        padding: 5,
    },
    headerTitle: {
        flex: 1,
        fontSize: 18,
        fontWeight: "bold",
        color: "#333",
        textAlign: "center",
    },
    addButton: {
        backgroundColor: "#e30019",
        borderRadius: 5,
        padding: 5,
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
        padding: 10,
    },
    sortContainer: {
        paddingHorizontal: 10,
        marginBottom: 10,
    },
    sortButton: {
        fontSize: 14,
        color: "#e30019",
        marginRight: 15,
        paddingVertical: 5,
    },
    paginationContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        padding: 10,
        backgroundColor: "#fff",
        borderTopWidth: 1,
        borderTopColor: "#eee",
    },
    paginationButton: {
        backgroundColor: "#e30019",
        paddingVertical: 8,
        paddingHorizontal: 15,
        borderRadius: 5,
    },
    disabledButton: {
        backgroundColor: "#ccc",
    },
    paginationText: {
        color: "#fff",
        fontSize: 14,
        fontWeight: "bold",
    },
    pageInfo: {
        fontSize: 14,
        color: "#666",
    },
});