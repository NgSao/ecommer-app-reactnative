import { KeyboardAvoidingView, Platform, View, ScrollView, TouchableOpacity, ActivityIndicator, Text, SafeAreaView } from "react-native"
import { Ionicons } from "@expo/vector-icons"
import styles from "../../styles/AdminCreateCustomerStyles"
import CustomerFormSection from "@components/admin/customer/CustomerFormSection"
import FormInput from "@components/admin/customer/FormInput"
import { useState } from "react"
import { Alert } from "react-native"
import { useNavigation } from "@react-navigation/native"
import { ADMIN_POST_ADD } from "api/apiService"



const AdminCreateCustomer = () => {
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
        const fromData = {
            fullName: customerData.name,
            email: customerData.email,
            phone: customerData.phone,
            password: customerData.password,
            address: [
                {
                    fullName: customerData.name,
                    phone: customerData.phone,
                    address: customerData.address.address,
                    ward: customerData.address.ward,
                    district: customerData.address.district,
                    province: customerData.address.province,
                    addressDetail: customerData.address.address,

                }
            ]

        }
        console.log("fromData", fromData);

        setLoading(true)
        try {
            const response = await ADMIN_POST_ADD("users/create", fromData)

            Alert.alert("Thành công", "Đã tạo khách hàng mới thành công", [
                {
                    text: "Quay lại danh sách",
                    onPress: () => navigation.goBack(),
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
        } catch (error) {
            const message = error.response?.data?.message || "Đã xảy ra lỗi khi tạo khách hàng";
            Alert.alert("Thông báo", message);

        } finally {
            setLoading(false)
        }
    }
    return (
        <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === "ios" ? "padding" : undefined}>
            <SafeAreaView style={styles.container}>

                <View style={styles.header}>
                    <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
                        <Ionicons name="arrow-back" size={24} color="#333" />
                    </TouchableOpacity>
                    <Text style={styles.headerTitle}>Tạo khách hàng mới</Text>
                    <View style={{ width: 24 }} />
                </View>

                <ScrollView style={styles.scrollContainer}>
                    {/* Thông tin cá nhân */}
                    <CustomerFormSection title="Thông tin cá nhân">
                        <FormInput
                            label="Họ tên"
                            value={customerData.name}
                            onChangeText={(text) => handleInputChange("name", text)}
                            placeholder="Nhập họ tên khách hàng"
                            error={errors.name}
                            required
                        />
                        <FormInput
                            label="Email"
                            value={customerData.email}
                            onChangeText={(text) => handleInputChange("email", text)}
                            placeholder="Nhập email"
                            error={errors.email}
                            required
                            keyboardType="email-address"
                            autoCapitalize="none"
                        />
                        <FormInput
                            label="Số điện thoại"
                            value={customerData.phone}
                            onChangeText={(text) => handleInputChange("phone", text)}
                            placeholder="Nhập số điện thoại"
                            error={errors.phone}
                            required
                            keyboardType="phone-pad"
                        />
                    </CustomerFormSection>

                    {/* Địa chỉ */}
                    <CustomerFormSection title="Địa chỉ">
                        <FormInput
                            label="Địa chỉ"
                            value={customerData.address.address}
                            onChangeText={(text) => handleInputChange("address.address", text)}
                            placeholder="Nhập địa chỉ"
                            error={errors.address}
                            required
                        />
                        <View style={styles.formRow}>
                            <View style={{ flex: 1, marginRight: 10 }}>
                                <FormInput
                                    label="Phường/Xã"
                                    value={customerData.address.ward}
                                    onChangeText={(text) => handleInputChange("address.ward", text)}
                                    placeholder="Phường/Xã"
                                />
                            </View>
                            <View style={{ flex: 1 }}>
                                <FormInput
                                    label="Quận/Huyện"
                                    value={customerData.address.district}
                                    onChangeText={(text) => handleInputChange("address.district", text)}
                                    placeholder="Quận/Huyện"
                                />
                            </View>
                        </View>
                        <FormInput
                            label="Tỉnh/Thành phố"
                            value={customerData.address.province}
                            onChangeText={(text) => handleInputChange("address.province", text)}
                            placeholder="Tỉnh/Thành phố"
                        />
                    </CustomerFormSection>

                    {/* Thông tin tài khoản */}
                    <CustomerFormSection
                        title="Thông tin tài khoản"
                        description="Nếu bạn muốn tạo tài khoản cho khách hàng, hãy nhập mật khẩu. Nếu không, hãy để trống."
                    >
                        <FormInput
                            label="Mật khẩu"
                            value={customerData.password}
                            onChangeText={(text) => handleInputChange("password", text)}
                            placeholder="Nhập mật khẩu"
                            error={errors.password}
                            secureTextEntry
                        />
                        <FormInput
                            label="Xác nhận mật khẩu"
                            value={customerData.confirmPassword}
                            onChangeText={(text) => handleInputChange("confirmPassword", text)}
                            placeholder="Nhập lại mật khẩu"
                            error={errors.confirmPassword}
                            secureTextEntry
                        />
                    </CustomerFormSection>

                    {/* Nút tạo khách hàng */}
                    <TouchableOpacity
                        style={[styles.createButton, loading && styles.disabledButton]}
                        onPress={createCustomer}
                        disabled={loading}
                    >
                        {loading ? (
                            <ActivityIndicator size="small" color="#fff" />
                        ) : (
                            <>
                                <Ionicons name="person-add" size={20} color="#fff" />
                                <Text style={styles.createButtonText}>Tạo khách hàng</Text>
                            </>
                        )}
                    </TouchableOpacity>
                </ScrollView>
            </SafeAreaView>
        </KeyboardAvoidingView>
    )
}

export default AdminCreateCustomer