import { View, Text, TextInput, StyleSheet } from "react-native"

const FormInput = ({ label, value, onChangeText, placeholder, error, required, secureTextEntry, keyboardType, autoCapitalize }) => {
    return (
        <View style={styles.formGroup}>
            <Text style={styles.label}>
                {label} {required && <Text style={styles.required}>*</Text>}
            </Text>
            <TextInput
                style={[styles.input, error ? styles.inputError : null]}
                value={value}
                onChangeText={onChangeText}
                placeholder={placeholder}
                secureTextEntry={secureTextEntry}
                keyboardType={keyboardType}
                autoCapitalize={autoCapitalize}
            />
            {error ? <Text style={styles.errorText}>{error}</Text> : null}
        </View>
    )
}

const styles = StyleSheet.create({
    formGroup: {
        marginBottom: 16,
    },
    label: {
        fontSize: 16,
        color: "#333",
        marginBottom: 6,
    },
    required: {
        color: "#e30019",
    },
    input: {
        borderWidth: 1,
        borderColor: "#ddd",
        borderRadius: 8,
        paddingVertical: 10,
        paddingHorizontal: 12,
        fontSize: 16,
        color: "#333",
    },
    inputError: {
        borderColor: "#e30019",
    },
    errorText: {
        color: "#e30019",
        fontSize: 14,
        marginTop: 4,
    },
})

export default FormInput