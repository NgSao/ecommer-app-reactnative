

import { ScrollView, Text } from "react-native"
import styles from "../../styles/CartStyles"
import CartItem from "@components/cart/CartItem"
import CartHeader from "@components/cart/CartHeader"
import PromoCodeSection from "@components/cart/PromoCodeSection"
import SummarySection from "@components/cart/SummarySection"
import CheckoutSection from "@components/cart/CheckoutSection"
import EmptyCart from "@components/cart/EmptyCart"
import { useEffect, useState } from "react"
import { useNavigation } from "@react-navigation/native"
import { Alert } from "react-native"
import { useCart as useCartContext } from "@contexts/CartContext";
import { SafeAreaView } from "react-native-safe-area-context"
import { GET_ALL } from "api/apiService"
import { formatPrice } from "@utils/formatUtils"

export default function CartScreen() {
    const navigation = useNavigation()
    const { cartItems, calculateSubtotal, updateQuantity, removeItem } = useCartContext()
    const [promoCode, setPromoCode] = useState("")
    const [promoData, setPromoData] = useState(null)
    const [appliedPromo, setAppliedPromo] = useState(null)
    const [promoError, setPromoError] = useState("")
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        fetchData()
    }, [])

    const fetchData = async () => {
        try {
            setLoading(true)
            const response = await GET_ALL("promotions")
            if (response.status === 200) {
                setPromoData(response.data.data)
            }
        } catch (error) {
            console.error("Error fetching promo codes:", error)
        } finally {
            setLoading(false)
        }
    }


    const calculateDiscount = () => {
        if (!appliedPromo) return 0
        const subtotal = calculateSubtotal()
        if (appliedPromo.discountType === "percentage") {
            const discount = subtotal * (appliedPromo.discountValue / 100)
            return Math.min(discount, appliedPromo.maxDiscount)
        }
        return appliedPromo.discountValue

    }

    const calculateTotal = () => {
        return calculateSubtotal() - calculateDiscount()
    }

    const incrementQuantity = (index) => {
        const currentQuantity = cartItems[index].quantity
        updateQuantity(index, currentQuantity + 1)
    }
    const decrementQuantity = (index) => {
        const currentQuantity = cartItems[index].quantity
        if (currentQuantity <= 1) {
            removeItem(index)
        } else {
            updateQuantity(index, currentQuantity - 1)
        }
    }

    const applyPromoCode = () => {
        setPromoError("")
        if (!promoCode.trim()) {
            setPromoError("Vui lòng nhập mã giảm giá")
            return
        }

        const foundPromo = promoData.find((promo) => promo.code.toUpperCase() === promoCode.trim().toUpperCase())

        if (!foundPromo) {
            setPromoError("Mã giảm giá không hợp lệ")
            return
        }

        if (!foundPromo.active) {
            setPromoError("Mã giảm giá không còn hiệu lực")
            return
        }

        const now = new Date()
        const expiryDate = new Date(foundPromo.expiryDate)
        if (now > expiryDate) {
            setPromoError("Mã giảm giá đã hết hạn")
            return
        }

        const subtotal = calculateSubtotal()
        if (subtotal < foundPromo.minOrderValue) {
            setPromoError(`Đơn hàng tối thiểu ${formatPrice(foundPromo.minOrderValue)} để áp dụng mã này`)
            return
        }

        setAppliedPromo(foundPromo)
        setPromoCode("")
        Alert.alert("Thành công", `Đã áp dụng mã giảm giá "${foundPromo.code}": ${foundPromo.description}`)
    }

    const removePromoCode = () => {
        setAppliedPromo(null)
    }

    return (
        <SafeAreaView style={styles.container}>
            <CartHeader />
            {cartItems.length > 0 ? (
                <>
                    <ScrollView style={styles.cartItemsContainer}>
                        {cartItems.map((item, index) => (
                            <CartItem
                                key={`${item.id}-${item.color || ''}-${item.storage || ''}-${item.size || ''}`}
                                item={item}
                                index={index}
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
                            calculateDiscount={calculateDiscount}
                        />
                        <SummarySection
                            calculateSubtotal={calculateSubtotal}
                            calculateDiscount={calculateDiscount}
                            calculateTotal={calculateTotal}
                        />
                    </ScrollView>
                    <CheckoutSection
                        cartItems={cartItems}
                        calculateSubtotal={calculateSubtotal}
                        calculateDiscount={calculateDiscount}
                        calculateTotal={calculateTotal}
                        appliedPromo={appliedPromo}
                        navigation={navigation}
                    />
                </>
            ) : (
                <EmptyCart />
            )}
        </SafeAreaView>
    )
}