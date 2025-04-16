import { KeyboardAvoidingView, Platform, View, ScrollView, TouchableOpacity, ActivityIndicator, Text, SafeAreaView } from "react-native"
import { Ionicons } from "@expo/vector-icons"
import styles from "../../styles/AdminCreateCustomerStyles"
import AdminHeader from "@components/admin/AdminHeader"
import CustomerFormSection from "@components/admin/customer/CustomerFormSection"
import FormInput from "@components/admin/customer/FormInput"
import useCreateCustomer from "@hooks/useCreateCustomer"



const AdminCreateCustomer = () => {
    const { loading, customerData, errors, handleInputChange, createCustomer } = useCreateCustomer()

    return (
        <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === "ios" ? "padding" : undefined}>
            <SafeAreaView style={styles.container}>
                <AdminHeader title="Tạo khách hàng mới" />

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