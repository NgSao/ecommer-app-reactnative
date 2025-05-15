import { StyleSheet } from "react-native";

export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#f5f5f5",
    },
    scrollContent: {
        paddingBottom: 20,
    },
    searchContainer: {
        flexDirection: "row",
        alignItems: "center",
        marginHorizontal: 15,
        marginVertical: 10,
    },
    searchInput: {
        flex: 1,
        borderWidth: 1,
        borderColor: "#ddd",
        borderRadius: 5,
        padding: 10,
        marginRight: 10,
        fontSize: 16,
    },
    mapContainer: {
        height: 300,
        marginHorizontal: 15,
        marginVertical: 10,
        borderRadius: 10,
        overflow: "hidden",
    },
    map: {
        flex: 1,
    },
    loadingContainer: {
        alignItems: "center",
        justifyContent: "center",
        marginVertical: 20,
    },
    loadingText: {
        marginTop: 10,
        fontSize: 16,
        color: "#666",
    },
    noMapText: {
        textAlign: "center",
        marginVertical: 20,
        fontSize: 16,
        color: "#666",
    },
});