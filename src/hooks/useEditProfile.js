import { useState, useEffect } from "react"
import { useNavigation } from "@react-navigation/native"
import { useAuth } from "@contexts/AuthContext"
import * as ImagePicker from "expo-image-picker"
import { Alert } from "react-native"

const useEditProfile = () => {
    const navigation = useNavigation()
    const { user, updateProfile, loading } = useAuth()

    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [phone, setPhone] = useState("")
    const [avatar, setAvatar] = useState(null)
    const [nameError, setNameError] = useState("")
    const [phoneError, setPhoneError] = useState("")

    useEffect(() => {
        if (user) {
            setName(user.name || "")
            setEmail(user.email || "")
            setPhone(user.phone || "")
            setAvatar(user.avatar || null)
        }
    }, [user])

    const validateName = () => {
        if (!name) {
            setNameError("Vui lòng nhập họ tên")
            return false
        } else {
            setNameError("")
            return true
        }
    }

    const validatePhone = () => {
        const phoneRegex = /^[0-9]{10}$/
        if (!phone) {
            setPhoneError("Vui lòng nhập số điện thoại")
            return false
        } else if (!phoneRegex.test(phone)) {
            setPhoneError("Số điện thoại không hợp lệ")
            return false
        } else {
            setPhoneError("")
            return true
        }
    }

    const pickImage = async () => {
        try {
            const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync()
            if (permissionResult.granted === false) {
                Alert.alert("Cần quyền truy cập", "Bạn cần cấp quyền truy cập thư viện ảnh để chọn ảnh đại diện.")
                return
            }

            const result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                allowsEditing: true,
                aspect: [1, 1],
                quality: 0.8,
            })

            if (!result.canceled) {
                setAvatar(result.assets[0].uri)
            }
        } catch (error) {
            console.error("Error picking image:", error)
            Alert.alert("Lỗi", "Không thể chọn ảnh. Vui lòng thử lại sau.")
        }
    }

    const handleSaveProfile = async () => {
        const isNameValid = validateName()
        const isPhoneValid = validatePhone()

        if (isNameValid && isPhoneValid) {
            const userData = {
                name,
                phone,
                avatar,
            }

            const success = await updateProfile(userData)
            if (success) {
                Alert.alert("Thành công", "Thông tin cá nhân đã được cập nhật", [
                    {
                        text: "OK",
                        onPress: () => navigation.goBack(),
                    },
                ])
            }
        }
    }

    const onBack = () => {
        navigation.goBack()
    }

    const onChangePassword = () => {
        navigation.navigate("ChangePassword")
    }

    return {
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
    }
}

export default useEditProfile