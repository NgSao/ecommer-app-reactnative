import { View, Text, TouchableOpacity, Modal, FlatList, ActivityIndicator, StyleSheet } from "react-native"
import { Ionicons } from "@expo/vector-icons"

const PromoCodesModal = ({
    showPromoCodesModal,
    setShowPromoCodesModal,
    availablePromoCodes,
    loadingPromoCodes,
    selectPromoCode,
    formatPrice,
    formatExpiryDate,
}) => (
    <Modal
        visible={showPromoCodesModal}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setShowPromoCodesModal(false)}
    >
        <View style={styles.modalOverlay}>
            <View style={styles.modalContainer}>
                <View style={styles.modalHeader}>
                    <Text style={styles.modalTitle}>Mã giảm giá của tôi</Text>
                    <TouchableOpacity onPress={() => setShowPromoCodesModal(false)}>
                        <Ionicons name="close" size={24} color="#333" />
                    </TouchableOpacity>
                </View>
                {loadingPromoCodes ? (
                    <View style={styles.loadingContainer}>
                        <ActivityIndicator size="large" color="#e30019" />
                        <Text style={styles.loadingText}>Đang tải mã giảm giá...</Text>
                    </View>
                ) : availablePromoCodes.length > 0 ? (
                    <FlatList
                        data={availablePromoCodes}
                        keyExtractor={(item) => item.id}
                        renderItem={({ item }) => (
                            <TouchableOpacity style={styles.promoCodeItem} onPress={() => selectPromoCode(item)}>
                                <View style={styles.promoCodeHeader}>
                                    <View style={styles.promoCodeBadge}>
                                        <Text style={styles.promoCodeBadgeText}>{item.code}</Text>
                                    </View>
                                    <Text style={styles.promoCodeExpiry}>HSD: {formatExpiryDate(item.expiryDate)}</Text>
                                </View>
                                <Text style={styles.promoCodeDescription}>{item.description}</Text>
                                <Text style={styles.promoCodeCondition}>Đơn tối thiểu {formatPrice(item.minOrderValue)}</Text>
                            </TouchableOpacity>
                        )}
                    />
                ) : (
                    <View style={styles.emptyPromoCodesContainer}>
                        <Ionicons name="pricetag-outline" size={60} color="#ddd" />
                        <Text style={styles.emptyPromoCodesText}>Bạn chưa có mã giảm giá nào</Text>
                    </View>
                )}
            </View>
        </View>
    </Modal>
)

const styles = StyleSheet.create({
    modalOverlay: {
        flex: 1,
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        justifyContent: "center",
        alignItems: "center",
    },
    modalContainer: {
        width: "90%",
        maxHeight: "80%",
        backgroundColor: "#fff",
        borderRadius: 10,
        padding: 20,
    },
    modalHeader: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 20,
    },
    modalTitle: {
        fontSize: 18,
        fontWeight: "bold",
    },
    loadingContainer: {
        padding: 20,
        alignItems: "center",
    },
    loadingText: {
        marginTop: 10,
        color: "#666",
    },
    promoCodeItem: {
        borderWidth: 1,
        borderColor: "#ddd",
        borderRadius: 5,
        padding: 10,
        marginBottom: 10,
    },
    promoCodeHeader: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 10,
    },
    promoCodeBadge: {
        backgroundColor: "#e30019",
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderRadius: 3,
    },
    promoCodeBadgeText: {
        color: "#fff",
        fontWeight: "bold",
        fontSize: 14,
    },
    promoCodeExpiry: {
        fontSize: 12,
        color: "#999",
    },
    promoCodeDescription: {
        fontSize: 14,
        marginBottom: 5,
    },
    promoCodeCondition: {
        fontSize: 12,
        color: "#666",
    },
    emptyPromoCodesContainer: {
        padding: 20,
        alignItems: "center",
        justifyContent: "center",
    },
    emptyPromoCodesText: {
        marginTop: 10,
        color: "#666",
        textAlign: "center",
    },
})

export default PromoCodesModal