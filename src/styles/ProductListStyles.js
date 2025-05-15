import { StyleSheet } from "react-native";

export default StyleSheet.create({
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
    productsList: {
        padding: 10,
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
    limitSelector: {
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 10,
        paddingVertical: 5,
        backgroundColor: "#fff",
        borderBottomWidth: 1,
        borderBottomColor: "#eee",
    },
    limitLabel: {
        fontSize: 14,
        color: "#666",
        marginRight: 10,
    },
    limitButton: {
        paddingVertical: 5,
        paddingHorizontal: 10,
        borderWidth: 1,
        borderColor: "#ddd",
        borderRadius: 5,
        marginRight: 5,
    },
    activeLimitButton: {
        borderColor: "#e30019",
        backgroundColor: "#fff0f0",
    },
    limitText: {
        fontSize: 14,
        color: "#666",
    },
});