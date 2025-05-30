import { View, ScrollView, ActivityIndicator, TouchableOpacity, Text } from "react-native"
import { Ionicons } from "@expo/vector-icons"

import styles from "../../styles/AdminSettingsStyles"
import AdminInfoCard from "@components/admin/setting/AdminInfoCard"
import StoreInfoSection from "@components/admin/setting/StoreInfoSection"
import NotificationsSection from "@components/admin/setting/NotificationsSection"
import ShippingSection from "@components/admin/setting/ShippingSection"
import PaymentSection from "@components/admin/setting/PaymentSection"
import { SafeAreaView } from 'react-native-safe-area-context';
import { useState, useEffect } from "react"
import { Alert } from "react-native"
import { useNavigation } from "@react-navigation/native"
import * as ImagePicker from "expo-image-picker"
import { useAuth } from "@contexts/AuthContext"
import { getStoreSettings, updateStoreSettings } from "api/apiService"
// import { api } from '@service/apiAdmin';

const AdminSettings = () => {
    const navigation = useNavigation()
    const { user } = useAuth()
    const [loading, setLoading] = useState(true)
    const [saving, setSaving] = useState(false)

    // Cài đặt cửa hàng
    const [storeName, setStoreName] = useState("")
    const [storeEmail, setStoreEmail] = useState("")
    const [storePhone, setStorePhone] = useState("")
    const [storeAddress, setStoreAddress] = useState("")
    const [storeLogo, setStoreLogo] = useState(null)
    const [storeDescription, setStoreDescription] = useState("")

    // Cài đặt thông báo
    const [emailNotifications, setEmailNotifications] = useState(true)
    const [orderNotifications, setOrderNotifications] = useState(true)
    const [stockNotifications, setStockNotifications] = useState(true)
    const [promotionNotifications, setPromotionNotifications] = useState(true)

    // Cài đặt vận chuyển
    const [shippingMethods, setShippingMethods] = useState([
        { id: 1, name: "Giao hàng tiêu chuẩn", price: 30000, enabled: true },
        { id: 2, name: "Giao hàng nhanh", price: 45000, enabled: true },
        { id: 3, name: "Giao hàng hỏa tốc", price: 60000, enabled: false },
    ])
    const [freeShippingThreshold, setFreeShippingThreshold] = useState("500000")

    // Cài đặt thanh toán
    const [paymentMethods, setPaymentMethods] = useState([
        { id: 1, name: "Thanh toán khi nhận hàng (COD)", enabled: true },
        { id: 2, name: "Chuyển khoản ngân hàng", enabled: true },
        { id: 3, name: "Ví điện tử (MoMo, ZaloPay)", enabled: true },
        { id: 4, name: "Thẻ tín dụng/ghi nợ", enabled: false },
    ])

    useEffect(() => {
        fetchSettings()
    }, [])

    const fetchSettings = async () => {
        setLoading(true)
        try {
            const response = await getStoreSettings()
            if (response.success) {
                const settings = response.data

                // Cài đặt cửa hàng
                setStoreName(settings.storeName)
                setStoreEmail(settings.storeEmail)
                setStorePhone(settings.storePhone)
                setStoreAddress(settings.storeAddress)
                setStoreLogo(settings.storeLogo)
                setStoreDescription(settings.storeDescription)

                // Cài đặt thông báo
                setEmailNotifications(settings.notifications.email)
                setOrderNotifications(settings.notifications.orders)
                setStockNotifications(settings.notifications.stock)
                setPromotionNotifications(settings.notifications.promotions)

                // Cài đặt vận chuyển
                setShippingMethods(settings.shipping.methods)
                setFreeShippingThreshold(settings.shipping.freeShippingThreshold.toString())

                // Cài đặt thanh toán
                setPaymentMethods(settings.payment.methods)
            } else {
                Alert.alert("Lỗi", "Không thể tải cài đặt cửa hàng")
            }
        } catch (error) {
            console.error("Error fetching settings:", error)
            Alert.alert("Lỗi", "Đã xảy ra lỗi khi tải cài đặt cửa hàng")
        } finally {
            setLoading(false)
        }
    }

    const saveSettings = async () => {
        if (!storeName.trim()) {
            Alert.alert("Lỗi", "Vui lòng nhập tên cửa hàng")
            return
        }

        if (!storeEmail.trim()) {
            Alert.alert("Lỗi", "Vui lòng nhập email cửa hàng")
            return
        }

        if (!storePhone.trim()) {
            Alert.alert("Lỗi", "Vui lòng nhập số điện thoại cửa hàng")
            return
        }

        setSaving(true)
        try {
            const settingsData = {
                storeName,
                storeEmail,
                storePhone,
                storeAddress,
                storeLogo,
                storeDescription,
                notifications: {
                    email: emailNotifications,
                    orders: orderNotifications,
                    stock: stockNotifications,
                    promotions: promotionNotifications,
                },
                shipping: {
                    methods: shippingMethods,
                    freeShippingThreshold: Number.parseInt(freeShippingThreshold) || 0,
                },
                payment: {
                    methods: paymentMethods,
                },
            }

            const response = await updateStoreSettings(settingsData)
            if (response.success) {
                Alert.alert("Thành công", "Đã lưu cài đặt cửa hàng")
            } else {
                Alert.alert("Lỗi", response.error || "Không thể lưu cài đặt cửa hàng")
            }
        } catch (error) {
            console.error("Error saving settings:", error)
            Alert.alert("Lỗi", "Đã xảy ra lỗi khi lưu cài đặt cửa hàng")
        } finally {
            setSaving(false)
        }
    }

    const pickLogo = async () => {
        try {
            const result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                allowsEditing: true,
                aspect: [1, 1],
                quality: 0.8,
            })

            if (!result.canceled) {
                setStoreLogo(result.assets[0].uri)
            }
        } catch (error) {
            console.error("Error picking image:", error)
            Alert.alert("Lỗi", "Không thể chọn hình ảnh")
        }
    }

    const toggleShippingMethod = (id) => {
        setShippingMethods(
            shippingMethods.map((method) => (method.id === id ? { ...method, enabled: !method.enabled } : method)),
        )
    }

    const updateShippingPrice = (id, price) => {
        setShippingMethods(
            shippingMethods.map((method) => (method.id === id ? { ...method, price: Number.parseInt(price) || 0 } : method)),
        )
    }

    const togglePaymentMethod = (id) => {
        setPaymentMethods(
            paymentMethods.map((method) => (method.id === id ? { ...method, enabled: !method.enabled } : method)),
        )
    }


    if (loading) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#e30019" />
                <Text style={styles.loadingText}>Đang tải cài đặt...</Text>
            </View>
        )
    }

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
                    <Ionicons name="arrow-back" size={24} color="#333" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Cài đặt hệ thống</Text>
                <View style={{ width: 40 }} />
            </View>

            <ScrollView style={styles.scrollContainer}>
                <AdminInfoCard user={user} navigation={navigation} />

                <StoreInfoSection
                    storeName={storeName}
                    setStoreName={setStoreName}
                    storeEmail={storeEmail}
                    setStoreEmail={setStoreEmail}
                    storePhone={storePhone}
                    setStorePhone={setStorePhone}
                    storeAddress={storeAddress}
                    setStoreAddress={setStoreAddress}
                    storeLogo={storeLogo}
                    setStoreLogo={setStoreLogo}
                    storeDescription={storeDescription}
                    setStoreDescription={setStoreDescription}
                    pickLogo={pickLogo}
                />

                <NotificationsSection
                    emailNotifications={emailNotifications}
                    setEmailNotifications={setEmailNotifications}
                    orderNotifications={orderNotifications}
                    setOrderNotifications={setOrderNotifications}
                    stockNotifications={stockNotifications}
                    setStockNotifications={setStockNotifications}
                    promotionNotifications={promotionNotifications}
                    setPromotionNotifications={setPromotionNotifications}
                />

                <ShippingSection
                    shippingMethods={shippingMethods}
                    freeShippingThreshold={freeShippingThreshold}
                    setFreeShippingThreshold={setFreeShippingThreshold}
                    toggleShippingMethod={toggleShippingMethod}
                    updateShippingPrice={updateShippingPrice}
                />

                <PaymentSection paymentMethods={paymentMethods} togglePaymentMethod={togglePaymentMethod} />

                <TouchableOpacity
                    style={[styles.saveButton, saving && styles.disabledButton]}
                    onPress={saveSettings}
                    disabled={saving}
                >
                    {saving ? (
                        <ActivityIndicator size="small" color="#fff" />
                    ) : (
                        <>
                            <Ionicons name="save-outline" size={20} color="#fff" />
                            <Text style={styles.saveButtonText}>Lưu cài đặt</Text>
                        </>
                    )}
                </TouchableOpacity>
            </ScrollView>
        </SafeAreaView>
    )
}

export default AdminSettings