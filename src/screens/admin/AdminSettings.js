import { View, ScrollView, ActivityIndicator, TouchableOpacity, Text } from "react-native"
import { Ionicons } from "@expo/vector-icons"

import styles from "../../styles/AdminSettingsStyles"
import useAdminSettings from "@hooks/useAdminSettings"
import AdminInfoCard from "@components/admin/setting/AdminInfoCard"
import StoreInfoSection from "@components/admin/setting/StoreInfoSection"
import NotificationsSection from "@components/admin/setting/NotificationsSection"
import ShippingSection from "@components/admin/setting/ShippingSection"
import PaymentSection from "@components/admin/setting/PaymentSection"
import { SafeAreaView } from "react-native"

const AdminSettings = () => {
    const {
        navigation,
        user,
        loading,
        saving,
        storeName,
        setStoreName,
        storeEmail,
        setStoreEmail,
        storePhone,
        setStorePhone,
        storeAddress,
        setStoreAddress,
        storeLogo,
        setStoreLogo,
        storeDescription,
        setStoreDescription,
        emailNotifications,
        setEmailNotifications,
        orderNotifications,
        setOrderNotifications,
        stockNotifications,
        setStockNotifications,
        promotionNotifications,
        setPromotionNotifications,
        shippingMethods,
        freeShippingThreshold,
        setFreeShippingThreshold,
        paymentMethods,
        saveSettings,
        pickLogo,
        toggleShippingMethod,
        updateShippingPrice,
        togglePaymentMethod,
    } = useAdminSettings()

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