import { StyleSheet } from "react-native"

const styles = StyleSheet.create({
    reviewsContainer: {
        backgroundColor: "#fff",
        padding: 15,
        marginTop: 10,
        marginBottom: 80,
    },
    reviewsHeader: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 15,
    },
    sectionTitle: {
        fontSize: 16,
        fontWeight: "bold",
    },
    writeReviewButton: {
        backgroundColor: "#f5f5f5",
        paddingVertical: 6,
        paddingHorizontal: 12,
        borderRadius: 5,
        borderWidth: 1,
        borderColor: "#ddd",
    },
    writeReviewText: {
        color: "#333",
        fontWeight: "500",
    },
    loadingContainer: {
        padding: 20,
        alignItems: "center",
    },
    loadingText: {
        color: "#666",
    },
    loadMoreButton: {
        borderWidth: 1,
        borderColor: "#ddd",
        borderRadius: 5,
        paddingVertical: 10,
        alignItems: "center",
    },
    loadMoreText: {
        color: "#333",
        fontWeight: "500",
    },
    emptyReviewsContainer: {
        padding: 20,
        alignItems: "center",
    },
    emptyReviewsText: {
        color: "#666",
        marginBottom: 10,
    },
    beFirstReviewButton: {
        backgroundColor: "#e30019",
        paddingVertical: 8,
        paddingHorizontal: 15,
        borderRadius: 5,
    },
    beFirstReviewText: {
        color: "#fff",
        fontWeight: "500",
    },
})

export default styles