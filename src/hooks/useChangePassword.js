import { useState } from "react"
import { useNavigation } from "@react-navigation/native"
import { useAuth } from "@contexts/AuthContext"

const useChangePassword = () => {
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
        console.log("mak");

        if (isCurrentPasswordValid && isNewPasswordValid && isConfirmPasswordValid) {
            const verifySuccess = await changePassword(currentPassword, newPassword)

            if (verifySuccess) {
                navigation.navigate("VerifyEmail", {
                    email: user.email,
                    isPasswordChange: true,
                    newPassword: newPassword,
                })
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

    return {
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
    }
}

export default useChangePassword