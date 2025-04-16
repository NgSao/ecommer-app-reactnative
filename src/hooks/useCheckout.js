import { useState, useEffect } from "react"
import { useNavigation, useRoute } from "@react-navigation/native"
import { Alert } from "react-native"
import { useAuth } from "@contexts/AuthContext"
import { useCart } from "@contexts/CartContext"
import { api } from "@service/api"

const useCheckout = () => {
    const navigation = useNavigation()
    const route = useRoute()
    const { user, token, isLoggedIn } = useAuth()
    const { cartItems, calculateSubtotal: calculateCartSubtotal, clearCart } = useCart()

    const {
        cartItems: routeCartItems = cartItems,
        subtotal: routeSubtotal,
        discount: routeDiscount,
        total: routeTotal,
        appliedPromo,
    } = route.params || {}

    const [loading, setLoading] = useState(false)
    const [addresses, setAddresses] = useState([])
    const [selectedAddress, setSelectedAddress] = useState(null)
    const [paymentMethod, setPaymentMethod] = useState("cod")
    const [note, setNote] = useState("")
    const [promoCode, setPromoCode] = useState("")
    const [appliedPromoCode, setAppliedPromoCode] = useState(appliedPromo || null)
    const [promoCodeError, setPromoCodeError] = useState("")
    const [showAddAddress, setShowAddAddress] = useState(false)
    const [showPromoCodesModal, setShowPromoCodesModal] = useState(false)
    const [availablePromoCodes, setAvailablePromoCodes] = useState([])
    const [loadingPromoCodes, setLoadingPromoCodes] = useState(false)
    const [newAddress, setNewAddress] = useState({
        name: "",
        recipient: "",
        phone: "",
        address: "",
        ward: "",
        district: "",
        city: "",
        isDefault: false,
    })

    useEffect(() => {
        if (isLoggedIn && user) {
            if (user.addresses && user.addresses.length > 0) {
                setAddresses(user.addresses)
                const defaultAddress = user.addresses.find((addr) => addr.isDefault)
                setSelectedAddress(defaultAddress || user.addresses[0])
            }
            fetchPromoCodes()
        }
    }, [isLoggedIn, user])

    const fetchPromoCodes = async () => {
        if (!isLoggedIn) return
        try {
            setLoadingPromoCodes(true)
            const response = await api.getUserPromoCodes(user.id)
            if (response.success) {
                setAvailablePromoCodes(response.data)
            }
        } catch (error) {
            console.error("Error fetching promo codes:", error)
        } finally {
            setLoadingPromoCodes(false)
        }
    }

    const calculateShippingFee = () => {
        return 0 // Free shipping for now
    }

    const calculatePromoDiscount = () => {
        if (routeDiscount) return routeDiscount
        if (!appliedPromoCode) return 0
        return appliedPromoCode.discountAmount
    }

    const calculateSubtotal = () => {
        if (routeSubtotal) return routeSubtotal
        return routeCartItems.reduce((total, item) => total + item.price * item.quantity, 0)
    }

    const calculateTotal = () => {
        return calculateSubtotal() + calculateShippingFee() - calculatePromoDiscount()
    }

    const formatPrice = (price) => {
        return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".") + "đ"
    }

    const formatExpiryDate = (dateString) => {
        const date = new Date(dateString)
        return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`
    }

    const applyPromoCode = async () => {
        if (!promoCode.trim()) {
            setPromoCodeError("Vui lòng nhập mã giảm giá")
            return
        }
        try {
            setLoading(true)
            const response = await api.validatePromoCode(promoCode, calculateSubtotal())
            if (response.success) {
                setAppliedPromoCode(response.data)
                setPromoCodeError("")
                setPromoCode("")
            } else {
                setPromoCodeError(response.error)
            }
        } catch (error) {
            console.error("Error applying promo code:", error)
            setPromoCodeError("Không thể áp dụng mã giảm giá. Vui lòng thử lại sau.")
        } finally {
            setLoading(false)
        }
    }

    const removePromoCode = () => {
        setAppliedPromoCode(null)
    }

    const selectPromoCode = async (code) => {
        setPromoCode(code.code)
        setShowPromoCodesModal(false)
        try {
            setLoading(true)
            const response = await api.validatePromoCode(code.code, calculateSubtotal())
            if (response.success) {
                setAppliedPromoCode(response.data)
                setPromoCodeError("")
                setPromoCode("")
            } else {
                setPromoCodeError(response.error)
            }
        } catch (error) {
            console.error("Error applying promo code:", error)
            setPromoCodeError("Không thể áp dụng mã giảm giá. Vui lòng thử lại sau.")
        } finally {
            setLoading(false)
        }
    }

    const handleAddAddress = () => {
        if (!newAddress.recipient || !newAddress.phone || !newAddress.address || !newAddress.city) {
            Alert.alert("Lỗi", "Vui lòng điền đầy đủ thông tin địa chỉ")
            return
        }
        const newAddressList = [...addresses, { ...newAddress, id: Date.now().toString() }]
        setAddresses(newAddressList)
        setSelectedAddress(newAddressList[newAddressList.length - 1])
        setShowAddAddress(false)
        setNewAddress({
            name: "",
            recipient: "",
            phone: "",
            address: "",
            ward: "",
            district: "",
            city: "",
            isDefault: false,
        })
    }

    const handlePlaceOrder = async () => {
        if (!isLoggedIn) {
            Alert.alert("Đăng nhập", "Vui lòng đăng nhập để tiếp tục thanh toán", [
                { text: "Hủy", style: "cancel" },
                { text: "Đăng nhập", onPress: () => navigation.navigate("Login") },
            ])
            return
        }
        if (!selectedAddress) {
            Alert.alert("Lỗi", "Vui lòng chọn địa chỉ giao hàng")
            return
        }
        try {
            setLoading(true)
            const orderData = {
                items: routeCartItems.map((item) => ({
                    productId: item.id,
                    name: item.name,
                    price: item.price,
                    quantity: item.quantity,
                    color: item.color,
                    storage: item.storage,
                    size: item.size,
                })),
                shipping: {
                    method: "Giao hàng tiêu chuẩn",
                    fee: calculateShippingFee(),
                    address: {
                        recipient: selectedAddress.recipient,
                        phone: selectedAddress.phone,
                        address: `${selectedAddress.address}, ${selectedAddress.ward}, ${selectedAddress.district}, ${selectedAddress.city}`,
                    },
                },
                payment: {
                    method: paymentMethod,
                    status: paymentMethod === "cod" ? "Chưa thanh toán" : "Đã thanh toán",
                },
                promoCode: appliedPromo ? appliedPromo.code : appliedPromoCode ? appliedPromoCode.code : null,
                discount: calculatePromoDiscount(),
                total: calculateTotal(),
                note,
            }
            const response = await api.createOrder(token, orderData)
            if (response.success) {
                clearCart()
                Alert.alert(
                    "Đặt hàng thành công",
                    `Đơn hàng ${response.data.orderId} đã được tạo thành công. Cảm ơn bạn đã mua sắm tại Minh Tuấn Mobile!`,
                    [{ text: "OK", onPress: () => navigation.navigate("AppTab") }],
                )
            } else {
                Alert.alert("Lỗi", response.error || "Đã có lỗi xảy ra khi đặt hàng")
            }
        } catch (error) {
            console.error("Place order error:", error)
            Alert.alert("Lỗi", "Đã có lỗi xảy ra khi đặt hàng")
        } finally {
            setLoading(false)
        }
    }

    return {
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
        navigation,
    }
}

export default useCheckout