import { View, Text, TextInput, TouchableOpacity, ActivityIndicator, StyleSheet } from "react-native"
import { Ionicons } from "@expo/vector-icons"

const PromoCodeSection = ({
    promoCode,
    setPromoCode,
    appliedPromoCode,
    promoCodeError,
    applyPromoCode,
    removePromoCode,
    setShowPromoCodesModal,
    formatPrice,
    calculatePromoDiscount,
    loading,
}) => (
    <View style={styles.section}>
        <Text style={styles.sectionTitle}>Mã giảm giá</Text>
        {appliedPromoCode ? (
            <View style={styles.appliedPromoContainer}>
                <View style={styles.appliedPromoInfo}>
                    <View style={styles.appliedPromoHeader}>
                        <Text style={styles.appliedPromoCode}>{appliedPromoCode.code}</Text>
                        <TouchableOpacity onPress={removePromoCode}>
                            <Ionicons name="close-circle" size={20} color="#e30019" />
                        </TouchableOpacity>
                    </View>
                    <Text style={styles.appliedPromoDescription}>{appliedPromoCode.description}</Text>
                    <Text style={styles.appliedPromoDiscount}>Giảm: {formatPrice(calculatePromoDiscount())}</Text>
                </View>
            </View>
        ) : (
            <View style={styles.promoInputContainer}>
                <TextInput
                    style={styles.promoInput}
                    placeholder="Nhập mã giảm giá"
                    value={promoCode}
                    onChangeText={(text) => {
                        setPromoCode(text)
                        promoCodeError && setPromoCodeError("")
                    }}
                />
                <TouchableOpacity style={styles.promoButton} onPress={applyPromoCode} disabled={loading}>
                    {loading ? (
                        <ActivityIndicator size="small" color="#fff" />
                    ) : (
                        <Text style={styles.promoButtonText}>Áp dụng</Text>
                    )}
                </TouchableOpacity>
            </View>
        )}
        {promoCodeError ? <Text style={styles.promoErrorText}>{promoCodeError}</Text> : null}
        <TouchableOpacity style={styles.viewPromoCodesButton} onPress={() => setShowPromoCodesModal(true)}>
            <Ionicons name="pricetag-outline" size={16} color="#e30019" />
            <Text style={styles.viewPromoCodesText}>Xem mã giảm giá của tôi</Text>
        </TouchableOpacity>
    </View>
)

const styles = StyleSheet.create({
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
    promoInputContainer: {
        flexDirection: "row",
        marginBottom: 10,
    },
    promoInput: {
        flex: 1,
        borderWidth: 1,
        borderColor: "#ddd",
        borderRadius: 5,
        paddingHorizontal: 10,
        height: 40,
        marginRight: 10,
    },
    promoButton: {
        backgroundColor: "#e30019",
        justifyContent: "center",
        alignItems: "center",
        paddingHorizontal: 15,
        borderRadius: 5,
    },
    promoButtonText: {
        color: "#fff",
        fontWeight: "bold",
    },
    promoErrorText: {
        color: "#e30019",
        fontSize: 12,
        marginBottom: 10,
    },
    appliedPromoContainer: {
        borderWidth: 1,
        borderColor: "#e30019",
        borderRadius: 5,
        padding: 10,
        marginBottom: 10,
        backgroundColor: "#fff0f0",
    },
    appliedPromoInfo: {
        flex: 1,
    },
    appliedPromoHeader: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 5,
    },
    appliedPromoCode: {
        fontSize: 16,
        fontWeight: "bold",
        color: "#e30019",
    },
    appliedPromoDescription: {
        fontSize: 14,
        marginBottom: 5,
    },
    appliedPromoDiscount: {
        fontSize: 14,
        fontWeight: "bold",
        color: "#e30019",
    },
    viewPromoCodesButton: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
    },
    viewPromoCodesText: {
        color: "#e30019",
        marginLeft: 5,
        fontSize: 14,
    },
})

export default PromoCodeSection