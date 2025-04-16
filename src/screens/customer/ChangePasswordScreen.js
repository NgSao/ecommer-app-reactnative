import { ScrollView, KeyboardAvoidingView, Platform, Text } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"

import styles from "../../styles/ChangePasswordStyles"
import useChangePassword from "@hooks/useChangePassword"
import ChangePasswordHeader from "@components/profile/ChangePasswordHeader"
import PasswordForm from "@components/profile/PasswordForm"
import ContinueButton from "@components/profile/ContinueButton"

const ChangePasswordScreen = () => {
    const {
        currentPassword,
        newPassword,
        confirmPassword,
        showCurrentPassword,
        showNewPassword,
        showConfirmPassword,
        currentPasswordError,
        newPasswordError,
        confirmPasswordError,
        loading,
        setCurrentPassword,
        setNewPassword,
        setConfirmPassword,
        validateCurrentPassword,
        validateNewPassword,
        validateConfirmPassword,
        toggleShowCurrentPassword,
        toggleShowNewPassword,
        toggleShowConfirmPassword,
        handleChangePassword,
        onBack,
        isFormValid,
    } = useChangePassword()

    return (
        <SafeAreaView style={styles.container}>
            <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "padding" : "height"}
                style={styles.keyboardAvoidingView}
            >
                <ScrollView contentContainerStyle={styles.scrollContainer}>
                    <ChangePasswordHeader onBack={onBack} />
                    <PasswordForm
                        currentPassword={currentPassword}
                        newPassword={newPassword}
                        confirmPassword={confirmPassword}
                        showCurrentPassword={showCurrentPassword}
                        showNewPassword={showNewPassword}
                        showConfirmPassword={showConfirmPassword}
                        setCurrentPassword={setCurrentPassword}
                        setNewPassword={setNewPassword}
                        setConfirmPassword={setConfirmPassword}
                        validateCurrentPassword={validateCurrentPassword}
                        validateNewPassword={validateNewPassword}
                        validateConfirmPassword={validateConfirmPassword}
                        toggleShowCurrentPassword={toggleShowCurrentPassword}
                        toggleShowNewPassword={toggleShowNewPassword}
                        toggleShowConfirmPassword={toggleShowConfirmPassword}
                        currentPasswordError={currentPasswordError}
                        newPasswordError={newPasswordError}
                        confirmPasswordError={confirmPasswordError}
                    />
                    <ContinueButton
                        onPress={handleChangePassword}
                        disabled={!isFormValid()}
                        loading={loading}
                    />
                </ScrollView>
            </KeyboardAvoidingView>
        </SafeAreaView>
    )
}

export default ChangePasswordScreen