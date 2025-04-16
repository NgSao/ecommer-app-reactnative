import { View, Text, StyleSheet } from "react-native"
import FormInput from "./FormInput"

const CustomerFormSection = ({ title, description, children }) => {
    return (
        <View style={styles.section}>
            <Text style={styles.sectionTitle}>{title}</Text>
            {description && <Text style={styles.sectionDescription}>{description}</Text>}
            {children}
        </View>
    )
}

const styles = StyleSheet.create({
    section: {
        backgroundColor: "#fff",
        borderRadius: 8,
        padding: 16,
        marginBottom: 16,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: "bold",
        marginBottom: 12,
        color: "#333",
    },
    sectionDescription: {
        fontSize: 14,
        color: "#666",
        marginBottom: 16,
    },
})

export default CustomerFormSection