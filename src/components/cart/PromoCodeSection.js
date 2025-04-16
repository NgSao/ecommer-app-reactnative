import { View, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native"
import { Ionicons } from "@expo/vector-icons"

const PromoCodeSection = ({
    promoCode,
    setPromoCode,
    appliedPromo,
    promoError,
    applyPromoCode,
    removePromoCode,
    formatPrice,
    calculateDiscount,
}) => (
    <View style={styles.promoContainer}>
        <Text style={styles.promoTitle}>Mã giảm giá</Text>
        {appliedPromo ? (
            <View style={styles.appliedPromoContainer}>
                <View style={styles.appliedPromoInfo}>
                    <Text style={styles.appliedPromoCode}>{appliedPromo.code}</Text>
                    <Text style={styles.appliedPromoDescription}>{appliedPromo.description}</Text>
                    <Text style={styles.appliedPromoDiscount}>Giảm: {formatPrice(calculateDiscount())}</Text>
                </View>
                <TouchableOpacity style={styles.removePromoButton} onPress={removePromoCode}>
                    <Ionicons name="close-circle" size={24} color="#e30019" />
                </TouchableOpacity>
            </View>
        ) : (
            <>
                <View style={styles.promoInputContainer}>
                    <TextInput
                        style={styles.promoInput}
                        placeholder="Nhập mã giảm giá"
                        value={promoCode}
                        onChangeText={setPromoCode}
                    />
                    <TouchableOpacity style={styles.promoButton} onPress={applyPromoCode}>
                        <Text style={styles.promoButtonText}>Áp dụng</Text>
                    </TouchableOpacity>
                </View>
                {promoError ? <Text style={styles.promoErrorText}>{promoError}</Text> : null}
            </>
        )}
    </View>
)

const styles = StyleSheet.create({
    promoContainer: {
        backgroundColor: "#fff",
        padding: 15,
        marginBottom: 10,
    },
    promoTitle: {
        fontSize: 16,
        fontWeight: "bold",
        marginBottom: 10,
    },
    promoInputContainer: {
        flexDirection: "row",
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
        marginTop: 5,
    },
    appliedPromoContainer: {
        flexDirection: "row",
        alignItems: "center",
        borderWidth: 1,
        borderColor: "#e30019",
        borderRadius: 5,
        padding: 10,
        backgroundColor: "#fff0f0",
    },
    appliedPromoInfo: {
        flex: 1,
    },
    appliedPromoCode: {
        fontSize: 16,
        fontWeight: "bold",
        color: "#e30019",
        marginBottom: 2,
    },
    appliedPromoDescription: {
        fontSize: 14,
        color: "#333",
        marginBottom: 2,
    },
    appliedPromoDiscount: {
        fontSize: 14,
        fontWeight: "bold",
        color: "#e30019",
    },
    removePromoButton: {
        padding: 5,
    },
})

export default PromoCodeSection