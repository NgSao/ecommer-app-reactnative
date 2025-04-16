import { View, Text, TextInput, TouchableOpacity, Image, StyleSheet } from "react-native"
import { Ionicons } from "@expo/vector-icons"

const StoreInfoSection = ({
    storeName,
    setStoreName,
    storeEmail,
    setStoreEmail,
    storePhone,
    setStorePhone,
    storeAddress,
    setStoreAddress,
    storeLogo,
    setStoreLogo,
    storeDescription,
    setStoreDescription,
    pickLogo,
}) => {
    return (
        <View style={styles.section}>
            <View style={styles.sectionHeader}>
                <Ionicons name="storefront-outline" size={22} color="#333" />
                <Text style={styles.sectionTitle}>Thông tin cửa hàng</Text>
            </View>

            <View style={styles.formGroup}>
                <Text style={styles.label}>Tên cửa hàng</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Nhập tên cửa hàng"
                    value={storeName}
                    onChangeText={setStoreName}
                />
            </View>

            <View style={styles.formGroup}>
                <Text style={styles.label}>Email</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Nhập email cửa hàng"
                    value={storeEmail}
                    onChangeText={setStoreEmail}
                    keyboardType="email-address"
                />
            </View>

            <View style={styles.formGroup}>
                <Text style={styles.label}>Số điện thoại</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Nhập số điện thoại cửa hàng"
                    value={storePhone}
                    onChangeText={setStorePhone}
                    keyboardType="phone-pad"
                />
            </View>

            <View style={styles.formGroup}>
                <Text style={styles.label}>Địa chỉ</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Nhập địa chỉ cửa hàng"
                    value={storeAddress}
                    onChangeText={setStoreAddress}
                />
            </View>

            <View style={styles.formGroup}>
                <Text style={styles.label}>Logo cửa hàng</Text>
                <TouchableOpacity style={styles.logoPickerContainer} onPress={pickLogo}>
                    {storeLogo ? (
                        <Image source={{ uri: storeLogo }} style={styles.logoPreview} />
                    ) : (
                        <View style={styles.logoPlaceholder}>
                            <Ionicons name="image-outline" size={40} color="#ccc" />
                            <Text style={styles.logoPlaceholderText}>Chọn logo</Text>
                        </View>
                    )}
                </TouchableOpacity>
            </View>

            <View style={styles.formGroup}>
                <Text style={styles.label}>Mô tả cửa hàng</Text>
                <TextInput
                    style={[styles.input, styles.textArea]}
                    placeholder="Nhập mô tả cửa hàng"
                    value={storeDescription}
                    onChangeText={setStoreDescription}
                    multiline
                    numberOfLines={4}
                />
            </View>
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
    formGroup: {
        marginBottom: 15,
    },
    label: {
        fontSize: 16,
        color: "#333",
        marginBottom: 8,
    },
    input: {
        borderWidth: 1,
        borderColor: "#ddd",
        borderRadius: 8,
        paddingHorizontal: 15,
        paddingVertical: 10,
        fontSize: 16,
    },
    textArea: {
        height: 100,
        textAlignVertical: "top",
    },
    logoPickerContainer: {
        borderWidth: 1,
        borderColor: "#ddd",
        borderRadius: 8,
        overflow: "hidden",
    },
    logoPreview: {
        width: "100%",
        height: 150,
        resizeMode: "contain",
    },
    logoPlaceholder: {
        width: "100%",
        height: 150,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#f9f9f9",
    },
    logoPlaceholderText: {
        marginTop: 10,
        color: "#666",
    },
})

export default StoreInfoSection