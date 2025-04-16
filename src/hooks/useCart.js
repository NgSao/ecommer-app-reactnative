import { useEffect, useState } from "react"
import { useNavigation } from "@react-navigation/native"
import { Alert } from "react-native"
import { useCart as useCartContext } from "@contexts/CartContext";
import { api } from "@service/api";

const useCart = () => {
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

            // Fetch categories
            const respone = await api.getPromoCodes()
            if (respone.success) {
                setPromoData(respone.data)
            }

        } catch (error) {
            console.error("Error fetching home data:", error)
        } finally {
            setLoading(false)
        }
    }

    const formatPrice = (price) => {
        return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".") + "đ"
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
        if (currentQuantity > 1) {
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

        if (!foundPromo.isActive) {
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

    return {
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
    }
}

export default useCart