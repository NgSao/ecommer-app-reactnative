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
    categoriesContainer: {
        backgroundColor: "#fff",
        paddingVertical: 10,
    },
    bannersContainer: {
        height: 150,
    },
    saleSection: {
        backgroundColor: "#e30019",
        marginTop: 10,
        paddingBottom: 15,
    },
    saleSectionHeader: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        padding: 10,
    },
    saleSectionTitleContainer: {
        flexDirection: "row",
        alignItems: "center",
    },
    saleSectionTitle: {
        color: "#fff",
        fontSize: 18,
        fontWeight: "bold",
        marginLeft: 5,
    },
    productsSection: {
        marginTop: 15,
        backgroundColor: "#fff",
        padding: 10,
    },
    sectionHeader: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 10,
    },
    sectionTitle: {
        fontSize: 16,
        fontWeight: "bold",
    },
    sectionViewAll: {
        color: "#e30019",
        fontSize: 14,
    },
    productsGrid: {
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "space-between",
    },
    productGridItem: {
        width: "50%",
        marginBottom: 10,
    },
})

export default styles