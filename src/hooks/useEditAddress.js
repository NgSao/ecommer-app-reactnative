import { useState, useEffect } from "react"
import { useNavigation, useRoute } from "@react-navigation/native"
import { Alert } from "react-native"

const useEditAddress = () => {
    const navigation = useNavigation()
    const route = useRoute()
    const { address } = route.params || {}

    const [formData, setFormData] = useState({
        id: address?.id || "",
        name: address?.name || "",
        recipient: address?.recipient || "",
        phone: address?.phone || "",
        address: address?.address || "",
        ward: address?.ward || "",
        district: address?.district || "",
        city: address?.city || "",
        isDefault: address?.isDefault || false,
    })
    const [errors, setErrors] = useState({})

    useEffect(() => {
        if (address) {
            setFormData({
                id: address.id,
                name: address.name || "",
                recipient: address.recipient || "",
                phone: address.phone || "",
                address: address.address || "",
                ward: address.ward || "",
                district: address.district || "",
                city: address.city || "",
                isDefault: address.isDefault || false,
            })
        }
    }, [address])

    const validateForm = () => {
        const newErrors = {}
        if (!formData.recipient.trim()) newErrors.recipient = "Vui lòng nhập tên người nhận"
        if (!formData.phone.trim()) {
            newErrors.phone = "Vui lòng nhập số điện thoại"
        } else if (!/^\d{10,11}$/.test(formData.phone)) {
            newErrors.phone = "Số điện thoại không hợp lệ"
        }
        if (!formData.address.trim()) newErrors.address = "Vui lòng nhập địa chỉ"
        if (!formData.ward.trim()) newErrors.ward = "Vui lòng nhập phường/xã"
        if (!formData.district.trim()) newErrors.district = "Vui lòng nhập quận/huyện"
        if (!formData.city.trim()) newErrors.city = "Vui lòng nhập tỉnh/thành phố"

        setErrors(newErrors)
        return Object.keys(newErrors).length === 0
    }

    const handleChange = (field, value) => {
        setFormData((prev) => ({ ...prev, [field]: value }))
        if (errors[field]) {
            setErrors((prev) => ({ ...prev, [field]: null }))
        }
    }

    const handleSave = () => {
        if (validateForm()) {
            // In a real app, this would call an API to update the address
            console.log("Updated Address:", formData)
            Alert.alert("Thành công", "Địa chỉ đã được cập nhật", [
                {
                    text: "OK",
                    onPress: () => navigation.goBack(),
                },
            ])
        }
    }

    const onBack = () => {
        navigation.goBack()
    }

    const isFormValid = () => {
        return (
            formData.recipient.trim() &&
            formData.phone.trim() &&
            /^\d{10,11}$/.test(formData.phone) &&
            formData.address.trim() &&
            formData.ward.trim() &&
            formData.district.trim() &&
            formData.city.trim()
        )
    }

    return {
        formData,
        errors,
        handleChange,
        handleSave,
        onBack,
        isFormValid,
    }
}

export default useEditAddress