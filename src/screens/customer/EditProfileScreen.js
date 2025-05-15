import { ScrollView, KeyboardAvoidingView, Platform, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import styles from "../../styles/EditProfileStyles";
import EditProfileHeader from "@components/profile/EditProfileHeader";
import ProfileForm from "@components/profile/ProfileForm";
import ChangePasswordButton from "@components/profile/ChangePasswordButton";
import SaveButton from "@components/addresses/SaveButton";
import AvatarSection from "@components/profile/AvatarSection";
import { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { useAuth } from "@contexts/AuthContext";
import * as ImagePicker from "expo-image-picker"

const EditProfileScreen = () => {
    const navigation = useNavigation();
    const { user, updateProfile, loading } = useAuth();

    const [fullName, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [birthday, setBirthday] = useState(null);
    const [gender, setGender] = useState("");
    const [avatar, setAvatar] = useState(null);
    const [nameError, setNameError] = useState("");
    const [phoneError, setPhoneError] = useState("");
    const [birthdayError, setBirthdayError] = useState("");
    const [genderError, setGenderError] = useState("");

    useEffect(() => {
        if (user) {
            setName(user.fullName || "");
            setEmail(user.email || "");
            setPhone(user.phone || "");
            setBirthday(user.birthday ? new Date(user.birthday) : null);
            setGender(user.gender || "");
            setAvatar(user.profileImageUrl || null);
        }
    }, [user]);

    const validateName = () => {
        if (!fullName) {
            setNameError("Vui lòng nhập họ tên");
            return false;
        } else {
            setNameError("");
            return true;
        }
    };

    const validatePhone = () => {
        const phoneRegex = /^[0-9]{10}$/;
        if (!phone) {
            setPhoneError("Vui lòng nhập số điện thoại");
            return false;
        } else if (!phoneRegex.test(phone)) {
            setPhoneError("Số điện thoại không hợp lệ");
            return false;
        } else {
            setPhoneError("");
            return true;
        }
    };

    const validateBirthday = () => {
        if (!birthday) {
            setBirthdayError("Vui lòng chọn ngày sinh");
            return false;
        } else {
            setBirthdayError("");
            return true;
        }
    };

    const validateGender = () => {
        if (!gender) {
            setGenderError("Vui lòng chọn giới tính");
            return false;
        } else {
            setGenderError("");
            return true;
        }
    };

    const pickImage = async () => {
        Alert.alert(
            "Chọn hình ảnh",
            "Bạn muốn chụp ảnh mới hay chọn từ thư viện?",
            [
                {
                    text: "Chụp ảnh",
                    onPress: async () => {
                        try {
                            // Request camera permissions
                            const cameraPermission = await ImagePicker.requestCameraPermissionsAsync();
                            if (!cameraPermission.granted) {
                                Alert.alert("Lỗi", "Bạn cần cấp quyền truy cập camera để chụp ảnh.");
                                return;
                            }

                            const result = await ImagePicker.launchCameraAsync({
                                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                                allowsEditing: true,
                                quality: 0.8,
                                allowsEditing: false,
                            });

                            if (!result.canceled) {
                                setAvatar(result.assets[0].uri);
                            }
                        } catch (error) {
                            console.error("Error capturing photo:", error);
                            Alert.alert("Lỗi", "Không thể chụp ảnh. Vui lòng thử lại.");
                        }
                    },
                },
                {
                    text: "Chọn từ thư viện",
                    onPress: async () => {
                        try {
                            // Request media library permissions
                            const libraryPermission = await ImagePicker.requestMediaLibraryPermissionsAsync();
                            if (!libraryPermission.granted) {
                                Alert.alert("Lỗi", "Bạn cần cấp quyền truy cập thư viện ảnh.");
                                return;
                            }

                            const result = await ImagePicker.launchImageLibraryAsync({
                                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                                allowsEditing: true,
                                quality: 0.8,
                                allowsEditing: false,
                            });

                            if (!result.canceled) {
                                setAvatar(result.assets[0].uri);
                            }
                        } catch (error) {
                            console.error("Error selecting image:", error);
                            Alert.alert("Lỗi", "Không thể chọn hình ảnh. Vui lòng thử lại.");
                        }
                    },
                },
                { text: "Hủy", style: "cancel" },
            ],
            { cancelable: true }
        );
    };

    const handleSaveProfile = async () => {
        const isNameValid = validateName();
        const isPhoneValid = validatePhone();
        const isBirthdayValid = validateBirthday();
        const isGenderValid = validateGender();

        if (isNameValid && isPhoneValid && isBirthdayValid && isGenderValid) {
            const userData = {
                fullName,
                phone,
                birthday: birthday ? birthday.toISOString() : null,
                gender
            };
            const success = await updateProfile(userData, avatar);
            if (success) {
                Alert.alert("Thành công", "Thông tin cá nhân đã được cập nhật", [
                    {
                        text: "OK",
                        onPress: () => navigation.goBack(),
                    },
                ]);
            }
        }
    };

    const onBack = () => {
        navigation.goBack();
    };

    const onChangePassword = () => {
        navigation.navigate("ChangePassword");
    };

    return (
        <SafeAreaView style={styles.container}>
            <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "padding" : "height"}
                style={styles.keyboardAvoidingView}
            >
                <ScrollView contentContainerStyle={styles.scrollContainer}>
                    <EditProfileHeader onBack={onBack} />
                    <AvatarSection avatar={avatar} onChangeAvatar={pickImage} />
                    <ProfileForm
                        name={fullName}
                        email={email}
                        phone={phone}
                        birthday={birthday}
                        gender={gender}
                        onChangeName={setName}
                        onChangePhone={setPhone}
                        onChangeBirthday={setBirthday}
                        onChangeGender={setGender}
                        onValidateName={validateName}
                        onValidatePhone={validatePhone}
                        onValidateBirthday={validateBirthday}
                        onValidateGender={validateGender}
                        nameError={nameError}
                        phoneError={phoneError}
                        birthdayError={birthdayError}
                        genderError={genderError}
                    />
                    <ChangePasswordButton onPress={onChangePassword} />
                    <SaveButton onPress={handleSaveProfile} disabled={loading} loading={loading} />
                </ScrollView>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
};

export default EditProfileScreen;