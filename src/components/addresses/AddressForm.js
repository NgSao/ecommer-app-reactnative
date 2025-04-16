import { View, Text, TextInput, Switch, StyleSheet } from "react-native"

const AddressForm = ({ formData, onChange, errors }) => (
    <View style={styles.formContainer}>
        <View style={styles.formRow}>
            <Text style={styles.label}>Tên địa chỉ</Text>
            <TextInput
                style={[styles.input, errors.name && styles.inputError]}
                value={formData.name}
                onChangeText={(value) => onChange("name", value)}
                placeholder="Ví dụ: Nhà riêng, Cơ quan"
            />
            {errors.name && <Text style={styles.errorText}>{errors.name}</Text>}
        </View>

        <View style={styles.formRow}>
            <Text style={styles.label}>Người nhận</Text>
            <TextInput
                style={[styles.input, errors.recipient && styles.inputError]}
                value={formData.recipient}
                onChangeText={(value) => onChange("recipient", value)}
                placeholder="Họ và tên người nhận"
            />
            {errors.recipient && <Text style={styles.errorText}>{errors.recipient}</Text>}
        </View>

        <View style={styles.formRow}>
            <Text style={styles.label}>Số điện thoại</Text>
            <TextInput
                style={[styles.input, errors.phone && styles.inputError]}
                value={formData.phone}
                onChangeText={(value) => onChange("phone", value)}
                placeholder="Số điện thoại"
                keyboardType="phone-pad"
            />
            {errors.phone && <Text style={styles.errorText}>{errors.phone}</Text>}
        </View>

        <View style={styles.formRow}>
            <Text style={styles.label}>Địa chỉ</Text>
            <TextInput
                style={[styles.input, errors.address && styles.inputError]}
                value={formData.address}
                onChangeText={(value) => onChange("address", value)}
                placeholder="Số nhà, tên đường"
            />
            {errors.address && <Text style={styles.errorText}>{errors.address}</Text>}
        </View>

        <View style={styles.formRow}>
            <Text style={styles.label}>Phường/Xã</Text>
            <TextInput
                style={[styles.input, errors.ward && styles.inputError]}
                value={formData.ward}
                onChangeText={(value) => onChange("ward", value)}
                placeholder="Phường/Xã"
            />
            {errors.ward && <Text style={styles.errorText}>{errors.ward}</Text>}
        </View>

        <View style={styles.formRow}>
            <Text style={styles.label}>Quận/Huyện</Text>
            <TextInput
                style={[styles.input, errors.district && styles.inputError]}
                value={formData.district}
                onChangeText={(value) => onChange("district", value)}
                placeholder="Quận/Huyện"
            />
            {errors.district && <Text style={styles.errorText}>{errors.district}</Text>}
        </View>

        <View style={styles.formRow}>
            <Text style={styles.label}>Tỉnh/Thành phố</Text>
            <TextInput
                style={[styles.input, errors.city && styles.inputError]}
                value={formData.city}
                onChangeText={(value) => onChange("city", value)}
                placeholder="Tỉnh/Thành phố"
            />
            {errors.city && <Text style={styles.errorText}>{errors.city}</Text>}
        </View>

        <View style={styles.switchRow}>
            <Text style={styles.label}>Đặt làm địa chỉ mặc định</Text>
            <Switch
                value={formData.isDefault}
                onValueChange={(value) => onChange("isDefault", value)}
                thumbColor={formData.isDefault ? "#e30019" : "#ccc"}
                trackColor={{ false: "#eee", true: "#ffcccc" }}
            />
        </View>
    </View>
)

const styles = StyleSheet.create({
    formContainer: {
        backgroundColor: "#fff",
        padding: 15,
        borderRadius: 10,
        margin: 15,
    },
    formRow: {
        marginBottom: 15,
    },
    label: {
        fontSize: 14,
        fontWeight: "bold",
        marginBottom: 5,
    },
    input: {
        borderWidth: 1,
        borderColor: "#eee",
        borderRadius: 5,
        padding: 10,
        fontSize: 14,
    },
    inputError: {
        borderColor: "#e30019",
    },
    errorText: {
        color: "#e30019",
        fontSize: 12,
        marginTop: 5,
    },
    switchRow: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginBottom: 15,
    },
})

export default AddressForm