import { View, TouchableOpacity, Text, StyleSheet } from "react-native"

const OrderActions = ({ onCancelOrder }) => (
    <View style={styles.actionsContainer}>
        <TouchableOpacity style={styles.cancelButton} onPress={onCancelOrder}>
            <Text style={styles.cancelButtonText}>Hủy đơn hàng</Text>
        </TouchableOpacity>
    </View>
)

const styles = StyleSheet.create({
    actionsContainer: {
        padding: 15,
        marginBottom: 20,
    },
    cancelButton: {
        backgroundColor: "#f44336",
        paddingVertical: 12,
        borderRadius: 5,
        alignItems: "center",
    },
    cancelButtonText: {
        color: "#fff",
        fontWeight: "bold",
        fontSize: 16,
    },
})

export default OrderActions