import { StyleSheet } from "react-native"

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#f5f5f5",
    },

    mapContainer: {
        height: 300,
        margin: 10,
        borderRadius: 10,
        overflow: "hidden",
    },
    map: {
        flex: 1,
    },
    section: {
        backgroundColor: "#fff",
        padding: 15,
        marginBottom: 10,
    },
    sectionTitle: {
        fontSize: 16,
        fontWeight: "bold",
        marginBottom: 15,
    },
    radioContainer: {
        flexDirection: "row",
        alignItems: "center",
        paddingVertical: 10,
    },
    radio: {
        width: 20,
        height: 20,
        borderRadius: 10,
        borderWidth: 2,
        borderColor: "#666",
        marginRight: 10,
    },
    radioSelected: {
        backgroundColor: "#e30019",
        borderColor: "#e30019",
    },
    radioLabel: {
        fontSize: 14,
        color: "#333",
    },
    subSection: {
        marginLeft: 20,
        marginTop: 10,
    },
    subSectionTitle: {
        fontSize: 14,
        fontWeight: "600",
        marginBottom: 10,
    },
})

export default styles