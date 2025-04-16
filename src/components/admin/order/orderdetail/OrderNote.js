import { View, Text, StyleSheet } from "react-native"

const OrderNote = ({ note }) => {
    return (
        <View style={styles.section}>
            <Text style={styles.sectionTitle}>Ghi chú</Text>
            <Text style={styles.noteText}>{note}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    section: {
        backgroundColor: "#fff",
        borderRadius: 10,
        padding: 15,
        marginBottom: 15,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    sectionTitle: {
        fontSize: 16,
        fontWeight: "bold",
        color: "#333",
        marginBottom: 10,
    },
    noteText: {
        fontSize: 14,
        color: "#666",
        fontStyle: "italic",
    },
})

export default OrderNote