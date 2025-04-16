import { useState, useEffect } from "react"
import { useNavigation } from "@react-navigation/native"
import { Alert } from "react-native"
import { api } from "@service/apiAdmin"

const useCreateOrder = () => {
    const navigation = useNavigation()
    const [loading, setLoading] = useState(false)
    const [submitting, setSubmitting] = useState(false)

    // Thông tin khách hàng
    const [customer, setCustomer] = useState(null)
    const [showCustomerModal, setShowCustomerModal] = useState(false)
    const [customerSearchQuery, setCustomerSearchQuery] = useState("")
    const [customers, setCustomers] = useState([])
    const [loadingCustomers, setLoadingCustomers] = useState(false)

    // Thông tin sản phẩm
    const [cartItems, setCartItems] = useState([])
    const [showProductModal, setShowProductModal] = useState(false)
    const [productSearchQuery, setProductSearchQuery] = useState("")
    const [products, setProducts] = useState([])
    const [loadingProducts, setLoadingProducts] = useState(false)
    const [selectedProduct, setSelectedProduct] = useState(null)
    const [selectedVariant, setSelectedVariant] = useState(null)
    const [quantity, setQuantity] = useState("1")

    // Thông tin đơn hàng
    const [shippingFee, setShippingFee] = useState("30000")
    const [discount, setDiscount] = useState("0")
    const [note, setNote] = useState("")
    const [paymentMethod, setPaymentMethod] = useState("COD")

    // Tính toán tổng tiền
    const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
    const shippingFeeValue = Number.parseInt(shippingFee) || 0
    const discountValue = Number.parseInt(discount) || 0
    const tax = Math.round(subtotal * 0.1) // VAT 10%
    const total = subtotal + shippingFeeValue + tax - discountValue

    const fetchCustomers = async (query = "") => {
        setLoadingCustomers(true)
        try {
            const response = await api.admin.getCustomersForOrder(query)
            if (response.success) {
                setCustomers(response.data)
            } else {
                Alert.alert("Lỗi", "Không thể tải danh sách khách hàng")
            }
        } catch (error) {
            console.error("Error fetching customers:", error)
            Alert.alert("Lỗi", "Đã xảy ra lỗi khi tải danh sách khách hàng")
        } finally {
            setLoadingCustomers(false)
        }
    }

    const fetchProducts = async (query = "") => {
        setLoadingProducts(true)
        try {
            const response = await api.admin.getProductsForOrder(query)
            if (response.success) {
                setProducts(response.data)
            } else {
                Alert.alert("Lỗi", "Không thể tải danh sách sản phẩm")
            }
        } catch (error) {
            console.error("Error fetching products:", error)
            Alert.alert("Lỗi", "Đã xảy ra lỗi khi tải danh sách sản phẩm")
        } finally {
            setLoadingProducts(false)
        }
    }

    const addToCart = () => {
        if (!selectedProduct) return

        const productToAdd = {
            id: selectedVariant ? selectedVariant.id : selectedProduct.id,
            productId: selectedProduct.id,
            name: selectedProduct.name,
            variant: selectedVariant ? selectedVariant.name : null,
            price: selectedVariant ? selectedVariant.price : selectedProduct.price,
            quantity: Number.parseInt(quantity) || 1,
            image: selectedProduct.image,
        }

        const existingItemIndex = cartItems.findIndex((item) => item.id === productToAdd.id)

        if (existingItemIndex !== -1) {
            const updatedItems = [...cartItems]
            updatedItems[existingItemIndex].quantity += productToAdd.quantity
            setCartItems(updatedItems)
        } else {
            setCartItems([...cartItems, productToAdd])
        }

        setSelectedProduct(null)
        setSelectedVariant(null)
        setQuantity("1")
        setShowProductModal(false)
    }

    const removeFromCart = (itemId) => {
        setCartItems(cartItems.filter((item) => item.id !== itemId))
    }

    const updateQuantity = (itemId, newQuantity) => {
        if (newQuantity < 1) return

        const updatedItems = cartItems.map((item) => {
            if (item.id === itemId) {
                return { ...item, quantity: newQuantity }
            }
            return item
        })

        setCartItems(updatedItems)
    }

    const createOrder = async () => {
        if (!customer) {
            Alert.alert("Thông báo", "Vui lòng chọn khách hàng")
            return
        }

        if (cartItems.length === 0) {
            Alert.alert("Thông báo", "Vui lòng thêm ít nhất một sản phẩm vào đơn hàng")
            return
        }

        setSubmitting(true)

        try {
            const orderData = {
                customerName: customer.name,
                customerPhone: customer.phone,
                customerEmail: customer.email,
                shippingAddress: customer.address,
                paymentMethod: paymentMethod === "COD" ? "Thanh toán khi nhận hàng (COD)" : "Chuyển khoản ngân hàng",
                paymentStatus: "unpaid",
                subtotal,
                shippingFee: shippingFeeValue,
                discount: discountValue,
                tax,
                total,
                note,
                items: cartItems,
            }

            const response = await api.admin.createOrder(orderData)

            if (response.success) {
                Alert.alert("Thành công", `Đã tạo đơn hàng #${response.data.id} thành công`, [
                    {
                        text: "Xem chi tiết",
                        onPress: () => navigation.navigate("AdminOrderDetail", { orderId: response.data.id }),
                    },
                    {
                        text: "Quay lại danh sách",
                        onPress: () => navigation.navigate("AdminOrdersManagement"),
                    },
                ])
            } else {
                Alert.alert("Lỗi", response.error || "Không thể tạo đơn hàng")
            }
        } catch (error) {
            console.error("Error creating order:", error)
            Alert.alert("Lỗi", "Đã xảy ra lỗi khi tạo đơn hàng")
        } finally {
            setSubmitting(false)
        }
    }

    const navigateToCreateCustomer = () => {
        setShowCustomerModal(false)
        navigation.navigate("AdminCreateCustomer")
    }

    useEffect(() => {
        fetchCustomers()
        fetchProducts()
    }, [])

    return {
        loading,
        submitting,
        customer,
        setCustomer,
        showCustomerModal,
        setShowCustomerModal,
        customerSearchQuery,
        setCustomerSearchQuery,
        customers,
        loadingCustomers,
        cartItems,
        showProductModal,
        setShowProductModal,
        productSearchQuery,
        setProductSearchQuery,
        products,
        loadingProducts,
        selectedProduct,
        setSelectedProduct,
        selectedVariant,
        setSelectedVariant,
        quantity,
        setQuantity,
        shippingFee,
        setShippingFee,
        discount,
        setDiscount,
        note,
        setNote,
        paymentMethod,
        setPaymentMethod,
        subtotal,
        shippingFeeValue,
        discountValue,
        tax,
        total,
        fetchCustomers,
        fetchProducts,
        addToCart,
        removeFromCart,
        updateQuantity,
        createOrder,
        navigateToCreateCustomer,
    }
}

export default useCreateOrder