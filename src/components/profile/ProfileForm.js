import {
    View,
    Text,
    TextInput,
    StyleSheet,
    TouchableOpacity,
    Platform,
    Modal,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Picker } from "@react-native-picker/picker";
import { useState } from "react";

const ProfileForm = ({
    name,
    email,
    phone,
    birthday,
    gender,
    onChangeName,
    onChangePhone,
    onChangeBirthday,
    onChangeGender,
    onValidateName,
    onValidatePhone,
    onValidateBirthday,
    onValidateGender,
    nameError,
    phoneError,
    birthdayError,
    genderError,
}) => {
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [showGenderPicker, setShowGenderPicker] = useState(false);

    const handleDateChange = (event, selectedDate) => {
        setShowDatePicker(Platform.OS === "ios"); // Keep picker open on iOS until manually closed
        if (selectedDate) {
            onChangeBirthday(selectedDate);
            onValidateBirthday();
        }
    };

    const showDatePickerModal = () => {
        setShowDatePicker(true);
    };

    const showGenderPickerModal = () => {
        setShowGenderPicker(true);
    };

    const closeGenderPicker = () => {
        setShowGenderPicker(false);
    };

    const genderOptions = [
        { label: "Chọn giới tính", value: "", color: "#999" },
        { label: "Nam", value: "MALE", color: "#000" },
        { label: "Nữ", value: "FEMALE", color: "#000" },
        { label: "Khác", value: "OTHER", color: "#000" },
    ];

    return (
        <View style={styles.formContainer}>
            {/* Full Name */}
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

            {/* Email */}
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

            {/* Phone */}
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

            {/* Birthday */}
            <Text style={styles.label}>Ngày sinh</Text>
            <TouchableOpacity
                style={styles.inputContainer}
                onPress={showDatePickerModal}
                accessibilityLabel="Chọn ngày sinh"
                accessibilityRole="button"
            >
                <Ionicons name="calendar-outline" size={20} color="#999" style={styles.inputIcon} />
                <Text style={[styles.inputIos, !birthday && styles.placeholderText]}>
                    {birthday ? birthday.toLocaleDateString("vi-VN") : "Chọn ngày sinh"}
                </Text>
            </TouchableOpacity>
            {showDatePicker && (
                <DateTimePicker
                    value={birthday || new Date()}
                    mode="date"
                    display="default"
                    onChange={handleDateChange}
                    maximumDate={new Date()}
                />
            )}
            {birthdayError ? <Text style={styles.errorText}>{birthdayError}</Text> : null}

            {/* Gender */}
            <Text style={styles.label}>Giới tính</Text>
            {Platform.OS === "ios" ? (
                <>
                    <TouchableOpacity
                        style={styles.inputContainer}
                        onPress={showGenderPickerModal}
                        accessibilityLabel="Chọn giới tính"
                        accessibilityRole="button"
                    >
                        <Ionicons
                            name="male-female-outline"
                            size={20}
                            color="#999"
                            style={styles.inputIcon}
                        />
                        <Text style={[styles.inputIos, !gender && styles.placeholderText]}>
                            {genderOptions.find((option) => option.value === gender)?.label ||
                                "Chọn giới tính"}
                        </Text>
                    </TouchableOpacity>
                    <Modal
                        visible={showGenderPicker}
                        transparent={true}
                        animationType="slide"
                        onRequestClose={closeGenderPicker}
                    >
                        <View style={styles.modalContainer}>
                            <View style={styles.modalContent}>
                                {genderOptions.map((option) => (
                                    <TouchableOpacity
                                        key={option.value}
                                        style={styles.modalOption}
                                        onPress={() => {
                                            onChangeGender(option.value);
                                            onValidateGender();
                                            closeGenderPicker();
                                        }}
                                    >
                                        <Text style={[styles.modalOptionText, { color: option.color }]}>
                                            {option.label}
                                        </Text>
                                    </TouchableOpacity>
                                ))}
                                <TouchableOpacity style={styles.closeButton} onPress={closeGenderPicker}>
                                    <Text style={styles.closeButtonText}>Hủy</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </Modal>
                </>
            ) : (
                <View style={[styles.inputContainer, styles.pickerContainer]}>
                    <Ionicons
                        name="male-female-outline"
                        size={20}
                        color="#999"
                        style={styles.inputIcon}
                    />
                    <Picker
                        selectedValue={gender}
                        onValueChange={(value) => {
                            onChangeGender(value);
                            onValidateGender();
                        }}
                        style={styles.picker}
                        mode="dropdown"
                        dropdownIconColor="#999"
                    >
                        {genderOptions.map((option) => (
                            <Picker.Item
                                key={option.value}
                                label={option.label}
                                value={option.value}
                                color={option.color}
                            />
                        ))}
                    </Picker>
                </View>
            )}
            {genderError ? <Text style={styles.errorText}>{genderError}</Text> : null}
        </View>
    );
};

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
        height: 50,
    },
    inputIcon: {
        marginRight: 10,
    },
    input: {
        flex: 1,
        fontSize: 16,
        height: 50,
    },
    inputIos: {
        flex: 1,
        fontSize: 16,
    },


    disabledInput: {
        backgroundColor: "#f5f5f5",
        color: "#999",
    },
    placeholderText: {
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
    pickerContainer: {
        height: 50,
    },
    picker: {
        flex: 1,
        color: "#000",
    },
    modalContainer: {
        flex: 1,
        justifyContent: "flex-end",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
    },
    modalContent: {
        backgroundColor: "#fff",
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        padding: 20,
    },
    modalOption: {
        paddingVertical: 15,
        borderBottomWidth: 1,
        borderBottomColor: "#eee",
    },
    modalOptionText: {
        fontSize: 16,
        textAlign: "center",
    },
    closeButton: {
        marginTop: 10,
        padding: 10,
        backgroundColor: "#007AFF",
        borderRadius: 5,
        alignItems: "center",
    },
    closeButtonText: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "500",
    },
});

export default ProfileForm;