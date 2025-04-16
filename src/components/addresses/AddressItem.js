import { View, Text, TouchableOpacity, StyleSheet } from "react-native"
import { Ionicons } from "@expo/vector-icons"

const AddressItem = ({ item, onEdit, onDelete }) => (
    <View style={styles.addressItem}>
        <View style={styles.addressHeader}>
            <Text style={styles.addressName}>{item.name || "Địa chỉ"}</Text>
            {item.isDefault && (
                <View style={styles.defaultBadge}>
                    <Text style={styles.defaultBadgeText}>Mặc định</Text>
                </View>
            )}
        </View>
        <Text style={styles.addressRecipient}>
            {item.recipient} | {item.phone}
        </Text>
        <Text style={styles.addressText}>
            {item.address}, {item.ward}, {item.district}, {item.city}
        </Text>
        <View style={styles.addressActions}>
            <TouchableOpacity style={styles.editButton} onPress={() => onEdit(item)}>
                <Ionicons name="create-outline" size={18} color="#666" />
                <Text style={styles.editButtonText}>Sửa</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.deleteButton} onPress={() => onDelete(item)}>
                <Ionicons name="trash-outline" size={18} color="#e30019" />
                <Text style={styles.deleteButtonText}>Xóa</Text>
            </TouchableOpacity>
        </View>
    </View>
)

const styles = StyleSheet.create({
    addressItem: {
        backgroundColor: "#fff",
        borderRadius: 10,
        padding: 15,
        marginBottom: 15,
        borderWidth: 1,
        borderColor: "#eee",
    },
    addressHeader: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 5,
    },
    addressName: {
        fontSize: 16,
        fontWeight: "bold",
    },
    defaultBadge: {
        backgroundColor: "#e30019",
        paddingHorizontal: 8,
        paddingVertical: 2,
        borderRadius: 10,
    },
    defaultBadgeText: {
        color: "#fff",
        fontSize: 12,
    },
    addressRecipient: {
        fontSize: 14,
        marginBottom: 5,
    },
    addressText: {
        fontSize: 14,
        color: "#666",
        marginBottom: 10,
    },
    addressActions: {
        flexDirection: "row",
        borderTopWidth: 1,
        borderTopColor: "#eee",
        paddingTop: 10,
    },
    editButton: {
        flexDirection: "row",
        alignItems: "center",
        padding: 5,
        marginRight: 15,
    },
    editButtonText: {
        color: "#666",
        marginLeft: 5,
    },
    deleteButton: {
        flexDirection: "row",
        alignItems: "center",
        padding: 5,
    },
    deleteButtonText: {
        color: "#e30019",
        marginLeft: 5,
    },
})

export default AddressItem