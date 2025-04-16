import { SafeAreaView, ScrollView, Text } from "react-native"
import styles from "../../styles/CartStyles"
import useCart from "@hooks/useCart"
import CartItem from "@components/cart/CartItem"
import CartHeader from "@components/cart/CartHeader"
import PromoCodeSection from "@components/cart/PromoCodeSection"
import SummarySection from "@components/cart/SummarySection"
import CheckoutSection from "@components/cart/CheckoutSection"
import EmptyCart from "@components/cart/EmptyCart"

export default function CartScreen() {
    const {
        cartItems,
        promoCode,
        setPromoCode,
        appliedPromo,
        promoError,
        formatPrice,
        calculateSubtotal,
        calculateDiscount,
        calculateTotal,
        incrementQuantity,
        decrementQuantity,
        removeItem,
        applyPromoCode,
        removePromoCode,
        navigation,
    } = useCart()

    return (
        <SafeAreaView style={styles.container}>
            <CartHeader />
            {cartItems.length > 0 ? (
                <>
                    <ScrollView style={styles.cartItemsContainer}>
                        {cartItems.map((item, index) => (
                            <CartItem
                                key={`${item.id}-${item.color}-${item.storage || ''}-${item.size || ''}`}
                                item={item}
                                index={index}
                                formatPrice={formatPrice}
                                incrementQuantity={incrementQuantity}
                                decrementQuantity={decrementQuantity}
                                removeItem={removeItem}
                            />
                        ))}
                        <PromoCodeSection
                            promoCode={promoCode}
                            setPromoCode={setPromoCode}
                            appliedPromo={appliedPromo}
                            promoError={promoError}
                            applyPromoCode={applyPromoCode}
                            removePromoCode={removePromoCode}
                            formatPrice={formatPrice}
                            calculateDiscount={calculateDiscount}
                        />
                        <SummarySection
                            calculateSubtotal={calculateSubtotal}
                            calculateDiscount={calculateDiscount}
                            calculateTotal={calculateTotal}
                            formatPrice={formatPrice}
                        />
                    </ScrollView>
                    <CheckoutSection
                        cartItems={cartItems}
                        calculateSubtotal={calculateSubtotal}
                        calculateDiscount={calculateDiscount}
                        calculateTotal={calculateTotal}
                        appliedPromo={appliedPromo}
                        formatPrice={formatPrice}
                        navigation={navigation}
                    />
                </>
            ) : (
                <EmptyCart />
            )}
        </SafeAreaView>
    )
}