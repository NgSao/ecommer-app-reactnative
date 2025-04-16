import { View, Text, TextInput, StyleSheet } from "react-native"
import { Ionicons } from "@expo/vector-icons"

const ProfileForm = ({ name, email, phone, onChangeName, onChangePhone, onValidateName, onValidatePhone, nameError, phoneError }) => (
    <View style={styles.formContainer}>
        <Text style={styles.label}>Họ tên</Text>
        <View style={styles.inputContainer}>
            <Ionicons name="person-outline" size={20} color="#999" style={styles.inputIcon} />
            <TextInput
                style={styles.input}
                placeholder="Họ tên"
                placeholderTextColor="#999"
                value={name}
                onChangeText={onChangeName}
                onBlur={onValidateName}
            />
        </View>
        {nameError ? <Text style={styles.errorText}>{nameError}</Text> : null}

        <Text style={styles.label}>Email</Text>
        <View style={styles.inputContainer}>
            <Ionicons name="mail-outline" size={20} color="#999" style={styles.inputIcon} />
            <TextInput
                style={[styles.input, styles.disabledInput]}
                placeholder="Email"
                placeholderTextColor="#999"
                value={email}
                editable={false}
            />
        </View>
        <Text style={styles.noteText}>Email không thể thay đổi</Text>

        <Text style={styles.label}>Số điện thoại</Text>
        <View style={styles.inputContainer}>
            <Ionicons name="call-outline" size={20} color="#999" style={styles.inputIcon} />
            <TextInput
                style={styles.input}
                placeholder="Số điện thoại"
                placeholderTextColor="#999"
                keyboardType="phone-pad"
                value={phone}
                onChangeText={onChangePhone}
                onBlur={onValidatePhone}
            />
        </View>
        {phoneError ? <Text style={styles.errorText}>{phoneError}</Text> : null}
    </View>
)

const styles = StyleSheet.create({
    formContainer: {
        marginBottom: 20,
    },
    label: {
        fontSize: 16,
        fontWeight: "500",
        marginBottom: 5,
    },
    inputContainer: {
        flexDirection: "row",
        alignItems: "center",
        borderWidth: 1,
        borderColor: "#ddd",
        borderRadius: 5,
        paddingHorizontal: 10,
        marginBottom: 5,
    },
    inputIcon: {
        marginRight: 10,
    },
    input: {
        flex: 1,
        height: 50,
        fontSize: 16,
    },
    disabledInput: {
        backgroundColor: "#f5f5f5",
        color: "#999",
    },
    errorText: {
        color: "#e30019",
        fontSize: 12,
        marginBottom: 10,
        marginLeft: 5,
    },
    noteText: {
        color: "#999",
        fontSize: 12,
        marginBottom: 15,
        marginLeft: 5,
    },
})

export default ProfileForm