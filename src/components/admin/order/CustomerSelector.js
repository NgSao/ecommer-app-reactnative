import { Modal, View, Text, TouchableOpacity, FlatList, TextInput, ActivityIndicator, StyleSheet } from "react-native"
import { Ionicons } from "@expo/vector-icons"

const CustomerSelector = ({
    customer,
    setCustomer,
    showCustomerModal,
    setShowCustomerModal,
    customerSearchQuery,
    setCustomerSearchQuery,
    customers,
    loadingCustomers,
    fetchCustomers,
    navigateToCreateCustomer,
}) => {
    return (
        <View style={styles.section}>
            <Text style={styles.sectionTitle}>Thông tin khách hàng</Text>

            {customer ? (
                <View style={styles.customerCard}>
                    <View style={styles.customerInfo}>
                        <Text style={styles.customerName}>{customer.name}</Text>
                        <Text style={styles.customerPhone}>{customer.phone}</Text>
                        <Text style={styles.customerEmail}>{customer.email}</Text>
                        <Text style={styles.customerAddress}>{customer.address}</Text>
                    </View>
                    <TouchableOpacity style={styles.changeButton} onPress={() => setShowCustomerModal(true)}>
                        <Text style={styles.changeButtonText}>Thay đổi</Text>
                    </TouchableOpacity>
                </View>
            ) : (
                <TouchableOpacity style={styles.selectButton} onPress={() => setShowCustomerModal(true)}>
                    <Ionicons name="person-add-outline" size={20} color="#e30019" />
                    <Text style={styles.selectButtonText}>Chọn khách hàng</Text>
                </TouchableOpacity>
            )}

            <Modal
                visible={showCustomerModal}
                animationType="slide"
                transparent={true}
                onRequestClose={() => setShowCustomerModal(false)}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <View style={styles.modalHeader}>
                            <Text style={styles.modalTitle}>Chọn khách hàng</Text>
                            <TouchableOpacity onPress={() => setShowCustomerModal(false)}>
                                <Ionicons name="close" size={24} color="#333" />
                            </TouchableOpacity>
                        </View>

                        <View style={styles.searchContainer}>
                            <Ionicons name="search" size={20} color="#666" style={styles.searchIcon} />
                            <TextInput
                                style={styles.searchInput}
                                placeholder="Tìm kiếm khách hàng..."
                                value={customerSearchQuery}
                                onChangeText={(text) => {
                                    setCustomerSearchQuery(text)
                                    fetchCustomers(text)
                                }}
                            />
                            {customerSearchQuery.length > 0 && (
                                <TouchableOpacity
                                    style={styles.clearButton}
                                    onPress={() => {
                                        setCustomerSearchQuery("")
                                        fetchCustomers("")
                                    }}
                                >
                                    <Ionicons name="close-circle" size={20} color="#666" />
                                </TouchableOpacity>
                            )}
                        </View>

                        {loadingCustomers ? (
                            <View style={styles.loadingContainer}>
                                <ActivityIndicator size="large" color="#e30019" />
                                <Text style={styles.loadingText}>Đang tải danh sách khách hàng...</Text>
                            </View>
                        ) : (
                            <FlatList
                                data={customers}
                                keyExtractor={(item) => item.id.toString()}
                                renderItem={({ item }) => (
                                    <TouchableOpacity
                                        style={styles.customerItem}
                                        onPress={() => {
                                            setCustomer(item)
                                            setShowCustomerModal(false)
                                        }}
                                    >
                                        <View style={styles.customerInfo}>
                                            <Text style={styles.customerName}>{item.name}</Text>
                                            <Text style={styles.customerPhone}>{item.phone}</Text>
                                            <Text style={styles.customerEmail}>{item.email}</Text>
                                        </View>
                                        <Ionicons name="chevron-forward" size={20} color="#666" />
                                    </TouchableOpacity>
                                )}
                                ListEmptyComponent={
                                    <View style={styles.emptyContainer}>
                                        <Ionicons name="person-outline" size={40} color="#ccc" />
                                        <Text style={styles.emptyText}>Không tìm thấy khách hàng</Text>
                                    </View>
                                }
                            />
                        )}

                        <TouchableOpacity
                            style={styles.createNewButton}
                            onPress={navigateToCreateCustomer}
                        >
                            <Ionicons name="add-circle-outline" size={20} color="#fff" />
                            <Text style={styles.createNewButtonText}>Tạo khách hàng mới</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
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
        marginBottom: 15,
    },
    selectButton: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        borderWidth: 1,
        borderColor: "#e30019",
        borderRadius: 8,
        paddingVertical: 12,
        paddingHorizontal: 15,
    },
    selectButtonText: {
        color: "#e30019",
        fontWeight: "bold",
        marginLeft: 8,
    },
    customerCard: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        backgroundColor: "#f9f9f9",
        borderRadius: 8,
        padding: 12,
    },
    customerInfo: {
        flex: 1,
    },
    customerName: {
        fontSize: 16,
        fontWeight: "bold",
        color: "#333",
        marginBottom: 5,
    },
    customerPhone: {
        fontSize: 14,
        color: "#666",
        marginBottom: 3,
    },
    customerEmail: {
        fontSize: 14,
        color: "#666",
        marginBottom: 3,
    },
    customerAddress: {
        fontSize: 14,
        color: "#666",
    },
    changeButton: {
        backgroundColor: "#f0f0f0",
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 5,
    },
    changeButtonText: {
        fontSize: 12,
        color: "#333",
    },
    modalContainer: {
        flex: 1,
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        justifyContent: "flex-end",
    },
    modalContent: {
        backgroundColor: "#fff",
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15,
        paddingHorizontal: 15,
        paddingBottom: 30,
        maxHeight: "80%",
    },
    modalHeader: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingVertical: 15,
        borderBottomWidth: 1,
        borderBottomColor: "#eee",
    },
    modalTitle: {
        fontSize: 18,
        fontWeight: "bold",
        color: "#333",
    },
    searchContainer: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#f0f0f0",
        borderRadius: 8,
        paddingHorizontal: 10,
        marginVertical: 15,
    },
    searchIcon: {
        marginRight: 10,
    },
    searchInput: {
        flex: 1,
        height: 40,
        fontSize: 16,
    },
    clearButton: {
        padding: 5,
    },
    loadingContainer: {
        alignItems: "center",
        justifyContent: "center",
        padding: 30,
    },
    loadingText: {
        fontSize: 14,
        color: "#666",
        marginTop: 10,
    },
    emptyContainer: {
        alignItems: "center",
        justifyContent: "center",
        padding: 30,
    },
    emptyText: {
        fontSize: 14,
        color: "#666",
        marginTop: 10,
    },
    customerItem: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        padding: 15,
        borderBottomWidth: 1,
        borderBottomColor: "#eee",
    },
    createNewButton: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#e30019",
        borderRadius: 8,
        paddingVertical: 12,
        marginTop: 10,
    },
    createNewButtonText: {
        color: "#fff",
        fontWeight: "bold",
        marginLeft: 8,
    },
})

export default CustomerSelector