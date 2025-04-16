import { useState } from "react"
import { Alert } from "react-native"
import { useNavigation } from "@react-navigation/native"
import { api } from '@service/apiAdmin';

const useCreateCustomer = () => {
    const navigation = useNavigation()
    const [loading, setLoading] = useState(false)
    const [customerData, setCustomerData] = useState({
        name: "",
        email: "",
        phone: "",
        address: {
            address: "",
            ward: "",
            district: "",
            province: "",
        },
        password: "",
        confirmPassword: "",
    })
    const [errors, setErrors] = useState({
        name: "",
        email: "",
        phone: "",
        address: "",
        password: "",
        confirmPassword: "",
    })

    const validateForm = () => {
        let isValid = true
        const newErrors = {
            name: "",
            email: "",
            phone: "",
            address: "",
            password: "",
            confirmPassword: "",
        }

        // Validate name
        if (!customerData.name.trim()) {
            newErrors.name = "Vui lòng nhập họ tên"
            isValid = false
        }

        // Validate email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        if (!customerData.email.trim()) {
            newErrors.email = "Vui lòng nhập email"
            isValid = false
        } else if (!emailRegex.test(customerData.email)) {
            newErrors.email = "Email không hợp lệ"
            isValid = false
        }

        // Validate phone
        const phoneRegex = /^(0[3|5|7|8|9])+([0-9]{8})$/
        if (!customerData.phone.trim()) {
            newErrors.phone = "Vui lòng nhập số điện thoại"
            isValid = false
        } else if (!phoneRegex.test(customerData.phone)) {
            newErrors.phone = "Số điện thoại không hợp lệ"
            isValid = false
        }

        // Validate address
        if (!customerData.address.address.trim()) {
            newErrors.address = "Vui lòng nhập địa chỉ"
            isValid = false
        }

        // Validate password
        if (customerData.password && customerData.password.length < 6) {
            newErrors.password = "Mật khẩu phải có ít nhất 6 ký tự"
            isValid = false
        }

        // Validate confirm password
        if (customerData.password !== customerData.confirmPassword) {
            newErrors.confirmPassword = "Mật khẩu xác nhận không khớp"
            isValid = false
        }

        setErrors(newErrors)
        return isValid
    }

    const handleInputChange = (field, value) => {
        if (field.includes(".")) {
            const [parent, child] = field.split(".")
            setCustomerData({
                ...customerData,
                [parent]: {
                    ...customerData[parent],
                    [child]: value,
                },
            })
        } else {
            setCustomerData({
                ...customerData,
                [field]: value,
            })
        }
    }

    const createCustomer = async () => {
        if (!validateForm()) {
            return
        }

        setLoading(true)
        try {
            const response = await api.admin.createCustomer({
                name: customerData.name,
                email: customerData.email,
                phone: customerData.phone,
                address: `${customerData.address.address}, ${customerData.address.ward}, ${customerData.address.district}, ${customerData.address.province}`,
                password: customerData.password,
            })

            if (response.success) {
                Alert.alert("Thành công", "Đã tạo khách hàng mới thành công", [
                    {
                        text: "Quay lại danh sách",
                        onPress: () => navigation.navigate("AdminCustomersManagement"),
                    },
                    {
                        text: "Tạo đơn hàng",
                        onPress: () => {
                            navigation.navigate("AdminCreateOrder", {
                                customer: response.data,
                            })
                        },
                    },
                ])
            } else {
                Alert.alert("Lỗi", response.error || "Không thể tạo khách hàng")
            }
        } catch (error) {
            console.error("Error creating customer:", error)
            Alert.alert("Lỗi", "Đã xảy ra lỗi khi tạo khách hàng")
        } finally {
            setLoading(false)
        }
    }

    return {
        loading,
        customerData,
        errors,
        handleInputChange,
        createCustomer,
    }
}

export default useCreateCustomer