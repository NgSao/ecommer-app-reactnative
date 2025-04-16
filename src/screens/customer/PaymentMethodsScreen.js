
import { useState, useEffect } from "react"
import { View, Text, StyleSheet, FlatList, TouchableOpacity, ActivityIndicator, Alert, Modal } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { Ionicons } from "@expo/vector-icons"
import { useNavigation } from "@react-navigation/native"
import { useAuth } from "@contexts/AuthContext"

// Mock payment methods
const mockPaymentMethods = [
    {
        id: "1",
        type: "card",
        name: "Visa",
        number: "•••• •••• •••• 4567",
        expiryDate: "12/25",
        isDefault: true,
        icon: "card-outline",
    },
    {
        id: "2",
        type: "card",
        name: "Mastercard",
        number: "•••• •••• •••• 8901",
        expiryDate: "09/24",
        isDefault: false,
        icon: "card-outline",
    },
    {
        id: "3",
        type: "bank",
        name: "Vietcombank",
        number: "•••••••789",
        isDefault: false,
        icon: "business-outline",
    },
]

export default function PaymentMethodsScreen() {
    const navigation = useNavigation()
    const { user, loading } = useAuth()
    const [paymentMethods, setPaymentMethods] = useState([])
    const [selectedMethod, setSelectedMethod] = useState(null)
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)

    // Load payment methods on component mount
    useEffect(() => {
        // In a real app, this would fetch from an API
        // For now, use mock data
        setPaymentMethods(mockPaymentMethods)
    }, [])

    // Handle delete payment method
    const handleDeleteMethod = (method) => {
        setSelectedMethod(method)
        setShowDeleteConfirm(true)
    }

    // Confirm delete payment method
    const confirmDeleteMethod = () => {
        if (selectedMethod) {
            // Filter out the selected method
            const updatedMethods = paymentMethods.filter((method) => method.id !== selectedMethod.id)
            setPaymentMethods(updatedMethods)

            // In a real app, this would call an API to update the user's payment methods
            // For now, just show a success message
            Alert.alert("Thành công", "Đã xóa phương thức thanh toán thành công")
        }

        setShowDeleteConfirm(false)
        setSelectedMethod(null)
    }

    // Set default payment method
    const setDefaultMethod = (method) => {
        const updatedMethods = paymentMethods.map((m) => ({
            ...m,
            isDefault: m.id === method.id,
        }))

        setPaymentMethods(updatedMethods)

        // In a real app, this would call an API to update the user's payment methods
        // For now, just show a success message
        Alert.alert("Thành công", `Đã đặt ${method.name} làm phương thức thanh toán mặc định`)
    }

    // Render payment method item
    const renderPaymentMethodItem = ({ item }) => (
        <View style={styles.methodItem}>
            <View style={styles.methodHeader}>
                <View style={styles.methodInfo}>
                    <Ionicons name={item.icon} size={24} color="#333" style={styles.methodIcon} />
                    <View>
                        <Text style={styles.methodName}>{item.name}</Text>
                        <Text style={styles.methodNumber}>{item.number}</Text>
                        {item.expiryDate && <Text style={styles.methodExpiry}>Hết hạn: {item.expiryDate}</Text>}
                    </View>
                </View>
                {item.isDefault && (
                    <View style={styles.defaultBadge}>
                        <Text style={styles.defaultBadgeText}>Mặc định</Text>
                    </View>
                )}
            </View>

            <View style={styles.methodActions}>
                {!item.isDefault && (
                    <TouchableOpacity style={styles.defaultButton} onPress={() => setDefaultMethod(item)}>
                        <Ionicons name="checkmark-circle-outline" size={18} color="#666" />
                        <Text style={styles.defaultButtonText}>Đặt làm mặc định</Text>
                    </TouchableOpacity>
                )}

                <TouchableOpacity style={styles.deleteButton} onPress={() => handleDeleteMethod(item)}>
                    <Ionicons name="trash-outline" size={18} color="#e30019" />
                    <Text style={styles.deleteButtonText}>Xóa</Text>
                </TouchableOpacity>
            </View>
        </View>
    )

    // Render empty state
    const renderEmptyState = () => (
        <View style={styles.emptyContainer}>
            <Ionicons name="card-outline" size={60} color="#ddd" />
            <Text style={styles.emptyText}>Bạn chưa có phương thức thanh toán nào</Text>
        </View>
    )

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
                    <Ionicons name="arrow-back" size={24} color="#333" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Phương thức thanh toán</Text>
                <View style={styles.placeholder} />
            </View>

            {loading ? (
                <View style={styles.loadingContainer}>
                    <ActivityIndicator size="large" color="#e30019" />
                    <Text style={styles.loadingText}>Đang tải...</Text>
                </View>
            ) : (
                <>
                    <FlatList
                        data={paymentMethods}
                        renderItem={renderPaymentMethodItem}
                        keyExtractor={(item) => item.id}
                        contentContainerStyle={styles.methodsList}
                        ListEmptyComponent={renderEmptyState}
                    />

                    <View style={styles.addButtonsContainer}>
                        <TouchableOpacity style={styles.addButton} onPress={() => navigation.navigate("AddCard")}>
                            <Ionicons name="card-outline" size={24} color="#fff" />
                            <Text style={styles.addButtonText}>Thêm thẻ mới</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={[styles.addButton, styles.addBankButton]}
                            onPress={() => navigation.navigate("AddBankAccount")}
                        >
                            <Ionicons name="business-outline" size={24} color="#fff" />
                            <Text style={styles.addButtonText}>Thêm tài khoản ngân hàng</Text>
                        </TouchableOpacity>
                    </View>
                </>
            )}

            {/* Delete Confirmation Modal */}
            <Modal
                visible={showDeleteConfirm}
                transparent={true}
                animationType="fade"
                onRequestClose={() => setShowDeleteConfirm(false)}
            >
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContainer}>
                        <Text style={styles.modalTitle}>Xóa phương thức thanh toán</Text>
                        <Text style={styles.modalMessage}>Bạn có chắc chắn muốn xóa phương thức thanh toán này?</Text>
                        <View style={styles.modalButtons}>
                            <TouchableOpacity
                                style={[styles.modalButton, styles.cancelButton]}
                                onPress={() => setShowDeleteConfirm(false)}
                            >
                                <Text style={styles.cancelButtonText}>Hủy</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={[styles.modalButton, styles.confirmButton]} onPress={confirmDeleteMethod}>
                                <Text style={styles.confirmButtonText}>Xóa</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#f5f5f5",
    },
    header: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        padding: 15,
        backgroundColor: "#fff",
        borderBottomWidth: 1,
        borderBottomColor: "#eee",
    },
    backButton: {
        padding: 5,
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: "bold",
    },
    placeholder: {
        width: 34, // Same width as backButton for centering
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
    methodsList: {
        padding: 15,
        flexGrow: 1,
    },
    methodItem: {
        backgroundColor: "#fff",
        borderRadius: 10,
        padding: 15,
        marginBottom: 15,
        borderWidth: 1,
        borderColor: "#eee",
    },
    methodHeader: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 10,
    },
    methodInfo: {
        flexDirection: "row",
        alignItems: "center",
    },
    methodIcon: {
        marginRight: 15,
    },
    methodName: {
        fontSize: 16,
        fontWeight: "bold",
    },
    methodNumber: {
        fontSize: 14,
        color: "#666",
        marginTop: 2,
    },
    methodExpiry: {
        fontSize: 12,
        color: "#999",
        marginTop: 2,
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
    methodActions: {
        flexDirection: "row",
        borderTopWidth: 1,
        borderTopColor: "#eee",
        paddingTop: 10,
    },
    defaultButton: {
        flexDirection: "row",
        alignItems: "center",
        padding: 5,
        marginRight: 15,
    },
    defaultButtonText: {
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
    emptyContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: 20,
    },
    emptyText: {
        fontSize: 16,
        color: "#666",
        marginTop: 10,
        textAlign: "center",
    },
    addButtonsContainer: {
        padding: 15,
    },
    addButton: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#e30019",
        padding: 15,
        borderRadius: 5,
        marginBottom: 10,
    },
    addBankButton: {
        backgroundColor: "#2196f3",
    },
    addButtonText: {
        color: "#fff",
        fontWeight: "bold",
        fontSize: 16,
        marginLeft: 10,
    },
    modalOverlay: {
        flex: 1,
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        justifyContent: "center",
        alignItems: "center",
    },
    modalContainer: {
        width: "80%",
        backgroundColor: "#fff",
        borderRadius: 10,
        padding: 20,
    },
    modalTitle: {
        fontSize: 18,
        fontWeight: "bold",
        marginBottom: 10,
    },
    modalMessage: {
        fontSize: 16,
        marginBottom: 20,
    },
    modalButtons: {
        flexDirection: "row",
        justifyContent: "space-between",
    },
    modalButton: {
        flex: 1,
        paddingVertical: 12,
        borderRadius: 5,
        alignItems: "center",
    },
    cancelButton: {
        backgroundColor: "#f5f5f5",
        marginRight: 10,
    },
    cancelButtonText: {
        color: "#666",
    },
    confirmButton: {
        backgroundColor: "#e30019",
    },
    confirmButtonText: {
        color: "#fff",
        fontWeight: "bold",
    },
})

