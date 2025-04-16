import { ScrollView, KeyboardAvoidingView, Platform } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"

import styles from "../../styles/EditProfileStyles"
import useEditProfile from "@hooks/useEditProfile"
import EditProfileHeader from "@components/profile/EditProfileHeader"
import ProfileForm from "@components/profile/ProfileForm"
import ChangePasswordButton from "@components/profile/ChangePasswordButton"
import SaveButton from "@components/addresses/SaveButton"
import AvatarSection from "@components/profile/AvatarSection"

const EditProfileScreen = () => {
    const {
        name,
        email,
        phone,
        avatar,
        nameError,
        phoneError,
        loading,
        setName,
        setPhone,
        validateName,
        validatePhone,
        pickImage,
        handleSaveProfile,
        onBack,
        onChangePassword,
    } = useEditProfile()

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
                        name={name}
                        email={email}
                        phone={phone}
                        onChangeName={setName}
                        onChangePhone={setPhone}
                        onValidateName={validateName}
                        onValidatePhone={validatePhone}
                        nameError={nameError}
                        phoneError={phoneError}
                    />
                    <ChangePasswordButton onPress={onChangePassword} />
                    <SaveButton onPress={handleSaveProfile} disabled={loading} loading={loading} />
                </ScrollView>
            </KeyboardAvoidingView>
        </SafeAreaView>
    )
}

export default EditProfileScreen