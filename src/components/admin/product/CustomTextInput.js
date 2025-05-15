import React from "react";
import { View, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const CustomTextInput = ({
    value,
    onChangeText,
    placeholder,
    keyboardType,
    multiline,
    numberOfLines,
    style,
    iconName,
    onClear,
    ...props
}) => {
    return (
        <View style={[styles.inputContainer, style]}>
            {iconName && <Ionicons name={iconName} size={20} color="#666" style={styles.inputIcon} />}
            <TextInput
                style={[styles.input, multiline && styles.multilineInput]}
                value={value}
                onChangeText={onChangeText}
                placeholder={placeholder}
                keyboardType={keyboardType}
                multiline={multiline}
                numberOfLines={numberOfLines}
                placeholderTextColor="#999"
                {...props}
            />
            {value?.length > 0 && onClear && (
                <TouchableOpacity style={styles.clearButton} onPress={onClear}>
                    <Ionicons name="close-circle" size={20} color="#666" />
                </TouchableOpacity>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    inputContainer: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#fff",
        borderRadius: 8,
        borderWidth: 1,
        borderColor: "#ddd",
        paddingHorizontal: 10,
    },
    input: {
        flex: 1,
        fontSize: 16,
        color: "#333",
        paddingVertical: 12,
        paddingHorizontal: 5,
    },
    multilineInput: {
        textAlignVertical: "top",
        paddingTop: 12,
    },
    inputIcon: {
        marginRight: 10,
    },
    clearButton: {
        padding: 5,
    },
});

export default CustomTextInput;