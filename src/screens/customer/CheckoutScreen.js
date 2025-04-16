import { SafeAreaView, ScrollView } from "react-native"

import styles from "../../styles/CheckoutStyles"
import useCheckout from "@hooks/useCheckout"
import ShippingAddressSection from "@components/checkout/ShippingAddressSection"
import OrderItemsSection from "@components/checkout/OrderItemsSection"
import PromotionSection from "@components/home/PromotionSection"
import PaymentMethodSection from "@components/checkout/PaymentMethodSection"
import OrderNoteSection from "@components/checkout/OrderNoteSection"
import OrderSummarySection from "@components/checkout/OrderSummarySection"
import CheckoutFooter from "@components/checkout/CheckoutFooter"
import PromoCodesModal from "@components/checkout/PromoCodesModal"

export default function CheckoutScreen() {
    const {
        routeCartItems,
        loading,
        addresses,
        setAddresses,
        selectedAddress,
        setSelectedAddress,
        paymentMethod,
        setPaymentMethod,
        note,
        setNote,
        promoCode,
        setPromoCode,
        appliedPromoCode,
        promoCodeError,
        setPromoCodeError,
        showAddAddress,
        setShowAddAddress,
        showPromoCodesModal,
        setShowPromoCodesModal,
        availablePromoCodes,
        loadingPromoCodes,
        newAddress,
        setNewAddress,
        calculateShippingFee,
        calculatePromoDiscount,
        calculateSubtotal,
        calculateTotal,
        formatPrice,
        formatExpiryDate,
        applyPromoCode,
        removePromoCode,
        selectPromoCode,
        handleAddAddress,
        handlePlaceOrder,
    } = useCheckout()

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView showsVerticalScrollIndicator={false}>
                <ShippingAddressSection
                    addresses={addresses}
                    selectedAddress={selectedAddress}
                    setSelectedAddress={setSelectedAddress}
                    showAddAddress={showAddAddress}
                    setShowAddAddress={setShowAddAddress}
                    newAddress={newAddress}
                    setNewAddress={setNewAddress}
                    handleAddAddress={handleAddAddress}
                />
                <OrderItemsSection cartItems={routeCartItems} formatPrice={formatPrice} />
                {/* <PromotionSection
                    promoCode={promoCode}
                    setPromoCode={setPromoCode}
                    appliedPromoCode={appliedPromoCode}
                    promoCodeError={promoCodeError}
                    applyPromoCode={applyPromoCode}
                    removePromoCode={removePromoCode}
                    setShowPromoCodesModal={setShowPromoCodesModal}
                    formatPrice={formatPrice}
                    calculatePromoDiscount={calculatePromoDiscount}
                    loading={loading}
                /> */}
                <PaymentMethodSection paymentMethod={paymentMethod} setPaymentMethod={setPaymentMethod} />
                <OrderNoteSection note={note} setNote={setNote} />
                <OrderSummarySection
                    calculateSubtotal={calculateSubtotal}
                    calculateShippingFee={calculateShippingFee}
                    calculatePromoDiscount={calculatePromoDiscount}
                    calculateTotal={calculateTotal}
                    formatPrice={formatPrice}
                    appliedPromoCode={appliedPromoCode}
                />
            </ScrollView>
            <CheckoutFooter
                calculateTotal={calculateTotal}
                formatPrice={formatPrice}
                handlePlaceOrder={handlePlaceOrder}
                loading={loading}
            />
            <PromoCodesModal
                showPromoCodesModal={showPromoCodesModal}
                setShowPromoCodesModal={setShowPromoCodesModal}
                availablePromoCodes={availablePromoCodes}
                loadingPromoCodes={loadingPromoCodes}
                selectPromoCode={selectPromoCode}
                formatPrice={formatPrice}
                formatExpiryDate={formatExpiryDate}
            />
        </SafeAreaView>
    )
}