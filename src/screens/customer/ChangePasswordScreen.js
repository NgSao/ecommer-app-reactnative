import { ScrollView, KeyboardAvoidingView, Platform, Text } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"

import styles from "../../styles/ChangePasswordStyles"
import ChangePasswordHeader from "@components/profile/ChangePasswordHeader"
import PasswordForm from "@components/profile/PasswordForm"
import ContinueButton from "@components/profile/ContinueButton"
import { useState } from "react"
import { useNavigation } from "@react-navigation/native"
import { useAuth } from "@contexts/AuthContext"
import { showSuccess } from 'api/apiService';
const ChangePasswordScreen = () => {
    const navigation = useNavigation()
    const { user, changePassword, loading } = useAuth()

    const [currentPassword, setCurrentPassword] = useState("")
    const [newPassword, setNewPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [showCurrentPassword, setShowCurrentPassword] = useState(false)
    const [showNewPassword, setShowNewPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)
    const [currentPasswordError, setCurrentPasswordError] = useState("")
    const [newPasswordError, setNewPasswordError] = useState("")
    const [confirmPasswordError, setConfirmPasswordError] = useState("")

    const validateCurrentPassword = () => {
        if (!currentPassword) {
            setCurrentPasswordError("Vui lòng nhập mật khẩu hiện tại")
            return false
        } else {
            setCurrentPasswordError("")
            return true
        }
    }

    const validateNewPassword = () => {
        if (!newPassword) {
            setNewPasswordError("Vui lòng nhập mật khẩu mới")
            return false
        } else if (newPassword.length < 6) {
            setNewPasswordError("Mật khẩu phải có ít nhất 6 ký tự")
            return false
        } else if (newPassword === currentPassword) {
            setNewPasswordError("Mật khẩu mới không được trùng với mật khẩu hiện tại")
            return false
        } else {
            setNewPasswordError("")
            return true
        }
    }

    const validateConfirmPassword = () => {
        if (!confirmPassword) {
            setConfirmPasswordError("Vui lòng xác nhận mật khẩu mới")
            return false
        } else if (confirmPassword !== newPassword) {
            setConfirmPasswordError("Mật khẩu xác nhận không khớp")
            return false
        } else {
            setConfirmPasswordError("")
            return true
        }
    }

    const handleChangePassword = async () => {
        const isCurrentPasswordValid = validateCurrentPassword()
        const isNewPasswordValid = validateNewPassword()
        const isConfirmPasswordValid = validateConfirmPassword()

        if (isCurrentPasswordValid && isNewPasswordValid && isConfirmPasswordValid) {
            const verifySuccess = await changePassword(currentPassword, newPassword)

            if (verifySuccess) {
                navigation.goBack()
                showSuccess("Đổi mật khẩu thành công")
            }
        }
    }

    const onBack = () => {
        navigation.goBack()
    }

    const toggleShowCurrentPassword = () => {
        setShowCurrentPassword(!showCurrentPassword)
    }

    const toggleShowNewPassword = () => {
        setShowNewPassword(!showNewPassword)
    }

    const toggleShowConfirmPassword = () => {
        setShowConfirmPassword(!showConfirmPassword)
    }

    const isFormValid = () => {
        return currentPassword && newPassword && confirmPassword
    }


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