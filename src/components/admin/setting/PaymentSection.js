import { View, Text, Switch, StyleSheet } from "react-native"
import { Ionicons } from "@expo/vector-icons"

const PaymentSection = ({ paymentMethods, togglePaymentMethod }) => {
    return (
        <View style={styles.section}>
            <View style={styles.sectionHeader}>
                <Ionicons name="card-outline" size={22} color="#333" />
                <Text style={styles.sectionTitle}>Cài đặt thanh toán</Text>
            </View>

            <Text style={styles.subSectionTitle}>Phương thức thanh toán</Text>

            {paymentMethods.map((method) => (
                <View key={method.id} style={styles.paymentMethodItem}>
                    <Text style={[styles.paymentMethodTitle, !method.enabled && styles.disabledText]}>{method.name}</Text>
                    <Switch
                        value={method.enabled}
                        onValueChange={() => togglePaymentMethod(method.id)}
                        trackColor={{ false: "#ccc", true: "#e30019" }}
                        thumbColor="#fff"
                    />
                </View>
            ))}
        </View>
    )
}

const styles = StyleSheet.create({
    section: {
        backgroundColor: "#fff",
        borderRadius: 10,
        padding: 15,
        marginBottom: 20,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    sectionHeader: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 15,
        paddingBottom: 10,
        borderBottomWidth: 1,
        borderBottomColor: "#eee",
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: "bold",
        color: "#333",
        marginLeft: 10,
    },
    subSectionTitle: {
        fontSize: 16,
        fontWeight: "bold",
        color: "#333",
        marginTop: 10,
        marginBottom: 15,
    },
    paymentMethodItem: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingVertical: 12,
        borderBottomWidth: 1,
        borderBottomColor: "#eee",
    },
    paymentMethodTitle: {
        fontSize: 16,
        color: "#333",
    },
    disabledText: {
        color: "#aaa",
    },
})

export default PaymentSection